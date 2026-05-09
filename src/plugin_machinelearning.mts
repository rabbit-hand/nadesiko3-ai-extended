// PluginMachineLearning - 機械学習機能
const PluginMachineLearning = {
  '初期化': {
    type: 'func',
    josi: [],
    pure: true,
    fn: function (sys: any) {
    }
  },

  // --- データ前処理 ---
  'データ正規化': { // @データの正規化（0-1範囲） // @でーたせいきか
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (data: any): number[] {
      if (!Array.isArray(data) || data.length === 0) return []
      
      const nums = data.map(v => Number(v) || 0)
      const min = Math.min(...nums)
      const max = Math.max(...nums)
      
      if (max === min) return nums.map(() => 0)
      
      return nums.map(v => (v - min) / (max - min))
    }
  },

  'データ標準化': { // @データの標準化（平均0、分散1） // @でーたひょうじゅんか
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (data: any): number[] {
      if (!Array.isArray(data) || data.length === 0) return []
      
      const nums = data.map(v => Number(v) || 0)
      const mean = nums.reduce((s, v) => s + v, 0) / nums.length
      const std = Math.sqrt(nums.reduce((s, v) => {
        const diff = v - mean
        return s + diff * diff
      }, 0) / nums.length)
      
      if (std === 0) return nums.map(() => 0)
      
      return nums.map(v => (v - mean) / std)
    }
  },

  '訓練テスト分割': { // @データを訓練用とテスト用に分割 // @くんれんてすとぶんかつ
    type: 'func',
    josi: [['を'], ['で']],
    pure: true,
    fn: function (data: any, testRatio: number = 0.2): any {
      if (!Array.isArray(data) || data.length === 0) {
        return { train: [], test: [] }
      }

      const shuffled = [...data].sort(() => Math.random() - 0.5)
      const splitIndex = Math.floor(data.length * (1 - testRatio))
      
      return {
        train: shuffled.slice(0, splitIndex),
        test: shuffled.slice(splitIndex)
      }
    }
  },

  // --- 教師あり学習 ---
  '線形回帰学習': { // @線形回帰モデルの学習 // @せんけいかいきがくしゅう
    type: 'func',
    josi: [['で'], ['を']],
    pure: true,
    fn: function (x: any, y: any): any {
      if (!Array.isArray(x) || !Array.isArray(y) || 
          x.length !== y.length || x.length === 0) {
        return { slope: 0, intercept: 0 }
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

      return { slope: slope, intercept: intercept }
    }
  },

  '線形回帰予測': { // @線形回帰による予測 // @せんけいかいきよそく
    type: 'func',
    josi: [['で'], ['を']],
    pure: true,
    fn: function (model: any, x: any): any {
      if (!model || typeof model.slope === 'undefined' || typeof model.intercept === 'undefined') {
        return []
      }
      
      if (!Array.isArray(x)) return []
      
      return x.map(v => model.slope * (Number(v) || 0) + model.intercept)
    }
  },

  'K近傍法分類': { // @K近傍法による分類 // @けいきんほうぶんるい
    type: 'func',
    josi: [['と'], ['で'], ['を']],
    pure: true,
    fn: function (features: any, labels: any, testPoint: any, k: number = 3): any {
      if (!Array.isArray(features) || !Array.isArray(labels) || 
          features.length !== labels.length || features.length === 0) {
        return null
      }

      // 距離計算
      const distances = features.map((feature, index) => {
        const distance = Math.abs((Number(feature) || 0) - (Number(testPoint) || 0))
        return { distance: distance, label: labels[index] }
      })

      // 距離でソートして上位k個を取得
      distances.sort((a, b) => a.distance - b.distance)
      const kNearest = distances.slice(0, k)

      // 最頻値を返す
      const labelCounts: { [key: string]: number } = {}
      let maxCount = 0
      let resultLabel = null

      for (const item of kNearest) {
        const label = String(item.label)
        labelCounts[label] = (labelCounts[label] || 0) + 1
        if (labelCounts[label] > maxCount) {
          maxCount = labelCounts[label]
          resultLabel = item.label
        }
      }

      return resultLabel
    }
  },

  '決定木分類': { // @単純な決定木による分類 // @けっていぎぶんるい
    type: 'func',
    josi: [['と'], ['で'], ['を']],
    pure: true,
    fn: function (features: any, labels: any, testPoint: any): any {
      if (!Array.isArray(features) || !Array.isArray(labels) || 
          features.length !== labels.length || features.length === 0) {
        return null
      }

      // 単純な実装：最も近い特徴量のラベルを返す
      let minDistance = Infinity
      let resultLabel = null

      for (let i = 0; i < features.length; i++) {
        const distance = Math.abs((Number(features[i]) || 0) - (Number(testPoint) || 0))
        if (distance < minDistance) {
          minDistance = distance
          resultLabel = labels[i]
        }
      }

      return resultLabel
    }
  },

  'パーセプトロン学習': { // @単純パーセプトロンの学習 // @ぱーせぷとろんがくしゅう
    type: 'func',
    josi: [['と'], ['を']],
    pure: true,
    fn: function (features: any, labels: any, epochs: number = 100): any {
      if (!Array.isArray(features) || !Array.isArray(labels) || 
          features.length !== labels.length || features.length === 0) {
        return { weights: [], bias: 0 }
      }

      // 特徴量を2次元に変換（単純化）
      const processedFeatures = features.map(f => {
        const num = Number(f) || 0
        return [num, num * num] // 2次元特徴量
      })

      const weights = [0, 0]
      let bias = 0
      const learningRate = 0.01

      for (let epoch = 0; epoch < epochs; epoch++) {
        for (let i = 0; i < processedFeatures.length; i++) {
          const feature = processedFeatures[i]
          const label = Number(labels[i]) || 0
          
          // 線形結合
          const activation = weights[0] * feature[0] + weights[1] * feature[1] + bias
          const prediction = activation > 0 ? 1 : 0
          
          // 重み更新
          const error = label - prediction
          weights[0] += learningRate * error * feature[0]
          weights[1] += learningRate * error * feature[1]
          bias += learningRate * error
        }
      }

      return { weights: weights, bias: bias }
    }
  },

  // --- 教師なし学習 ---
  'K平均法クラスタリング': { // @K平均法によるクラスタリング // @けいへいきんほうくらすたりんぐ
    type: 'func',
    josi: [['を'], ['の']],
    pure: true,
    fn: function (data: any, k: number = 3): any {
      if (!Array.isArray(data) || data.length === 0 || k <= 0) {
        return { centroids: [], clusters: [] }
      }

      const nums = data.map(v => Number(v) || 0)
      
      // 初期セントロイドをランダムに選択
      const centroids: number[] = []
      const usedIndices = new Set()
      
      while (centroids.length < Math.min(k, nums.length)) {
        const index = Math.floor(Math.random() * nums.length)
        if (!usedIndices.has(index)) {
          centroids.push(nums[index])
          usedIndices.add(index)
        }
      }

      // K-meansアルゴリズム
      for (let iteration = 0; iteration < 100; iteration++) {
        // 各点を最も近いセントロイドに割り当て
        const clusters: number[][] = centroids.map(() => [])
        
        for (const value of nums) {
          let minDistance = Infinity
          let closestCentroid = 0
          
          for (let i = 0; i < centroids.length; i++) {
            const distance = Math.abs(value - centroids[i])
            if (distance < minDistance) {
              minDistance = distance
              closestCentroid = i
            }
          }
          
          clusters[closestCentroid].push(value)
        }

        // セントロイドを更新
        let converged = true
        for (let i = 0; i < clusters.length; i++) {
          if (clusters[i].length > 0) {
            const newCentroid = clusters[i].reduce((s, v) => s + v, 0) / clusters[i].length
            if (Math.abs(newCentroid - centroids[i]) > 0.001) {
              converged = false
            }
            centroids[i] = newCentroid
          }
        }

        if (converged) break
      }

      return { centroids: centroids, clusters: [] }
    }
  },

  // --- 評価指標 ---
  '平均二乗誤差': { // @MSEの計算 // @へいきんにじょうごさ
    type: 'func',
    josi: [['と'], ['の']],
    pure: true,
    fn: function (actual: any, predicted: any): number {
      if (!Array.isArray(actual) || !Array.isArray(predicted) || 
          actual.length !== predicted.length || actual.length === 0) {
        return 0
      }

      const sumSquaredErrors = actual.reduce((sum, actualVal, index) => {
        const error = (Number(actualVal) || 0) - (Number(predicted[index]) || 0)
        return sum + error * error
      }, 0)

      return sumSquaredErrors / actual.length
    }
  },

  '平均絶対誤差': { // @MAEの計算 // @へいきんぜったいごさ
    type: 'func',
    josi: [['と'], ['の']],
    pure: true,
    fn: function (actual: any, predicted: any): number {
      if (!Array.isArray(actual) || !Array.isArray(predicted) || 
          actual.length !== predicted.length || actual.length === 0) {
        return 0
      }

      const sumAbsoluteErrors = actual.reduce((sum, actualVal, index) => {
        const error = Math.abs((Number(actualVal) || 0) - (Number(predicted[index]) || 0))
        return sum + error
      }, 0)

      return sumAbsoluteErrors / actual.length
    }
  },

  '正解率': { // @分類の正解率 // @せいかいりつ
    type: 'func',
    josi: [['と'], ['の']],
    pure: true,
    fn: function (actual: any, predicted: any): number {
      if (!Array.isArray(actual) || !Array.isArray(predicted) || 
          actual.length !== predicted.length || actual.length === 0) {
        return 0
      }

      const correct = actual.reduce((count, actualVal, index) => {
        return count + (String(actualVal) === String(predicted[index]) ? 1 : 0)
      }, 0)

      return correct / actual.length
    }
  },

  'meta': {
    type: 'const',
    value: {
      pluginName: 'plugin_machinelearning',
      description: '機械学習機能を提供するプラグイン',
      pluginVersion: '1.0.0',
      nakoRuntime: ['cnako', 'wnako'],
      nakoVersion: '3.6.0'
    }
  }
}

export default PluginMachineLearning
