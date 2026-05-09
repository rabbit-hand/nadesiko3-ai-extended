// PluginStatistics - 統計分析機能
const PluginStatistics = {
  '初期化': {
    type: 'func',
    josi: [],
    pure: true,
    fn: function (sys: any) {
    }
  },

  // --- 記述統計 ---
  '要約統計量': { // @基本統計量のまとめ // @ようやくとうけいりょう
    type: 'func',
    josi: [['の']],
    pure: true,
    fn: function (arr: any): any {
      if (!Array.isArray(arr) || arr.length === 0) {
        return {
          count: 0,
          mean: 0,
          median: 0,
          std: 0,
          variance: 0,
          min: 0,
          max: 0
        }
      }

      const nums = arr.map(v => Number(v) || 0)
      const mean = nums.reduce((s, v) => s + v, 0) / nums.length
      const sorted = [...nums].sort((a, b) => a - b)
      const median = nums.length % 2 === 1 
        ? sorted[Math.floor(nums.length / 2)]
        : (sorted[nums.length / 2 - 1] + sorted[nums.length / 2]) / 2
      
      const variance = nums.reduce((s, v) => {
        const diff = v - mean
        return s + diff * diff
      }, 0) / nums.length
      
      return {
        count: nums.length,
        mean: mean,
        median: median,
        std: Math.sqrt(variance),
        variance: variance,
        min: Math.min(...nums),
        max: Math.max(...nums)
      }
    }
  },

  // --- 確率分布 ---
  '正規分布PDF': { // @正規分布の確率密度関数 // @せいきぶんぷPDF
    type: 'func',
    josi: [['で'], ['の']],
    pure: true,
    fn: function (x: number, mean: number = 0, std: number = 1): number {
      const variance = std * std
      return (1 / Math.sqrt(2 * Math.PI * variance)) * 
             Math.exp(-((x - mean) * (x - mean)) / (2 * variance))
    }
  },

  '正規分布CDF': { // @正規分布の累積分布関数 // @せいきぶんぷCDF
    type: 'func',
    josi: [['で'], ['の']],
    pure: true,
    fn: function (x: number, mean: number = 0, std: number = 1): number {
      // 簡易的な実装
      const z = (x - mean) / std
      return 0.5 * (1 + PluginStatistics._erf(z / Math.sqrt(2)))
    }
  },

  // 誤差関数の補助関数
  _erf: function (x: number): number {
    const a1 =  0.254829592
    const a2 = -0.284496736
    const a3 =  1.421413741
    const a4 = -1.453152027
    const a5 =  1.061405429
    const p  =  0.3275911

    const sign = x < 0 ? -1 : 1
    x = Math.abs(x)

    const t = 1.0 / (1.0 + p * x)
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)

    return sign * y
  },

  // --- 仮説検定 ---
  't検定': { // @t検定の実行 // @tけんてい
    type: 'func',
    josi: [['と'], ['を']],
    pure: true,
    fn: function (sample1: any, sample2: any): any {
      if (!Array.isArray(sample1) || !Array.isArray(sample2) || 
          sample1.length === 0 || sample2.length === 0) {
        return { tStatistic: 0, pValue: 1, significant: false }
      }

      const nums1 = sample1.map(v => Number(v) || 0)
      const nums2 = sample2.map(v => Number(v) || 0)
      
      const mean1 = nums1.reduce((s, v) => s + v, 0) / nums1.length
      const mean2 = nums2.reduce((s, v) => s + v, 0) / nums2.length
      
      const var1 = nums1.reduce((s, v) => {
        const diff = v - mean1
        return s + diff * diff
      }, 0) / (nums1.length - 1)
      
      const var2 = nums2.reduce((s, v) => {
        const diff = v - mean2
        return s + diff * diff
      }, 0) / (nums2.length - 1)

      const pooledVar = ((nums1.length - 1) * var1 + (nums2.length - 1) * var2) / 
                       (nums1.length + nums2.length - 2)
      
      const standardError = Math.sqrt(pooledVar * (1/nums1.length + 1/nums2.length))
      const tStatistic = (mean1 - mean2) / standardError

      return {
        tStatistic: tStatistic,
        pValue: Math.abs(tStatistic) > 1.96 ? 0.05 : 0.1, // 簡易化
        significant: Math.abs(tStatistic) > 1.96
      }
    }
  },

  // --- 相関分析 ---
  'ピアソン相関': { // @ピアソンの相関係数 // @ぴあそんそうかん
    type: 'func',
    josi: [['と'], ['の']],
    pure: true,
    fn: function (arr1: any, arr2: any): number {
      if (!Array.isArray(arr1) || !Array.isArray(arr2) || 
          arr1.length !== arr2.length || arr1.length === 0) {
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

  'スピアマン相関': { // @スピアマンの順位相関係数 // @すぴあまんそうかん
    type: 'func',
    josi: [['と'], ['の']],
    pure: true,
    fn: function (arr1: any, arr2: any): number {
      if (!Array.isArray(arr1) || !Array.isArray(arr2) || 
          arr1.length !== arr2.length || arr1.length === 0) {
        return 0
      }

      // 順位付け
      const getRanks = (arr: any[]): number[] => {
        const indexed = arr.map((value, index) => ({ value, index }))
        indexed.sort((a, b) => (Number(a.value) || 0) - (Number(b.value) || 0))
        
        const ranks = new Array(arr.length)
        indexed.forEach((item, rank) => {
          ranks[item.index] = rank + 1
        })
        return ranks
      }

      const ranks1 = getRanks(arr1)
      const ranks2 = getRanks(arr2)

      // ピアソン相関と同じ計算を順位に対して適用
      return PluginStatistics.ピアソン相関.fn(ranks1, ranks2)
    }
  },

  // --- 回帰分析 ---
  '単回帰分析': { // @単回帰分析の実行 // @たんかいきぶんせき
    type: 'func',
    josi: [['で'], ['を']],
    pure: true,
    fn: function (x: any, y: any): any {
      if (!Array.isArray(x) || !Array.isArray(y) || 
          x.length !== y.length || x.length === 0) {
        return {
          slope: 0,
          intercept: 0,
          rSquared: 0,
          equation: 'y = 0x + 0'
        }
      }

      const n = x.length
      const sumX = x.reduce((s, v) => s + (Number(v) || 0), 0)
      const sumY = y.reduce((s, v) => s + (Number(v) || 0), 0)
      const sumXY = x.reduce((s, v, i) => s + (Number(v) || 0) * (Number(y[i]) || 0), 0)
      const sumXX = x.reduce((s, v) => {
        const val = Number(v) || 0
        return s + val * val
      }, 0)

      const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
      const intercept = (sumY - slope * sumX) / n

      // 決定係数の計算
      const meanY = sumY / n
      const totalSS = y.reduce((s, v) => {
        const diff = (Number(v) || 0) - meanY
        return s + diff * diff
      }, 0)
      
      const predictedY = x.map(xi => slope * (Number(xi) || 0) + intercept)
      const residualSS = y.reduce((s, v, i) => {
        const diff = (Number(v) || 0) - predictedY[i]
        return s + diff * diff
      }, 0)

      const rSquared = totalSS === 0 ? 1 : 1 - (residualSS / totalSS)

      return {
        slope: slope,
        intercept: intercept,
        rSquared: rSquared,
        equation: `y = ${slope.toFixed(3)}x + ${intercept.toFixed(3)}`
      }
    }
  },

  // --- 分散分析 ---
  '一元配置分散分析': { // @一元配置分散分析の実行 // @いちげんはいちぶんさんぶんせき
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (groups: any[]): any {
      if (!Array.isArray(groups) || groups.length === 0) {
        return { fStatistic: 0, pValue: 1, significant: false }
      }

      const validGroups = groups.filter(g => Array.isArray(g) && g.length > 0)
      if (validGroups.length < 2) {
        return { fStatistic: 0, pValue: 1, significant: false }
      }

      // 全データの平均
      const allData = validGroups.flat()
      const grandMean = allData.reduce((s, v) => s + (Number(v) || 0), 0) / allData.length

      // 群間変動と群内変動
      let betweenSS = 0
      let withinSS = 0
      let totalN = 0

      for (const group of validGroups) {
        const groupMean = group.reduce((s: any, v: any) => s + (Number(v) || 0), 0) / group.length
        betweenSS += group.length * Math.pow(groupMean - grandMean, 2)
        
        for (const value of group) {
          withinSS += Math.pow((Number(value) || 0) - groupMean, 2)
        }
        totalN += group.length
      }

      const betweenDF = validGroups.length - 1
      const withinDF = totalN - validGroups.length
      const betweenMS = betweenSS / betweenDF
      const withinMS = withinSS / withinDF
      const fStatistic = withinMS === 0 ? 0 : betweenMS / withinMS

      return {
        fStatistic: fStatistic,
        pValue: fStatistic > 3.0 ? 0.05 : 0.1, // 簡易化
        significant: fStatistic > 3.0
      }
    }
  },

  'meta': {
    type: 'const',
    value: {
      pluginName: 'plugin_statistics',
      description: '統計分析機能を提供するプラグイン',
      pluginVersion: '1.0.0',
      nakoRuntime: ['cnako', 'wnako'],
      nakoVersion: '3.6.0'
    }
  }
}

export default PluginStatistics
