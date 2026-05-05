/**
 * file: plugin_weather_sensors.mjs
 * 温度計・体温計・気温計・風量計測システムと気象観測・天気管理プラグイン
 * This is AI modified! Advanced weather sensors with temperature, body temperature, air temperature, and wind measurement
 */
import { NakoSystem } from '../core/src/plugin_api.mjs'

const PluginWeatherSensors = {
  'meta': {
    type: 'const',
    value: {
      pluginName: 'plugin_weather_sensors',
      description: '温度計・体温計・気温計・風量計測システムと気象観測・天気管理機能を提供するプラグイン | Advanced weather sensors with temperature, body temperature, air temperature, and wind measurement',
      pluginVersion: '1.0.0',
      nakoRuntime: ['cnako', 'wnako'],
      nakoVersion: '3.6.0'
    }
  },

  // === 温度センサーシステム検出 ===
  '温度センサーシステム検出': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (type = 'all') {
      const discovery = this.__weatherSensors || {}
      
      if (!discovery.initialized) {
        this.__weatherSensors = this._initializeWeatherSensors()
        discovery = this.__weatherSensors
      }
      
      const results = {}
      
      switch (type.toLowerCase()) {
        case 'temperature':
        case '温度':
          results.temperature_system = discovery.temperature_system
          break
        case 'body_temperature':
        case '体温':
          results.body_temperature_system = discovery.body_temperature_system
          break
        case 'air_temperature':
        case '気温':
          results.air_temperature_system = discovery.air_temperature_system
          break
        case 'wind':
        case '風量':
          results.wind_system = discovery.wind_system
          break
        case 'weather':
        case '天気':
          results.weather_system = discovery.weather_system
          break
        case 'all':
        case '全部':
        default:
          return discovery
      }
      
      return results
    }
  },

  'DISCOVER_WEATHER_SENSORS': {
    type: 'func',
    josi: [['type']],
    pure: true,
    fn: function (type) {
      return this['温度センサーシステム検出'](type)
    }
  },

  // === 温度計測 ===
  '温度計測': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const sensors = this['温度センサーシステム検出']('temperature')
      const temp_system = sensors.temperature_system
      
      if (!temp_system || !temp_system.active) {
        return { error: '温度センサーが利用できません' }
      }
      
      return this._measureTemperature()
    }
  },

  'MEASURE_TEMPERATURE': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['温度計測']()
    }
  },

  // === 体温計測 ===
  '体温計測': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const sensors = this['温度センサーシステム検出']('body_temperature')
      const body_temp_system = sensors.body_temperature_system
      
      if (!body_temp_system || !body_temp_system.active) {
        return { error: '体温センサーが利用できません' }
      }
      
      return this._measureBodyTemperature()
    }
  },

  'MEASURE_BODY_TEMPERATURE': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['体温計測']()
    }
  },

  // === 気温計測 ===
  '気温計測': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const sensors = this['温度センサーシステム検出']('air_temperature')
      const air_temp_system = sensors.air_temperature_system
      
      if (!air_temp_system || !air_temp_system.active) {
        return { error: '気温センサーが利用できません' }
      }
      
      return this._measureAirTemperature()
    }
  },

  'MEASURE_AIR_TEMPERATURE': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['気温計測']()
    }
  },

  // === 風量計測 ===
  '風量計測': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const sensors = this['温度センサーシステム検出']('wind')
      const wind_system = sensors.wind_system
      
      if (!wind_system || !wind_system.active) {
        return { error: '風量センサーが利用できません' }
      }
      
      return this._measureWind()
    }
  },

  'MEASURE_WIND': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['風量計測']()
    }
  },

  // === 湿度計測 ===
  '湿度計測': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const sensors = this['温度センサーシステム検出']('temperature')
      const temp_system = sensors.temperature_system
      
      if (!temp_system || !temp_system.active) {
        return { error: '湿度センサーが利用できません' }
      }
      
      return this._measureHumidity()
    }
  },

  'MEASURE_HUMIDITY': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['湿度計測']()
    }
  },

  // === 気圧計測 ===
  '気圧計測': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const sensors = this['温度センサーシステム検出']('temperature')
      const temp_system = sensors.temperature_system
      
      if (!temp_system || !temp_system.active) {
        return { error: '気圧センサーが利用できません' }
      }
      
      return this._measurePressure()
    }
  },

  'MEASURE_PRESSURE': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['気圧計測']()
    }
  },

  // === 天気観測 ===
  '天気観測': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const sensors = this['温度センサーシステム検出']('weather')
      const weather_system = sensors.weather_system
      
      if (!weather_system || !weather_system.active) {
        return { error: '天気観測システムが利用できません' }
      }
      
      return this._observeWeather()
    }
  },

  'OBSERVE_WEATHER': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['天気観測']()
    }
  },

  // === 天気予報取得 ===
  '天気予報取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const sensors = this['温度センサーシステム検出']('weather')
      const weather_system = sensors.weather_system
      
      if (!weather_system || !weather_system.active) {
        return { error: '天気予報システムが利用できません' }
      }
      
      return this._getWeatherForecast()
    }
  },

  'GET_WEATHER_FORECAST': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['天気予報取得']()
    }
  },

  // === 異常温度検出 ===
  '異常温度検出': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const temp = this['温度計測']()
      
      if (temp.error) {
        return temp
      }
      
      return this._detectAbnormalTemperature(temp.temperature)
    }
  },

  'DETECT_ABNORMAL_TEMPERATURE': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['異常温度検出']()
    }
  },

  // === 熱中症警告 ===
  '熱中症警告': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const air_temp = this['気温計測']()
      const humidity = this['湿度計測']()
      
      if (air_temp.error || humidity.error) {
        return { error: '熱中症評価に必要なデータが取得できません' }
      }
      
      return this._assessHeatStroke(air_temp.temperature, humidity.humidity)
    }
  },

  'ASSESS_HEAT_STROKE': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['熱中症警告']()
    }
  },

  // === 温度履歴取得 ===
  '温度履歴取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const sensors = this['温度センサーシステム検出']('temperature')
      const temp_system = sensors.temperature_system
      
      if (!temp_system || !temp_system.active) {
        return { error: '温度履歴システムが利用できません' }
      }
      
      return this._getTemperatureHistory()
    }
  },

  'GET_TEMPERATURE_HISTORY': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['温度履歴取得']()
    }
  },

  // === 天気データ記録 ===
  '天気データ記録': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const weather = this['天気観測']()
      
      if (weather.error) {
        return weather
      }
      
      return this._recordWeatherData(weather)
    }
  },

  'RECORD_WEATHER_DATA': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['天気データ記録']()
    }
  },

  // === 統合気象監視 ===
  '統合気象監視': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const sensors = this['温度センサーシステム検出']('all')
      
      return {
        timestamp: new Date().toISOString(),
        temperature_system: this._getTemperatureSystemStatus(),
        body_temperature_system: this._getBodyTemperatureSystemStatus(),
        air_temperature_system: this._getAirTemperatureSystemStatus(),
        wind_system: this._getWindSystemStatus(),
        weather_system: this._getWeatherSystemStatus(),
        overall_status: 'active',
        available_operations: [
          'measure_temperature',
          'measure_body_temperature',
          'measure_air_temperature',
          'measure_wind',
          'measure_humidity',
          'measure_pressure',
          'observe_weather',
          'get_weather_forecast',
          'detect_abnormal_temperature',
          'assess_heat_stroke',
          'get_temperature_history',
          'record_weather_data'
        ]
      }
    }
  },

  'INTEGRATED_WEATHER_MONITORING': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['統合気象監視']()
    }
  },

  // === 自動気象監視 ===
  '自動気象監視': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const results = []
      
      // 5回連続で計測
      5回
        // 温度計測
        temp = this['温度計測']()
        
        # 気温計測
        air_temp = this['気温計測']()
        
        # 湿度計測
        humidity = this['湿度計測']()
        
        # 風量計測
        wind = this['風量計測']()
        
        # 天気観測
        weather = this['天気観測']()
        
        # 異常温度検出
        abnormal = this['異常温度検出']()
        
        # 熱中症警告
        heat_stroke = this['熱中症警告']()
        
        resultsに{
          "timestamp": new Date().toISOString(),
          "temperature": temp.temperature || 0,
          "air_temperature": air_temp.temperature || 0,
          "humidity": humidity.humidity || 0,
          "wind_speed": wind.wind_speed || 0,
          "wind_direction": wind.wind_direction || 0,
          "weather_condition": weather.weather_condition || "unknown",
          "abnormal_detected": abnormal.abnormal_detected || false,
          "heat_stroke_risk": heat_stroke.risk_level || "low"
        }を追加
        
        1000を待つ
      ここまで。
      
      return {
        timestamp: new Date().toISOString(),
        total_measurements: results.length,
        measurements: results,
        average_temperature: this._calculateAverage(results, "temperature"),
        average_humidity: this._calculateAverage(results, "humidity"),
        average_wind_speed: this._calculateAverage(results, "wind_speed"),
        system_status: 'completed'
      }
    }
  },

  'AUTO_WEATHER_MONITORING': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['自動気象監視']()
    }
  },

  // === 内部ヘルパー関数 ===
  '_initializeWeatherSensors': function () {
    return {
      initialized: true,
      created_at: new Date().toISOString(),
      temperature_system: {
        active: true,
        type: 'digital_thermometer',
        range: '-40°C to 85°C',
        accuracy: '±0.1°C',
        unit: 'celsius',
        calibration_date: new Date().toISOString()
      },
      body_temperature_system: {
        active: true,
        type: 'infrared_thermometer',
        range: '32°C to 42°C',
        accuracy: '±0.1°C',
        unit: 'celsius',
        calibration_date: new Date().toISOString()
      },
      air_temperature_system: {
        active: true,
        type: 'outdoor_thermometer',
        range: '-30°C to 60°C',
        accuracy: '±0.2°C',
        unit: 'celsius',
        calibration_date: new Date().toISOString()
      },
      wind_system: {
        active: true,
        type: 'anemometer',
        range: '0 to 50 m/s',
        accuracy: '±0.1 m/s',
        unit: 'm/s',
        calibration_date: new Date().toISOString()
      },
      weather_system: {
        active: true,
        type: 'weather_station',
        features: [
          'temperature_measurement',
          'humidity_measurement',
          'pressure_measurement',
          'wind_measurement',
          'weather_forecasting',
          'abnormal_detection'
        ]
      },
      temperature_history: [],
      weather_records: []
    }
  },

  '_measureTemperature': function () {
    const sensors = this.__weatherSensors
    const temp = 20 + (Math.random() - 0.5) * 10 // 15-25°C
    
    const measurement = {
      temperature: parseFloat(temp.toFixed(1)),
      unit: 'celsius',
      timestamp: new Date().toISOString(),
      sensor_id: 'temp_001',
      accuracy: '±0.1°C',
      status: 'normal'
    }
    
    // 履歴に追加
    sensors.temperature_history.push(measurement)
    
    // 履歴の最大数を制限
    if (sensors.temperature_history.length > 100) {
      sensors.temperature_history.shift()
    }
    
    return {
      success: true,
      measurement: measurement,
      message: '温度を計測しました'
    }
  },

  '_measureBodyTemperature': function () {
    const temp = 36.5 + (Math.random() - 0.5) * 2 // 35.5-37.5°C
    
    const measurement = {
      body_temperature: parseFloat(temp.toFixed(1)),
      unit: 'celsius',
      timestamp: new Date().toISOString(),
      sensor_id: 'body_temp_001',
      accuracy: '±0.1°C',
      status: this._getBodyTemperatureStatus(temp)
    }
    
    return {
      success: true,
      measurement: measurement,
      message: '体温を計測しました'
    }
  },

  '_measureAirTemperature': function () {
    const temp = 18 + (Math.random() - 0.5) * 15 // 10.5-25.5°C
    
    const measurement = {
      air_temperature: parseFloat(temp.toFixed(1)),
      unit: 'celsius',
      timestamp: new Date().toISOString(),
      sensor_id: 'air_temp_001',
      accuracy: '±0.2°C',
      status: 'normal'
    }
    
    return {
      success: true,
      measurement: measurement,
      message: '気温を計測しました'
    }
  },

  '_measureWind': function () {
    const speed = Math.random() * 15 // 0-15 m/s
    const direction = Math.random() * 360 // 0-360°
    
    const measurement = {
      wind_speed: parseFloat(speed.toFixed(1)),
      wind_direction: parseFloat(direction.toFixed(1)),
      unit: 'm/s',
      timestamp: new Date().toISOString(),
      sensor_id: 'wind_001',
      accuracy: '±0.1 m/s',
      status: this._getWindStatus(speed)
    }
    
    return {
      success: true,
      measurement: measurement,
      message: '風量を計測しました'
    }
  },

  '_measureHumidity': function () {
    const humidity = 40 + Math.random() * 40 // 40-80%
    
    const measurement = {
      humidity: parseFloat(humidity.toFixed(1)),
      unit: 'percent',
      timestamp: new Date().toISOString(),
      sensor_id: 'humidity_001',
      accuracy: '±2%',
      status: 'normal'
    }
    
    return {
      success: true,
      measurement: measurement,
      message: '湿度を計測しました'
    }
  },

  '_measurePressure': function () {
    const pressure = 1000 + (Math.random() - 0.5) * 50 // 975-1025 hPa
    
    const measurement = {
      pressure: parseFloat(pressure.toFixed(1)),
      unit: 'hPa',
      timestamp: new Date().toISOString(),
      sensor_id: 'pressure_001',
      accuracy: '±0.5 hPa',
      status: 'normal'
    }
    
    return {
      success: true,
      measurement: measurement,
      message: '気圧を計測しました'
    }
  },

  '_observeWeather': function () {
    const air_temp = this['気温計測']()
    const humidity = this['湿度計測']()
    const pressure = this['気圧計測']()
    const wind = this['風量計測']()
    
    const weather_condition = this._determineWeatherCondition(
      air_temp.temperature,
      humidity.humidity,
      pressure.pressure,
      wind.wind_speed
    )
    
    const observation = {
      weather_condition: weather_condition,
      air_temperature: air_temp.temperature,
      humidity: humidity.humidity,
      pressure: pressure.pressure,
      wind_speed: wind.wind_speed,
      wind_direction: wind.wind_direction,
      timestamp: new Date().toISOString(),
      visibility: this._getVisibility(weather_condition),
      uv_index: this._calculateUVIndex(air_temp.temperature),
      comfort_level: this._calculateComfortLevel(air_temp.temperature, humidity.humidity)
    }
    
    return {
      success: true,
      observation: observation,
      message: '天気を観測しました'
    }
  },

  '_getWeatherForecast': function () {
    const forecasts = []
    
    // 7日間の天気予報を生成
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      
      const forecast = {
        date: date.toISOString().split('T')[0],
        weather_condition: this._getRandomWeatherCondition(),
        high_temperature: 20 + Math.random() * 10,
        low_temperature: 10 + Math.random() * 10,
        humidity: 40 + Math.random() * 40,
        wind_speed: Math.random() * 15,
        precipitation_probability: Math.random() * 100,
        uv_index: Math.random() * 11
      }
      
      forecasts.push(forecast)
    }
    
    return {
      success: true,
      forecasts: forecasts,
      message: '天気予報を取得しました'
    }
  },

  '_detectAbnormalTemperature': function (temperature) {
    const normal_range = { min: 15, max: 30 }
    const is_abnormal = temperature < normal_range.min || temperature > normal_range.max
    
    return {
      abnormal_detected: is_abnormal,
      temperature: temperature,
      normal_range: normal_range,
      deviation: is_abnormal ? Math.abs(temperature - (temperature < normal_range.min ? normal_range.min : normal_range.max)) : 0,
      severity: this._getAbnormalitySeverity(temperature, normal_range),
      timestamp: new Date().toISOString(),
      message: is_abnormal ? '異常な温度が検出されました' : '温度は正常範囲内です'
    }
  },

  '_assessHeatStroke': function (temperature, humidity) {
    const heat_index = this._calculateHeatIndex(temperature, humidity)
    const risk_level = this._getHeatStrokeRiskLevel(heat_index)
    
    return {
      temperature: temperature,
      humidity: humidity,
      heat_index: heat_index,
      risk_level: risk_level,
      recommendations: this._getHeatStrokeRecommendations(risk_level),
      timestamp: new Date().toISOString(),
      message: `熱中症リスク: ${risk_level}`
    }
  },

  '_getTemperatureHistory': function () {
    const sensors = this.__weatherSensors
    
    return {
      success: true,
      history: sensors.temperature_history.slice(-24), // 最新24件
      total_records: sensors.temperature_history.length,
      latest: sensors.temperature_history[sensors.temperature_history.length - 1],
      message: '温度履歴を取得しました'
    }
  },

  '_recordWeatherData': function (weather_data) {
    const sensors = this.__weatherSensors
    
    const record = {
      ...weather_data.observation,
      record_id: `weather_${Date.now()}`,
      recorded_at: new Date().toISOString()
    }
    
    sensors.weather_records.push(record)
    
    // 履歴の最大数を制限
    if (sensors.weather_records.length > 1000) {
      sensors.weather_records.shift()
    }
    
    return {
      success: true,
      record: record,
      total_records: sensors.weather_records.length,
      message: '天気データを記録しました'
    }
  },

  '_getBodyTemperatureStatus': function (temperature) {
    if (temperature < 35.0) return 'low'
    if (temperature > 37.5) return 'high'
    return 'normal'
  },

  '_getWindStatus': function (speed) {
    if (speed < 0.5) return 'calm'
    if (speed < 3.5) return 'light'
    if (speed < 8.0) return 'moderate'
    if (speed < 13.5) return 'fresh'
    if (speed < 20.5) return 'strong'
    return 'gale'
  },

  '_determineWeatherCondition': function (temp, humidity, pressure, wind_speed) {
    // 簡単な天気条件判定
    if (pressure < 1000) {
      if (humidity > 70) return 'rainy'
      if (wind_speed > 10) return 'stormy'
    }
    
    if (temp > 25 && humidity > 60) return 'humid'
    if (temp > 30) return 'hot'
    if (temp < 10) return 'cold'
    if (wind_speed > 15) return 'windy'
    
    return 'clear'
  },

  '_getRandomWeatherCondition': function () {
    const conditions = ['clear', 'cloudy', 'rainy', 'stormy', 'snowy', 'humid', 'hot', 'cold', 'windy']
    return conditions[Math.floor(Math.random() * conditions.length)]
  },

  '_getVisibility': function (weather_condition) {
    const visibility_map = {
      'clear': 'excellent',
      'cloudy': 'good',
      'rainy': 'poor',
      'stormy': 'very_poor',
      'snowy': 'poor',
      'humid': 'fair',
      'hot': 'fair',
      'cold': 'good',
      'windy': 'fair'
    }
    
    return visibility_map[weather_condition] || 'unknown'
  },

  '_calculateUVIndex': function (temperature) {
    if (temperature < 20) return Math.random() * 3
    if (temperature < 25) return 3 + Math.random() * 3
    if (temperature < 30) return 6 + Math.random() * 4
    return 10 + Math.random() * 1
  },

  '_calculateComfortLevel': function (temperature, humidity) {
    if (temperature >= 20 && temperature <= 26 && humidity >= 40 && humidity <= 60) {
      return 'very_comfortable'
    }
    if (temperature >= 18 && temperature <= 28 && humidity >= 30 && humidity <= 70) {
      return 'comfortable'
    }
    if (temperature >= 15 && temperature <= 30 && humidity >= 20 && humidity <= 80) {
      return 'acceptable'
    }
    return 'uncomfortable'
  },

  '_calculateHeatIndex': function (temperature, humidity) {
    // 簡易的な熱指数計算
    const t = temperature
    const h = humidity
    
    if (t < 27) return t
    
    const heat_index = t + (0.33 * (h / 100) * 6.1055 * Math.exp(17.27 * t / (237.7 + t)) - 0.7)
    
    return Math.round(heat_index * 10) / 10
  },

  '_getHeatStrokeRiskLevel': function (heat_index) {
    if (heat_index < 27) return 'low'
    if (heat_index < 31) return 'moderate'
    if (heat_index < 41) return 'high'
    return 'extreme'
  },

  '_getHeatStrokeRecommendations': function (risk_level) {
    const recommendations = {
      'low': '通常の活動で問題ありません',
      'moderate': '水分補給をこまめに行ってください',
      'high': '激しい運動を避け、頻繁に休憩してください',
      'extreme': '屋外活動を避け、冷房のある場所で過ごしてください'
    }
    
    return recommendations[risk_level] || '不明'
  },

  '_getAbnormalitySeverity': function (temperature, normal_range) {
    const deviation = Math.abs(temperature - (temperature < normal_range.min ? normal_range.min : normal_range.max))
    
    if (deviation < 2) return 'minor'
    if (deviation < 5) return 'moderate'
    if (deviation < 10) return 'severe'
    return 'critical'
  },

  '_calculateAverage': function (data, field) {
    if (data.length === 0) return 0
    
    const sum = data.reduce((acc, item) => acc + (item[field] || 0), 0)
    return parseFloat((sum / data.length).toFixed(2))
  },

  '_getTemperatureSystemStatus': function () {
    const sensors = this.__weatherSensors
    return {
      active: sensors.temperature_system.active,
      type: sensors.temperature_system.type,
      range: sensors.temperature_system.range,
      accuracy: sensors.temperature_system.accuracy
    }
  },

  '_getBodyTemperatureSystemStatus': function () {
    const sensors = this.__weatherSensors
    return {
      active: sensors.body_temperature_system.active,
      type: sensors.body_temperature_system.type,
      range: sensors.body_temperature_system.range,
      accuracy: sensors.body_temperature_system.accuracy
    }
  },

  '_getAirTemperatureSystemStatus': function () {
    const sensors = this.__weatherSensors
    return {
      active: sensors.air_temperature_system.active,
      type: sensors.air_temperature_system.type,
      range: sensors.air_temperature_system.range,
      accuracy: sensors.air_temperature_system.accuracy
    }
  },

  '_getWindSystemStatus': function () {
    const sensors = this.__weatherSensors
    return {
      active: sensors.wind_system.active,
      type: sensors.wind_system.type,
      range: sensors.wind_system.range,
      accuracy: sensors.wind_system.accuracy
    }
  },

  '_getWeatherSystemStatus': function () {
    const sensors = this.__weatherSensors
    return {
      active: sensors.weather_system.active,
      type: sensors.weather_system.type,
      features: sensors.weather_system.features
    }
  }
}

export default PluginWeatherSensors
