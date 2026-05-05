/**
 * file: plugin_drone_autopilot.mjs
 * ドローン自動飛行・座標設定・目的地自動飛行プラグイン
 * This is AI modified! Advanced drone autopilot with coordinate setting and automatic destination flight
 */
import { NakoSystem } from '../core/src/plugin_api.mjs'

const PluginDroneAutopilot = {
  'meta': {
    type: 'const',
    value: {
      pluginName: 'plugin_drone_autopilot',
      description: 'ドローン自動飛行・座標設定・目的地自動飛行機能を提供するプラグイン | Advanced drone autopilot with coordinate setting and automatic destination flight',
      pluginVersion: '1.0.0',
      nakoRuntime: ['cnako', 'wnako'],
      nakoVersion: '3.6.0'
    }
  },

  // === ドローン自動操縦システム検出 ===
  'ドローン自動操縦システム検出': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (type = 'all') {
      const discovery = this.__droneAutopilot || {}
      
      if (!discovery.initialized) {
        this.__droneAutopilot = this._initializeDroneAutopilot()
        discovery = this.__droneAutopilot
      }
      
      const results = {}
      
      switch (type.toLowerCase()) {
        case 'autopilot':
        case '自動操縦':
          results.autopilot_system = discovery.autopilot_system
          break
        case 'navigation':
        case '航法':
          results.navigation_system = discovery.navigation_system
          break
        case 'coordinate':
        case '座標':
          results.coordinate_system = discovery.coordinate_system
          break
        case 'destination':
        case '目的地':
          results.destination_system = discovery.destination_system
          break
        case 'flight':
        case '飛行':
          results.flight_system = discovery.flight_system
          break
        case 'all':
        case '全部':
        default:
          return discovery
      }
      
      return results
    }
  },

  'DISCOVER_DRONE_AUTOPILOT': {
    type: 'func',
    josi: [['type']],
    pure: true,
    fn: function (type) {
      return this['ドローン自動操縦システム検出'](type)
    }
  },

  // === 座標設定 ===
  '座標設定': {
    type: 'func',
    josi: [['を'], ['に']],
    pure: true,
    fn: function (coordinate_name, coordinates) {
      const autopilot = this['ドローン自動操縦システム検出']('coordinate')
      const coord_system = autopilot.coordinate_system
      
      if (!coord_system || !coord_system.active) {
        return { error: '座標システムが利用できません' }
      }
      
      return this._setCoordinate(coordinate_name, coordinates)
    }
  },

  'SET_COORDINATE': {
    type: 'func',
    josi: [['coordinate_name'], ['coordinates']],
    pure: true,
    fn: function (coordinate_name, coordinates) {
      return this['座標設定'](coordinate_name, coordinates)
    }
  },

  // === 目的地設定 ===
  '目的地設定': {
    type: 'func',
    josi: [['を', 'に']],
    pure: true,
    fn: function (destination) {
      const autopilot = this['ドローン自動操縦システム検出']('destination')
      const dest_system = autopilot.destination_system
      
      if (!dest_system || !dest_system.active) {
        return { error: '目的地システムが利用できません' }
      }
      
      return this._setDestination(destination)
    }
  },

  'SET_DESTINATION': {
    type: 'func',
    josi: [['destination']],
    pure: true,
    fn: function (destination) {
      return this['目的地設定'](destination)
    }
  },

  // === 自動飛行開始 ===
  '自動飛行開始': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const autopilot = this['ドローン自動操縦システム検出']('flight')
      const flight_system = autopilot.flight_system
      
      if (!flight_system || !flight_system.active) {
        return { error: '飛行システムが利用できません' }
      }
      
      return this._startAutoFlight()
    }
  },

  'START_AUTO_FLIGHT': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['自動飛行開始']()
    }
  },

  // === 目的地まで自動飛行 ===
  '目的地まで自動飛行': {
    type: 'func',
    josi: [['に', 'まで']],
    pure: true,
    fn: function (destination) {
      // まず目的地を設定
      const dest_result = this['目的地設定'](destination)
      
      if (dest_result.error) {
        return dest_result
      }
      
      // 自動飛行を開始
      return this['自動飛行開始']()
    }
  },

  'AUTO_FLY_TO_DESTINATION': {
    type: 'func',
    josi: [['destination']],
    pure: true,
    fn: function (destination) {
      return this['目的地まで自動飛行'](destination)
    }
  },

  // === 航路計画 ===
  '航路計画': {
    type: 'func',
    josi: [['を'], ['から', 'に']],
    pure: true,
    fn: function (start_coord, end_coord) {
      const autopilot = this['ドローン自動操縦システム検出']('navigation')
      const nav_system = autopilot.navigation_system
      
      if (!nav_system || !nav_system.active) {
        return { error: '航法システムが利用できません' }
      }
      
      return this._planRoute(start_coord, end_coord)
    }
  },

  'PLAN_ROUTE': {
    type: 'func',
    josi: [['start_coord'], ['end_coord']],
    pure: true,
    fn: function (start_coord, end_coord) {
      return this['航路計画'](start_coord, end_coord)
    }
  },

  // === 現在位置取得 ===
  '現在位置取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const autopilot = this['ドローン自動操縦システム検出']('coordinate')
      const coord_system = autopilot.coordinate_system
      
      if (!coord_system || !coord_system.active) {
        return { error: '座標システムが利用できません' }
      }
      
      return this._getCurrentPosition()
    }
  },

  'GET_CURRENT_POSITION': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['現在位置取得']()
    }
  },

  // === 飛行状態取得 ===
  '飛行状態取得': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const autopilot = this['ドローン自動操縦システム検出']('flight')
      const flight_system = autopilot.flight_system
      
      if (!flight_system || !flight_system.active) {
        return { error: '飛行システムが利用できません' }
      }
      
      return this._getFlightStatus()
    }
  },

  'GET_FLIGHT_STATUS': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['飛行状態取得']()
    }
  },

  // === 緊急着陸 ===
  '緊急着陸': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const autopilot = this['ドローン自動操縦システム検出']('flight')
      const flight_system = autopilot.flight_system
      
      if (!flight_system || !flight_system.active) {
        return { error: '飛行システムが利用できません' }
      }
      
      return this._emergencyLanding()
    }
  },

  'EMERGENCY_LANDING': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['緊急着陸']()
    }
  },

  // === ホームリターン ===
  'ホームリターン': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const autopilot = this['ドローン自動操縦システム検出']('destination')
      const dest_system = autopilot.destination_system
      
      if (!dest_system || !dest_system.active) {
        return { error: '目的地システムが利用できません' }
      }
      
      return this._returnToHome()
    }
  },

  'RETURN_TO_HOME': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['ホームリターン']()
    }
  },

  // === 座標一覧 ===
  '座標一覧': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const autopilot = this['ドローン自動操縦システム検出']('coordinate')
      const coord_system = autopilot.coordinate_system
      
      if (!coord_system || !coord_system.active) {
        return { error: '座標システムが利用できません' }
      }
      
      return this._getCoordinateList()
    }
  },

  'GET_COORDINATE_LIST': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['座標一覧']()
    }
  },

  // === 統合自動操縦 ===
  '統合自動操縦': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const autopilot = this['ドローン自動操縦システム検出']('all')
      
      return {
        timestamp: new Date().toISOString(),
        autopilot_system: this._getAutopilotSystemStatus(),
        navigation_system: this._getNavigationSystemStatus(),
        coordinate_system: this._getCoordinateSystemStatus(),
        destination_system: this._getDestinationSystemStatus(),
        flight_system: this._getFlightSystemStatus(),
        overall_status: 'active',
        available_operations: [
          'set_coordinate',
          'set_destination',
          'auto_fly',
          'plan_route',
          'get_position',
          'get_flight_status',
          'emergency_landing',
          'return_home'
        ]
      }
    }
  },

  'INTEGRATED_AUTOPILOT': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['統合自動操縦']()
    }
  },

  // === 自動座標飛行 ===
  '自動座標飛行': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (coordinate_name) {
      const coord_list = this['座標一覧']()
      
      if (coord_list.error) {
        return coord_list
      }
      
      const coordinate = coord_list.coordinates.find(c => c.name === coordinate_name)
      
      if (!coordinate) {
        return { error: `座標「${coordinate_name}」が見つかりません` }
      }
      
      // 座標を目的地として設定して自動飛行
      return this['目的地まで自動飛行'](coordinate.coordinates)
    }
  },

  'AUTO_FLY_TO_COORDINATE': {
    type: 'func',
    josi: [['coordinate_name']],
    pure: true,
    fn: function (coordinate_name) {
      return this['自動座標飛行'](coordinate_name)
    }
  },

  // === 内部ヘルパー関数 ===
  '_initializeDroneAutopilot': function () {
    return {
      initialized: true,
      created_at: new Date().toISOString(),
      autopilot_system: {
        active: true,
        version: 'Autopilot v2.0',
        features: [
          'coordinate_setting',
          'destination_auto_flight',
          'route_planning',
          'emergency_landing',
          'return_to_home'
        ]
      },
      navigation_system: {
        active: true,
        gps_available: true,
        compass_available: true,
        barometer_available: true,
        accuracy: '±1m'
      },
      coordinate_system: {
        active: true,
        coordinate_format: 'decimal_degrees',
        saved_coordinates: [],
        max_coordinates: 100
      },
      destination_system: {
        active: true,
        current_destination: null,
        destination_history: [],
        max_history: 50
      },
      flight_system: {
        active: true,
        current_status: 'landed',
        flight_mode: 'manual',
        altitude: 0,
        speed: 0,
        battery_level: 100
      }
    }
  },

  '_setCoordinate': function (coordinate_name, coordinates) {
    const autopilot = this.__droneAutopilot
    const coord_system = autopilot.coordinate_system
    
    // 座標形式を検証
    const parsed_coords = this._parseCoordinates(coordinates)
    
    if (!parsed_coords.valid) {
      return { error: '座標形式が正しくありません', details: parsed_coords.error }
    }
    
    // 座標を保存
    const coordinate = {
      name: coordinate_name,
      coordinates: parsed_coords,
      created_at: new Date().toISOString(),
      type: 'user_defined'
    }
    
    // 既存の座標をチェック
    const existing_index = coord_system.saved_coordinates.findIndex(c => c.name === coordinate_name)
    
    if (existing_index >= 0) {
      coord_system.saved_coordinates[existing_index] = coordinate
    } else {
      coord_system.saved_coordinates.push(coordinate)
    }
    
    return {
      success: true,
      coordinate_name: coordinate_name,
      coordinates: parsed_coords,
      message: `座標「${coordinate_name}」を設定しました`,
      total_coordinates: coord_system.saved_coordinates.length
    }
  },

  '_parseCoordinates': function (coordinates) {
    // 座標形式をパース
    if (typeof coordinates === 'string') {
      // "35.681236,139.767124" 形式
      const parts = coordinates.split(',')
      if (parts.length === 2) {
        const lat = parseFloat(parts[0].trim())
        const lng = parseFloat(parts[1].trim())
        
        if (isNaN(lat) || isNaN(lng)) {
          return { valid: false, error: '数値に変換できません' }
        }
        
        if (lat < -90 || lat > 90) {
          return { valid: false, error: '緯度が範囲外です (-90〜90)' }
        }
        
        if (lng < -180 || lng > 180) {
          return { valid: false, error: '経度が範囲外です (-180〜180)' }
        }
        
        return {
          valid: true,
          latitude: lat,
          longitude: lng,
          format: 'decimal_degrees'
        }
      }
    } else if (typeof coordinates === 'object') {
      // {latitude: 35.681236, longitude: 139.767124} 形式
      if (coordinates.latitude !== undefined && coordinates.longitude !== undefined) {
        const lat = parseFloat(coordinates.latitude)
        const lng = parseFloat(coordinates.longitude)
        
        if (isNaN(lat) || isNaN(lng)) {
          return { valid: false, error: '数値に変換できません' }
        }
        
        if (lat < -90 || lat > 90) {
          return { valid: false, error: '緯度が範囲外です (-90〜90)' }
        }
        
        if (lng < -180 || lng > 180) {
          return { valid: false, error: '経度が範囲外です (-180〜180)' }
        }
        
        return {
          valid: true,
          latitude: lat,
          longitude: lng,
          format: 'object'
        }
      }
    }
    
    return { valid: false, error: '座標形式が正しくありません' }
  },

  '_setDestination': function (destination) {
    const autopilot = this.__droneAutopilot
    const dest_system = autopilot.destination_system
    
    // 目的地をパース
    const parsed_dest = this._parseDestination(destination)
    
    if (!parsed_dest.valid) {
      return { error: '目的地形式が正しくありません', details: parsed_dest.error }
    }
    
    // 現在の目的地を設定
    dest_system.current_destination = parsed_dest
    
    // 履歴に追加
    dest_system.destination_history.push({
      destination: parsed_dest,
      set_at: new Date().toISOString()
    })
    
    // 履歴の最大数を制限
    if (dest_system.destination_history.length > dest_system.max_history) {
      dest_system.destination_history.shift()
    }
    
    return {
      success: true,
      destination: parsed_dest,
      message: `目的地を設定しました: ${parsed_dest.name || parsed_dest.coordinates}`,
      destination_count: dest_system.destination_history.length
    }
  },

  '_parseDestination': function (destination) {
    // 目的地をパース
    if (typeof destination === 'string') {
      // 座標文字列の場合
      const coords = this._parseCoordinates(destination)
      if (coords.valid) {
        return {
          valid: true,
          type: 'coordinates',
          coordinates: `${coords.latitude},${coords.longitude}`,
          name: null
        }
      } else {
        // 座標名の場合
        const coord_list = this._getCoordinateList()
        if (!coord_list.error) {
          const found = coord_list.coordinates.find(c => c.name === destination)
          if (found) {
            return {
              valid: true,
              type: 'named_coordinate',
              coordinates: found.coordinates,
              name: found.name
            }
          }
        }
      }
    } else if (typeof destination === 'object') {
      // オブジェクト形式の場合
      if (destination.coordinates) {
        const coords = this._parseCoordinates(destination.coordinates)
        if (coords.valid) {
          return {
            valid: true,
            type: 'object',
            coordinates: `${coords.latitude},${coords.longitude}`,
            name: destination.name || null
          }
        }
      }
    }
    
    return { valid: false, error: '目的地を解析できません' }
  },

  '_startAutoFlight': function () {
    const autopilot = this.__droneAutopilot
    const flight_system = autopilot.flight_system
    const dest_system = autopilot.destination_system
    
    if (!dest_system.current_destination) {
      return { error: '目的地が設定されていません' }
    }
    
    // 飛行を開始
    flight_system.current_status = 'taking_off'
    flight_system.flight_mode = 'auto'
    flight_system.altitude = 10
    flight_system.speed = 5
    
    const flight_start = {
      timestamp: new Date().toISOString(),
      status: 'taking_off',
      destination: dest_system.current_destination,
      estimated_duration: this._calculateFlightDuration(dest_system.current_destination)
    }
    
    // 3秒後に飛行中に変更
    setTimeout(() => {
      flight_system.current_status = 'flying'
      flight_system.altitude = 50
      flight_system.speed = 15
    }, 3000)
    
    return {
      success: true,
      flight_start: flight_start,
      message: '自動飛行を開始しました',
      destination: dest_system.current_destination,
      estimated_duration: flight_start.estimated_duration
    }
  },

  '_planRoute': function (start_coord, end_coord) {
    const start = this._parseCoordinates(start_coord)
    const end = this._parseCoordinates(end_coord)
    
    if (!start.valid) {
      return { error: '開始座標が正しくありません' }
    }
    
    if (!end.valid) {
      return { error: '終了座標が正しくありません' }
    }
    
    // 簡単な直線航路を計算
    const distance = this._calculateDistance(start, end)
    const bearing = this._calculateBearing(start, end)
    const estimated_time = this._calculateFlightTime(distance)
    
    const route = {
      start_coordinate: start,
      end_coordinate: end,
      distance: distance,
      bearing: bearing,
      estimated_time: estimated_time,
      waypoints: this._generateWaypoints(start, end),
      created_at: new Date().toISOString()
    }
    
    return {
      success: true,
      route: route,
      message: `航路を計画しました: 距離 ${distance.toFixed(2)}m、所要時間 ${estimated_time.toFixed(1)}分`
    }
  },

  '_calculateDistance': function (start, end) {
    // Haversine formula
    const R = 6371000 // Earth's radius in meters
    const lat1_rad = start.latitude * Math.PI / 180
    const lat2_rad = end.latitude * Math.PI / 180
    const delta_lat = (end.latitude - start.latitude) * Math.PI / 180
    const delta_lng = (end.longitude - start.longitude) * Math.PI / 180
    
    const a = Math.sin(delta_lat/2) * Math.sin(delta_lat/2) +
              Math.cos(lat1_rad) * Math.cos(lat2_rad) *
              Math.sin(delta_lng/2) * Math.sin(delta_lng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    
    return R * c
  },

  '_calculateBearing': function (start, end) {
    const lat1_rad = start.latitude * Math.PI / 180
    const lat2_rad = end.latitude * Math.PI / 180
    const delta_lng = (end.longitude - start.longitude) * Math.PI / 180
    
    const y = Math.sin(delta_lng) * Math.cos(lat2_rad)
    const x = Math.cos(lat1_rad) * Math.sin(lat2_rad) -
              Math.sin(lat1_rad) * Math.cos(lat2_rad) * Math.cos(delta_lng)
    
    const bearing = Math.atan2(y, x) * 180 / Math.PI
    return (bearing + 360) % 360
  },

  '_calculateFlightTime': function (distance) {
    // 平均速度 10m/s と仮定
    const average_speed = 10 // m/s
    return distance / average_speed / 60 // minutes
  },

  '_generateWaypoints': function (start, end) {
    const distance = this._calculateDistance(start, end)
    const waypoints = []
    
    // 100mごとにウェイポイントを生成
    const waypoint_interval = 100
    const num_waypoints = Math.floor(distance / waypoint_interval)
    
    for (let i = 1; i <= num_waypoints; i++) {
      const ratio = i / (num_waypoints + 1)
      const lat = start.latitude + (end.latitude - start.latitude) * ratio
      const lng = start.longitude + (end.longitude - start.longitude) * ratio
      
      waypoints.push({
        latitude: lat,
        longitude: lng,
        altitude: 50 + Math.random() * 20, // 50-70m
        index: i
      })
    }
    
    return waypoints
  },

  '_getCurrentPosition': function () {
    const autopilot = this.__droneAutopilot
    const coord_system = autopilot.coordinate_system
    const flight_system = autopilot.flight_system
    
    // 現在位置をシミュレート
    const current_pos = {
      latitude: 35.681236 + (Math.random() - 0.5) * 0.001,
      longitude: 139.767124 + (Math.random() - 0.5) * 0.001,
      altitude: flight_system.altitude,
      accuracy: '±1m',
      timestamp: new Date().toISOString(),
      gps_satellites: 12,
      hdop: 0.8,
      vdop: 1.2
    }
    
    return {
      success: true,
      position: current_pos,
      message: '現在位置を取得しました'
    }
  },

  '_getFlightStatus': function () {
    const autopilot = this.__droneAutopilot
    const flight_system = autopilot.flight_system
    const dest_system = autopilot.destination_system
    
    return {
      success: true,
      status: {
        current_status: flight_system.current_status,
        flight_mode: flight_system.flight_mode,
        altitude: flight_system.altitude,
        speed: flight_system.speed,
        battery_level: flight_system.battery_level,
        current_destination: dest_system.current_destination,
        flight_time: flight_system.flight_time || 0,
        distance_to_destination: dest_system.current_destination ? 
          this._calculateDistance(
            this._parseCoordinates("35.681236,139.767124"),
            this._parseCoordinates(dest_system.current_destination.coordinates)
          ) : 0
      },
      timestamp: new Date().toISOString()
    }
  },

  '_emergencyLanding': function () {
    const autopilot = this.__droneAutopilot
    const flight_system = autopilot.flight_system
    
    flight_system.current_status = 'emergency_landing'
    flight_system.flight_mode = 'emergency'
    flight_system.speed = 2
    
    const emergency_landing = {
      timestamp: new Date().toISOString(),
      status: 'emergency_landing',
      reason: 'manual_emergency',
      landing_time: 'estimated_30_seconds'
    }
    
    // 5秒後に着陸完了
    setTimeout(() => {
      flight_system.current_status = 'landed'
      flight_system.altitude = 0
      flight_system.speed = 0
      flight_system.flight_mode = 'manual'
    }, 5000)
    
    return {
      success: true,
      emergency_landing: emergency_landing,
      message: '緊急着陸を開始しました'
    }
  },

  '_returnToHome': function () {
    const autopilot = this.__droneAutopilot
    const coord_system = autopilot.coordinate_system
    
    // ホーム座標（最初に保存された座標）を取得
    const home_coordinate = coord_system.saved_coordinates[0]
    
    if (!home_coordinate) {
      return { error: 'ホーム座標が設定されていません' }
    }
    
    // ホーム座標を目的地に設定して自動飛行
    return this['目的地まで自動飛行'](home_coordinate.coordinates)
  },

  '_getCoordinateList': function () {
    const autopilot = this.__droneAutopilot
    const coord_system = autopilot.coordinate_system
    
    // デフォルト座標を追加
    if (coord_system.saved_coordinates.length === 0) {
      coord_system.saved_coordinates = [
        {
          name: 'ホーム',
          coordinates: '35.681236,139.767124',
          created_at: new Date().toISOString(),
          type: 'default'
        },
        {
          name: '公園',
          coordinates: '35.685236,139.770124',
          created_at: new Date().toISOString(),
          type: 'default'
        },
        {
          name: '学校',
          coordinates: '35.675236,139.765124',
          created_at: new Date().toISOString(),
          type: 'default'
        }
      ]
    }
    
    return {
      success: true,
      coordinates: coord_system.saved_coordinates,
      total_coordinates: coord_system.saved_coordinates.length,
      message: '座標一覧を取得しました'
    }
  },

  '_calculateFlightDuration': function (destination) {
    const current_pos = this._parseCoordinates("35.681236,139.767124")
    const dest_coords = this._parseCoordinates(destination.coordinates)
    
    if (current_pos.valid && dest_coords.valid) {
      const distance = this._calculateDistance(current_pos, dest_coords)
      return this._calculateFlightTime(distance)
    }
    
    return 10 // デフォルト10分
  },

  '_getAutopilotSystemStatus': function () {
    const autopilot = this.__droneAutopilot
    return {
      active: autopilot.autopilot_system.active,
      version: autopilot.autopilot_system.version,
      features: autopilot.autopilot_system.features
    }
  },

  '_getNavigationSystemStatus': function () {
    const autopilot = this.__droneAutopilot
    return {
      active: autopilot.navigation_system.active,
      gps_available: autopilot.navigation_system.gps_available,
      compass_available: autopilot.navigation_system.compass_available,
      accuracy: autopilot.navigation_system.accuracy
    }
  },

  '_getCoordinateSystemStatus': function () {
    const autopilot = this.__droneAutopilot
    return {
      active: autopilot.coordinate_system.active,
      coordinate_format: autopilot.coordinate_system.coordinate_format,
      saved_coordinates: autopilot.coordinate_system.saved_coordinates.length
    }
  },

  '_getDestinationSystemStatus': function () {
    const autopilot = this.__droneAutopilot
    return {
      active: autopilot.destination_system.active,
      current_destination: autopilot.destination_system.current_destination,
      destination_history: autopilot.destination_system.destination_history.length
    }
  },

  '_getFlightSystemStatus': function () {
    const autopilot = this.__droneAutopilot
    return {
      active: autopilot.flight_system.active,
      current_status: autopilot.flight_system.current_status,
      flight_mode: autopilot.flight_system.flight_mode,
      altitude: autopilot.flight_system.altitude,
      speed: autopilot.flight_system.speed,
      battery_level: autopilot.flight_system.battery_level
    }
  }
}

export default PluginDroneAutopilot
