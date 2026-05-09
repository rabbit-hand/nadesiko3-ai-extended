# 🌟 なでしこ3AI モバイルアプリ

React Native版なでしこ3AIモバイルアプリケーション

## 📱 概要

なでしこ3AIモバイルアプリは、スマートフォンやタブレットで日本語プログラミングを楽しめるモバイルアプリケーションです。子供から大人まで、誰でも簡単にプログラミングを学習・実行できます。

## ✨ 主な機能

### 🎯 基本機能
- **日本語プログラミング**: 日本語で直感的にプログラミング
- **リアルタイム実行**: コードを即座に実行して結果を確認
- **インタラクティブエディタ**: 使いやすいコードエディタ
- **実行履歴**: 過去の実行結果を保存・再実行

### 🚀 高度機能
- **複数モード**: 基本モード、高度モード、ビジュアルモード
- **多言語対応**: 日本語と英語に対応
- **例題ライブラリ**: 学習用の豊富な例題
- **ヘルプ機能**: 使い方ガイド内蔵

### 🌟 特殊機能
- **データサイエンス**: モバイルでデータ分析
- **機械学習**: AIモデルの実行
- **ロボット制御**: IoTデバイス連携
- **クラウド連携**: クラウドサービスとの連携

## 📋 システム要件

### iOS
- iOS 12.0以上
- iPhone 6s以降
- iPad Air 2以降
- iPad mini 4以降

### Android
- Android 6.0 (API Level 23)以上
- RAM 2GB以上推奨
- ストレージ容量 100MB以上

## 🚀 インストール方法

### 開発環境のセットアップ

1. **Node.jsのインストール**
   ```bash
   # Node.js 16以上をインストール
   node --version
   ```

2. **React Native CLIのインストール**
   ```bash
   npm install -g react-native-cli
   ```

3. **プロジェクトのクローン**
   ```bash
   git clone https://github.com/rabbit-hand/nadesiko3ai.git
   cd nadesiko3ai/mobile/Nadesiko3AI_Mobile
   ```

4. **依存関係のインストール**
   ```bash
   npm install
   # または
   yarn install
   ```

### iOSでの実行

1. **CocoaPodsのインストール**
   ```bash
   cd ios
   pod install
   cd ..
   ```

2. **アプリの起動**
   ```bash
   npm run ios
   ```

### Androidでの実行

1. **エミュレータの起動**
   ```bash
   # Android Studioでエミュレータを起動
   ```

2. **アプリの起動**
   ```bash
   npm run android
   ```

## 🎮 使い方

### 基本的な使い方

1. **アプリを起動**
2. **コード入力エリアになでしこ3AIコードを入力**
3. **実行ボタンをタップ**
4. **結果を確認**

### サンプルコード

#### 基本表示
```nako3
「こんにちは、なでしこ3AI！」と表示
```

#### 計算
```nako3
5と3を足して表示
```

#### 繰り返し
```nako3
3回「楽しい！」と繰り返して表示
```

#### 変数
```nako3
Aに10を代入して
「Aの値は{A}です」と表示
```

## 🎨 モード説明

### 🟢 基本モード
- 初心者向けのシンプルな機能
- 基本的なコマンドのみ使用可能
- 分かりやすいインターフェース

### 🔵 高度モード
- 上級者向けの高度な機能
- データサイエンス、機械学習機能
- 複雑なプログラミングが可能

### 🟣 ビジュアルモード（準備中）
- ノードベースのビジュアルプログラミング
- ドラッグ＆ドロップでプログラミング
- 直感的な操作が可能

## 🌐 多言語対応

### 日本語モード
- すべてのUIが日本語表示
- 日本語プログラミング言語対応
- 日本語のヘルプと例題

### 英語モード
- すべてのUIが英語表示
- 簡易英語プログラミング対応
- 英語のヘルプと例題

## 📚 学習リソース

### ヘルプ機能
- 基本的なコマンド一覧
- 高度な機能説明
- ショートカットキー一覧

### 例題ライブラリ
- 基本プログラミング例題
- データサイエンス例題
- 機械学習例題
- ロボット制御例題

### 履歴機能
- 実行したコードの保存
- 結果の再表示
- お気に入りコードの保存

## 🔧 開発者向け情報

### プロジェクト構造
```
Nadesiko3AI_Mobile/
├── App.js                 # メインアプリケーション
├── package.json          # 依存関係設定
├── android/              # Androidプロジェクト
├── ios/                  # iOSプロジェクト
├── src/                  # ソースコード
│   ├── components/       # UIコンポーネント
│   ├── screens/          # 画面コンポーネント
│   ├── utils/            # ユーティリティ関数
│   └── services/         # サービス層
└── assets/               # アセットファイル
```

### カスタマイズ

#### テーマの変更
```javascript
// App.jsでテーマカラーを変更
const theme = {
  primary: '#667eea',
  secondary: '#764ba2',
  background: '#f5f5f5',
  text: '#333',
  // ...
};
```

#### 新しい機能の追加
```javascript
// 新しいコマンドを追加
const executeCustomCommand = (command) => {
  // カスタムコマンドの実装
};
```

### ビルドとリリース

#### Android APKの作成
```bash
cd android
./gradlew assembleRelease
```

#### iOS IPAの作成
```bash
cd ios
xcodebuild -workspace Nadesiko3AI_Mobile.xcworkspace \
  -scheme Nadesiko3AI_Mobile \
  -configuration Release \
  -destination generic/platform=iOS \
  -archivePath Nadesiko3AI_Mobile.xcarchive archive
```

## 🐛 トラブルシューティング

### よくある問題

#### アプリが起動しない
- Node.jsのバージョンを確認（16以上）
- 依存関係を再インストール
- キャッシュをクリア

#### コード実行エラー
- コードの構文を確認
- 日本語入力を確認
- 特殊文字の有無を確認

#### パフォーマンス問題
- アプリを再起動
- 不要な履歴を削除
- ストレージ容量を確認

### デバッグ方法

#### ログの確認
```bash
# Android
adb logcat

# iOS
# Xcodeのコンソールを確認
```

#### デバッグモード
```javascript
// デバッグモードを有効化
const DEBUG = true;
if (DEBUG) {
  console.log('Debug info');
}
```

## 🤝 貢献方法

### バグ報告
- GitHub Issuesでバグを報告
- 再現手順を詳細に記述
- 環境情報を含める

### 機能要求
- 新機能の提案
- 使用例の提供
- 優先度の明記

### コード貢献
- Forkしてブランチ作成
- テストを追加
- プルリクエストを送信

## 📄 ライセンス

MIT License - 詳細はLICENSEファイルを参照

## 📞 サポート

- **GitHub**: https://github.com/rabbit-hand/nadesiko3ai
- **Issues**: https://github.com/rabbit-hand/nadesiko3ai/issues
- **ドキュメント**: https://github.com/rabbit-hand/nadesiko3ai/wiki

## 🌟 更新履歴

### v1.0.0 (2024-01-01)
- 初回リリース
- 基本的なプログラミング機能
- 日本語・英語対応
- モバイル最適化

### v1.1.0 (準備中)
- ビジュアルプログラミングモード
- クラウド連携機能
- AI機能拡張
- パフォーマンス改善

---

**🌟 なでしこ3AI モバイルで、いつでもどこでも日本語プログラミングを楽しもう！**
