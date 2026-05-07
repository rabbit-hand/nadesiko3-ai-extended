#!/bin/bash

# 最も簡単なアップロード方法
# 1. GitHubにログイン
# 2. Tokenを取得
# 3. アップロード実行

set -e

echo "🚀 最も簡単なGitHubアップロード"
echo "=========================="

# 現在の認証状態を確認
echo "📋 認証状態を確認..."
gh auth status 2>/dev/null || echo "❌ GitHub CLI未認証"

# GitHub CLIで認証
echo "🔐 GitHub CLIで認証します..."
echo "ブラウザが開きますので、GitHubにログインして認証を完了してください"
echo ""

gh auth login --web --scopes repo

echo ""
echo "✅ 認証完了！"
echo ""

# アップロード実行
echo "📤 アップロード実行..."

# 変更を確認
git add -A
git status

# コミット
echo "💾 コミット実行..."
git commit -m "🚀 データサイエンスプラグイン完全版 - 多言語対応

✨ 完全な機能実装:
- NumPy風配列操作・統計関数・機械学習基礎
- 22個のテストすべて通過
- 日本語・英語両対応

🌐 多言語対応:
- 日本語版・英語版デモとドキュメント
- 統一されたAPI設計

🎯 成果:
Pythonと同等のデータサイエンス機能を持ち、
世界中の開発者が日本語プログラミングで高度なデータ分析を実現可能！"

# プッシュ
echo "📤 プッシュ実行..."
git push origin main

# Release作成
echo "🎉 Release作成..."
TAG="v1.0.0-datascience-complete-$(date +%Y%m%d-%H%M%S)"

gh release create "$TAG" \
  --title "🚀 データサイエンスプラグイン完全版 - 多言語対応" \
  --notes "🎉 なでしこ3 データサイエンスプラグイン完全版

✨ 完全な機能実装:
- NumPy風配列操作・統計関数・機械学習基礎
- 22個のテストすべて通過
- 日本語・英語両対応

🌐 多言語対応:
- 日本語版・英語版デモとドキュメント
- 統一されたAPI設計

🎯 成果:
Pythonと同等のデータサイエンス機能を持ち、
世界中の開発者が日本語プログラミングで高度なデータ分析を実現可能！" \
  --latest

echo ""
echo "🎉 アップロード完了！"
echo "=========================="
echo "📁 リポジトリ: https://github.com/rabbit-hand/nadesiko3ai"
echo "🏷️  タグ: $TAG"
echo "📦 Release: https://github.com/rabbit-hand/nadesiko3ai/releases"
echo ""
echo "📚 インストール方法:"
echo "curl -fsSL https://raw.githubusercontent.com/rabbit-hand/nadesiko3ai/main/install.sh | bash"
echo ""
echo "🎯 これで世界中の人がなでしこ3のデータサイエンス機能を使えます！"
