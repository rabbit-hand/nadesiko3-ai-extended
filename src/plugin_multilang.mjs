/**
 * file: plugin_multilang.mjs
 * 多言語対応・子供向け簡単言語機能プラグイン
 * This is AI modified! English support and kid-friendly programming language mode
 */
import { NakoSystem } from '../core/src/plugin_api.mjs'

const PluginMultilang = {
  'meta': {
    type: 'const',
    value: {
      pluginName: 'plugin_multilang',
      description: '多言語対応・子供向け簡単言語機能を提供するプラグイン | English support and kid-friendly programming',
      pluginVersion: '1.0.0',
      nakoRuntime: ['cnako', 'wnako'],
      nakoVersion: '3.6.0'
    }
  },

  // === 言語モード設定 ===
  '言語モード設定': {
    type: 'func',
    josi: [['に', 'を']],
    pure: true,
    fn: function (lang) {
      if (!this.__vars._langMode) this.__vars._langMode = 'japanese'
      this.__vars._langMode = lang.toLowerCase()
      return `Language mode set to: ${this.__vars._langMode}`
    }
  },

  'SET_LANGUAGE_MODE': {
    type: 'func',
    josi: [['to']],
    pure: true,
    fn: function (lang) {
      return this['言語モード設定'](lang)
    }
  },

  // === 英語対応コマンド ===
  'PRINT': {
    type: 'func',
    josi: [['']],
    pure: true,
    fn: function (text) {
      console.log(text)
      return text
    }
  },

  'DISPLAY': {
    type: 'func',
    josi: [['']],
    pure: true,
    fn: function (text) {
      return this['表示'](text)
    }
  },

  'SHOW': {
    type: 'func',
    josi: [['']],
    pure: true,
    fn: function (text) {
      return this['表示'](text)
    }
  },

  'CALCULATE': {
    type: 'func',
    josi: [['']],
    pure: true,
    fn: function (expr) {
      return this['計算'](expr)
    }
  },

  'ADD': {
    type: 'func',
    josi: [['and', 'to']],
    pure: true,
    fn: function (a, b) {
      return this['足'](a, b)
    }
  },

  'SUBTRACT': {
    type: 'func',
    josi: [['from']],
    pure: true,
    fn: function (b, a) {
      return this['引'](a, b)
    }
  },

  'MULTIPLY': {
    type: 'func',
    josi: [['by']],
    pure: true,
    fn: function (a, b) {
      return this['掛'](a, b)
    }
  },

  'DIVIDE': {
    type: 'func',
    josi: [['by']],
    pure: true,
    fn: function (a, b) {
      return this['割'](a, b)
    }
  },

  'CREATE_VARIABLE': {
    type: 'func',
    josi: [['as']],
    pure: false,
    fn: function (value, name) {
      this.__vars[name] = value
      return value
    }
  },

  'MAKE_VARIABLE': {
    type: 'func',
    josi: [['as']],
    pure: false,
    fn: function (value, name) {
      return this['CREATE_VARIABLE'](value, name)
    }
  },

  'IF_THEN': {
    type: 'func',
    josi: [['then']],
    pure: true,
    fn: function (condition, thenBlock) {
      if (condition) {
        return thenBlock
      }
      return null
    }
  },

  'REPEAT_TIMES': {
    type: 'func',
    josi: [['times']],
    pure: true,
    fn: function (count, block) {
      let result = []
      for (let i = 0; i < count; i++) {
        result.push(block)
      }
      return result
    }
  },

  'LOOP_UNTIL': {
    type: 'func',
    josi: [['until']],
    pure: true,
    fn: function (condition, block) {
      let result = []
      while (!condition) {
        result.push(block)
      }
      return result
    }
  },

  // === 子供向け簡単言語モード ===
  'かんたんモード': {
    type: 'func',
    josi: [['に', 'を']],
    pure: true,
    fn: function () {
      if (!this.__vars._langMode) this.__vars._langMode = 'japanese'
      this.__vars._langMode = 'kid'
      return 'かんたんモードになりました！🎈'
    }
  },

  'KID_MODE': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['かんたんモード']()
    }
  },

  // === 子供向け簡単コマンド ===
  'おはよう': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const greetings = ['おはよう！☀️', 'Good morning! 🌞', 'おはようございます！🌅']
      return greetings[Math.floor(Math.random() * greetings.length)]
    }
  },

  'こんにちは': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const greetings = ['こんにちは！👋', 'Hello! 👋', 'やあ！😊']
      return greetings[Math.floor(Math.random() * greetings.length)]
    }
  },

  'こんばんは': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const greetings = ['こんばんは！🌙', 'Good evening! 🌃', 'ばんわ！🌙']
      return greetings[Math.floor(Math.random() * greetings.length)]
    }
  },

  'ふくふく': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (text) {
      return `🎈 ${text} 🎈`
    }
  },

  'わんわん': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return '🐕 ワンワン！'
    }
  },

  'にゃんにゃん': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return '🐱 ニャーニャー！'
    }
  },

  'ぴよぴよ': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return '🐥 ピヨピヨ！'
    }
  },

  'ぽっぽ': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return '🚂 ポッポー！'
    }
  },

  'かずあそび': {
    type: 'func',
    josi: [['と']],
    pure: true,
    fn: function (a, b) {
      const result = a + b
      return `${a} + ${b} = ${result} 🎯`
    }
  },

  'たしざん': {
    type: 'func',
    josi: [['と']],
    pure: true,
    fn: function (a, b) {
      return this['かずあそび'](a, b)
    }
  },

  'ひきざん': {
    type: 'func',
    josi: [['から']],
    pure: true,
    fn: function (a, b) {
      const result = a - b
      return `${a} - ${b} = ${result} 🎯`
    }
  },

  'かけざん': {
    type: 'func',
    josi: [['かける']],
    pure: true,
    fn: function (a, b) {
      const result = a * b
      return `${a} × ${b} = ${result} 🎯`
    }
  },

  'おんがく': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (note) {
      const notes = {
        'ド': '🎵 ド〜',
        'レ': '🎶 レ〜',
        'ミ': '🎼 ミ〜',
        'ファ': '🎹 ファ〜',
        'ソ': '🎸 ソ〜',
        'ラ': '🎺 ラ〜',
        'シ': '🎷 シ〜',
        'ド': '🎵 ド〜'
      }
      return notes[note] || `🎵 ${note}〜`
    }
  },

  'えらんで': {
    type: 'func',
    josi: [['から']],
    pure: true,
    fn: function (items) {
      if (Array.isArray(items)) {
        const selected = items[Math.floor(Math.random() * items.length)]
        return `🎯 えらんだよ！ ${selected}`
      }
      return items
    }
  },

  'くじびき': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (items) {
      return this['えらんで'](items)
    }
  },

  'おとこずき': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const boys = ['👦 男の子', '🧑 男の子', '👨 男の子']
      return boys[Math.floor(Math.random() * boys.length)]
    }
  },

  'おんなずき': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const girls = ['👧 女の子', '🧑 女の子', '👩 女の子']
      return girls[Math.floor(Math.random() * girls.length)]
    }
  },

  'ことばあそび': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (text) {
      const games = [
        `🎭 ${text} のもじもじ！`,
        `🎪 ${text} のあいうえお！`,
        `🎨 ${text} のかきかき！`,
        `🎯 ${text} のさがしごと！`
      ]
      return games[Math.floor(Math.random() * games.length)]
    }
  },

  'ものがたり': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (story) {
      return `📖 ものがたりのはじまり... ${story} ...おわり！`
    }
  },

  'おえかき': {
    type: 'func',
    josi: [['を']],
    pure: true,
    fn: function (picture) {
      return `🎨 おえかきしたよ！ ${picture}`
    }
  },

  'あそぼう': {
    type: 'func',
    josi: [['と']],
    pure: true,
    fn: function (game) {
      return `🎮 ${game} であそぼう！楽しいな！`
    }
  },

  'おやすみ': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      const messages = ['おやすみなさい！😴', 'Good night! 🌙', 'おやすみ！⭐']
      return messages[Math.floor(Math.random() * messages.length)]
    }
  },

  // === 英語版子供向けコマンド ===
  'HELLO': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['こんにちは']()
    }
  },

  'GOOD_MORNING': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['おはよう']()
    }
  },

  'GOOD_NIGHT': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['おやすみ']()
    }
  },

  'DOG_BARK': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['わんわん']()
    }
  },

  'CAT_MEOW': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['にゃんにゃん']()
    }
  },

  'CHIRP_CHIRP': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['ぴよぴよ']()
    }
  },

  'TRAIN_CHOO': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['ぽっぽ']()
    }
  },

  'NUMBER_GAME': {
    type: 'func',
    josi: [['and']],
    pure: true,
    fn: function (a, b) {
      return this['かずあそび'](a, b)
    }
  },

  'ADD_NUMBERS': {
    type: 'func',
    josi: [['and']],
    pure: true,
    fn: function (a, b) {
      return this['かずあそび'](a, b)
    }
  },

  'PLAY_MUSIC': {
    type: 'func',
    josi: [['note']],
    pure: true,
    fn: function (note) {
      return this['おんがく'](note)
    }
  },

  'PICK_RANDOM': {
    type: 'func',
    josi: [['from']],
    pure: true,
    fn: function (items) {
      return this['えらんで'](items)
    }
  },

  'DRAW_PICTURE': {
    type: 'func',
    josi: [['']],
    pure: true,
    fn: function (picture) {
      return this['おえかき'](picture)
    }
  },

  'LET'S_PLAY': {
    type: 'func',
    josi: [['with']],
    pure: true,
    fn: function (game) {
      return this['あそぼう'](game)
    }
  },

  'TELL_STORY': {
    type: 'func',
    josi: [['']],
    pure: true,
    fn: function (story) {
      return this['ものがたり'](story)
    }
  },

  // === 言語モード自動判定 ===
  'AUTO_DETECT_LANGUAGE': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      // 簡単な言語判定ロジック
      const vars = this.__vars
      let detectedLang = 'japanese'
      
      // 変数名や関数呼び出しから判定
      for (let key in vars) {
        if (key.match(/^[a-zA-Z_]/)) {
          detectedLang = 'english'
          break
        }
      }
      
      this.__vars._langMode = detectedLang
      return `Language auto-detected: ${detectedLang}`
    }
  },

  // === 多言語ヘルプ ===
  'ヘルプ': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return `🌍 多言語対応なでしこ3 ヘルプ！

📖 日本語モード:
「表示」「計算」「足」「引」「掛」「割」など

🌐 English Mode:
PRINT, DISPLAY, SHOW, CALCULATE, ADD, SUBTRACT, MULTIPLY, DIVIDE

🎈 かんたんモード (Kid Mode):
「おはよう」「こんにちは」「ふくふく」「わんわん」「かずあそび」「おんがく」

🔧 言語モード設定:
「言語モード設定」で「japanese」「english」「kid」を選択

🎯 例:
「言語モード設定」に「kid」
「おはよう」と表示
「かずあそび」5と3
「ふくふく」を「なでしこさん」`
    }
  },

  'HELP': {
    type: 'func',
    josi: [[]],
    pure: true,
    fn: function () {
      return this['ヘルプ']()
    }
  }
}

export default PluginMultilang
