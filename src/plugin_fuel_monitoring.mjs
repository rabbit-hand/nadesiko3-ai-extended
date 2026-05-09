/**
 * file: plugin_fuel_monitoring.mjs
 * ガソリン・水素エンジン系残量監視システム
 * This is AI modified! Advanced fuel monitoring for gasoline, hydrogen, and other engine systems
 */
import { NakoSystem } from '../core/src/plugin_api.mjs'

const PluginFuelMonitoring = {
  'meta': {
    type: 'const',
    value: {
      pluginName: 'plugin_fuel_monitoring',
      description: 'ガソリン・水素エンジン系残量監視システムを提供するプラグイン | Advanced fuel monitoring for gasoline, hydrogen, and other engine systems',
      pluginVersion: '1.0.0',
      nakoRuntime: ['cnako', 'wnako'],
      nakoVersion: '3.6.0'
    }
  },

  // === 燃料システム検出 ===
  '燃料システム検出': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (type = 'all') {
      const discovery = this.__fuelSystem || {}
      
      if (!discovery.initialized) {
        this.__fuelSystem = this._initializeFuelSystem()
        discovery = this.__fuelSystem
      }
      
      const results = {}
      
      switch (type.toLowerCase()) {
        case 'gasoline':
        case 'ガソリン':
          results.gasoline_system = discovery.gasoline_system
          break
        case 'hydrogen':
        case '水素':
          results.hydrogen_system = discovery.hydrogen_system
          break
        case 'diesel':
        case 'ディーゼル':
          results.diesel_system = discovery.diesel_system
          break
        case 'electric':
        case '電気':
          results.electric_system = discovery.electric_system
          break
        case 'hybrid':
        case 'ハイブリッド':
          results.hybrid_system = discovery.hybrid_system
          break
        case 'monitoring':
        case '監視':
          results.monitoring_system = discovery.monitoring_system
          break
        case 'refueling':
        case '補給':
          results.refueling_system = discovery.refueling_system
          break
        case 'all':
        case '全部':
        default:
          return discovery
      }
      
      return results
    }
  },

  'DISCOVER_FUEL_SYSTEMS': {
    type: 'func',
    josi: [['type']],
    pure: true,
    fn: function (type) {
      return this['燃料システム検出'](type)
    }
  },

  // === ガソリン残量取得 ===
  'ガソリン残量取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const fuel = this['燃料システム検出']('gasoline')
      const gasoline_system = fuel.gasoline_system
      
      if (!gasoline_system || !gasoline_system.active) {
        return { error: 'ガソリンシステムが利用できません' }
      }
      
      return this._getGasolineLevel()
    }
  },

  'GET_GASOLINE_LEVEL': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['ガソリン残量取得']()
    }
  },

  // === 水素残量取得 ===
  '水素残量取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const fuel = this['燃料システム検出']('hydrogen')
      const hydrogen_system = fuel.hydrogen_system
      
      if (!hydrogen_system || !hydrogen_system.active) {
        return { error: '水素システムが利用できません' }
      }
      
      return this._getHydrogenLevel()
    }
  },

  'GET_HYDROGEN_LEVEL': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['水素残量取得']()
    }
  },

  // === ディーゼル残量取得 ===
  'ディーゼル残量取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const fuel = this['燃料システム検出']('diesel')
      const diesel_system = fuel.diesel_system
      
      if (!diesel_system || !diesel_system.active) {
        return { error: 'ディーゼルシステムが利用できません' }
      }
      
      return this._getDieselLevel()
    }
  },

  'GET_DIESEL_LEVEL': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['ディーゼル残量取得']()
    }
  },

  // === 電気残量取得 ===
  '電気残量取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const fuel = this['燃料システム検出']('electric')
      const electric_system = fuel.electric_system
      
      if (!electric_system || !electric_system.active) {
        return { error: '電気システムが利用できません' }
      }
      
      return this._getElectricLevel()
    }
  },

  'GET_ELECTRIC_LEVEL': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['電気残量取得']()
    }
  },

  // === ハイブリッド残量取得 ===
  'ハイブリッド残量取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const fuel = this['燃料システム検出']('hybrid')
      const hybrid_system = fuel.hybrid_system
      
      if (!hybrid_system || !hybrid_system.active) {
        return { error: 'ハイブリッドシステムが利用できません' }
      }
      
      return this._getHybridLevel()
    }
  },

  'GET_HYBRID_LEVEL': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['ハイブリッド残量取得']()
    }
  },

  // === 燃料監視開始 ===
  '燃料監視開始': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const monitoring = this['燃料システム検出']('monitoring')
      const monitoring_system = monitoring.monitoring_system
      
      if (!monitoring_system || !monitoring_system.active) {
        return { error: '監視システムが利用できません' }
      }
      
      return this._startFuelMonitoring()
    }
  },

  'START_FUEL_MONITORING': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['燃料監視開始']()
    }
  },

  // === 燃料監視停止 ===
  '燃料監視停止': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const monitoring = this['燃料システム検出']('monitoring')
      const monitoring_system = monitoring.monitoring_system
      
      if (!monitoring_system || !monitoring_system.active) {
        return { error: '監視システムが利用できません' }
      }
      
      return this._stopFuelMonitoring()
    }
  },

  'STOP_FUEL_MONITORING': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['燃料監視停止']()
    }
  },

  // === 燃料消費率計算 ===
  '燃料消費率計算': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const monitoring = this['燃料システム検出']('monitoring')
      const monitoring_system = monitoring.monitoring_system
      
      if (!monitoring_system || !monitoring_system.active) {
        return { error: '監視システムが利用できません' }
      }
      
      return this._calculateFuelConsumptionRate()
    }
  },

  'CALCULATE_FUEL_CONSUMPTION_RATE': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['燃料消費率計算']()
    }
  },

  // === 走行可能距離予測 ===
  '走行可能距離予測': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const fuel = this['燃料システム検出']('all')
      
      return this._predictDrivingRange()
    }
  },

  'PREDICT_DRIVING_RANGE': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['走行可能距離予測']()
    }
  },

  // === 補給所検索 ===
  '補給所検索': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (fuel_type = 'all') {
      const refueling = this['燃料システム検出']('refueling')
      const refueling_system = refueling.refueling_system
      
      if (!refueling_system || !refueling_system.active) {
        return { error: '補給システムが利用できません' }
      }
      
      return this._searchRefuelingStations(fuel_type)
    }
  },

  'SEARCH_REFUELING_STATIONS': {
    type: 'func',
    josi: [['fuel_type']],
    pure: true,
    fn: function (fuel_type) {
      return this['補給所検索'](fuel_type)
    }
  },

  // === 最適補給ルート計画 ===
  '最適補給ルート計画': {
    type: 'func',
    josi: [['を'], ['まで']],
    pure: true,
    fn: function (fuel_type, destination) {
      const refueling = this['燃料システム検出']('refueling')
      const refueling_system = refueling.refueling_system
      
      if (!refueling_system || !refueling_system.active) {
        return { error: '補給システムが利用できません' }
      }
      
      return this._planOptimalRefuelingRoute(fuel_type, destination)
    }
  },

  'PLAN_OPTIMAL_REFUELING_ROUTE': {
    type: 'func',
    josi: [['fuel_type'], ['destination']],
    pure: true,
    fn: function (fuel_type, destination) {
      return this['最適補給ルート計画'](fuel_type, destination)
    }
  },

  // === 燃料警告設定 ===
  '燃料警告設定': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (warnings) {
      const monitoring = this['燃料システム検出']('monitoring')
      const monitoring_system = monitoring.monitoring_system
      
      if (!monitoring_system || !monitoring_system.active) {
        return { error: '監視システムが利用できません' }
      }
      
      return this._setFuelWarnings(warnings)
    }
  },

  'SET_FUEL_WARNINGS': {
    type: 'func',
    josi: [['warnings']],
    pure: true,
    fn: function (warnings) {
      return this['燃料警告設定'](warnings)
    }
  },

  // === 燃料履歴取得 ===
  '燃料履歴取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const monitoring = this['燃料システム検出']('monitoring')
      const monitoring_system = monitoring.monitoring_system
      
      if (!monitoring_system || !monitoring_system.active) {
        return { error: '監視システムが利用できません' }
      }
      
      return this._getFuelHistory()
    }
  },

  'GET_FUEL_HISTORY': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['燃料履歴取得']()
    }
  },

  // === 燃料効率評価 ===
  '燃料効率評価': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const fuel = this['燃料システム検出']('all')
      
      return this._evaluateFuelEfficiency()
    }
  },

  'EVALUATE_FUEL_EFFICIENCY': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['燃料効率評価']()
    }
  },

  // === 統合燃料管理 ===
  '統合燃料管理': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const systems = this['燃料システム検出']('all')
      
      return {
        timestamp: new Date().toISOString(),
        gasoline_system: this._getGasolineSystemStatus(),
        hydrogen_system: this._getHydrogenSystemStatus(),
        diesel_system: this._getDieselSystemStatus(),
        electric_system: this._getElectricSystemStatus(),
        hybrid_system: this._getHybridSystemStatus(),
        monitoring_system: this._getMonitoringSystemStatus(),
        refueling_system: this._getRefuelingSystemStatus(),
        overall_status: 'active',
        available_operations: [
          'get_gasoline_level',
          'get_hydrogen_level',
          'get_diesel_level',
          'get_electric_level',
          'get_hybrid_level',
          'start_fuel_monitoring',
          'stop_fuel_monitoring',
          'calculate_fuel_consumption_rate',
          'predict_driving_range',
          'search_refueling_stations',
          'plan_optimal_refueling_route',
          'set_fuel_warnings',
          'get_fuel_history',
          'evaluate_fuel_efficiency'
        ]
      }
    }
  },

  'INTEGRATED_FUEL_MANAGEMENT': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['統合燃料管理']()
    }
  },

  // === 自動燃料監視 ===
  '自動燃料監視': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const results = []
      
      // 監視を開始
      monitoring_start = this['燃料監視開始']()
      
      // 10回連続で監視
      10回
        # 全ての燃料を計測
        gasoline = this['ガソリン残量取得']()
        hydrogen = this['水素残量取得']()
        diesel = this['ディーゼル残量取得']()
        electric = this['電気残量取得']()
        hybrid = this['ハイブリッド残量取得']()
        
        # 燃料消費率計算
        consumption_rate = this['燃料消費率計算']()
        
        # 走行可能距離予測
        driving_range = this['走行可能距離予測']()
        
        resultsに{
          "timestamp": new Date().toISOString(),
          "gasoline_level": gasoline["level"] || 0,
          "hydrogen_level": hydrogen["level"] || 0,
          "diesel_level": diesel["level"] || 0,
          "electric_level": electric["level"] || 0,
          "hybrid_level": hybrid["level"] || 0,
          "consumption_rate": consumption_rate["overall_rate"] || 0,
          "predicted_range": driving_range["total_range"] || 0,
          "warning_triggered": this._checkFuelWarnings(gasoline["level"], hydrogen["level"], diesel["level"], electric["level"], hybrid["level"])
        }を追加
        
        1000を待つ
      ここまで。
      
      return {
        timestamp: new Date().toISOString(),
        total_measurements: results.length,
        measurements: results,
        average_gasoline_level: this._calculateAverage(results, "gasoline_level"),
        average_hydrogen_level: this._calculateAverage(results, "hydrogen_level"),
        average_diesel_level: this._calculateAverage(results, "diesel_level"),
        average_electric_level: this._calculateAverage(results, "electric_level"),
        average_hybrid_level: this._calculateAverage(results, "hybrid_level"),
        system_status: 'completed'
      }
    }
  },

  'AUTO_FUEL_MONITORING': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['自動燃料監視']()
    }
  },

  // === 内部ヘルパー関数 ===
  '_initializeFuelSystem': function () {
    return {
      initialized: true,
      created_at: new Date().toISOString(),
      gasoline_system: {
        active: true,
        type: 'gasoline_engine',
        capacity: '50L',
        fuel_type: 'regular_unleaded',
        efficiency: '15km/L',
        tank_material: 'steel',
        sensor_type: 'ultrasonic',
        calibration_date: new Date().toISOString()
      },
      hydrogen_system: {
        active: true,
        type: 'hydrogen_fuel_cell',
        capacity: '5kg',
        fuel_type: 'compressed_hydrogen',
        efficiency: '100km/kg',
        tank_pressure: '700bar',
        sensor_type: 'pressure_sensor',
        calibration_date: new Date().toISOString()
      },
      diesel_system: {
        active: true,
        type: 'diesel_engine',
        capacity: '60L',
        fuel_type: 'diesel',
        efficiency: '20km/L',
        tank_material: 'steel',
        sensor_type: 'ultrasonic',
        calibration_date: new Date().toISOString()
      },
      electric_system: {
        active: true,
        type: 'electric_motor',
        capacity: '100kWh',
        fuel_type: 'electricity',
        efficiency: '6km/kWh',
        battery_type: 'lithium_ion',
        sensor_type: 'voltage_current_sensor',
        calibration_date: new Date().toISOString()
      },
      hybrid_system: {
        active: true,
        type: 'hybrid_engine',
        gasoline_capacity: '30L',
        electric_capacity: '50kWh',
        fuel_type: 'gasoline_electric',
        efficiency: '25km/L_combined',
        sensor_type: 'multi_sensor',
        calibration_date: new Date().toISOString()
      },
      monitoring_system: {
        active: true,
        monitoring_interval: 1000, // ms
        data_retention: 1000, // records
        auto_monitoring: false,
        last_update: new Date().toISOString()
      },
      refueling_system: {
        active: true,
        station_database: 'global_stations',
        route_planning: true,
        real_time_pricing: true,
        last_update: new Date().toISOString()
      },
      fuel_history: [],
      monitoring_data: []
    }
  },

  '_getGasolineLevel': function () {
    const fuel = this.__fuelSystem
    const current_level = 50 - (Math.random() * 10) // 40-50L
    
    const measurement = {
      level: parseFloat(current_level.toFixed(1)),
      capacity: fuel.gasoline_system.capacity,
      percentage: parseFloat((current_level / 50 * 100).toFixed(1)),
      temperature: 20 + (Math.random() - 0.5) * 10,
      timestamp: new Date().toISOString(),
      sensor_id: 'gasoline_001',
      accuracy: '±0.1L'
    }
    
    // 履歴に追加
    fuel.fuel_history.push({
      fuel_type: 'gasoline',
      ...measurement
    })
    
    // 履歴の最大数を制限
    if (fuel.fuel_history.length > 1000) {
      fuel.fuel_history.shift()
    }
    
    return {
      success: true,
      level: measurement.level,
      percentage: measurement.percentage,
      measurement: measurement,
      message: 'ガソリン残量を取得しました'
    }
  },

  '_getHydrogenLevel': function () {
    const fuel = this.__fuelSystem
    const current_level = 5 - (Math.random() * 2) // 3-5kg
    
    const measurement = {
      level: parseFloat(current_level.toFixed(2)),
      capacity: fuel.hydrogen_system.capacity,
      percentage: parseFloat((current_level / 5 * 100).toFixed(1)),
      pressure: 700 * (current_level / 5), // 420-700bar
      temperature: -20 + (Math.random() - 0.5) * 10, // -25 to -15°C
      timestamp: new Date().toISOString(),
      sensor_id: 'hydrogen_001',
      accuracy: '±0.01kg'
    }
    
    // 履歴に追加
    fuel.fuel_history.push({
      fuel_type: 'hydrogen',
      ...measurement
    })
    
    return {
      success: true,
      level: measurement.level,
      percentage: measurement.percentage,
      measurement: measurement,
      message: '水素残量を取得しました'
    }
  },

  '_getDieselLevel': function () {
    const fuel = this.__fuelSystem
    const current_level = 60 - (Math.random() * 15) // 45-60L
    
    const measurement = {
      level: parseFloat(current_level.toFixed(1)),
      capacity: fuel.diesel_system.capacity,
      percentage: parseFloat((current_level / 60 * 100).toFixed(1)),
      temperature: 15 + (Math.random() - 0.5) * 10,
      timestamp: new Date().toISOString(),
      sensor_id: 'diesel_001',
      accuracy: '±0.1L'
    }
    
    // 履歴に追加
    fuel.fuel_history.push({
      fuel_type: 'diesel',
      ...measurement
    })
    
    return {
      success: true,
      level: measurement.level,
      percentage: measurement.percentage,
      measurement: measurement,
      message: 'ディーゼル残量を取得しました'
    }
  },

  '_getElectricLevel': function () {
    const fuel = this.__fuelSystem
    const current_level = 100 - (Math.random() * 20) // 80-100kWh
    
    const measurement = {
      level: parseFloat(current_level.toFixed(1)),
      capacity: fuel.electric_system.capacity,
      percentage: parseFloat((current_level / 100 * 100).toFixed(1)),
      voltage: 400 + (Math.random() - 0.5) * 50, // 375-425V
      current: 0 + Math.random() * 200, // 0-200A
      temperature: 25 + (Math.random() - 0.5) * 15,
      timestamp: new Date().toISOString(),
      sensor_id: 'electric_001',
      accuracy: '±0.5kWh'
    }
    
    // 履歴に追加
    fuel.fuel_history.push({
      fuel_type: 'electric',
      ...measurement
    })
    
    return {
      success: true,
      level: measurement.level,
      percentage: measurement.percentage,
      measurement: measurement,
      message: '電気残量を取得しました'
    }
  },

  '_getHybridLevel': function () {
    const fuel = this.__fuelSystem
    const gasoline_level = 30 - (Math.random() * 8) // 22-30L
    const electric_level = 50 - (Math.random() * 10) // 40-50kWh
    
    const measurement = {
      gasoline_level: parseFloat(gasoline_level.toFixed(1)),
      electric_level: parseFloat(electric_level.toFixed(1)),
      gasoline_percentage: parseFloat((gasoline_level / 30 * 100).toFixed(1)),
      electric_percentage: parseFloat((electric_level / 50 * 100).toFixed(1)),
      combined_efficiency: 25 + (Math.random() - 0.5) * 5, // 22.5-27.5km/L
      timestamp: new Date().toISOString(),
      sensor_id: 'hybrid_001',
      accuracy: '±0.1L/±0.5kWh'
    }
    
    // 履歴に追加
    fuel.fuel_history.push({
      fuel_type: 'hybrid',
      ...measurement
    })
    
    return {
      success: true,
      gasoline_level: measurement.gasoline_level,
      electric_level: measurement.electric_level,
      measurement: measurement,
      message: 'ハイブリッド残量を取得しました'
    }
  },

  '_startFuelMonitoring': function () {
    const fuel = this.__fuelSystem
    fuel.monitoring_system.auto_monitoring = true
    fuel.monitoring_system.last_update = new Date().toISOString()
    
    return {
      success: true,
      monitoring_active: true,
      interval: fuel.monitoring_system.monitoring_interval,
      message: '燃料監視を開始しました'
    }
  },

  '_stopFuelMonitoring': function () {
    const fuel = this.__fuelSystem
    fuel.monitoring_system.auto_monitoring = false
    fuel.monitoring_system.last_update = new Date().toISOString()
    
    return {
      success: true,
      monitoring_active: false,
      message: '燃料監視を停止しました'
    }
  },

  '_calculateFuelConsumptionRate': function () {
    const fuel = this.__fuelSystem
    const history = fuel.fuel_history
    
    if (history.length < 2) {
      return {
        success: true,
        overall_rate: 0,
        rates: {},
        message: 'データが不足しています'
      }
    }
    
    const recent = history.slice(-20)
    const rates = {}
    
    // 各燃料タイプの消費率を計算
    const fuel_types = ['gasoline', 'hydrogen', 'diesel', 'electric', 'hybrid']
    
    fuel_types.forEach(type => {
      const type_history = recent.filter(h => h.fuel_type === type)
      
      if (type_history.length >= 2) {
        const first = type_history[0]
        const last = type_history[type_history.length - 1]
        
        const time_diff = (new Date(last.timestamp) - new Date(first.timestamp)) / 1000 / 60 // minutes
        let level_diff = 0
        
        if (type === 'hybrid') {
          level_diff = (first.gasoline_level - last.gasoline_level) + (first.electric_level - last.electric_level)
        } else {
          level_diff = first.level - last.level
        }
        
        rates[type] = time_diff > 0 ? (level_diff / time_diff) : 0
      }
    })
    
    // 全体消費率を計算
    const overall_rate = Object.values(rates).reduce((a, b) => a + Math.abs(b), 0) / Object.keys(rates).length
    
    return {
      success: true,
      overall_rate: parseFloat(overall_rate.toFixed(4)),
      rates: rates,
      time_period: (new Date(recent[recent.length - 1].timestamp) - new Date(recent[0].timestamp)) / 1000 / 60,
      message: '燃料消費率を計算しました'
    }
  },

  '_predictDrivingRange': function () {
    const fuel = this.__fuelSystem
    const current_levels = {
      gasoline: this._getGasolineLevel(),
      hydrogen: this._getHydrogenLevel(),
      diesel: this._getDieselLevel(),
      electric: this._getElectricLevel(),
      hybrid: this._getHybridLevel()
    }
    
    const ranges = {}
    
    // 各燃料タイプの走行可能距離を計算
    if (current_levels.gasoline.success) {
      ranges.gasoline = current_levels.gasoline.level * fuel.gasoline_system.efficiency
    }
    
    if (current_levels.hydrogen.success) {
      ranges.hydrogen = current_levels.hydrogen.level * fuel.hydrogen_system.efficiency
    }
    
    if (current_levels.diesel.success) {
      ranges.diesel = current_levels.diesel.level * fuel.diesel_system.efficiency
    }
    
    if (current_levels.electric.success) {
      ranges.electric = current_levels.electric.level * fuel.electric_system.efficiency
    }
    
    if (current_levels.hybrid.success) {
      ranges.hybrid = current_levels.hybrid.measurement.combined_efficiency * 
        Math.min(current_levels.hybrid.gasoline_level, current_levels.hybrid.electric_level * 0.6)
    }
    
    const total_range = Object.values(ranges).reduce((a, b) => a + b, 0)
    
    return {
      success: true,
      ranges: ranges,
      total_range: parseFloat(total_range.toFixed(1)),
      breakdown: {
        gasoline: ranges.gasoline || 0,
        hydrogen: ranges.hydrogen || 0,
        diesel: ranges.diesel || 0,
        electric: ranges.electric || 0,
        hybrid: ranges.hybrid || 0
      },
      message: '走行可能距離を予測しました'
    }
  },

  '_searchRefuelingStations': function (fuel_type) {
    const fuel = this.__fuelSystem
    
    // 補給所データベースをシミュレート
    const stations = [
      {
        id: 'station_001',
        name: 'ガソリンスタンドA',
        type: 'gasoline',
        location: { lat: 35.681236, lng: 139.767124 },
        distance: 2.5,
        price: 165,
        availability: '24h',
        services: ['full_service', 'car_wash', 'convenience_store']
      },
      {
        id: 'station_002',
        name: '水素ステーションB',
        type: 'hydrogen',
        location: { lat: 35.685236, lng: 139.770124 },
        distance: 5.8,
        price: 1200,
        availability: '6am-10pm',
        services: ['fast_fueling', 'pressure_testing']
      },
      {
        id: 'station_003',
        name: 'ディーゼルスタンドC',
        type: 'diesel',
        location: { lat: 35.690236, lng: 139.775124 },
        distance: 3.2,
        price: 155,
        availability: '24h',
        services: ['truck_friendly', 'rest_area']
      },
      {
        id: 'station_004',
        name: '充電ステーションD',
        type: 'electric',
        location: { lat: 35.695236, lng: 139.780124 },
        distance: 1.8,
        price: 30,
        availability: '24h',
        services: ['fast_charging', 'slow_charging', 'lounge']
      }
    ]
    
    let filtered_stations = stations
    
    if (fuel_type !== 'all') {
      filtered_stations = stations.filter(s => s.type === fuel_type)
    }
    
    return {
      success: true,
      stations: filtered_stations.sort((a, b) => a.distance - b.distance),
      total_found: filtered_stations.length,
      search_type: fuel_type,
      message: '補給所を検索しました'
    }
  },

  '_planOptimalRefuelingRoute': function (fuel_type, destination) {
    const stations = this._searchRefuelingStations(fuel_type)
    
    if (!stations.success || stations.stations.length === 0) {
      return {
        success: false,
        error: '利用可能な補給所がありません',
        message: 'ルート計画に失敗しました'
      }
    }
    
    // 最適ルートを計算（距離と価格を考慮）
    const optimal_station = stations.stations[0]
    
    const route_plan = {
      destination: destination,
      fuel_type: fuel_type,
      recommended_station: optimal_station,
      estimated_cost: optimal_station.price,
      estimated_time: optimal_station.distance * 2, // 簡易計算
      route_distance: optimal_station.distance,
      alternative_stations: stations.stations.slice(1, 3)
    }
    
    return {
      success: true,
      route_plan: route_plan,
      message: '最適補給ルートを計画しました'
    }
  },

  '_setFuelWarnings': function (warnings) {
    const fuel = this.__fuelSystem
    
    if (typeof warnings === 'object') {
      fuel.monitoring_system.warnings = {
        low_gasoline: warnings.low_gasoline || 20,
        low_hydrogen: warnings.low_hydrogen || 15,
        low_diesel: warnings.low_diesel || 25,
        low_electric: warnings.low_electric || 20,
        low_hybrid_gasoline: warnings.low_hybrid_gasoline || 15,
        low_hybrid_electric: warnings.low_hybrid_electric || 15,
        critical_gasoline: warnings.critical_gasoline || 10,
        critical_hydrogen: warnings.critical_hydrogen || 5,
        critical_diesel: warnings.critical_diesel || 15,
        critical_electric: warnings.critical_electric || 10,
        critical_hybrid_gasoline: warnings.critical_hybrid_gasoline || 8,
        critical_hybrid_electric: warnings.critical_hybrid_electric || 8
      }
    }
    
    return {
      success: true,
      warnings: fuel.monitoring_system.warnings,
      message: '燃料警告を設定しました'
    }
  },

  '_getFuelHistory': function () {
    const fuel = this.__fuelSystem
    
    return {
      success: true,
      history: fuel.fuel_history.slice(-100), // 最新100件
      total_records: fuel.fuel_history.length,
      latest_by_type: this._getLatestByFuelType(fuel.fuel_history),
      message: '燃料履歴を取得しました'
    }
  },

  '_evaluateFuelEfficiency': function () {
    const fuel = this.__fuelSystem
    const history = fuel.fuel_history.slice(-50)
    
    if (history.length < 10) {
      return {
        success: true,
        efficiency: 'insufficient_data',
        message: '評価データが不足しています'
      }
    }
    
    const efficiency_scores = {}
    const fuel_types = ['gasoline', 'hydrogen', 'diesel', 'electric', 'hybrid']
    
    fuel_types.forEach(type => {
      const type_history = history.filter(h => h.fuel_type === type)
      
      if (type_history.length >= 5) {
        const levels = type_history.map(h => h.level || (h.gasoline_level || 0))
        const avg_level = levels.reduce((a, b) => a + b, 0) / levels.length
        const min_level = Math.min(...levels)
        const max_level = Math.max(...levels)
        
        let efficiency_score = 'excellent'
        if (avg_level < 30) efficiency_score = 'poor'
        else if (avg_level < 50) efficiency_score = 'fair'
        else if (avg_level < 70) efficiency_score = 'good'
        
        efficiency_scores[type] = {
          score: efficiency_score,
          average_level: parseFloat(avg_level.toFixed(1)),
          min_level: min_level,
          max_level: max_level,
          stability: parseFloat((max_level - min_level).toFixed(1)),
          recommendations: this._getEfficiencyRecommendations(type, efficiency_score, avg_level)
        }
      }
    })
    
    return {
      success: true,
      efficiency_scores: efficiency_scores,
      overall_assessment: this._getOverallEfficiencyAssessment(efficiency_scores),
      message: '燃料効率を評価しました'
    }
  },

  '_checkFuelWarnings': function (gasoline, hydrogen, diesel, electric, hybrid_gasoline, hybrid_electric) {
    const fuel = this.__fuelSystem
    const warnings = fuel.monitoring_system.warnings || {}
    
    let triggered = false
    let warning_types = []
    
    if (gasoline <= warnings.critical_gasoline) {
      triggered = true
      warning_types.push('critical_gasoline')
    } else if (gasoline <= warnings.low_gasoline) {
      triggered = true
      warning_types.push('low_gasoline')
    }
    
    if (hydrogen <= warnings.critical_hydrogen) {
      triggered = true
      warning_types.push('critical_hydrogen')
    } else if (hydrogen <= warnings.low_hydrogen) {
      triggered = true
      warning_types.push('low_hydrogen')
    }
    
    if (diesel <= warnings.critical_diesel) {
      triggered = true
      warning_types.push('critical_diesel')
    } else if (diesel <= warnings.low_diesel) {
      triggered = true
      warning_types.push('low_diesel')
    }
    
    if (electric <= warnings.critical_electric) {
      triggered = true
      warning_types.push('critical_electric')
    } else if (electric <= warnings.low_electric) {
      triggered = true
      warning_types.push('low_electric')
    }
    
    if (hybrid_gasoline <= warnings.critical_hybrid_gasoline || hybrid_electric <= warnings.critical_hybrid_electric) {
      triggered = true
      warning_types.push('critical_hybrid')
    } else if (hybrid_gasoline <= warnings.low_hybrid_gasoline || hybrid_electric <= warnings.low_hybrid_electric) {
      triggered = true
      warning_types.push('low_hybrid')
    }
    
    return {
      triggered: triggered,
      warning_types: warning_types,
      message: triggered ? '燃料警告がトリガーされました' : '燃料レベルは正常です'
    }
  },

  '_getLatestByFuelType': function (history) {
    const latest = {}
    const fuel_types = ['gasoline', 'hydrogen', 'diesel', 'electric', 'hybrid']
    
    fuel_types.forEach(type => {
      const type_history = history.filter(h => h.fuel_type === type)
      if (type_history.length > 0) {
        const latest_record = type_history[type_history.length - 1]
        latest[type] = {
          level: latest_record.level || (latest_record.gasoline_level || 0),
          percentage: latest_record.percentage || (latest_record.gasoline_percentage || 0),
          timestamp: latest_record.timestamp
        }
      }
    })
    
    return latest
  },

  '_getEfficiencyRecommendations': function (fuel_type, efficiency_score, avg_level) {
    const recommendations = []
    
    if (efficiency_score === 'poor') {
      recommendations.push(`${fuel_type}システムの点検を推奨`)
      recommendations.push('燃料消費が異常に高いです')
    }
    
    if (avg_level < 20) {
      recommendations.push('即時補給が必要です')
      recommendations.push('最寄りの補給所を検索してください')
    }
    
    if (avg_level < 40) {
      recommendations.push('燃料効率が低下しています')
      recommendations.push('定期的なメンテナンスを実施してください')
    }
    
    if (recommendations.length === 0) {
      recommendations.push('燃料効率は良好です')
    }
    
    return recommendations
  },

  '_getOverallEfficiencyAssessment': function (efficiency_scores) {
    const scores = Object.values(efficiency_scores)
    
    if (scores.length === 0) return 'no_data'
    
    const excellent_count = scores.filter(s => s.score === 'excellent').length
    const good_count = scores.filter(s => s.score === 'good').length
    const fair_count = scores.filter(s => s.score === 'fair').length
    const poor_count = scores.filter(s => s.score === 'poor').length
    
    if (excellent_count === scores.length) return 'excellent'
    if (good_count >= scores.length * 0.7) return 'good'
    if (fair_count >= scores.length * 0.5) return 'fair'
    if (poor_count >= scores.length * 0.3) return 'poor'
    
    return 'moderate'
  },

  '_calculateAverage': function (data, field) {
    if (data.length === 0) return 0
    
    const sum = data.reduce((acc, item) => acc + (item[field] || 0), 0)
    return parseFloat((sum / data.length).toFixed(2))
  },

  '_getGasolineSystemStatus': function () {
    const fuel = this.__fuelSystem
    return {
      active: fuel.gasoline_system.active,
      type: fuel.gasoline_system.type,
      capacity: fuel.gasoline_system.capacity,
      fuel_type: fuel.gasoline_system.fuel_type,
      efficiency: fuel.gasoline_system.efficiency
    }
  },

  '_getHydrogenSystemStatus': function () {
    const fuel = this.__fuelSystem
    return {
      active: fuel.hydrogen_system.active,
      type: fuel.hydrogen_system.type,
      capacity: fuel.hydrogen_system.capacity,
      fuel_type: fuel.hydrogen_system.fuel_type,
      efficiency: fuel.hydrogen_system.efficiency
    }
  },

  '_getDieselSystemStatus': function () {
    const fuel = this.__fuelSystem
    return {
      active: fuel.diesel_system.active,
      type: fuel.diesel_system.type,
      capacity: fuel.diesel_system.capacity,
      fuel_type: fuel.diesel_system.fuel_type,
      efficiency: fuel.diesel_system.efficiency
    }
  },

  '_getElectricSystemStatus': function () {
    const fuel = this.__fuelSystem
    return {
      active: fuel.electric_system.active,
      type: fuel.electric_system.type,
      capacity: fuel.electric_system.capacity,
      fuel_type: fuel.electric_system.fuel_type,
      efficiency: fuel.electric_system.efficiency
    }
  },

  '_getHybridSystemStatus': function () {
    const fuel = this.__fuelSystem
    return {
      active: fuel.hybrid_system.active,
      type: fuel.hybrid_system.type,
      gasoline_capacity: fuel.hybrid_system.gasoline_capacity,
      electric_capacity: fuel.hybrid_system.electric_capacity,
      fuel_type: fuel.hybrid_system.fuel_type,
      efficiency: fuel.hybrid_system.efficiency
    }
  },

  '_getMonitoringSystemStatus': function () {
    const fuel = this.__fuelSystem
    return {
      active: fuel.monitoring_system.active,
      auto_monitoring: fuel.monitoring_system.auto_monitoring,
      monitoring_interval: fuel.monitoring_system.monitoring_interval,
      data_retention: fuel.monitoring_system.data_retention
    }
  },

  '_getRefuelingSystemStatus': function () {
    const fuel = this.__fuelSystem
    return {
      active: fuel.refueling_system.active,
      station_database: fuel.refueling_system.station_database,
      route_planning: fuel.refueling_system.route_planning,
      real_time_pricing: fuel.refueling_system.real_time_pricing
    }
  }
}

export default PluginFuelMonitoring
