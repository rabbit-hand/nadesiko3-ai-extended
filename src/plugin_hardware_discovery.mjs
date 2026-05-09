/**
 * file: plugin_hardware_discovery.mjs
 * ハードウェア自動検出・自動調査機能プラグイン
 * This is AI modified! Automatic hardware discovery and investigation system
 */
import { NakoSystem } from '../core/src/plugin_api.mjs'

const PluginHardwareDiscovery = {
  'meta': {
    type: 'const',
    value: {
      pluginName: 'plugin_hardware_discovery',
      description: 'ハードウェア自動検出・自動調査機能を提供するプラグイン | Automatic hardware discovery and investigation system',
      pluginVersion: '1.0.0',
      nakoRuntime: ['cnako', 'wnako'],
      nakoVersion: '3.6.0'
    }
  },

  // === ハードウェア自動検出 ===
  'ハードウェア検出': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (type = 'all') {
      const discovery = this.__hardwareDiscovery || {}
      
      if (!discovery.initialized) {
        this.__hardwareDiscovery = this._initializeHardwareDiscovery()
        discovery = this.__hardwareDiscovery
      }
      
      const results = {}
      
      switch (type.toLowerCase()) {
        case 'sensors':
        case 'センサー':
          results.sensors = discovery.sensors
          break
        case 'motors':
        case 'モーター':
          results.motors = discovery.motors
          break
        case 'gpio':
        case 'gpio':
          results.gpio = discovery.gpio
          break
        case 'i2c':
        case 'i2c':
          results.i2c = discovery.i2c
          break
        case 'spi':
        case 'spi':
          results.spi = discovery.spi
          break
        case 'wheels':
        case '車輪':
        case 'タイヤ':
          results.wheels = discovery.wheels
          break
        case 'all':
        case '全部':
        default:
          return discovery
      }
      
      return results
    }
  },

  'DISCOVER_HARDWARE': {
    type: 'func',
    josi: [['']],
    pure: true,
    fn: function () {
      return this['ハードウェア検出']('all')
    }
  },

  // === センサー情報取得 ===
  'センサー一覧取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const discovery = this['ハードウェア検出']('sensors')
      return discovery.sensors || []
    }
  },

  'GET_SENSORS': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['センサー一覧取得']()
    }
  },

  // === モーター情報取得 ===
  'モーター一覧取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const discovery = this['ハードウェア検出']('motors')
      return discovery.motors || []
    }
  },

  'GET_MOTORS': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['モーター一覧取得']()
    }
  },

  // === 車輪・タイヤ情報取得 ===
  '車輪数取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const discovery = this['ハードウェア検出']('wheels')
      return discovery.wheels ? discovery.wheels.count : 0
    }
  },

  'GET_WHEEL_COUNT': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['車輪数取得']()
    }
  },

  'タイヤ数取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['車輪数取得']()
    }
  },

  'GET_TIRE_COUNT': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['車輪数取得']()
    }
  },

  // === GPIOポート情報取得 ===
  'GPIOポート一覧取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const discovery = this['ハードウェア検出']('gpio')
      return discovery.gpio ? discovery.gpio.ports : []
    }
  },

  'GET_GPIO_PORTS': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['GPIOポート一覧取得']()
    }
  },

  // === I2Cデバイス情報取得 ===
  'I2Cデバイス一覧取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const discovery = this['ハードウェア検出']('i2c')
      return discovery.i2c ? discovery.i2c.devices : []
    }
  },

  'GET_I2C_DEVICES': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['I2Cデバイス一覧取得']()
    }
  },

  // === SPIデバイス情報取得 ===
  'SPIデバイス一覧取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const discovery = this['ハードウェア検出']('spi')
      return discovery.spi ? discovery.spi.devices : []
    }
  },

  'GET_SPI_DEVICES': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['SPIデバイス一覧取得']()
    }
  },

  // === センサーデータ取得 ===
  'センサーデータ取得': {
    type: 'func',
    josi: [['から']],
    pure: true,
    fn: function (sensorId) {
      const sensors = this['センサー一覧取得']()
      const sensor = sensors.find(s => s.id === sensorId || s.name === sensorId)
      
      if (!sensor) {
        return { error: `センサーが見つかりません: ${sensorId}` }
      }
      
      // センサーデータのシミュレーション
      const simulatedData = this._simulateSensorData(sensor)
      return {
        sensor: sensor,
        data: simulatedData,
        timestamp: new Date().toISOString()
      }
    }
  },

  'GET_SENSOR_DATA': {
    type: 'func',
    josi: [['from']],
    pure: true,
    fn: function (sensorId) {
      return this['センサーデータ取得'](sensorId)
    }
  },

  // === モーター制御 ===
  'モーター制御': {
    type: 'func',
    josi: [['を', 'に'], ['で', 'に']],
    pure: true,
    fn: function (motorId, command) {
      const motors = this['モーター一覧取得']()
      const motor = motors.find(m => m.id === motorId || m.name === motorId)
      
      if (!motor) {
        return { error: `モーターが見つかりません: ${motorId}` }
      }
      
      // モーター制御のシミュレーション
      const result = this._simulateMotorControl(motor, command)
      return {
        motor: motor,
        command: command,
        result: result,
        timestamp: new Date().toISOString()
      }
    }
  },

  'CONTROL_MOTOR': {
    type: 'func',
    josi: [['with'], ['command']],
    pure: true,
    fn: function (motorId, command) {
      return this['モーター制御'](motorId, command)
    }
  },

  // === ハードウェア状態監視 ===
  'ハードウェア状態監視': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const discovery = this['ハードウェア検出']('all')
      const status = {
        timestamp: new Date().toISOString(),
        sensors: [],
        motors: [],
        gpio: [],
        i2c: [],
        spi: [],
        wheels: discovery.wheels || { count: 0 }
      }
      
      // センサー状態
      if (discovery.sensors) {
        status.sensors = discovery.sensors.map(sensor => ({
          ...sensor,
          status: this._getSensorStatus(sensor),
          lastData: this._simulateSensorData(sensor)
        }))
      }
      
      // モーター状態
      if (discovery.motors) {
        status.motors = discovery.motors.map(motor => ({
          ...motor,
          status: this._getMotorStatus(motor),
          lastCommand: null
        }))
      }
      
      // GPIO状態
      if (discovery.gpio) {
        status.gpio = discovery.gpio.ports.map(port => ({
          ...port,
          status: this._getGPIOStatus(port)
        }))
      }
      
      // I2Cデバイス状態
      if (discovery.i2c) {
        status.i2c = discovery.i2c.devices.map(device => ({
          ...device,
          status: this._getI2CStatus(device)
        }))
      }
      
      // SPIデバイス状態
      if (discovery.spi) {
        status.spi = discovery.spi.devices.map(device => ({
          ...device,
          status: this._getSPIStatus(device)
        }))
      }
      
      return status
    }
  },

  'MONITOR_HARDWARE': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['ハードウェア状態監視']()
    }
  },

  // === ハードウェア情報整形 ===
  'ハードウェア情報整形': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (hardwareData) {
      if (!hardwareData) return 'ハードウェアデータがありません'
      
      let formatted = '🔧 ハードウェア情報\n'
      formatted += `📅 取得時刻: ${hardwareData.timestamp || new Date().toISOString()}\n\n`
      
      // センサー情報
      if (hardwareData.sensors && hardwareData.sensors.length > 0) {
        formatted += '📡 センサー情報:\n'
        hardwareData.sensors.forEach((sensor, index) => {
          formatted += `  ${index + 1}. ${sensor.name} (${sensor.id})\n`
          formatted += `     種類: ${sensor.type}\n`
          formatted += `     ポート: ${sensor.port}\n`
          formatted += `     状態: ${sensor.status}\n`
          if (sensor.lastData) {
            formatted += `     最新値: ${JSON.stringify(sensor.lastData)}\n`
          }
          formatted += '\n'
        })
      }
      
      // モーター情報
      if (hardwareData.motors && hardwareData.motors.length > 0) {
        formatted += '⚙️ モーター情報:\n'
        hardwareData.motors.forEach((motor, index) => {
          formatted += `  ${index + 1}. ${motor.name} (${motor.id})\n`
          formatted += `     種類: ${motor.type}\n`
          formatted += `     ポート: ${motor.port}\n`
          formatted += `     状態: ${motor.status}\n`
          formatted += `     最大速度: ${motor.maxSpeed}\n`
          formatted += '\n'
        })
      }
      
      // 車輪情報
      if (hardwareData.wheels) {
        formatted += '🚗 車輪情報:\n'
        formatted += `  車輪数: ${hardwareData.wheels.count}\n`
        if (hardwareData.wheels.configuration) {
          formatted += `  配置: ${hardwareData.wheels.configuration}\n`
        }
        formatted += '\n'
      }
      
      // GPIO情報
      if (hardwareData.gpio && hardwareData.gpio.length > 0) {
        formatted += '🔌 GPIOポート情報:\n'
        hardwareData.gpio.forEach((port, index) => {
          formatted += `  ${index + 1}. ${port.name} (${port.id})\n`
          formatted += `     番号: ${port.number}\n`
          formatted += `     状態: ${port.status}\n`
          formatted += `     モード: ${port.mode}\n`
          formatted += '\n'
        })
      }
      
      return formatted
    }
  },

  'FORMAT_HARDWARE_INFO': {
    type: 'func',
    josi: [['']],
    pure: true,
    fn: function (hardwareData) {
      return this['ハードウェア情報整形'](hardwareData)
    }
  },

  // === 内部ヘルパー関数 ===
  '_initializeHardwareDiscovery': function () {
    // シミュレーション用のハードウェア情報
    return {
      initialized: true,
      timestamp: new Date().toISOString(),
      sensors: [
        {
          id: 'sensor_001',
          name: '温度センサー',
          type: 'temperature',
          port: 'A0',
          status: 'active',
          range: { min: -40, max: 125 },
          unit: '°C',
          accuracy: 0.1
        },
        {
          id: 'sensor_002',
          name: '湿度センサー',
          type: 'humidity',
          port: 'A1',
          status: 'active',
          range: { min: 0, max: 100 },
          unit: '%',
          accuracy: 0.5
        },
        {
          id: 'sensor_003',
          name: '距離センサー',
          type: 'ultrasonic',
          port: 'D2',
          status: 'active',
          range: { min: 2, max: 400 },
          unit: 'cm',
          accuracy: 0.3
        },
        {
          id: 'sensor_004',
          name: '光センサー',
          type: 'light',
          port: 'A2',
          status: 'active',
          range: { min: 0, max: 1023 },
          unit: 'lux',
          accuracy: 1
        },
        {
          id: 'sensor_005',
          name: '加速度センサー',
          type: 'accelerometer',
          port: 'I2C',
          status: 'active',
          range: { x: [-16, 16], y: [-16, 16], z: [-16, 16] },
          unit: 'g',
          accuracy: 0.01
        }
      ],
      motors: [
        {
          id: 'motor_001',
          name: '左モーター',
          type: 'DC',
          port: 'M1',
          status: 'stopped',
          maxSpeed: 255,
          currentSpeed: 0,
          direction: 'forward'
        },
        {
          id: 'motor_002',
          name: '右モーター',
          type: 'DC',
          port: 'M2',
          status: 'stopped',
          maxSpeed: 255,
          currentSpeed: 0,
          direction: 'forward'
        },
        {
          id: 'motor_003',
          name: 'アームモーター',
          type: 'servo',
          port: 'S1',
          status: 'stopped',
          maxSpeed: 180,
          currentSpeed: 0,
          direction: 'forward'
        }
      ],
      wheels: {
        count: 4,
        configuration: '四輪駆動',
        positions: ['front_left', 'front_right', 'rear_left', 'rear_right'],
        diameter: 6.5,
        width: 2.5
      },
      gpio: {
        total: 40,
        available: 28,
        ports: [
          { id: 'gpio_001', name: 'GPIO2', number: 2, status: 'available', mode: 'input' },
          { id: 'gpio_002', name: 'GPIO3', number: 3, status: 'available', mode: 'input' },
          { id: 'gpio_003', name: 'GPIO4', number: 4, status: 'available', mode: 'input' },
          { id: 'gpio_004', name: 'GPIO17', number: 17, status: 'available', mode: 'input' },
          { id: 'gpio_005', name: 'GPIO18', number: 18, status: 'available', mode: 'output' },
          { id: 'gpio_006', name: 'GPIO27', number: 27, status: 'available', mode: 'input' }
        ]
      },
      i2c: {
        bus: 1,
        devices: [
          {
            id: 'i2c_001',
            name: 'LCDディスプレイ',
            address: '0x27',
            type: 'display',
            status: 'connected'
          },
          {
            id: 'i2c_002',
            name: 'RTCモジュール',
            address: '0x68',
            type: 'clock',
            status: 'connected'
          }
        ]
      },
      spi: {
        bus: 0,
        devices: [
          {
            id: 'spi_001',
            name: 'SDカードリーダー',
            bus: 0,
            device: 0,
            type: 'storage',
            status: 'connected'
          }
        ]
      }
    }
  },

  '_simulateSensorData': function (sensor) {
    const now = Date.now()
    let value
    
    switch (sensor.type) {
      case 'temperature':
        value = 20 + Math.sin(now / 10000) * 5 + Math.random() * 2
        break
      case 'humidity':
        value = 50 + Math.sin(now / 8000) * 20 + Math.random() * 5
        break
      case 'ultrasonic':
        value = 50 + Math.sin(now / 5000) * 30 + Math.random() * 10
        break
      case 'light':
        value = 512 + Math.sin(now / 3000) * 300 + Math.random() * 100
        break
      case 'accelerometer':
        value = {
          x: Math.sin(now / 2000) * 2 + Math.random() * 0.5,
          y: Math.cos(now / 2000) * 2 + Math.random() * 0.5,
          z: Math.sin(now / 1500) * 1 + Math.random() * 0.3
        }
        break
      default:
        value = Math.random() * 100
    }
    
    return {
      value: value,
      unit: sensor.unit,
      timestamp: new Date().toISOString()
    }
  },

  '_simulateMotorControl': function (motor, command) {
    const result = {
      success: true,
      message: '',
      newStatus: motor.status
    }
    
    switch (command.toLowerCase()) {
      case 'start':
      case 'forward':
        result.newStatus = 'running'
        result.message = `${motor.name}を前進させました`
        break
      case 'stop':
        result.newStatus = 'stopped'
        result.message = `${motor.name}を停止しました`
        break
      case 'reverse':
      case 'backward':
        result.newStatus = 'running'
        result.message = `${motor.name}を後退させました`
        break
      case 'speed':
        const speed = parseInt(command.split(' ')[1]) || 128
        result.message = `${motor.name}の速度を${speed}に設定しました`
        break
      default:
        result.success = false
        result.message = `不明なコマンド: ${command}`
    }
    
    return result
  },

  '_getSensorStatus': function (sensor) {
    // 簡単な状態判定
    return Math.random() > 0.1 ? 'active' : 'error'
  },

  '_getMotorStatus': function (motor) {
    return Math.random() > 0.1 ? 'ready' : 'error'
  },

  '_getGPIOStatus': function (port) {
    return Math.random() > 0.05 ? 'available' : 'in_use'
  },

  '_getI2CStatus': function (device) {
    return Math.random() > 0.05 ? 'connected' : 'error'
  },

  '_getSPIStatus': function (device) {
    return Math.random() > 0.05 ? 'connected' : 'error'
  }
}

export default PluginHardwareDiscovery
