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

  const cmp = (/** @type {string} */code, /** @type {any} */res) => {
    assert.strictEqual(nako.runReset(code), res)
  }

  describe('配列作成', () => {
    it('配列作成', () => {
      cmp('5の0で配列作成して表示', '[0,0,0,0,0]')
    })

    it('ゼロ配列', () => {
      cmp('3のゼロ配列して表示', '[0,0,0]')
    })

    it('1配列', () => {
      cmp('4の1配列して表示', '[1,1,1,1]')
    })

    it('範囲配列', () => {
      cmp('1から5まで範囲配列して表示', '[1,2,3,4,5]')
    })
  })

  describe('配列操作', () => {
    it('配列形状', () => {
      cmp('[1,2,3]の配列形状を表示', '[3]')
    })

    it('配列リサイズ', () => {
      cmp('[1,2]を5に配列リサイズして表示', '[1,2,0,0,0]')
    })

    it('配列連結', () => {
      cmp('[1,2]と[3,4]を配列連結して表示', '[1,2,3,4]')
    })
  })

  describe('数学関数', () => {
    it('合計', () => {
      cmp('[1,2,3,4,5]の合計を表示', '15')
    })

    it('平均', () => {
      cmp('[1,2,3,4,5]の平均を表示', '3')
    })

    it('最大値', () => {
      cmp('[1,2,3,4,5]の最大値を表示', '5')
    })

    it('最小値', () => {
      cmp('[1,2,3,4,5]の最小値を表示', '1')
    })

    it('標準偏差', () => {
      cmp('[1,2,3,4,5]の標準偏差を表示', Math.sqrt(2).toFixed(10))
    })

    it('分散', () => {
      cmp('[1,2,3,4,5]の分散を表示', '2')
    })
  })

  describe('配列要素操作', () => {
    it('配列要素積', () => {
      cmp('[1,2,3,4,5]の配列要素積を表示', '120')
    })

    it('配列累積和', () => {
      cmp('[1,2,3,4,5]の配列累積和を表示', '[1,3,6,10,15]')
    })
  })

  describe('ソート', () => {
    it('配列ソート（昇順）', () => {
      cmp('[3,1,4,2,5]を配列ソートして表示', '[1,2,3,4,5]')
    })

    it('配列ソート（降順）', () => {
      cmp('[3,1,4,2,5]を0で配列ソートして表示', '[5,4,3,2,1]')
    })
  })

  describe('統計関数', () => {
    it('中央値（奇数）', () => {
      cmp('[1,3,5]の中央値を表示', '3')
    })

    it('中央値（偶数）', () => {
      cmp('[1,2,3,4]の中央値を表示', '2.5')
    })

    it('最頻値', () => {
      cmp('[1,2,2,3,2,4]の最頻値を表示', '2')
    })
  })

  describe('相関係数', () => {
    it('相関係数（完全相関）', () => {
      cmp('[1,2,3,4,5]と[2,4,6,8,10]の相関係数を表示', '1')
    })

    it('相関係数（無相関）', () => {
      cmp('[1,2,3,4,5]と[5,4,3,2,1]の相関係数を表示', '-1')
    })
  })
})
