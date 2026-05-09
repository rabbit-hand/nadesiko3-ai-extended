/**
 * file: plugin_drone_sensors.mjs
 * ドローン用高度センサー機能プラグイン
 * This is AI modified! Advanced drone sensor system
 */
import { NakoSystem } from '../core/src/plugin_api.mjs'

const PluginDroneSensors = {
  'meta': {
    type: 'const',
    value: {
      pluginName: 'plugin_drone_sensors',
      description: 'ドローン用高度センサー機能を提供するプラグイン | Advanced drone sensor system',
      pluginVersion: '1.0.0',
      nakoRuntime: ['cnako', 'wnako'],
      nakoVersion: '3.6.0'
    }
  },

  // === ドローンセンサー検出 ===
  'ドローンセンサー検出': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (type = 'all') {
      const discovery = this.__droneSensors || {}
      
      if (!discovery.initialized) {
        this.__droneSensors = this._initializeDroneSensors()
        discovery = this.__droneSensors
      }
      
      const results = {}
      
      switch (type.toLowerCase()) {
        case 'gyro':
        case 'ジャイロ':
          results.gyro = discovery.gyro
          break
        case 'gps':
        case 'gps':
          results.gps = discovery.gps
          break
        case 'motor':
        case 'モーター':
          results.motors = discovery.motors
          break
        case 'altimeter':
        case '高度計':
          results.altimeter = discovery.altimeter
          break
        case 'accelerometer':
        case '加速度':
          results.accelerometer = discovery.accelerometer
          break
        case 'magnetometer':
        case '地磁気':
          results.magnetometer = discovery.magnetometer
          break
        case 'barometer':
        case '気圧計':
          results.barometer = discovery.barometer
          break
        case 'compass':
        case 'コンパス':
          results.compass = discovery.compass
          break
        case 'all':
        case '全部':
        default:
          return discovery
      }
      
      return results
    }
  },

  'DISCOVER_DRONE_SENSORS': {
    type: 'func',
    josi: [['']],
    pure: true,
    fn: function () {
      return this['ドローンセンサー検出']('all')
    }
  },

  // === ジャイロセンサー ===
  'ジャイロデータ取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const sensors = this['ドローンセンサー検出']('gyro')
      const gyro = sensors.gyro
      
      if (!gyro || !gyro.active) {
        return { error: 'ジャイロセンサーが利用できません' }
      }
      
      return this._simulateGyroData(gyro)
    }
  },

  'GET_GYRO_DATA': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['ジャイロデータ取得']()
    }
  },

  // === GPSデータ ===
  'GPSデータ取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const sensors = this['ドローンセンサー検出']('gps')
      const gps = sensors.gps
      
      if (!gps || !gps.active) {
        return { error: 'GPSが利用できません' }
      }
      
      return this._simulateGPSData(gps)
    }
  },

  'GET_GPS_DATA': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['GPSデータ取得']()
    }
  },

  // === モーター回転数 ===
  'モーター回転数取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const sensors = this['ドローンセンサー検出']('motor')
      const motors = sensors.motors
      
      if (!motors || motors.length === 0) {
        return { error: 'モーターが利用できません' }
      }
      
      const rpmData = {}
      motors.forEach(motor => {
        rpmData[motor.id] = this._simulateMotorRPM(motor)
      })
      
      return {
        timestamp: new Date().toISOString(),
        motors: rpmData,
        summary: {
          total: motors.length,
          active: motors.filter(m => m.active).length,
          averageRPM: Object.values(rpmData).reduce((a, b) => a + b.rpm, 0) / motors.length
        }
      }
    }
  },

  'GET_MOTOR_RPM': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['モーター回転数取得']()
    }
  },

  // === 高度計 ===
  '高度データ取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const sensors = this['ドローンセンサー検出']('altimeter')
      const altimeter = sensors.altimeter
      
      if (!altimeter || !altimeter.active) {
        return { error: '高度計が利用できません' }
      }
      
      return this._simulateAltimeterData(altimeter)
    }
  },

  'GET_ALTITUDE_DATA': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['高度データ取得']()
    }
  },

  // === 加速度センサー ===
  '加速度データ取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const sensors = this['ドローンセンサー検出']('accelerometer')
      const accelerometer = sensors.accelerometer
      
      if (!accelerometer || !accelerometer.active) {
        return { error: '加速度センサーが利用できません' }
      }
      
      return this._simulateAccelerometerData(accelerometer)
    }
  },

  'GET_ACCELEROMETER_DATA': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['加速度データ取得']()
    }
  },

  // === 地磁気センサー ===
  '地磁気データ取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const sensors = this['ドローンセンサー検出']('magnetometer')
      const magnetometer = sensors.magnetometer
      
      if (!magnetometer || !magnetometer.active) {
        return { error: '地磁気センサーが利用できません' }
      }
      
      return this._simulateMagnetometerData(magnetometer)
    }
  },

  'GET_MAGNETOMETER_DATA': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['地磁気データ取得']()
    }
  },

  // === 気圧計 ===
  '気圧データ取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const sensors = this['ドローンセンサー検出']('barometer')
      const barometer = sensors.barometer
      
      if (!barometer || !barometer.active) {
        return { error: '気圧計が利用できません' }
      }
      
      return this._simulateBarometerData(barometer)
    }
  },

  'GET_BAROMETER_DATA': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['気圧データ取得']()
    }
  },

  // === コンパス ===
  'コンパスデータ取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const sensors = this['ドローンセンサー検出']('compass')
      const compass = sensors.compass
      
      if (!compass || !compass.active) {
        return { error: 'コンパスが利用できません' }
      }
      
      return this._simulateCompassData(compass)
    }
  },

  'GET_COMPASS_DATA': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['コンパスデータ取得']()
    }
  },

  // === ドローン状態監視 ===
  'ドローン状態監視': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const sensors = this['ドローンセンサー検出']('all')
      
      return {
        timestamp: new Date().toISOString(),
        gyro: this._simulateGyroData(sensors.gyro),
        gps: this._simulateGPSData(sensors.gps),
        motors: this['モーター回転数取得'](),
        altimeter: this._simulateAltimeterData(sensors.altimeter),
        accelerometer: this._simulateAccelerometerData(sensors.accelerometer),
        magnetometer: this._simulateMagnetometerData(sensors.magnetometer),
        barometer: this._simulateBarometerData(sensors.barometer),
        compass: this._simulateCompassData(sensors.compass),
        status: this._getDroneStatus(sensors)
      }
    }
  },

  'MONITOR_DRONE': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['ドローン状態監視']()
    }
  },

  // === ドローン飛行データ ===
  '飛行データ取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const status = this['ドローン状態監視']()
      
      return {
        timestamp: status.timestamp,
        position: {
          latitude: status.gps.latitude,
          longitude: status.gps.longitude,
          altitude: status.altimeter.altitude
        },
        orientation: {
          roll: status.gyro.roll,
          pitch: status.gyro.pitch,
          yaw: status.gyro.yaw,
          heading: status.compass.heading
        },
        motion: {
          acceleration: status.accelerometer.acceleration,
          velocity: this._calculateVelocity(status)
        },
        motors: status.motors,
        environment: {
          pressure: status.barometer.pressure,
          temperature: status.altimeter.temperature
        },
        flight: {
          status: status.status.flight,
          battery: status.status.battery,
          signal: status.status.signal
        }
      }
    }
  },

  'GET_FLIGHT_DATA': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['飛行データ取得']()
    }
  },

  // === ドローン制御 ===
  'ドローン制御': {
    type: 'func',
    josi: [['を', 'に'], ['で', 'に']],
    pure: true,
    fn: function (command, params = {}) {
      const result = {
        command: command,
        params: params,
        timestamp: new Date().toISOString(),
        success: true,
        message: ''
      }
      
      switch (command.toLowerCase()) {
        case 'takeoff':
        case '離陸':
          result.message = 'ドローンを離陸させました'
          break
        case 'land':
        case '着陸':
          result.message = 'ドローンを着陸させました'
          break
        case 'hover':
        case 'ホバー':
          result.message = 'ドローンをホバー状態にしました'
          break
        case 'move':
        case '移動':
          const direction = params.direction || 'forward'
          const distance = params.distance || 1
          result.message = `ドローンを${direction}方向に${distance}m移動させました`
          break
        case 'rotate':
        case '回転':
          const angle = params.angle || 90
          result.message = `ドローンを${angle}度回転させました`
          break
        case 'altitude':
        case '高度':
          const targetAltitude = params.altitude || 10
          result.message = `ドローンの高度を${targetAltitude}mに設定しました`
          break
        default:
          result.success = false
          result.message = `不明なコマンド: ${command}`
      }
      
      return result
    }
  },

  'CONTROL_DRONE': {
    type: 'func',
    josi: [['with'], ['params']],
    pure: true,
    fn: function (command, params) {
      return this['ドローン制御'](command, params)
    }
  },

  // === 内部ヘルパー関数 ===
  '_initializeDroneSensors': function () {
    return {
      initialized: true,
      timestamp: new Date().toISOString(),
      gyro: {
        id: 'gyro_001',
        name: 'ジャイロセンサー',
        type: 'MPU6050',
        active: true,
        range: { roll: [-180, 180], pitch: [-90, 90], yaw: [-180, 180] },
        accuracy: { roll: 0.1, pitch: 0.1, yaw: 0.1 },
        unit: 'degrees'
      },
      gps: {
        id: 'gps_001',
        name: 'GPSモジュール',
        type: 'NEO-8M',
        active: true,
        accuracy: 3.0,
        unit: 'meters',
        satellites: 8
      },
      motors: [
        {
          id: 'motor_fl',
          name: '前左モーター',
          position: 'front_left',
          active: true,
          maxRPM: 10000,
          currentRPM: 0
        },
        {
          id: 'motor_fr',
          name: '前右モーター',
          position: 'front_right',
          active: true,
          maxRPM: 10000,
          currentRPM: 0
        },
        {
          id: 'motor_bl',
          name: '後左モーター',
          position: 'back_left',
          active: true,
          maxRPM: 10000,
          currentRPM: 0
        },
        {
          id: 'motor_br',
          name: '後右モーター',
          position: 'back_right',
          active: true,
          maxRPM: 10000,
          currentRPM: 0
        }
      ],
      altimeter: {
        id: 'altimeter_001',
        name: '高度計',
        type: 'BMP280',
        active: true,
        range: { min: -500, max: 9000 },
        accuracy: 0.1,
        unit: 'meters'
      },
      accelerometer: {
        id: 'accel_001',
        name: '加速度センサー',
        type: 'MPU6050',
        active: true,
        range: { x: [-16, 16], y: [-16, 16], z: [-16, 16] },
        accuracy: 0.01,
        unit: 'g'
      },
      magnetometer: {
        id: 'mag_001',
        name: '地磁気センサー',
        type: 'HMC5883L',
        active: true,
        range: { x: [-480, 480], y: [-480, 480], z: [-480, 480] },
        accuracy: 0.1,
        unit: 'gauss'
      },
      barometer: {
        id: 'baro_001',
        name: '気圧計',
        type: 'BMP280',
        active: true,
        range: { min: 300, max: 1100 },
        accuracy: 0.1,
        unit: 'hPa'
      },
      compass: {
        id: 'compass_001',
        name: 'コンパス',
        type: 'HMC5883L',
        active: true,
        range: { min: 0, max: 360 },
        accuracy: 1.0,
        unit: 'degrees'
      }
    }
  },

  '_simulateGyroData': function (gyro) {
    const now = Date.now()
    return {
      sensor: gyro.name,
      timestamp: new Date().toISOString(),
      roll: Math.sin(now / 2000) * 30 + (Math.random() - 0.5) * 2,
      pitch: Math.cos(now / 2500) * 20 + (Math.random() - 0.5) * 2,
      yaw: Math.sin(now / 3000) * 45 + (Math.random() - 0.5) * 3,
      unit: gyro.unit,
      status: 'active'
    }
  },

  '_simulateGPSData': function (gps) {
    const now = Date.now()
    return {
      sensor: gps.name,
      timestamp: new Date().toISOString(),
      latitude: 35.6812 + Math.sin(now / 10000) * 0.001,
      longitude: 139.7671 + Math.cos(now / 10000) * 0.001,
      altitude: 50 + Math.sin(now / 5000) * 5,
      speed: Math.abs(Math.sin(now / 3000)) * 10,
      heading: Math.sin(now / 4000) * 180 + 180,
      satellites: gps.satellites,
      accuracy: gps.accuracy,
      unit: 'degrees/meters',
      status: 'active'
    }
  },

  '_simulateMotorRPM': function (motor) {
    const baseRPM = 3000 + Math.sin(Date.now() / 1000) * 2000
    const noise = (Math.random() - 0.5) * 100
    const rpm = Math.max(0, Math.min(motor.maxRPM, baseRPM + noise))
    
    return {
      motor: motor.name,
      position: motor.position,
      rpm: Math.round(rpm),
      percentage: Math.round((rpm / motor.maxRPM) * 100),
      status: rpm > 0 ? 'running' : 'stopped',
      timestamp: new Date().toISOString()
    }
  },

  '_simulateAltimeterData': function (altimeter) {
    const now = Date.now()
    return {
      sensor: altimeter.name,
      timestamp: new Date().toISOString(),
      altitude: 50 + Math.sin(now / 5000) * 10,
      pressure: 1013.25 + Math.cos(now / 8000) * 5,
      temperature: 20 + Math.sin(now / 10000) * 5,
      unit: altimeter.unit,
      status: 'active'
    }
  },

  '_simulateAccelerometerData': function (accelerometer) {
    const now = Date.now()
    return {
      sensor: accelerometer.name,
      timestamp: new Date().toISOString(),
      acceleration: {
        x: Math.sin(now / 1500) * 0.5 + (Math.random() - 0.5) * 0.1,
        y: Math.cos(now / 1800) * 0.3 + (Math.random() - 0.5) * 0.1,
        z: 9.8 + Math.sin(now / 2000) * 0.2 + (Math.random() - 0.5) * 0.1
      },
      unit: accelerometer.unit,
      status: 'active'
    }
  },

  '_simulateMagnetometerData': function (magnetometer) {
    const now = Date.now()
    return {
      sensor: magnetometer.name,
      timestamp: new Date().toISOString(),
      magnetic_field: {
        x: Math.sin(now / 4000) * 200 + (Math.random() - 0.5) * 10,
        y: Math.cos(now / 4500) * 150 + (Math.random() - 0.5) * 10,
        z: Math.sin(now / 5000) * 100 + (Math.random() - 0.5) * 10
      },
      unit: magnetometer.unit,
      status: 'active'
    }
  },

  '_simulateBarometerData': function (barometer) {
    const now = Date.now()
    return {
      sensor: barometer.name,
      timestamp: new Date().toISOString(),
      pressure: 1013.25 + Math.sin(now / 8000) * 10 + (Math.random() - 0.5) * 0.5,
      altitude: 50 + Math.sin(now / 5000) * 5,
      temperature: 20 + Math.sin(now / 10000) * 3,
      unit: barometer.unit,
      status: 'active'
    }
  },

  '_simulateCompassData': function (compass) {
    const now = Date.now()
    return {
      sensor: compass.name,
      timestamp: new Date().toISOString(),
      heading: (Math.sin(now / 6000) * 180 + 180 + (Math.random() - 0.5) * 5) % 360,
      bearing: Math.sin(now / 6000) * 180 + 180,
      unit: compass.unit,
      status: 'active'
    }
  },

  '_getDroneStatus': function (sensors) {
    return {
      flight: 'hovering',
      battery: 85 + Math.sin(Date.now() / 10000) * 10,
      signal: 95,
      gps_lock: true,
      sensors_ok: true,
      motors_ok: true,
      ready: true
    }
  },

  '_calculateVelocity': function (status) {
    // 簡単な速度計算シミュレーション
    const now = Date.now()
    return {
      horizontal: Math.abs(Math.sin(now / 3000)) * 5,
      vertical: Math.sin(now / 4000) * 2,
      total: Math.sqrt(
        Math.pow(Math.abs(Math.sin(now / 3000)) * 5, 2) +
        Math.pow(Math.sin(now / 4000) * 2, 2)
      ),
      unit: 'm/s'
    }
  }
}

export default PluginDroneSensors
