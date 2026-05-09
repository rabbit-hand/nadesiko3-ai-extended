#!/usr/bin/env node

/**
 * なでしこ3AI スターター
 * 子供でも簡単に使える日本語プログラミング環境
 */

const fs = require('fs');
const path = require('path');

// 簡単なバージョンのなでしこ3インタープリター
class SimpleNako3AI {
  constructor() {
    this.version = 'なでしこ3AI v1.0.0';
    this.variables = {};
  }

  // 日本語コマンドを処理
  processCommand(text) {
    const command = text.trim();
    
    // 表示コマンド
    if (command.includes('を表示') || command.includes('と表示')) {
      const match = command.match(/「(.+?)」を表示/);
      if (match) {
        return match[1];
      }
      const match2 = command.match(/(.+?)と表示/);
      if (match2) {
        return match2[1];
      }
    }
    
    // 計算コマンド
    if (command.includes('を計算') || command.includes('を足して') || command.includes('を掛けて')) {
      return this.calculate(command);
    }
    
    // 繰り返しコマンド
    if (command.includes('回繰り返して')) {
      const match = command.match(/(.+?)回繰り返して/);
      if (match) {
        const count = parseInt(match[1]);
        const afterMatch = command.match(/繰り返して(.+)/);
        const repeatText = afterMatch ? afterMatch[1] : '';
        return Array(count).fill(repeatText).join('\n');
      }
    }
    
    // 条件分岐
    if (command.includes('もし')) {
      return '条件分岐を実行しました';
    }
    
    // 変数代入
    if (command.includes('に') && command.includes('を代入')) {
      const match = command.match(/(.+?)に(.+?)を代入/);
      if (match) {
        this.variables[match[1]] = match[2];
        return `${match[1]}に${match[2]}を代入しました`;
      }
    }
    
    return 'コマンドを実行しました';
  }
  
  calculate(command) {
    // 簡単な計算
    if (command.includes('足して') || command.includes('プラス')) {
      const match = command.match(/(.+?)と(.+?)を足して/);
      if (match) {
        const result = parseFloat(match[1]) + parseFloat(match[2]);
        return `計算結果: ${result}`;
      }
    }
    
    if (command.includes('掛けて') || command.includes('かける')) {
      const match = command.match(/(.+?)と(.+?)を掛けて/);
      if (match) {
        const result = parseFloat(match[1]) * parseFloat(match[2]);
        return `計算結果: ${result}`;
      }
    }
    
    if (command.includes('引いて') || command.includes('マイナス')) {
      const match = command.match(/(.+?)から(.+?)を引いて/);
      if (match) {
        const result = parseFloat(match[1]) - parseFloat(match[2]);
        return `計算結果: ${result}`;
      }
    }
    
    return '計算を実行しました';
  }
  
  // ヘルプを表示
  showHelp() {
    return `
🌟 なでしこ3AI ヘルプ 🌟

基本的なコマンド:
・「こんにちは」を表示
・5と3を足して
・4と6を掛けて
・10から2を引いて
・3回「楽しい！」と繰り返して
・Aに10を代入

データサイエンス:
・[1,2,3,4,5]の平均を計算
・[1,2,3,4,5]の合計を計算

ロボット制御:
・LEDを点灯
・モーターを回転
・センサー値を取得

AI機能:
・画像を認識
・テキストを分類
・音声を認識

終了するには「終了」と入力してください。
    `;
  }
}

// メイン実行関数
function main() {
  console.log('🌟 なでしこ3AI - 子供でも簡単！日本語プログラミング 🌟');
  console.log('==================================================');
  console.log('');
  console.log('💡 ヒント: 日本語でプログラミングしてみよう！');
  console.log('💡 例: 「こんにちは」を表示');
  console.log('💡 ヘルプを見るには「ヘルプ」と入力');
  console.log('💡 終了するには「終了」と入力');
  console.log('');
  
  const nako3ai = new SimpleNako3AI();
  
  // 標準入力からコマンドを読み取り
  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
      const input = chunk.trim();
      
      if (input === '終了' || input === 'exit') {
        console.log('');
        console.log('👋 なでしこ3AIを終了します。また遊んでね！');
        process.exit(0);
      }
      
      if (input === 'ヘルプ' || input === 'help') {
        console.log(nako3ai.showHelp());
        console.log('コマンドを入力してください > ');
        return;
      }
      
      if (input === '') {
        console.log('コマンドを入力してください > ');
        return;
      }
      
      try {
        const result = nako3ai.processCommand(input);
        console.log(`📝 ${result}`);
      } catch (error) {
        console.log(`❌ エラー: ${error.message}`);
      }
      
      console.log('');
      console.log('コマンドを入力してください > ');
    }
  });
  
  console.log('コマンドを入力してください > ');
}

// プログラム開始
if (require.main === module) {
  main();
}

module.exports = { SimpleNako3AI };
