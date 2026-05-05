/**
 * file: plugin_scheduler_control.mjs
 * スケジューラー・緊急停止・システム制御プラグイン
 * This is AI modified! Advanced scheduler with emergency stop and system control
 */
import { NakoSystem } from '../core/src/plugin_api.mjs'

const PluginSchedulerControl = {
  'meta': {
    type: 'const',
    value: {
      pluginName: 'plugin_scheduler_control',
      description: 'スケジューラー・緊急停止・システム制御機能を提供するプラグイン | Advanced scheduler with emergency stop and system control',
      pluginVersion: '1.0.0',
      nakoRuntime: ['cnako', 'wnako'],
      nakoVersion: '3.6.0'
    }
  },

  // === スケジューラー初期化 ===
  'スケジューラー初期化': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      if (!this.__scheduler) {
        this.__scheduler = this._initializeScheduler()
      }
      return this.__scheduler
    }
  },

  'INITIALIZE_SCHEDULER': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['スケジューラー初期化']()
    }
  },

  // === スケジュール設定 ===
  'スケジュール設定': {
    type: 'func',
    josi: [['を', 'の'], ['に', 'で']],
    pure: true,
    fn: function (task, schedule_config) {
      const scheduler = this['スケジューラー初期化']()
      
      const schedule = {
        id: this._generateScheduleId(),
        task: task,
        config: this._parseScheduleConfig(schedule_config),
        active: true,
        created_at: new Date().toISOString(),
        last_run: null,
        run_count: 0,
        next_run: this._calculateNextRun(schedule_config)
      }
      
      scheduler.schedules.push(schedule)
      
      return {
        success: true,
        schedule_id: schedule.id,
        message: `スケジュールを設定しました: ${task}`,
        next_run: schedule.next_run,
        total_schedules: scheduler.schedules.length
      }
    }
  },

  'SET_SCHEDULE': {
    type: 'func',
    josi: [['task'], ['config']],
    pure: true,
    fn: function (task, config) {
      return this['スケジュール設定'](task, config)
    }
  },

  // === 曜日・時間指定スケジュール ===
  '曜日時間スケジュール': {
    type: 'func',
    josi: [['を'], ['曜日'], ['に'], ['時間']],
    pure: true,
    fn: function (task, weekdays, time) {
      const schedule_config = {
        type: 'weekly',
        weekdays: weekdays,
        time: time
      }
      
      return this['スケジュール設定'](task, schedule_config)
    }
  },

  'WEEKDAY_TIME_SCHEDULE': {
    type: 'func',
    josi: [['task'], ['weekdays'], ['time']],
    pure: true,
    fn: function (task, weekdays, time) {
      return this['曜日時間スケジュール'](task, weekdays, time)
    }
  },

  // === 毎日スケジュール ===
  '毎日スケジュール': {
    type: 'func',
    josi: [['を'], ['に']],
    pure: true,
    fn: function (task, time) {
      const schedule_config = {
        type: 'daily',
        time: time
      }
      
      return this['スケジュール設定'](task, schedule_config)
    }
  },

  'DAILY_SCHEDULE': {
    type: 'func',
    josi: [['task'], ['time']],
    pure: true,
    fn: function (task, time) {
      return this['毎日スケジュール'](task, time)
    }
  },

  // === 毎時スケジュール ===
  '毎時スケジュール': {
    type: 'func',
    josi: [['を'], ['分']],
    pure: true,
    fn: function (task, minute) {
      const schedule_config = {
        type: 'hourly',
        minute: minute
      }
      
      return this['スケジュール設定'](task, schedule_config)
    }
  },

  'HOURLY_SCHEDULE': {
    type: 'func',
    josi: [['task'], ['minute']],
    pure: true,
    fn: function (task, minute) {
      return this['毎時スケジュール'](task, minute)
    }
  },

  // === 間隔スケジュール ===
  '間隔スケジュール': {
    type: 'func',
    josi: [['を'], ['間隔']],
    pure: true,
    fn: function (task, interval) {
      const schedule_config = {
        type: 'interval',
        interval: this._parseInterval(interval)
      }
      
      return this['スケジュール設定'](task, schedule_config)
    }
  },

  'INTERVAL_SCHEDULE': {
    type: 'func',
    josi: [['task'], ['interval']],
    pure: true,
    fn: function (task, interval) {
      return this['間隔スケジュール'](task, interval)
    }
  },

  // === スケジュール実行 ===
  'スケジュール実行': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const scheduler = this['スケジューラー初期化']()
      const now = new Date()
      const executed = []
      
      scheduler.schedules.forEach(schedule => {
        if (this._shouldExecute(schedule, now)) {
          const execution_result = this._executeSchedule(schedule, now)
          executed.push(execution_result)
        }
      })
      
      return {
        timestamp: now.toISOString(),
        executed_count: executed.length,
        executions: executed,
        total_schedules: scheduler.schedules.length,
        active_schedules: scheduler.schedules.filter(s => s.active).length
      }
    }
  },

  'RUN_SCHEDULES': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['スケジュール実行']()
    }
  },

  // === スケジュール一覧 ===
  'スケジュール一覧': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const scheduler = this['スケジューラー初期化']()
      
      return {
        timestamp: new Date().toISOString(),
        total_schedules: scheduler.schedules.length,
        active_schedules: scheduler.schedules.filter(s => s.active).length,
        schedules: scheduler.schedules.map(schedule => ({
          id: schedule.id,
          task: schedule.task,
          config: schedule.config,
          active: schedule.active,
          created_at: schedule.created_at,
          last_run: schedule.last_run,
          run_count: schedule.run_count,
          next_run: schedule.next_run
        }))
      }
    }
  },

  'LIST_SCHEDULES': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['スケジュール一覧']()
    }
  },

  // === スケジュール削除 ===
  'スケジュール削除': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (schedule_id) {
      const scheduler = this['スケジューラー初期化']()
      const initial_count = scheduler.schedules.length
      
      scheduler.schedules = scheduler.schedules.filter(s => s.id !== schedule_id)
      
      const deleted = initial_count - scheduler.schedules.length
      
      return {
        success: deleted > 0,
        schedule_id: schedule_id,
        deleted: deleted > 0,
        message: deleted > 0 ? `スケジュール ${schedule_id} を削除しました` : `スケジュール ${schedule_id} が見つかりません`,
        remaining_schedules: scheduler.schedules.length
      }
    }
  },

  'DELETE_SCHEDULE': {
    type: 'func',
    josi: [['schedule_id']],
    pure: true,
    fn: function (schedule_id) {
      return this['スケジュール削除'](schedule_id)
    }
  },

  // === スケジュール有効・無効 ===
  'スケジュール有効化': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (schedule_id) {
      const scheduler = this['スケジューラー初期化']()
      const schedule = scheduler.schedules.find(s => s.id === schedule_id)
      
      if (schedule) {
        schedule.active = true
        return {
          success: true,
          schedule_id: schedule_id,
          message: `スケジュール ${schedule_id} を有効にしました`
        }
      } else {
        return {
          success: false,
          schedule_id: schedule_id,
          message: `スケジュール ${schedule_id} が見つかりません`
        }
      }
    }
  },

  'ENABLE_SCHEDULE': {
    type: 'func',
    josi: [['schedule_id']],
    pure: true,
    fn: function (schedule_id) {
      return this['スケジュール有効化'](schedule_id)
    }
  },

  'スケジュール無効化': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (schedule_id) {
      const scheduler = this['スケジューラー初期化']()
      const schedule = scheduler.schedules.find(s => s.id === schedule_id)
      
      if (schedule) {
        schedule.active = false
        return {
          success: true,
          schedule_id: schedule_id,
          message: `スケジュール ${schedule_id} を無効にしました`
        }
      } else {
        return {
          success: false,
          schedule_id: schedule_id,
          message: `スケジュール ${schedule_id} が見つかりません`
        }
      }
    }
  },

  'DISABLE_SCHEDULE': {
    type: 'func',
    josi: [['schedule_id']],
    pure: true,
    fn: function (schedule_id) {
      return this['スケジュール無効化'](schedule_id)
    }
  },

  // === 緊急停止 ===
  '緊急停止': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const scheduler = this['スケジューラー初期化']()
      
      // 全スケジュールを無効化
      const active_count = scheduler.schedules.filter(s => s.active).length
      scheduler.schedules.forEach(schedule => {
        schedule.active = false
      })
      
      // 緊急停止ログ
      const emergency_stop = {
        timestamp: new Date().toISOString(),
        type: 'emergency_stop',
        reason: 'manual_emergency_stop',
        stopped_schedules: active_count,
        message: '緊急停止が実行されました'
      }
      
      scheduler.emergency_stops.push(emergency_stop)
      
      return {
        success: true,
        timestamp: emergency_stop.timestamp,
        stopped_schedules: active_count,
        message: '緊急停止を実行しました',
        all_schedules_inactive: true
      }
    }
  },

  'EMERGENCY_STOP': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['緊急停止']()
    }
  },

  // === システム停止 ===
  'システム停止': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const scheduler = this['スケジューラー初期化']()
      
      // 全スケジュールを無効化
      const active_count = scheduler.schedules.filter(s => s.active).length
      scheduler.schedules.forEach(schedule => {
        schedule.active = false
      })
      
      // システム停止ログ
      const system_stop = {
        timestamp: new Date().toISOString(),
        type: 'system_stop',
        reason: 'manual_system_stop',
        stopped_schedules: active_count,
        message: 'システムが停止されました'
      }
      
      scheduler.system_stops.push(system_stop)
      
      return {
        success: true,
        timestamp: system_stop.timestamp,
        stopped_schedules: active_count,
        message: 'システムを停止しました',
        system_status: 'stopped'
      }
    }
  },

  'SYSTEM_STOP': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['システム停止']()
    }
  },

  // === システム再開 ===
  'システム再開': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const scheduler = this['スケジューラー初期化']()
      
      // 以前有効だったスケジュールを再有効化
      let reactivated_count = 0
      scheduler.schedules.forEach(schedule => {
        if (!schedule.active) {
          schedule.active = true
          reactivated_count++
        }
      })
      
      // システム再開ログ
      const system_restart = {
        timestamp: new Date().toISOString(),
        type: 'system_restart',
        reason: 'manual_system_restart',
        reactivated_schedules: reactivated_count,
        message: 'システムが再開されました'
      }
      
      scheduler.system_restarts.push(system_restart)
      
      return {
        success: true,
        timestamp: system_restart.timestamp,
        reactivated_schedules: reactivated_count,
        message: 'システムを再開しました',
        system_status: 'running'
      }
    }
  },

  'SYSTEM_RESTART': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['システム再開']()
    }
  },

  // === システム状態 ===
  'システム状態': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const scheduler = this['スケジューラー初期化']()
      
      const active_schedules = scheduler.schedules.filter(s => s.active)
      const inactive_schedules = scheduler.schedules.filter(s => !s.active)
      
      return {
        timestamp: new Date().toISOString(),
        system_status: this._getSystemStatus(scheduler),
        total_schedules: scheduler.schedules.length,
        active_schedules: active_schedules.length,
        inactive_schedules: inactive_schedules.length,
        emergency_stops: scheduler.emergency_stops.length,
        system_stops: scheduler.system_stops.length,
        system_restarts: scheduler.system_restarts.length,
        last_emergency_stop: scheduler.emergency_stops.length > 0 ? 
          scheduler.emergency_stops[scheduler.emergency_stops.length - 1].timestamp : null,
        last_system_stop: scheduler.system_stops.length > 0 ? 
          scheduler.system_stops[scheduler.system_stops.length - 1].timestamp : null,
        last_system_restart: scheduler.system_restarts.length > 0 ? 
          scheduler.system_restarts[scheduler.system_restarts.length - 1].timestamp : null
      }
    }
  },

  'SYSTEM_STATUS': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['システム状態']()
    }
  },

  // === 内部ヘルパー関数 ===
  '_initializeScheduler': function () {
    return {
      initialized: true,
      created_at: new Date().toISOString(),
      schedules: [],
      emergency_stops: [],
      system_stops: [],
      system_restarts: [],
      schedule_counter: 0
    }
  },

  '_generateScheduleId': function () {
    const scheduler = this.__scheduler
    scheduler.schedule_counter++
    return `schedule_${scheduler.schedule_counter}_${Date.now()}`
  },

  '_parseScheduleConfig': function (config) {
    if (typeof config === 'string') {
      // 文字列形式のパース
      if (config.includes('曜日')) {
        const parts = config.split('曜日')
        return {
          type: 'weekly',
          weekdays: parts[0].trim(),
          time: parts[1] ? parts[1].trim() : '09:00'
        }
      } else if (config.includes('毎日')) {
        const time = config.replace('毎日', '').trim()
        return {
          type: 'daily',
          time: time
        }
      } else if (config.includes('毎時')) {
        const minute = config.replace('毎時', '').trim()
        return {
          type: 'hourly',
          minute: parseInt(minute) || 0
        }
      } else if (config.includes('間隔')) {
        const interval = config.replace('間隔', '').trim()
        return {
          type: 'interval',
          interval: this._parseInterval(interval)
        }
      }
    }
    
    return config
  },

  '_parseInterval': function (interval) {
    if (typeof interval === 'string') {
      if (interval.includes('分')) {
        return { value: parseInt(interval), unit: 'minutes' }
      } else if (interval.includes('時間')) {
        return { value: parseInt(interval), unit: 'hours' }
      } else if (interval.includes('秒')) {
        return { value: parseInt(interval), unit: 'seconds' }
      }
    }
    
    return { value: parseInt(interval) || 60, unit: 'minutes' }
  },

  '_calculateNextRun': function (config) {
    const now = new Date()
    
    switch (config.type) {
      case 'weekly':
        return this._calculateNextWeeklyRun(config.weekdays, config.time, now)
      case 'daily':
        return this._calculateNextDailyRun(config.time, now)
      case 'hourly':
        return this._calculateNextHourlyRun(config.minute, now)
      case 'interval':
        return this._calculateNextIntervalRun(config.interval, now)
      default:
        return new Date(now.getTime() + 60000).toISOString()
    }
  },

  '_calculateNextWeeklyRun': function (weekdays, time, now) {
    const weekday_map = {
      '月': 1, '火': 2, '水': 3, '木': 4, '金': 5, '土': 6, '日': 0,
      'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4, 'friday': 5, 'saturday': 6, 'sunday': 0
    }
    
    const [hours, minutes] = time.split(':').map(Number)
    const target_weekdays = weekdays.split(',').map(w => weekday_map[w.trim().toLowerCase()])
    
    let next_date = new Date(now)
    next_date.setHours(hours, minutes, 0, 0)
    
    if (next_date <= now) {
      next_date.setDate(next_date.getDate() + 1)
    }
    
    while (!target_weekdays.includes(next_date.getDay())) {
      next_date.setDate(next_date.getDate() + 1)
    }
    
    return next_date.toISOString()
  },

  '_calculateNextDailyRun': function (time, now) {
    const [hours, minutes] = time.split(':').map(Number)
    let next_date = new Date(now)
    next_date.setHours(hours, minutes, 0, 0)
    
    if (next_date <= now) {
      next_date.setDate(next_date.getDate() + 1)
    }
    
    return next_date.toISOString()
  },

  '_calculateNextHourlyRun': function (minute, now) {
    let next_date = new Date(now)
    next_date.setMinutes(minute, 0, 0)
    
    if (next_date <= now) {
      next_date.setHours(next_date.getHours() + 1)
    }
    
    return next_date.toISOString()
  },

  '_calculateNextIntervalRun': function (interval, now) {
    const multiplier = interval.unit === 'hours' ? 3600000 : 
                     interval.unit === 'minutes' ? 60000 : 1000
    
    return new Date(now.getTime() + interval.value * multiplier).toISOString()
  },

  '_shouldExecute': function (schedule, now) {
    if (!schedule.active) return false
    
    const next_run = new Date(schedule.next_run)
    return now >= next_run
  },

  '_executeSchedule': function (schedule, now) {
    const execution = {
      schedule_id: schedule.id,
      task: schedule.task,
      executed_at: now.toISOString(),
      success: true,
      message: `タスクを実行しました: ${schedule.task}`
    }
    
    // スケジュール情報を更新
    schedule.last_run = now.toISOString()
    schedule.run_count++
    schedule.next_run = this._calculateNextRun(schedule.config)
    
    return execution
  },

  '_getSystemStatus': function (scheduler) {
    const active_schedules = scheduler.schedules.filter(s => s.active)
    
    if (active_schedules.length === 0) {
      // 最後の停止をチェック
      if (scheduler.system_stops.length > 0) {
        return 'stopped'
      } else if (scheduler.emergency_stops.length > 0) {
        return 'emergency_stopped'
      } else {
        return 'inactive'
      }
    }
    
    return 'running'
  }
}

export default PluginSchedulerControl
