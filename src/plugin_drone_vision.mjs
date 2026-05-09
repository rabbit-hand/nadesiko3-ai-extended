/**
 * file: plugin_drone_vision.mjs
 * ドローン用複数カメラ・自動障害物回避・目標追跡機能プラグイン
 * This is AI modified! Advanced drone vision system with obstacle avoidance
 */
import { NakoSystem } from '../core/src/plugin_api.mjs'

const PluginDroneVision = {
  'meta': {
    type: 'const',
    value: {
      pluginName: 'plugin_drone_vision',
      description: 'ドローン用複数カメラ・自動障害物回避・目標追跡機能を提供するプラグイン | Advanced drone vision system with obstacle avoidance',
      pluginVersion: '1.0.0',
      nakoRuntime: ['cnako', 'wnako'],
      nakoVersion: '3.6.0'
    }
  },

  // === カメラシステム検出 ===
  'カメラシステム検出': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (type = 'all') {
      const discovery = this.__droneCameras || {}
      
      if (!discovery.initialized) {
        this.__droneCameras = this._initializeCameraSystem()
        discovery = this.__droneCameras
      }
      
      const results = {}
      
      switch (type.toLowerCase()) {
        case 'front':
        case '前面':
          results.front = discovery.front
          break
        case 'bottom':
        case '下面':
          results.bottom = discovery.bottom
          break
        case 'rear':
        case '背面':
          results.rear = discovery.rear
          break
        case 'side':
        case '側面':
          results.side = discovery.side
          break
        case 'all':
        case '全部':
        default:
          return discovery
      }
      
      return results
    }
  },

  'DISCOVER_CAMERA_SYSTEM': {
    type: 'func',
    josi: [['']],
    pure: true,
    fn: function () {
      return this['カメラシステム検出']('all')
    }
  },

  // === 障害物検出 ===
  '障害物検出': {
    type: 'func',
    josi: [['から', 'で']],
    pure: true,
    fn: function (cameraId = 'front') {
      const cameras = this['カメラシステム検出']('all')
      const camera = cameras[cameraId] || cameras.front
      
      if (!camera || !camera.active) {
        return { error: `カメラが利用できません: ${cameraId}` }
      }
      
      return this._detectObstacles(camera)
    }
  },

  'DETECT_OBSTACLES': {
    type: 'func',
    josi: [['from']],
    pure: true,
    fn: function (cameraId) {
      return this['障害物検出'](cameraId)
    }
  },

  // === 自動障害物回避 ===
  '自動障害物回避': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const cameras = this['カメラシステム検出']('all')
      const obstacles = {}
      
      // 全カメラで障害物を検出
      Object.keys(cameras).forEach(cameraId => {
        if (cameras[cameraId].active) {
          obstacles[cameraId] = this._detectObstacles(cameras[cameraId])
        }
      })
      
      // 回避戦略を計算
      const avoidanceStrategy = this._calculateAvoidanceStrategy(obstacles)
      
      return {
        timestamp: new Date().toISOString(),
        obstacles: obstacles,
        strategy: avoidanceStrategy,
        action: this._executeAvoidanceAction(avoidanceStrategy),
        safety_level: this._calculateSafetyLevel(obstacles)
      }
    }
  },

  'AUTO_AVOID_OBSTACLES': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['自動障害物回避']()
    }
  },

  // === 目標検出 ===
  '目標検出': {
    type: 'func',
    josi: [['を', 'から'], ['で', 'に']],
    pure: true,
    fn: function (targetType, cameraId = 'front') {
      const cameras = this['カメラシステム検出']('all')
      const camera = cameras[cameraId] || cameras.front
      
      if (!camera || !camera.active) {
        return { error: `カメラが利用できません: ${cameraId}` }
      }
      
      return this._detectTarget(camera, targetType)
    }
  },

  'DETECT_TARGET': {
    type: 'func',
    josi: [['type'], ['from']],
    pure: true,
    fn: function (targetType, cameraId) {
      return this['目標検出'](targetType, cameraId)
    }
  },

  // === 目標追跡 ===
  '目標追跡': {
    type: 'func',
    josi: [['を', 'に']],
    pure: true,
    fn: function (targetInfo) {
      const cameras = this['カメラシステム検出']('all')
      
      // 追跡戦略を計算
      const trackingStrategy = this._calculateTrackingStrategy(targetInfo, cameras)
      
      return {
        timestamp: new Date().toISOString(),
        target: targetInfo,
        strategy: trackingStrategy,
        action: this._executeTrackingAction(trackingStrategy),
        tracking_status: 'active'
      }
    }
  },

  'TRACK_TARGET': {
    type: 'func',
    josi: [['']],
    pure: true,
    fn: function (targetInfo) {
      return this['目標追跡'](targetInfo)
    }
  },

  // === サイズ設定 ===
  '安全距離設定': {
    type: 'func',
    josi: [['を', 'に']],
    pure: true,
    fn: function (distance) {
      this.__safetyDistance = distance
      return {
        timestamp: new Date().toISOString(),
        safety_distance: distance,
        message: `安全距離を${distance}mに設定しました`
      }
    }
  },

  'SET_SAFETY_DISTANCE': {
    type: 'func',
    josi: [['to']],
    pure: true,
    fn: function (distance) {
      return this['安全距離設定'](distance)
    }
  },

  // === ビジョン状態監視 ===
  'ビジョン状態監視': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const cameras = this['カメラシステム検出']('all')
      const obstacles = {}
      const targets = {}
      
      // 全カメラの状態を監視
      Object.keys(cameras).forEach(cameraId => {
        if (cameras[cameraId].active) {
          obstacles[cameraId] = this._detectObstacles(cameras[cameraId])
          targets[cameraId] = this._detectTargets(cameras[cameraId])
        }
      })
      
      return {
        timestamp: new Date().toISOString(),
        cameras: cameras,
        obstacles: obstacles,
        targets: targets,
        safety_level: this._calculateSafetyLevel(obstacles),
        tracking_status: this._getTrackingStatus(targets),
        system_status: 'active'
      }
    }
  },

  'MONITOR_VISION': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['ビジョン状態監視']()
    }
  },

  // === 画像処理 ===
  '画像処理': {
    type: 'func',
    josi: [['を', 'から'], ['で', 'に']],
    pure: true,
    fn: function (cameraId, processingType) {
      const cameras = this['カメラシステム検出']('all')
      const camera = cameras[cameraId] || cameras.front
      
      if (!camera || !camera.active) {
        return { error: `カメラが利用できません: ${cameraId}` }
      }
      
      return this._processImage(camera, processingType)
    }
  },

  'PROCESS_IMAGE': {
    type: 'func',
    josi: [['from'], ['with']],
    pure: true,
    fn: function (cameraId, processingType) {
      return this['画像処理'](cameraId, processingType)
    }
  },

  // === 内部ヘルパー関数 ===
  '_initializeCameraSystem': function () {
    return {
      initialized: true,
      timestamp: new Date().toISOString(),
      front: {
        id: 'camera_front',
        name: '前面カメラ',
        type: '4K',
        resolution: { width: 3840, height: 2160 },
        fov: 120, // 視野角
        active: true,
        position: 'front'
      },
      bottom: {
        id: 'camera_bottom',
        name: '下面カメラ',
        type: 'HD',
        resolution: { width: 1920, height: 1080 },
        fov: 90,
        active: true,
        position: 'bottom'
      },
      rear: {
        id: 'camera_rear',
        name: '背面カメラ',
        type: 'HD',
        resolution: { width: 1920, height: 1080 },
        fov: 90,
        active: true,
        position: 'rear'
      },
      side: {
        id: 'camera_side',
        name: '側面カメラ',
        type: 'HD',
        resolution: { width: 1920, height: 1080 },
        fov: 120,
        active: true,
        position: 'side'
      }
    }
  },

  '_detectObstacles': function (camera) {
    const now = Date.now()
    const obstacles = []
    
    // シミュレーション：ランダムな障害物を生成
    const numObstacles = Math.floor(Math.random() * 5)
    
    for (let i = 0; i < numObstacles; i++) {
      const obstacle = {
        id: `obstacle_${i}`,
        type: ['building', 'tree', 'bird', 'drone', 'power_line'][Math.floor(Math.random() * 5)],
        position: {
          x: Math.random() * 100 - 50, // -50m to 50m
          y: Math.random() * 100 - 50,
          z: Math.random() * 50 - 25   // -25m to 25m
        },
        distance: Math.random() * 30 + 5, // 5m to 35m
        size: {
          width: Math.random() * 5 + 1,  // 1m to 6m
          height: Math.random() * 10 + 2, // 2m to 12m
          depth: Math.random() * 5 + 1   // 1m to 6m
        },
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
          z: (Math.random() - 0.5) * 1
        },
        confidence: Math.random() * 0.3 + 0.7, // 0.7 to 1.0
        timestamp: new Date().toISOString()
      }
      obstacles.push(obstacle)
    }
    
    return {
      camera: camera.name,
      timestamp: new Date().toISOString(),
      obstacles: obstacles,
      total_count: obstacles.length,
      critical_obstacles: obstacles.filter(o => o.distance < 10).length,
      safe_distance: this.__safetyDistance || 5
    }
  },

  '_detectTarget': function (camera, targetType) {
    const targetTypes = {
      'person': { color: 'red', size: { width: 0.5, height: 1.7 } },
      'vehicle': { color: 'blue', size: { width: 2, height: 1.5 } },
      'building': { color: 'gray', size: { width: 10, height: 20 } },
      'marker': { color: 'yellow', size: { width: 0.3, height: 0.3 } },
      'landing_pad': { color: 'green', size: { width: 2, height: 2 } }
    }
    
    const targetInfo = targetTypes[targetType.toLowerCase()] || targetTypes['marker']
    
    // シミュレーション：目標を検出
    const detected = Math.random() > 0.3 // 70%の確率で検出
    
    if (!detected) {
      return {
        camera: camera.name,
        target_type: targetType,
        detected: false,
        timestamp: new Date().toISOString()
      }
    }
    
    return {
      camera: camera.name,
      target_type: targetType,
      detected: true,
      position: {
        x: Math.random() * 50 - 25,
        y: Math.random() * 50 - 25,
        z: Math.random() * 20 - 10
      },
      distance: Math.random() * 40 + 10,
      size: targetInfo.size,
      confidence: Math.random() * 0.3 + 0.7,
      color: targetInfo.color,
      timestamp: new Date().toISOString()
    }
  },

  '_detectTargets': function (camera) {
    const targetTypes = ['person', 'vehicle', 'building', 'marker']
    const targets = []
    
    targetTypes.forEach(type => {
      const detection = this._detectTarget(camera, type)
      if (detection.detected) {
        targets.push(detection)
      }
    })
    
    return targets
  },

  '_calculateAvoidanceStrategy': function (obstacles) {
    const criticalObstacles = []
    const warningObstacles = []
    
    Object.values(obstacles).forEach(cameraData => {
      if (cameraData.obstacles) {
        cameraData.obstacles.forEach(obstacle => {
          if (obstacle.distance < (this.__safetyDistance || 5)) {
            criticalObstacles.push(obstacle)
          } else if (obstacle.distance < 15) {
            warningObstacles.push(obstacle)
          }
        })
      }
    })
    
    let strategy = {
      level: 'safe',
      action: 'continue',
      direction: 'none',
      speed: 'normal',
      altitude_change: 0
    }
    
    if (criticalObstacles.length > 0) {
      strategy.level = 'critical'
      strategy.action = 'emergency_stop'
      strategy.speed = 'stop'
      
      // 最も安全な回避方向を計算
      const directions = ['left', 'right', 'up', 'down', 'back']
      let safestDirection = 'left'
      let maxClearance = 0
      
      directions.forEach(dir => {
        const clearance = this._calculateDirectionClearance(obstacles, dir)
        if (clearance > maxClearance) {
          maxClearance = clearance
          safestDirection = dir
        }
      })
      
      strategy.direction = safestDirection
      strategy.altitude_change = safestDirection === 'up' ? 5 : (safestDirection === 'down' ? -3 : 0)
      
    } else if (warningObstacles.length > 0) {
      strategy.level = 'warning'
      strategy.action = 'cautious_proceed'
      strategy.speed = 'slow'
      
      // 緩やかな方向変更
      strategy.direction = 'slight_right'
      strategy.altitude_change = 2
    }
    
    return strategy
  },

  '_calculateDirectionClearance': function (obstacles, direction) {
    let clearance = 100 // 最大クリアランス
    
    Object.values(obstacles).forEach(cameraData => {
      if (cameraData.obstacles) {
        cameraData.obstacles.forEach(obstacle => {
          // 方向に応じたクリアランスを計算
          let obstacleClearance = 0
          switch (direction) {
            case 'left':
              obstacleClearance = obstacle.position.x + obstacle.distance
              break
            case 'right':
              obstacleClearance = obstacle.distance - obstacle.position.x
              break
            case 'up':
              obstacleClearance = obstacle.position.z + obstacle.distance
              break
            case 'down':
              obstacleClearance = obstacle.distance - obstacle.position.z
              break
            case 'back':
              obstacleClearance = obstacle.distance - obstacle.position.y
              break
          }
          
          clearance = Math.min(clearance, obstacleClearance)
        })
      }
    })
    
    return clearance
  },

  '_executeAvoidanceAction': function (strategy) {
    const action = {
      timestamp: new Date().toISOString(),
      strategy: strategy,
      commands: []
    }
    
    switch (strategy.action) {
      case 'emergency_stop':
        action.commands.push({
          type: 'stop',
          description: '緊急停止'
        })
        action.commands.push({
          type: 'hover',
          description: 'ホバリング'
        })
        break
      case 'cautious_proceed':
        action.commands.push({
          type: 'reduce_speed',
          description: '速度を減少'
        })
        action.commands.push({
          type: 'direction_change',
          direction: strategy.direction,
          description: `${strategy.direction}に方向変更`
        })
        if (strategy.altitude_change !== 0) {
          action.commands.push({
            type: 'altitude_change',
            altitude: strategy.altitude_change,
            description: `高度を${strategy.altitude_change}m変更`
          })
        }
        break
      case 'continue':
        action.commands.push({
          type: 'continue',
          description: '通常飛行継続'
        })
        break
    }
    
    return action
  },

  '_calculateTrackingStrategy': function (targetInfo, cameras) {
    return {
      target: targetInfo,
      cameras: Object.keys(cameras).filter(id => cameras[id].active),
      strategy: 'visual_tracking',
      priority: 'high',
      tracking_mode: 'continuous',
      update_rate: 30, // Hz
      prediction_enabled: true,
      obstacle_aware: true
    }
  },

  '_executeTrackingAction': function (strategy) {
    return {
      timestamp: new Date().toISOString(),
      tracking_active: true,
      target_locked: true,
      cameras_in_use: strategy.cameras,
      tracking_commands: [
        {
          type: 'align',
          description: '目標にカメラを向ける'
        },
        {
          type: 'maintain_distance',
          distance: strategy.target.distance,
          description: '目標距離を維持'
        },
        {
          type: 'follow',
          description: '目標を追跡'
        }
      ]
    }
  },

  '_calculateSafetyLevel': function (obstacles) {
    let criticalCount = 0
    let warningCount = 0
    
    Object.values(obstacles).forEach(cameraData => {
      if (cameraData.obstacles) {
        cameraData.obstacles.forEach(obstacle => {
          if (obstacle.distance < (this.__safetyDistance || 5)) {
            criticalCount++
          } else if (obstacle.distance < 15) {
            warningCount++
          }
        })
      }
    })
    
    if (criticalCount > 0) {
      return 'danger'
    } else if (warningCount > 2) {
      return 'warning'
    } else if (warningCount > 0) {
      return 'caution'
    } else {
      return 'safe'
    }
  },

  '_getTrackingStatus': function (targets) {
    let activeTracking = 0
    let lockedTargets = 0
    
    Object.values(targets).forEach(cameraTargets => {
      if (Array.isArray(cameraTargets)) {
        cameraTargets.forEach(target => {
          if (target.detected) {
            activeTracking++
            if (target.confidence > 0.8) {
              lockedTargets++
            }
          }
        })
      }
    })
    
    return {
      active_tracking: activeTracking,
      locked_targets: lockedTargets,
      tracking_quality: lockedTargets > 0 ? 'excellent' : (activeTracking > 0 ? 'good' : 'none')
    }
  },

  '_processImage': function (camera, processingType) {
    const processingTypes = {
      'edge_detection': 'エッジ検出',
      'object_detection': '物体検出',
      'face_detection': '顔検出',
      'motion_detection': '動き検出',
      'color_analysis': '色解析',
      'depth_analysis': '深度解析'
    }
    
    const processName = processingTypes[processingType] || processingType
    
    return {
      camera: camera.name,
      processing_type: processingType,
      processing_name: processName,
      timestamp: new Date().toISOString(),
      result: 'success',
      confidence: Math.random() * 0.3 + 0.7,
      processed_data: {
        width: camera.resolution.width,
        height: camera.resolution.height,
        processing_time: Math.random() * 100 + 50 // ms
      }
    }
  }
}

export default PluginDroneVision
