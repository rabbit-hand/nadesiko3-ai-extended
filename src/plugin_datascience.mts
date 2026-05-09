// PluginDataScience - データサイエンス機能 (NumPy風)
const PluginDataScience = {
  '初期化': {
    type: 'func',
    josi: [],
    pure: true,
    fn: function (sys: any) {
    }
  },

  // --- 高度な配列操作 ---
  '配列形状取得': { // @多次元配列の形状を取得 // @はいれつけいじょうしゅとく
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (arr: any): number[] {
      if (!Array.isArray(arr)) return []
      const shape: number[] = []
      let current = arr
      while (Array.isArray(current)) {
        shape.push(current.length)
        current = current[0]
      }
      return shape
    }
  },

  '配列リシェイプ': { // @配列の形状を変更 // @はいれつりしぇいぷ
    type: 'func',
    josi: [['を'], ['に']],
    pure: true,
    fn: function (arr: any, newShape: number[]): any[] {
      if (!Array.isArray(arr)) return arr
      return arr.flat()
    }
  },

  '配列ブロードキャスト': { // @配列のブロードキャスト // @はいれつぶろーどきゃすと
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (arr: any): any[] {
      if (!Array.isArray(arr)) return arr
      return arr.map(item => Array.isArray(item) ? item : [item])
    }
  },

  '配列フラット化': { // @多次元配列を1次元化 // @はいれつふらっとか
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (arr: any): any[] {
      if (!Array.isArray(arr)) return arr
      return arr.flat(Infinity)
    }
  },

  // --- 高度な数学関数 ---
  '絶対値': { // @絶対値を計算 // @ぜったいち
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (x: number): number {
      return Math.abs(x)
    }
  },

  '平方根': { // @平方根を計算 // @へいほうこん
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (x: number): number {
      return Math.sqrt(x)
    }
  },

  'べき乗': { // @べき乗を計算 // @べきじょう
    type: 'func',
    josi: [['を'], ['の']],
    pure: true,
    fn: function (base: number, exp: number): number {
      return Math.pow(base, exp)
    }
  },

  '対数': { // @自然対数を計算 // @たいすう
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (x: number): number {
      return Math.log(x)
    }
  },

  '階乗': { // @階乗を計算 // @かいじょう
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (n: number): number {
      if (n < 0) return 0
      if (n === 0) return 1
      let result = 1
      for (let i = 2; i <= n; i++) {
        result *= i
      }
      return result
    }
  },
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

  // --- 高度な統計関数 ---
  '四分位範囲': { // @四分位範囲を計算 // @しぶんいはんい
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (arr: any): { min: number, q1: number, median: number, q3: number, max: number } {
      if (!Array.isArray(arr) || arr.length === 0) return { min: 0, q1: 0, median: 0, q3: 0, max: 0 }
      const sorted = [...arr].sort((a, b) => (Number(a) || 0) - (Number(b) || 0))
      const q1Index = Math.floor(sorted.length * 0.25)
      const q3Index = Math.floor(sorted.length * 0.75)
      return {
        min: sorted[0],
        q1: sorted[q1Index],
        median: sorted[Math.floor(sorted.length / 2)],
        q3: sorted[q3Index],
        max: sorted[sorted.length - 1]
      }
    }
  },

  '歪度': { // @歪度を計算 // @わいど
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (arr: any): number {
      if (!Array.isArray(arr) || arr.length < 3) return 0
      const mean = arr.reduce((s, v) => s + (Number(v) || 0), 0) / arr.length
      const variance = arr.reduce((s, v) => {
        const diff = (Number(v) || 0) - mean
        return s + diff * diff * diff
      }, 0) / arr.length
      const stdDev = Math.sqrt(variance)
      const skewness = arr.reduce((s, v) => {
        const diff = (Number(v) || 0) - mean
        return s + Math.pow(diff / stdDev, 3)
      }, 0) / arr.length
      return skewness
    }
  },

  '尖度': { // @尖度を計算 // @せんど
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (arr: any): number {
      if (!Array.isArray(arr) || arr.length < 4) return 0
      const mean = arr.reduce((s, v) => s + (Number(v) || 0), 0) / arr.length
      const variance = arr.reduce((s, v) => {
        const diff = (Number(v) || 0) - mean
        return s + diff * diff
      }, 0) / arr.length
      const kurtosis = arr.reduce((s, v) => {
        const diff = (Number(v) || 0) - mean
        return s + Math.pow(diff / Math.sqrt(variance), 4)
      }, 0) / arr.length - 3
      return kurtosis
    }
  },
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

  // --- pandas風データ処理 ---
  'データフレーム作成': { // @データフレームを作成 // @でーたふれーむさくせい
    type: 'func',
    josi: [['から']],
    pure: true,
    fn: function (data: any): any {
      if (!Array.isArray(data)) return { columns: [], data: [] }
      const keys = Object.keys(data[0] || {})
      return {
        columns: keys,
        data: data.map(row => {
          const obj: any = {}
          keys.forEach(key => obj[key] = row[key])
          return obj
        })
      }
    }
  },

  '列抽出': { // @特定の列を抽出 // @れつちゅうしゅつ
    type: 'func',
    josi: [['から'], ['を']],
    pure: true,
    fn: function (df: any, column: string): any[] {
      if (!df || !df.data || !column) return []
      return df.data.map((row: any) => row[column])
    }
  },

  '行抽出': { // @特定の行を抽出 // @ぎょうちゅうしゅつ
    type: 'func',
    josi: [['から'], ['を']],
    pure: true,
    fn: function (df: any, condition: any): any[] {
      if (!df || !df.data) return []
      return df.data.filter((row: any) => {
        if (typeof condition === 'function') {
          return condition(row)
        }
        return true
      })
    }
  },

  'グループ化': { // @データをグループ化 // @ぐるーぷか
    type: 'func',
    josi: [['を'], ['で']],
    pure: true,
    fn: function (df: any, key: string): any {
      if (!df || !df.data || !key) return {}
      const groups: any = {}
      df.data.forEach((row: any) => {
        const groupKey = row[key]
        if (!groups[groupKey]) groups[groupKey] = []
        groups[groupKey].push(row)
      })
      return groups
    }
  },

  '集計': { // @グループ化データを集計 // @しゅうけい
    type: 'func',
    josi: [['を'], ['で']],
    pure: true,
    fn: function (groups: any, aggFunc: string): any {
      if (typeof groups !== 'object') return {}
      const result: any = {}
      Object.keys(groups).forEach(key => {
        const group = groups[key]
        if (aggFunc === '合計') {
          result[key] = group.reduce((sum: any, row: any) => sum + (Number(row.value) || 0), 0)
        } else if (aggFunc === '平均') {
          result[key] = group.reduce((sum: any, row: any) => sum + (Number(row.value) || 0), 0) / group.length
        } else if (aggFunc === 'カウント') {
          result[key] = group.length
        } else {
          result[key] = group
        }
      })
      return result
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
