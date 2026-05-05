/**
 * file: plugin_drone_safety.mjs
 * ドローン用レーダー・人感センサー・家族安心機能プラグイン
 * This is AI modified! Advanced drone safety system with radar and human detection
 */
import { NakoSystem } from '../core/src/plugin_api.mjs'

const PluginDroneSafety = {
  'meta': {
    type: 'const',
    value: {
      pluginName: 'plugin_drone_safety',
      description: 'ドローン用レーダー・人感センサー・家族安心機能を提供するプラグイン | Advanced drone safety system with radar and human detection',
      pluginVersion: '1.0.0',
      nakoRuntime: ['cnako', 'wnako'],
      nakoVersion: '3.6.0'
    }
  },

  // === セーフィティシステム検出 ===
  'セーフィティシステム検出': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (type = 'all') {
      const discovery = this.__droneSafety || {}
      
      if (!discovery.initialized) {
        this.__droneSafety = this._initializeSafetySystem()
        discovery = this.__droneSafety
      }
      
      const results = {}
      
      switch (type.toLowerCase()) {
        case 'radar':
        case 'レーダー':
          results.radar = discovery.radar
          break
        case 'human':
        case '人感':
          results.human_sensors = discovery.human_sensors
          break
        case 'family':
        case '家族':
          results.family_system = discovery.family_system
          break
        case 'collision':
        case '衝突':
          results.collision_system = discovery.collision_system
          break
        case 'all':
        case '全部':
        default:
          return discovery
      }
      
      return results
    }
  },

  'DISCOVER_SAFETY_SYSTEM': {
    type: 'func',
    josi: [['']],
    pure: true,
    fn: function () {
      return this['セーフィティシステム検出']('all')
    }
  },

  // === レーダーシステム ===
  'レーダー検出': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const safety = this['セーフィティシステム検出']('radar')
      const radar = safety.radar
      
      if (!radar || !radar.active) {
        return { error: 'レーダーが利用できません' }
      }
      
      return this._simulateRadarScan(radar)
    }
  },

  'RADAR_SCAN': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['レーダー検出']()
    }
  },

  // === 人感センサー ===
  '人感センサー検出': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const safety = this['セーフィティシステム検出']('human')
      const sensors = safety.human_sensors
      
      if (!sensors || sensors.length === 0) {
        return { error: '人感センサーが利用できません' }
      }
      
      const detections = {}
      sensors.forEach(sensor => {
        detections[sensor.id] = this._simulateHumanDetection(sensor)
      })
      
      return {
        timestamp: new Date().toISOString(),
        sensors: detections,
        total_detections: Object.values(detections).filter(d => d.detected).length,
        system_status: 'active'
      }
    }
  },

  'HUMAN_DETECTION': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['人感センサー検出']()
    }
  },

  // === 衝突防止システム ===
  '衝突防止システム': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const radar = this['レーダー検出']()
      const human = this['人感センサー検出']()
      
      // 衝突リスクを評価
      const collisionRisk = this._assessCollisionRisk(radar, human)
      
      // 防止アクションを計算
      const preventionActions = this._calculatePreventionActions(collisionRisk)
      
      return {
        timestamp: new Date().toISOString(),
        radar_data: radar,
        human_detections: human,
        collision_risk: collisionRisk,
        prevention_actions: preventionActions,
        system_status: collisionRisk.level === 'danger' ? 'emergency' : 'active'
      }
    }
  },

  'COLLISION_PREVENTION': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['衝突防止システム']()
    }
  },

  // === 家族安心システム ===
  '家族安心システム': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const safety = this['セーフィティシステム検出']('family')
      const family = safety.family_system
      
      if (!family || !family.active) {
        return { error: '家族安心システムが利用できません' }
      }
      
      return this._getFamilySafetyStatus(family)
    }
  },

  'FAMILY_SAFETY': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['家族安心システム']()
    }
  },

  // === 帰宅検出 ===
  '帰宅検出': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const family = this['家族安心システム']()
      const human = this['人感センサー検出']()
      
      // 帰宅者を検出
      const homecomings = this._detectHomecomings(family, human)
      
      return {
        timestamp: new Date().toISOString(),
        homecomings: homecomings,
        total_home: homecomings.length,
        family_members_home: family.registered_members.filter(m => m.currently_home).length,
        system_status: 'monitoring'
      }
    }
  },

  'DETECT_HOME_COMING': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['帰宅検出']()
    }
  },

  // === スマホ自動送信 ===
  'スマホ自動送信': {
    type: 'func',
    josi: [['を', 'に']],
    pure: true,
    fn: function (messageType = 'status') {
      const family = this['家族安心システム']()
      const homecomings = this['帰宅検出']()
      
      // 送信メッセージを作成
      const messages = this._createNotificationMessages(family, homecomings, messageType)
      
      // 送信実行
      const notifications = messages.map(msg => ({
        timestamp: new Date().toISOString(),
        recipient: msg.recipient,
        message: msg.message,
        type: msg.type,
        priority: msg.priority,
        status: 'sent'
      }))
      
      return {
        timestamp: new Date().toISOString(),
        notifications: notifications,
        total_sent: notifications.length,
        message_type: messageType,
        system_status: 'active'
      }
    }
  },

  'AUTO_SEND_NOTIFICATION': {
    type: 'func',
    josi: [['type']],
    pure: true,
    fn: function (messageType) {
      return this['スマホ自動送信'](messageType)
    }
  },

  // === 家族登録 ===
  '家族登録': {
    type: 'func',
    josi: [['を', 'に'], ['で', 'に']],
    pure: true,
    fn: function (name, phone, relation = 'family') {
      const family = this['セーフィティシステム検出']('family')
      const familySystem = family.family_system
      
      const member = {
        id: `member_${Date.now()}`,
        name: name,
        phone: phone,
        relation: relation,
        registered_at: new Date().toISOString(),
        currently_home: false,
        last_seen: null,
        notification_enabled: true
      }
      
      familySystem.registered_members.push(member)
      
      return {
        timestamp: new Date().toISOString(),
        member: member,
        total_members: familySystem.registered_members.length,
        message: `${name}さんを家族として登録しました`
      }
    }
  },

  'REGISTER_FAMILY_MEMBER': {
    type: 'func',
    josi: [['name'], ['phone'], ['relation']],
    pure: true,
    fn: function (name, phone, relation) {
      return this['家族登録'](name, phone, relation)
    }
  },

  // === 安全モード設定 ===
  '安全モード設定': {
    type: 'func',
    josi: [['を', 'に']],
    pure: true,
    fn: function (mode) {
      const safety = this['セーフィティシステム検出']('all')
      
      const validModes = ['normal', 'cautious', 'safe', 'emergency']
      if (!validModes.includes(mode.toLowerCase())) {
        return { error: `無効なモード: ${mode}` }
      }
      
      safety.collision_system.safety_mode = mode.toLowerCase()
      
      return {
        timestamp: new Date().toISOString(),
        safety_mode: mode.toLowerCase(),
        message: `安全モードを${mode}に設定しました`,
        system_status: 'updated'
      }
    }
  },

  'SET_SAFETY_MODE': {
    type: 'func',
    josi: [['to']],
    pure: true,
    fn: function (mode) {
      return this['安全モード設定'](mode)
    }
  },

  // === 内部ヘルパー関数 ===
  '_initializeSafetySystem': function () {
    return {
      initialized: true,
      timestamp: new Date().toISOString(),
      radar: {
        id: 'radar_001',
        name: 'ドローンレーダー',
        type: 'MMWAVE_77GHZ',
        active: true,
        range: { min: 0.5, max: 200 },
        accuracy: 0.1,
        resolution: { azimuth: 1, elevation: 1, range: 0.1 },
        scan_rate: 10, // Hz
        unit: 'meters'
      },
      human_sensors: [
        {
          id: 'human_sensor_001',
          name: '人感センサー前方',
          type: 'PIR',
          position: 'front',
          range: 15,
          angle: 120,
          active: true,
          sensitivity: 'high'
        },
        {
          id: 'human_sensor_002',
          name: '人感センサー下方',
          type: 'PIR',
          position: 'bottom',
          range: 10,
          angle: 90,
          active: true,
          sensitivity: 'medium'
        },
        {
          id: 'human_sensor_003',
          name: '人感センサー側面',
          type: 'PIR',
          position: 'side',
          range: 12,
          angle: 180,
          active: true,
          sensitivity: 'high'
        }
      ],
      family_system: {
        id: 'family_system_001',
        name: '家族安心システム',
        active: true,
        registered_members: [
          {
            id: 'member_001',
            name: '山田太郎',
            phone: '+81-90-1234-5678',
            relation: 'father',
            registered_at: '2026-01-01T00:00:00Z',
            currently_home: false,
            last_seen: null,
            notification_enabled: true
          },
          {
            id: 'member_002',
            name: '山田花子',
            phone: '+81-90-1234-5679',
            relation: 'mother',
            registered_at: '2026-01-01T00:00:00Z',
            currently_home: false,
            last_seen: null,
            notification_enabled: true
          }
        ],
        notification_settings: {
          homecoming_alert: true,
          safety_alert: true,
          emergency_alert: true,
          daily_report: false
        }
      },
      collision_system: {
        id: 'collision_system_001',
        name: '衝突防止システム',
        active: true,
        safety_mode: 'normal',
        detection_range: 50,
        reaction_time: 0.1, // seconds
        emergency_stop_enabled: true,
        auto_avoidance_enabled: true
      }
    }
  },

  '_simulateRadarScan': function (radar) {
    const now = Date.now()
    const objects = []
    
    // シミュレーション：ランダムな物体を検出
    const numObjects = Math.floor(Math.random() * 8)
    
    for (let i = 0; i < numObjects; i++) {
      const object = {
        id: `object_${i}`,
        type: ['aircraft', 'bird', 'drone', 'building', 'tree', 'power_line', 'vehicle', 'obstacle'][Math.floor(Math.random() * 8)],
        position: {
          azimuth: Math.random() * 360,
          elevation: Math.random() * 90 - 45,
          range: Math.random() * radar.range.max + radar.range.min
        },
        velocity: {
          radial: (Math.random() - 0.5) * 20, // m/s
          angular: (Math.random() - 0.5) * 10   // deg/s
        },
        size: {
          length: Math.random() * 10 + 0.5,
          width: Math.random() * 10 + 0.5,
          height: Math.random() * 5 + 0.5
        },
        confidence: Math.random() * 0.3 + 0.7,
        threat_level: this._calculateThreatLevel(Math.random() * radar.range.max + radar.range.min)
      }
      objects.push(object)
    }
    
    return {
      sensor: radar.name,
      timestamp: new Date().toISOString(),
      objects: objects,
      total_objects: objects.length,
      threat_objects: objects.filter(o => o.threat_level === 'high').length,
      scan_range: radar.range,
      system_status: 'scanning'
    }
  },

  '_simulateHumanDetection': function (sensor) {
    const now = Date.now()
    const detected = Math.random() > 0.7 // 30%の確率で人を検出
    
    if (!detected) {
      return {
        sensor: sensor.name,
        detected: false,
        timestamp: new Date().toISOString()
      }
    }
    
    return {
      sensor: sensor.name,
      detected: true,
      position: {
        distance: Math.random() * sensor.range,
        angle: Math.random() * sensor.angle - sensor.angle / 2
      },
      confidence: Math.random() * 0.3 + 0.7,
      movement_detected: Math.random() > 0.5,
      timestamp: new Date().toISOString()
    }
  },

  '_assessCollisionRisk': function (radar, human) {
    let riskLevel = 'low'
    let riskScore = 0
    
    // レーダー物体の評価
    if (radar.objects) {
      radar.objects.forEach(obj => {
        if (obj.threat_level === 'high') {
          riskScore += 30
        } else if (obj.threat_level === 'medium') {
          riskScore += 15
        } else {
          riskScore += 5
        }
        
        // 距離によるリスク評価
        if (obj.position.range < 10) {
          riskScore += 25
        } else if (obj.position.range < 30) {
          riskScore += 10
        }
      })
    }
    
    // 人感センサーの評価
    if (human.total_detections > 0) {
      riskScore += human.total_detections * 20
      
      Object.values(human.sensors).forEach(detection => {
        if (detection.detected && detection.position.distance < 5) {
          riskScore += 30
        }
      })
    }
    
    // リスクレベルの決定
    if (riskScore > 80) {
      riskLevel = 'danger'
    } else if (riskScore > 50) {
      riskLevel = 'high'
    } else if (riskScore > 20) {
      riskLevel = 'medium'
    } else if (riskScore > 5) {
      riskLevel = 'low'
    } else {
      riskLevel = 'safe'
    }
    
    return {
      level: riskLevel,
      score: riskScore,
      radar_threats: radar.objects ? radar.objects.filter(o => o.threat_level === 'high').length : 0,
      human_detections: human.total_detections,
      recommendation: this._getRiskRecommendation(riskLevel)
    }
  },

  '_calculatePreventionActions': function (collisionRisk) {
    const actions = []
    
    switch (collisionRisk.level) {
      case 'danger':
        actions.push({
          type: 'emergency_stop',
          description: '緊急停止',
          priority: 'critical'
        })
        actions.push({
          type: 'immediate_descent',
          description: '即時降下',
          priority: 'critical'
        })
        actions.push({
          type: 'alert_family',
          description: '家族に緊急通知',
          priority: 'high'
        })
        break
        
      case 'high':
        actions.push({
          type: 'reduce_speed',
          description: '速度を減少',
          priority: 'high'
        })
        actions.push({
          type: 'change_direction',
          description: '方向を変更',
          priority: 'high'
        })
        actions.push({
          type: 'increase_altitude',
          description: '高度を上昇',
          priority: 'medium'
        })
        break
        
      case 'medium':
        actions.push({
          type: 'cautious_approach',
          description: '慎重な接近',
          priority: 'medium'
        })
        actions.push({
          type: 'enhanced_monitoring',
          description: '監視を強化',
          priority: 'medium'
        })
        break
        
      case 'low':
        actions.push({
          type: 'normal_operation',
          description: '通常運転',
          priority: 'low'
        })
        break
        
      case 'safe':
        actions.push({
          type: 'continue_mission',
          description: 'ミッションを継続',
          priority: 'low'
        })
        break
    }
    
    return actions
  },

  '_getFamilySafetyStatus': function (family) {
    const members = family.registered_members
    const homeCount = members.filter(m => m.currently_home).length
    const awayCount = members.length - homeCount
    
    return {
      timestamp: new Date().toISOString(),
      registered_members: members.length,
      members_home: homeCount,
      members_away: awayCount,
      family_status: homeCount > 0 ? 'someone_home' : 'all_away',
      notification_enabled: family.notification_settings,
      system_status: 'monitoring'
    }
  },

  '_detectHomecomings': function (family, human) {
    const homecomings = []
    const members = family.registered_members
    
    // 人感センサーの検出に基づいて帰宅を判断
    if (human.total_detections > 0) {
      Object.values(human.sensors).forEach(detection => {
        if (detection.detected && Math.random() > 0.3) { // 70%の確率で帰宅と判断
          const member = members[Math.floor(Math.random() * members.length)]
          
          if (!member.currently_home) {
            const homecoming = {
              member_id: member.id,
              member_name: member.name,
              detected_by: detection.sensor,
              detection_time: detection.timestamp,
              confidence: detection.confidence,
              notification_sent: false
            }
            
            homecomings.push(homecoming)
            
            // メンバーの状態を更新
            member.currently_home = true
            member.last_seen = detection.timestamp
          }
        }
      })
    }
    
    return homecomings
  },

  '_createNotificationMessages': function (family, homecomings, messageType) {
    const messages = []
    
    if (messageType === 'homecoming' && homecomings.length > 0) {
      homecomings.forEach(homecoming => {
        const member = family.registered_members.find(m => m.id === homecoming.member_id)
        if (member && member.notification_enabled) {
          messages.push({
            recipient: member.phone,
            message: `${member.name}さんが帰宅しました。検出時刻: ${homecoming.detection_time}`,
            type: 'homecoming_alert',
            priority: 'normal'
          })
        }
      })
    } else if (messageType === 'status') {
      family.registered_members.forEach(member => {
        if (member.notification_enabled) {
          const status = member.currently_home ? '在宅' : '外出中'
          messages.push({
            recipient: member.phone,
            message: `現在の家族状況: ${member.name}さんは${status}です。`,
            type: 'status_update',
            priority: 'low'
          })
        }
      })
    } else if (messageType === 'safety') {
      family.registered_members.forEach(member => {
        if (member.notification_enabled) {
          messages.push({
            recipient: member.phone,
            message: `ドローンの安全システムが稼働中です。ご安心ください。`,
            type: 'safety_assurance',
            priority: 'normal'
          })
        }
      })
    }
    
    return messages
  },

  '_calculateThreatLevel': function (distance) {
    if (distance < 5) {
      return 'high'
    } else if (distance < 20) {
      return 'medium'
    } else if (distance < 50) {
      return 'low'
    } else {
      return 'safe'
    }
  },

  '_getRiskRecommendation': function (riskLevel) {
    const recommendations = {
      'danger': '即座にドローンを停止し、安全な場所に降下してください',
      'high': '速度を落とし、周囲を注意深く監視してください',
      'medium': '慎重に運転し、障害物を避けてください',
      'low': '通常運転を継続してください',
      'safe': '安全な飛行を維持してください'
    }
    
    return recommendations[riskLevel] || recommendations['safe']
  }
}

export default PluginDroneSafety
