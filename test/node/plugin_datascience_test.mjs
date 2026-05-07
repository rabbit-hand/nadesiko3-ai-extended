/* eslint-disable no-undef */
import assert from 'assert'
import path from 'path'
import { NakoCompiler } from '../../core/src/nako3.mjs'
import PluginDataScience from '../../src/plugin_datascience.mjs'

// __dirname のために
import url from 'url'
// @ts-ignore
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('plugin_datascience_test', () => {
  const nako = new NakoCompiler()
  nako.addPluginObject('PluginDataScience', PluginDataScience)

  // 直接関数をテストするヘルパー
  const testFunc = (funcName, args, expected) => {
    const result = PluginDataScience[funcName].fn(...args)
    assert.strictEqual(JSON.stringify(result), JSON.stringify(expected))
  }

  describe('配列作成', () => {
    it('配列作成', () => {
      testFunc('配列作成', [5], [0,0,0,0,0])
    })

    it('ゼロ配列', () => {
      testFunc('ゼロ配列', [3], [0,0,0])
    })

    it('配列1埋', () => {
      testFunc('配列1埋', [4], [1,1,1,1])
    })

    it('範囲配列', () => {
      testFunc('範囲配列', [1, 5], [1,2,3,4,5])
    })
  })

  describe('配列操作', () => {
    it('配列形状', () => {
      testFunc('配列形状', [[1,2,3]], [3])
    })

    it('配列リサイズ', () => {
      testFunc('配列リサイズ', [[1,2], 5], [1,2,0,0,0])
    })

    it('配列連結', () => {
      testFunc('配列連結', [[1,2], [3,4]], [1,2,3,4])
    })
  })

  describe('数学関数', () => {
    it('合計', () => {
      testFunc('合計', [[1,2,3,4,5]], 15)
    })

    it('平均', () => {
      testFunc('平均', [[1,2,3,4,5]], 3)
    })

    it('最大値', () => {
      testFunc('最大値', [[1,2,3,4,5]], 5)
    })

    it('最小値', () => {
      testFunc('最小値', [[1,2,3,4,5]], 1)
    })

    it('標準偏差', () => {
      const result = PluginDataScience['標準偏差'].fn([1,2,3,4,5])
      assert.strictEqual(Math.abs(result - Math.sqrt(2)) < 0.0001, true)
    })

    it('分散', () => {
      testFunc('分散', [[1,2,3,4,5]], 2)
    })
  })

  describe('配列要素操作', () => {
    it('配列要素積', () => {
      testFunc('配列要素積', [[1,2,3,4,5]], 120)
    })

    it('配列累積和', () => {
      testFunc('配列累積和', [[1,2,3,4,5]], [1,3,6,10,15])
    })
  })

  describe('ソート', () => {
    it('配列ソート（昇順）', () => {
      testFunc('配列ソート', [[3,1,4,2,5]], [1,2,3,4,5])
    })

    it('配列ソート（降順）', () => {
      testFunc('配列ソート', [[3,1,4,2,5], 0], [5,4,3,2,1])
    })
  })

  describe('統計関数', () => {
    it('中央値（奇数）', () => {
      testFunc('中央値', [[1,3,5]], 3)
    })

    it('中央値（偶数）', () => {
      testFunc('中央値', [[1,2,3,4]], 2.5)
    })

    it('最頻値', () => {
      testFunc('最頻値', [[1,2,2,3,2,4]], [2])
    })
  })

  describe('相関係数', () => {
    it('相関係数（完全相関）', () => {
      testFunc('相関係数', [[1,2,3,4,5], [2,4,6,8,10]], 1)
    })

    it('相関係数（無相関）', () => {
      testFunc('相関係数', [[1,2,3,4,5], [5,4,3,2,1]], -1)
    })
  })
})
