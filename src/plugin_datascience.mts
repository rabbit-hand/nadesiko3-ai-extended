// PluginDataScience - データサイエンス機能 (NumPy風)
const PluginDataScience = {
  '初期化': {
    type: 'func',
    josi: [],
    pure: true,
    fn: function (sys: any) {
    }
  },

  // --- 配列操作 ---
  '配列作成': { // @指定サイズの配列を作成 // @はいれつさくせい
    type: 'func',
    josi: [['の'], ['で']],
    pure: true,
    fn: function (size: number, value: any = 0): any[] {
      return Array(size).fill(value)
    }
  },

  'ゼロ配列': { // @ゼロで初期化された配列 // @ぜろはいれつ
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (size: number): number[] {
      return Array(size).fill(0)
    }
  },

  '1配列': { // @1で初期化された配列 // @いちはいれつ
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (size: number): number[] {
      return Array(size).fill(1)
    }
  },

  '範囲配列': { // @指定範囲の数値配列 // @はんいはいれつ
    type: 'func',
    josi: [['から'], ['まで']],
    pure: true,
    fn: function (start: number, end: number): number[] {
      const result: number[] = []
      for (let i = start; i <= end; i++) {
        result.push(i)
      }
      return result
    }
  },

  '配列形状': { // @配列の形状を取得 // @はいれつけいじょう
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (arr: any): number[] {
      if (!Array.isArray(arr)) return []
      return [arr.length]
    }
  },

  '配列リサイズ': { // @配列のサイズ変更 // @はいれつりさいず
    type: 'func',
    josi: [['を'], ['に']],
    pure: true,
    fn: function (arr: any, size: number): any[] {
      if (!Array.isArray(arr)) return []
      const result = arr.slice()
      while (result.length < size) {
        result.push(0)
      }
      return result.slice(0, size)
    }
  },

  '配列連結': { // @配列の結合 // @はいれつれんけつ
    type: 'func',
    josi: [['と'], ['を']],
    pure: true,
    fn: function (arr1: any, arr2: any): any[] {
      if (!Array.isArray(arr1) || !Array.isArray(arr2)) return []
      return arr1.concat(arr2)
    }
  },

  // --- 数学関数 ---
  '合計': { // @配列の合計値 // @ごうけい
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (arr: any): number {
      if (!Array.isArray(arr)) return 0
      return arr.reduce((sum, val) => sum + (Number(val) || 0), 0)
    }
  },

  '平均': { // @配列の平均値 // @へいきん
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (arr: any): number {
      if (!Array.isArray(arr) || arr.length === 0) return 0
      const sum = arr.reduce((s, val) => s + (Number(val) || 0), 0)
      return sum / arr.length
    }
  },

  '最大値': { // @配列の最大値 // @さいだいち
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (arr: any): number {
      if (!Array.isArray(arr) || arr.length === 0) return 0
      return Math.max(...arr.map(v => Number(v) || 0))
    }
  },

  '最小値': { // @配列の最小値 // @さいしょうち
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (arr: any): number {
      if (!Array.isArray(arr) || arr.length === 0) return 0
      return Math.min(...arr.map(v => Number(v) || 0))
    }
  },

  '標準偏差': { // @標準偏差の計算 // @ひょうじゅんへんさ
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (arr: any): number {
      if (!Array.isArray(arr) || arr.length === 0) return 0
      const mean = arr.reduce((s, val) => s + (Number(val) || 0), 0) / arr.length
      const variance = arr.reduce((s, val) => {
        const diff = (Number(val) || 0) - mean
        return s + diff * diff
      }, 0) / arr.length
      return Math.sqrt(variance)
    }
  },

  '分散': { // @分散の計算 // @ぶんさん
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (arr: any): number {
      if (!Array.isArray(arr) || arr.length === 0) return 0
      const mean = arr.reduce((s, val) => s + (Number(val) || 0), 0) / arr.length
      return arr.reduce((s, val) => {
        const diff = (Number(val) || 0) - mean
        return s + diff * diff
      }, 0) / arr.length
    }
  },

  '配列要素積': { // @配列要素の積 // @はいれつようそせき
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (arr: any): number {
      if (!Array.isArray(arr) || arr.length === 0) return 1
      return arr.reduce((product, val) => product * (Number(val) || 1), 1)
    }
  },

  '配列累積和': { // @累積和の計算 // @はいれつるいせきわ
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (arr: any): number[] {
      if (!Array.isArray(arr)) return []
      const result: number[] = []
      let sum = 0
      for (const val of arr) {
        sum += Number(val) || 0
        result.push(sum)
      }
      return result
    }
  },

  '配列ソート': { // @配列のソート // @はいれつそーと
    type: 'func',
    josi: [['を'], ['で']],
    pure: true,
    fn: function (arr: any, order: number = 1): any[] {
      if (!Array.isArray(arr)) return []
      const sorted = [...arr].sort((a, b) => (Number(a) || 0) - (Number(b) || 0))
      return order === 0 ? sorted.reverse() : sorted
    }
  },

  // --- 統計関数 ---
  '中央値': { // @中央値の計算 // @ちゅうおうち
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (arr: any): number {
      if (!Array.isArray(arr) || arr.length === 0) return 0
      const sorted = [...arr].sort((a, b) => (Number(a) || 0) - (Number(b) || 0))
      const n = sorted.length
      if (n % 2 === 1) {
        return sorted[Math.floor(n / 2)]
      } else {
        return ((Number(sorted[n / 2 - 1]) || 0) + (Number(sorted[n / 2]) || 0)) / 2
      }
    }
  },

  '最頻値': { // @最頻値の計算 // @さいひんち
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (arr: any): any {
      if (!Array.isArray(arr) || arr.length === 0) return 0
      const counts: { [key: string]: number } = {}
      let maxCount = 0
      let mode = 0

      for (const val of arr) {
        const key = String(val)
        counts[key] = (counts[key] || 0) + 1
        if (counts[key] > maxCount) {
          maxCount = counts[key]
          mode = val
        }
      }
      return mode
    }
  },

  '相関係数': { // @相関係数の計算 // @そうかんけいすう
    type: 'func',
    josi: [['と'], ['の']],
    pure: true,
    fn: function (arr1: any, arr2: any): number {
      if (!Array.isArray(arr1) || !Array.isArray(arr2) || arr1.length !== arr2.length || arr1.length === 0) {
        return 0
      }

      const n = arr1.length
      const sum1 = arr1.reduce((s, v) => s + (Number(v) || 0), 0)
      const sum2 = arr2.reduce((s, v) => s + (Number(v) || 0), 0)
      const sum1Sq = arr1.reduce((s, v) => {
        const val = Number(v) || 0
        return s + val * val
      }, 0)
      const sum2Sq = arr2.reduce((s, v) => {
        const val = Number(v) || 0
        return s + val * val
      }, 0)
      const sum12 = arr1.reduce((s, v, i) => s + (Number(v) || 0) * (Number(arr2[i]) || 0), 0)

      const numerator = sum12 - (sum1 * sum2 / n)
      const denominator = Math.sqrt((sum1Sq - sum1 * sum1 / n) * (sum2Sq - sum2 * sum2 / n))

      return denominator === 0 ? 0 : numerator / denominator
    }
  },

  'meta': {
    type: 'const',
    value: {
      pluginName: 'plugin_datascience',
      description: 'データサイエンス機能（NumPy風）を提供するプラグイン',
      pluginVersion: '1.0.0',
      nakoRuntime: ['cnako', 'wnako'],
      nakoVersion: '3.6.0'
    }
  }
}

export default PluginDataScience
