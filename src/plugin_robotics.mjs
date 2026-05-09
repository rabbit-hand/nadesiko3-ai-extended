// PluginRobotics - ロボット制御とIoTデバイス制御機能
const PluginRobotics = {
    '初期化': {
        type: 'func',
        josi: [],
        pure: true,
        fn: function (sys) {
        }
    },
    // --- 姿勢制御 ---
    '姿勢検出': {
        type: 'func',
        josi: [['の']],
        pure: true,
        fn: function (sensorData) {
            if (!Array.isArray(sensorData) || sensorData.length < 3) {
                return { pitch: 0, roll: 0, yaw: 0, status: 'error' };
            }
            // 加速度センサーデータから姿勢を計算
            const ax = Number(sensorData[0]) || 0;
            const ay = Number(sensorData[1]) || 0;
            const az = Number(sensorData[2]) || 0;
            // 簡単な姿勢計算（実際はより複雑なカルマンフィルターなどを使用）
            const pitch = Math.atan2(ay, Math.sqrt(ax * ax + az * az)) * 180 / Math.PI;
            const roll = Math.atan2(-ax, az) * 180 / Math.PI;
            const yaw = 0; // 磁気センサーが必要
            return {
                pitch: pitch,
                roll: roll,
                yaw: yaw,
                status: 'active'
            };
        }
    },
    '姿勢安定化': {
        type: 'func',
        josi: [['を'], ['で']],
        pure: true,
        fn: function (currentPosture, targetPosture) {
            if (!currentPosture || !targetPosture) {
                return { correction: { pitch: 0, roll: 0, yaw: 0 }, status: 'error' };
            }
            // PID制御による姿勢安定化
            const kp = 1.0; // 比例ゲイン
            const ki = 0.1; // 積分ゲイン
            const kd = 0.05; // 微分ゲイン
            const pitchError = targetPosture.pitch - currentPosture.pitch;
            const rollError = targetPosture.roll - currentPosture.roll;
            const yawError = targetPosture.yaw - currentPosture.yaw;
            return {
                correction: {
                    pitch: kp * pitchError,
                    roll: kp * rollError,
                    yaw: kp * yawError
                },
                status: 'stabilizing'
            };
        }
    },
    'バランス制御': {
        type: 'func',
        josi: [['を']],
        pure: true,
        fn: function (centerOfGravity) {
            if (!centerOfGravity || typeof centerOfGravity.x === 'undefined' || typeof centerOfGravity.y === 'undefined') {
                return { adjustment: { x: 0, y: 0 }, status: 'error' };
            }
            // 重心位置からバランス調整量を計算
            const targetX = 0;
            const targetY = 0;
            const adjustmentX = (targetX - centerOfGravity.x) * 0.5;
            const adjustmentY = (targetY - centerOfGravity.y) * 0.5;
            return {
                adjustment: {
                    x: adjustmentX,
                    y: adjustmentY
                },
                status: 'balanced'
            };
        }
    },
    '歩行パターン生成': {
        type: 'func',
        josi: [['で'], ['を']],
        pure: true,
        fn: function (gaitType, parameters) {
            const steps = Number(parameters.steps) || 10;
            const stepHeight = Number(parameters.height) || 50;
            const stepLength = Number(parameters.length) || 100;
            const pattern = [];
            for (let i = 0; i < steps; i++) {
                const phase = (i / steps) * 2 * Math.PI;
                if (gaitType === 'walk') {
                    pattern.push({
                        time: i,
                        leftLeg: {
                            hip: Math.sin(phase) * 30,
                            knee: Math.max(0, Math.sin(phase * 2) * 45),
                            ankle: Math.sin(phase) * 15
                        },
                        rightLeg: {
                            hip: Math.sin(phase + Math.PI) * 30,
                            knee: Math.max(0, Math.sin((phase + Math.PI) * 2) * 45),
                            ankle: Math.sin(phase + Math.PI) * 15
                        }
                    });
                }
                else if (gaitType === 'trot') {
                    pattern.push({
                        time: i,
                        frontLeft: { angle: Math.sin(phase) * 45 },
                        frontRight: { angle: Math.sin(phase + Math.PI) * 45 },
                        rearLeft: { angle: Math.sin(phase + Math.PI) * 45 },
                        rearRight: { angle: Math.sin(phase) * 45 }
                    });
                }
            }
            return pattern;
        }
    },
    // --- ロボット制御 ---
    'サーボ制御': {
        type: 'func',
        josi: [['を'], ['に']],
        pure: true,
        fn: function (servoId, angle) {
            return {
                servo: servoId,
                angle: Math.max(0, Math.min(180, angle)),
                pwm: Math.round((angle / 180) * 255),
                status: 'commanded'
            };
        }
    },
    'モーター制御': {
        type: 'func',
        josi: [['を'], ['で']],
        pure: true,
        fn: function (motorId, speed) {
            return {
                motor: motorId,
                speed: Math.max(-255, Math.min(255, speed)),
                direction: speed >= 0 ? 'forward' : 'reverse',
                pwm: Math.abs(Math.min(255, Math.abs(speed))),
                status: 'running'
            };
        }
    },
    '逆運動学計算': {
        type: 'func',
        josi: [['で'], ['を']],
        pure: true,
        fn: function (targetPosition, armLength) {
            if (!targetPosition || !Array.isArray(armLength) || armLength.length < 2) {
                return { angles: [], status: 'error' };
            }
            const x = Number(targetPosition.x) || 0;
            const y = Number(targetPosition.y) || 0;
            const z = Number(targetPosition.z) || 0;
            const l1 = armLength[0];
            const l2 = armLength[1];
            // 2D逆運動学計算
            const distance = Math.sqrt(x * x + y * y);
            if (distance > l1 + l2) {
                return { angles: [], status: 'unreachable' };
            }
            const cosAngle2 = (distance * distance - l1 * l1 - l2 * l2) / (2 * l1 * l2);
            const angle2 = Math.acos(Math.max(-1, Math.min(1, cosAngle2)));
            const k1 = l1 + l2 * Math.cos(angle2);
            const k2 = l2 * Math.sin(angle2);
            const angle1 = Math.atan2(y, x) - Math.atan2(k2, k1);
            return {
                angles: [
                    angle1 * 180 / Math.PI,
                    angle2 * 180 / Math.PI
                ],
                status: 'reachable'
            };
        }
    },
    // --- IoTデバイス制御 ---
    'センサーデータ取得': {
        type: 'func',
        josi: [['から']],
        pure: true,
        fn: function (sensorType) {
            const mockData = {
                temperature: 22.5 + Math.random() * 5,
                humidity: 45 + Math.random() * 20,
                pressure: 1013 + Math.random() * 10,
                light: 300 + Math.random() * 700,
                sound: 40 + Math.random() * 30,
                motion: Math.random() > 0.7,
                distance: 50 + Math.random() * 200,
                accelerometer: [
                    (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 2,
                    9.8 + (Math.random() - 0.5) * 0.5
                ],
                gyroscope: [
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10
                ]
            };
            return {
                sensor: sensorType,
                data: mockData[sensorType] || null,
                timestamp: Date.now(),
                status: 'active'
            };
        }
    },
    'アクチュエータ制御': {
        type: 'func',
        josi: [['を'], ['に']],
        pure: true,
        fn: function (actuatorId, command) {
            return {
                actuator: actuatorId,
                command: command,
                timestamp: Date.now(),
                status: 'executed'
            };
        }
    },
    '通信プロトコル送信': {
        type: 'func',
        josi: [['で'], ['を']],
        pure: true,
        fn: function (protocol, data) {
            const protocols = {
                'I2C': { address: 0x48, data: Buffer.from(JSON.stringify(data)) },
                'SPI': { cs: 0, data: Buffer.from(JSON.stringify(data)) },
                'UART': { baud: 9600, data: JSON.stringify(data) },
                'MQTT': { topic: 'robot/control', message: JSON.stringify(data) },
                'WiFi': { endpoint: '/api/control', method: 'POST', data: data }
            };
            return {
                protocol: protocol,
                transmission: protocols[protocol] || null,
                timestamp: Date.now(),
                status: 'sent'
            };
        }
    },
    '状態監視': {
        type: 'func',
        josi: [['の']],
        pure: true,
        fn: function (systemId) {
            return {
                system: systemId,
                cpu: Math.random() * 100,
                memory: Math.random() * 100,
                battery: 50 + Math.random() * 50,
                temperature: 30 + Math.random() * 20,
                uptime: Math.floor(Math.random() * 86400),
                errors: Math.floor(Math.random() * 10),
                warnings: Math.floor(Math.random() * 20),
                timestamp: Date.now(),
                status: 'monitoring'
            };
        }
    },
    'meta': {
        type: 'const',
        value: {
            pluginName: 'plugin_robotics',
            description: 'ロボット制御とIoTデバイス制御機能を提供するプラグイン',
            pluginVersion: '1.0.0',
            nakoRuntime: ['cnako', 'wnako'],
            nakoVersion: '3.6.0'
        }
    }
};
export default PluginRobotics;
