/**
 * file: plugin_machinelearning.mts
 * 機械学習機能プラグイン
 * This is AI modified! Complete machine learning functionality for Nadesiko3
 */
import { NakoSystem } from '../core/src/plugin_api.mjs'

const PluginMachineLearning = {
  'meta': {
    type: 'const',
    value: {
      pluginName: 'plugin_machinelearning',
      description: '機械学習機能を提供するプラグイン | Machine learning functionality',
      pluginVersion: '1.0.0',
      nakoRuntime: ['cnako', 'wnako'],
      nakoVersion: '3.6.0'
    }
  },

  // === データ前処理 ===
  'データ標準化': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function(data: any) {
      if (!Array.isArray(data) || data.length === 0) return data

      const features = data[0].length
      const means = Array(features).fill(0)
      const stds = Array(features).fill(0)

      // 平均値計算
      data.forEach(row => {
        row.forEach((val: any, i: any) => {
          means[i] += val
        })
      })
      means.forEach((sum, i) => {
        means[i] = sum / data.length
      })

      // 標準偏差計算
      data.forEach(row => {
        row.forEach((val: any, i: any) => {
          stds[i] += Math.pow(val - means[i], 2)
        })
      })
      stds.forEach((sum, i) => {
        stds[i] = Math.sqrt(sum / data.length)
      })

      // 標準化
      return data.map(row => 
        row.map((val: any, i: any) => stds[i] === 0 ? 0 : (val - means[i]) / stds[i])
      )
    }
  },

  'データ正規化': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function(data: any) {
      if (!Array.isArray(data) || data.length === 0) return data

      const features = data[0].length
      const mins = Array(features).fill(Infinity)
      const maxs = Array(features).fill(-Infinity)

      // 最小値・最大値計算
      data.forEach(row => {
        row.forEach((val: any, i: any) => {
          mins[i] = Math.min(mins[i], val)
          maxs[i] = Math.max(maxs[i], val)
        })
      })

      // 正規化
      return data.map(row => 
        row.map((val: any, i: any) => {
          const range = maxs[i] - mins[i]
          return range === 0 ? 0 : (val - mins[i]) / range
        })
      )
    }
  },

  '訓練テスト分割': {
    type: 'func',
    josi: [['を'], ['で']],
    pure: true,
    fn: function(data: any, testRatio: number = 0.2) {
      if (!Array.isArray(data)) return { train: [], test: [] }

      const shuffled = [...data].sort(() => Math.random() - 0.5)
      const splitIndex = Math.floor(data.length * (1 - testRatio))

      return {
        train: shuffled.slice(0, splitIndex),
        test: shuffled.slice(splitIndex)
      }
    }
  },

  // === 教師あり学習 ===
  '線形回帰学習': {
    type: 'func',
    josi: [['と'], ['で']],
    pure: true,
    fn: function(X: any, y: any) {
      if (!Array.isArray(X) || !Array.isArray(y) || X.length !== y.length) {
        return { weights: [], bias: 0 }
      }

      const n = X.length
      const features = X[0].length
      const weights = Array(features).fill(0)
      let bias = 0

      // 勾配降下法
      const learningRate = 0.01
      const epochs = 1000

      for (let epoch = 0; epoch < epochs; epoch++) {
        const dw = Array(features).fill(0)
        let db = 0

        for (let i = 0; i < n; i++) {
          const prediction = PluginMachineLearning._linearPredict(X[i], weights, bias)
          const error = prediction - y[i]

          for (let j = 0; j < features; j++) {
            dw[j] += error * X[i][j]
          }
          db += error
        }

        for (let j = 0; j < features; j++) {
          weights[j] -= learningRate * dw[j] / n
        }
        bias -= learningRate * db / n
      }

      return { weights, bias }
    }
  },

  '線形回帰予測': {
    type: 'func',
    josi: [['で']],
    pure: true,
    fn: function(X: any, model: any) {
      if (!Array.isArray(X) || !model || !Array.isArray(model.weights)) {
        return []
      }

      return X.map(row => PluginMachineLearning._linearPredict(row, model.weights, model.bias))
    }
  },

  'ロジスティック回帰学習': {
    type: 'func',
    josi: [['と'], ['で']],
    pure: true,
    fn: function(X: any, y: any) {
      if (!Array.isArray(X) || !Array.isArray(y) || X.length !== y.length) {
        return { weights: [], bias: 0 }
      }

      const n = X.length
      const features = X[0].length
      const weights = Array(features).fill(0)
      let bias = 0

      // 勾配降下法
      const learningRate = 0.01
      const epochs = 1000

      for (let epoch = 0; epoch < epochs; epoch++) {
        const dw = Array(features).fill(0)
        let db = 0

        for (let i = 0; i < n; i++) {
          const prediction = PluginMachineLearning._sigmoid(PluginMachineLearning._linearPredict(X[i], weights, bias))
          const error = prediction - y[i]

          for (let j = 0; j < features; j++) {
            dw[j] += error * X[i][j]
          }
          db += error
        }

        for (let j = 0; j < features; j++) {
          weights[j] -= learningRate * dw[j] / n
        }
        bias -= learningRate * db / n
      }

      return { weights, bias }
    }
  },

  'ロジスティック回帰予測': {
    type: 'func',
    josi: [['で']],
    pure: true,
    fn: function(X: any, model: any) {
      if (!Array.isArray(X) || !model || !Array.isArray(model.weights)) {
        return []
      }

      return X.map(row => {
        const score = PluginMachineLearning._linearPredict(row, model.weights, model.bias)
        return PluginMachineLearning._sigmoid(score)
      })
    }
  },

  // === 教師なし学習 ===
  'K平均法クラスタリング': {
    type: 'func',
    josi: [['を'], ['で']],
    pure: true,
    fn: function(data: any, k: number = 3) {
      if (!Array.isArray(data) || data.length === 0) {
        return { clusters: [], centroids: [] }
      }

      // 初期重心をランダムに選択
      const centroids = data.slice(0, k).map(point => [...point])
      const clusters: any[][] = Array(k).fill(null).map(() => [])

      const maxIterations = 100
      for (let iter = 0; iter < maxIterations; iter++) {
        // クラスタ割り当て
        clusters.forEach(cluster => cluster.length = 0)
        
        data.forEach(point => {
          let minDistance = Infinity
          let assignedCluster = 0

          centroids.forEach((centroid, i) => {
            const distance = PluginMachineLearning._euclideanDistance(point, centroid)
            if (distance < minDistance) {
              minDistance = distance
              assignedCluster = i
            }
          })

          clusters[assignedCluster].push(point)
        })

        // 重心再計算
        let converged = true
        centroids.forEach((centroid, i) => {
          if (clusters[i].length === 0) return

          const newCentroid = Array(centroid.length).fill(0)
          clusters[i].forEach((point: any) => {
            point.forEach((val: any, j: any) => {
              newCentroid[j] += val
            })
          })

          newCentroid.forEach((sum, j) => {
            newCentroid[j] = sum / clusters[i].length
          })

          if (PluginMachineLearning._euclideanDistance(centroid, newCentroid) > 0.001) {
            converged = false
            centroid.forEach((_, j) => {
              centroid[j] = newCentroid[j]
            })
          }
        })

        if (converged) break
      }

      return { clusters, centroids }
    }
  },

  // === 評価指標 ===
  '平均二乗誤差': {
    type: 'func',
    josi: [['と'], ['の']],
    pure: true,
    fn: function(yTrue: any, yPred: any) {
      if (!Array.isArray(yTrue) || !Array.isArray(yPred) || yTrue.length !== yPred.length) {
        return Infinity
      }

      const mse = yTrue.reduce((sum, actual, i) => {
        const error = actual - yPred[i]
        return sum + error * error
      }, 0) / yTrue.length

      return mse
    }
  },

  '正解率': {
    type: 'func',
    josi: [['と'], ['の']],
    pure: true,
    fn: function(yTrue: any, yPred: any) {
      if (!Array.isArray(yTrue) || !Array.isArray(yPred) || yTrue.length !== yPred.length) {
        return 0
      }

      const correct = yTrue.filter((actual, i) => {
        const pred = yPred[i] > 0.5 ? 1 : 0
        const act = actual > 0.5 ? 1 : 0
        return pred === act
      }).length

      return correct / yTrue.length
    }
  },

  // === ヘルパー関数 ===
  '_linearPredict': function(X: number[], weights: number[], bias: number): number {
    return X.reduce((sum, val, i) => sum + val * weights[i], 0) + bias
  },

  '_sigmoid': function(x: number): number {
    return 1 / (1 + Math.exp(-x))
  },

  '_euclideanDistance': function(a: number[], b: number[]): number {
    return Math.sqrt(
      a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0)
    )
  }
}

// プラグイン登録
if (typeof window !== 'undefined') {
  (window as any).PluginMachineLearning = PluginMachineLearning
} else if (typeof global !== 'undefined') {
  (global as any).PluginMachineLearning = PluginMachineLearning
}

export default PluginMachineLearning
