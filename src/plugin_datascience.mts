/**
 * file: plugin_datascience.mts
 * データサイエンス機能プラグイン
 * This is AI modified! Complete data science functionality for Nadesiko3
 */
import { NakoSystem } from '../core/src/plugin_api.mjs'

const PluginDataScience = {
  'meta': {
    type: 'const',
    value: {
      pluginName: 'plugin_datascience',
      description: 'データサイエンス機能を提供するプラグイン | Data science functionality',
      pluginVersion: '1.0.0',
      nakoRuntime: ['cnako', 'wnako'],
      nakoVersion: '3.6.0'
    }
  },

  // === NumPy風配列操作 ===
  '配列作成': {
    type: 'func',
    josi: [['の'], ['から']],
    pure: true,
    fn: function(data: any) {
      if (typeof data === 'number') {
        return Array(data).fill(0)
      }
      if (Array.isArray(data)) {
        return data.slice()
      }
      return [data]
    }
  },

  '配列形状': {
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function(arr: any) {
      if (!Array.isArray(arr)) return []
      const shape = []
      let current = arr
      while (Array.isArray(current)) {
        shape.push(current.length)
        current = current[0]
      }
      return shape
    }
  },

  '配列変形': {
    type: 'func',
    josi: [['を'], ['に']],
    pure: true,
    fn: function(arr: any, shape: any): any {
      if (!Array.isArray(arr) || !Array.isArray(shape)) return arr
      
      const flat = arr.flat(Infinity)
      const result = PluginDataScience._reshapeArray.fn(flat, shape)
      return result
    }
  },

  'ゼロ配列': {
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function(shape: any) {
      if (typeof shape === 'number') {
        return Array(shape).fill(0)
      }
      if (Array.isArray(shape)) {
        return PluginDataScience._createZeroArray.fn(shape)
      }
      return [0]
    }
  },

  '単位行列': {
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function(n: number) {
      const result = Array(n).fill(null).map(() => Array(n).fill(0))
      for (let i = 0; i < n; i++) {
        result[i][i] = 1
      }
      return result
    }
  },

  '配列1埋': {
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function(size: number) {
      return Array(size).fill(1)
    }
  },

  '範囲配列': {
    type: 'func',
    josi: [['から'], ['まで']],
    pure: true,
    fn: function(start: number, end: number) {
      const result = []
      for (let i = start; i <= end; i++) {
        result.push(i)
      }
      return result
    }
  },

  '配列リサイズ': {
    type: 'func',
    josi: [['を'], ['に']],
    pure: true,
    fn: function(arr: any[], size: number) {
      if (!Array.isArray(arr)) return arr
      const result = arr.slice()
      if (result.length < size) {
        return result.concat(Array(size - result.length).fill(0))
      } else {
        return result.slice(0, size)
      }
    }
  },

  '配列連結': {
    type: 'func',
    josi: [['と'], ['を']],
    pure: true,
    fn: function(arr1: any[], arr2: any[]) {
      if (!Array.isArray(arr1) || !Array.isArray(arr2)) return arr1
      return arr1.concat(arr2)
    }
  },

  '合計': {
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function(arr: any) {
      if (!Array.isArray(arr)) return arr
      return arr.reduce((sum, val) => sum + (Array.isArray(val) ? PluginDataScience['合計'].fn(val) : val), 0)
    }
  },

  '平均': {
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function(arr: any) {
      if (!Array.isArray(arr)) return arr
      const flat = arr.flat(Infinity)
      if (flat.length === 0) return 0
      return flat.reduce((sum, val) => sum + val, 0) / flat.length
    }
  },

  '最大値': {
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function(arr: any) {
      if (!Array.isArray(arr)) return arr
      const flat = arr.flat(Infinity)
      return Math.max(...flat)
    }
  },

  '最小値': {
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function(arr: any) {
      if (!Array.isArray(arr)) return arr
      const flat = arr.flat(Infinity)
      return Math.min(...flat)
    }
  },

  '標準偏差': {
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function(arr: any) {
      if (!Array.isArray(arr)) return 0
      const flat = arr.flat(Infinity)
      if (flat.length === 0) return 0
      
      const mean = flat.reduce((sum, val) => sum + val, 0) / flat.length
      const variance = flat.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / flat.length
      return Math.sqrt(variance)
    }
  },

  '分散': {
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function(arr: any) {
      if (!Array.isArray(arr)) return 0
      const flat = arr.flat(Infinity)
      if (flat.length === 0) return 0
      
      const mean = flat.reduce((sum, val) => sum + val, 0) / flat.length
      return flat.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / flat.length
    }
  },

  '配列要素積': {
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function(arr: any) {
      if (!Array.isArray(arr)) return arr
      const flat = arr.flat(Infinity)
      return flat.reduce((product, val) => product * val, 1)
    }
  },

  '配列累積和': {
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function(arr: any) {
      if (!Array.isArray(arr)) return arr
      const result = []
      let sum = 0
      for (const val of arr) {
        sum += val
        result.push(sum)
      }
      return result
    }
  },

  '配列ソート': {
    type: 'func',
    josi: [['を'], ['で']],
    pure: true,
    fn: function(arr: any[], order?: number) {
      if (!Array.isArray(arr)) return arr
      const result = arr.slice()
      if (order === 0) {
        result.sort((a, b) => b - a)
      } else {
        result.sort((a, b) => a - b)
      }
      return result
    }
  },

  '中央値': {
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function(arr: any) {
      if (!Array.isArray(arr)) return arr
      const flat = arr.flat(Infinity).sort((a, b) => a - b)
      const n = flat.length
      if (n === 0) return 0
      if (n % 2 === 1) {
        return flat[Math.floor(n / 2)]
      } else {
        return (flat[n / 2 - 1] + flat[n / 2]) / 2
      }
    }
  },

  // === 既存の数学関数 ===
  'データの合計': {
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function(arr: any) {
      if (!Array.isArray(arr)) return arr
      return arr.reduce((sum, val) => sum + (Array.isArray(val) ? PluginDataScience['データの合計'].fn(val) : val), 0)
    }
  },

  'データの平均': {
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function(arr: any) {
      if (!Array.isArray(arr)) return arr
      const flat = arr.flat(Infinity)
      if (flat.length === 0) return 0
      return flat.reduce((sum, val) => sum + val, 0) / flat.length
    }
  },

  'データの最大値': {
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function(arr: any) {
      if (!Array.isArray(arr)) return arr
      const flat = arr.flat(Infinity)
      return Math.max(...flat)
    }
  },

  'データの最小値': {
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function(arr: any) {
      if (!Array.isArray(arr)) return arr
      const flat = arr.flat(Infinity)
      return Math.min(...flat)
    }
  },

  'データの標準偏差': {
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function(arr: any) {
      if (!Array.isArray(arr)) return 0
      const flat = arr.flat(Infinity)
      if (flat.length === 0) return 0
      
      const mean = flat.reduce((sum, val) => sum + val, 0) / flat.length
      const variance = flat.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / flat.length
      return Math.sqrt(variance)
    }
  },

  '最頻値': {
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function(arr: any) {
      if (!Array.isArray(arr)) return 0
      const flat = arr.flat(Infinity)
      if (flat.length === 0) return 0
      
      const frequency: { [key: string]: number } = {}
      flat.forEach((val: any) => { frequency[String(val)] = (frequency[String(val)] || 0) + 1 })
      const maxFreq = Math.max(...Object.values(frequency) as number[])
      const mode = Object.keys(frequency).filter((key: string) => frequency[key] === maxFreq).map(Number)
      return mode
    }
  },

  // === 統計関数 ===
  '相関係数': {
    type: 'func',
    josi: [['と'], ['の']],
    pure: true,
    fn: function(x: any, y: any) {
      if (!Array.isArray(x) || !Array.isArray(y) || x.length !== y.length) return 0
      
      const n = x.length
      const sumX = x.reduce((sum, val) => sum + val, 0)
      const sumY = y.reduce((sum, val) => sum + val, 0)
      const sumXY = x.reduce((sum, val, i) => sum + val * y[i], 0)
      const sumX2 = x.reduce((sum, val) => sum + val * val, 0)
      const sumY2 = y.reduce((sum, val) => sum + val * val, 0)
      
      const numerator = n * sumXY - sumX * sumY
      const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))
      
      return denominator === 0 ? 0 : numerator / denominator
    }
  },

  '標準化': {
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function(arr: any) {
      if (!Array.isArray(arr)) return arr
      const flat = arr.flat(Infinity)
      if (flat.length === 0) return arr
      
      const means = flat.reduce((sum, val) => sum + val, 0) / flat.length
      const stds = Math.sqrt(flat.reduce((sum, val) => sum + Math.pow(val - means, 2), 0) / flat.length)
      
      return arr.map((row: any) => row.map((val: any, i: any) => stds === 0 ? 0 : (val - means) / stds))
    }
  },

  '回帰直線': {
    type: 'func',
    josi: [['と'], ['で']],
    pure: true,
    fn: function(x: any, y: any) {
      if (!Array.isArray(x) || !Array.isArray(y) || x.length !== y.length) return { slope: 0, intercept: 0 }
      
      const n = x.length
      const sumX = x.reduce((sum, val) => sum + val, 0)
      const sumY = y.reduce((sum, val) => sum + val, 0)
      const sumXY = x.reduce((sum, val, i) => sum + val * y[i], 0)
      const sumX2 = x.reduce((sum, val) => sum + val * val, 0)
      
      const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
      const intercept = (sumY - slope * sumX) / n
      
      return { slope, intercept }
    }
  },

  // === ヘルパー関数 ===
  '_reshapeArray': {
    type: 'func',
    josi: [],
    pure: true,
    fn: function(flat: any[], shape: number[]): any {
      if (shape.length === 0) return flat
      if (shape.length === 1) return flat.slice(0, shape[0])
      
      const result: any[] = []
      const size = shape.slice(1).reduce((product, dim) => product * dim, 1)
      
      for (let i = 0; i < shape[0]; i++) {
        const start = i * size
        const end = start + size
        result.push(PluginDataScience['_reshapeArray'].fn(flat.slice(start, end), shape.slice(1)))
      }
      
      return result
    }
  },

  '_createZeroArray': {
    type: 'func',
    josi: [],
    pure: true,
    fn: function(shape: number[]): any {
      if (shape.length === 0) return 0
      if (shape.length === 1) return Array(shape[0]).fill(0)
      
      return Array(shape[0]).fill(null).map(() => PluginDataScience['_createZeroArray'].fn(shape.slice(1)))
    }
  }
}

// プラグイン登録
if (typeof window !== 'undefined') {
  (window as any).PluginDataScience = PluginDataScience
} else if (typeof global !== 'undefined') {
  (global as any).PluginDataScience = PluginDataScience
}

export default PluginDataScience
