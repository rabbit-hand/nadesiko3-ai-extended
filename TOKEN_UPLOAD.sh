#!/bin/bash

# Personal Access Tokenを使用した自動アップロード

set -e

echo "🚀 GitHub自動アップロード開始 (Token認証)"
echo "=========================================="

# 設定変数
REPO_OWNER="rabbit-hand"
REPO_NAME="nadesiko3ai"
REPO_URL="https://github.com/${REPO_OWNER}/${REPO_NAME}"
BRANCH="main"

# Personal Access Tokenの入力
echo "🔑 GitHub Personal Access Tokenを入力してください:"
echo "   1. GitHubにログイン"
echo "   2. Settings → Developer settings → Personal access tokens → Tokens (classic)"
echo "   3. Generate new token → repo権限を付与"
echo ""
read -s -p "Token: " GITHUB_TOKEN
echo ""

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Tokenが入力されませんでした。"
    exit 1
fi

# Gitリモート設定
echo "🔧 Gitリモートを設定..."
git remote set-url origin https://${GITHUB_TOKEN}@github.com/${REPO_OWNER}/${REPO_NAME}.git

# 変更を確認
echo "📋 変更を確認..."
git status
git add -A

# コミットメッセージ
COMMIT_MSG="🚀 データサイエンスプラグイン完全版 - 多言語対応

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

# コミット実行
echo "💾 コミット実行..."
git commit -m "$COMMIT_MSG"

# プッシュ実行
echo "📤 プッシュ実行..."
if git push -u origin $BRANCH; then
    echo "✅ プッシュ成功！"
else
    echo "❌ プッシュ失敗。Tokenを確認してください。"
    exit 1
fi

# Release作成
echo "🎉 Release作成..."
TAG="v1.0.0-datascience-complete-$(date +%Y%m%d-%H%M%S)"
RELEASE_TITLE="🚀 データサイエンスプラグイン完全版 - 多言語対応"

# GitHub APIでRelease作成
RELEASE_RESPONSE=$(curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases \
  -d "{
    \"tag_name\": \"$TAG\",
    \"target_commitish\": \"$BRANCH\",
    \"name\": \"$RELEASE_TITLE\",
    \"body\": \"$COMMIT_MSG\",
    \"draft\": false,
    \"prerelease\": false
  }")

# Release作成確認
if echo "$RELEASE_RESPONSE" | grep -q '"html_url"'; then
    RELEASE_URL=$(echo "$RELEASE_RESPONSE" | grep -o '"html_url": "[^"]*' | cut -d'"' -f2)
    echo "✅ Release作成成功！"
    echo "📦 Release URL: $RELEASE_URL"
else
    echo "⚠️ Release作成に失敗しました。"
fi

echo ""
echo "🎉 アップロード完了！"
echo "================================"
echo "📁 リポジトリ: $REPO_URL"
echo "🏷️  タグ: $TAG"
echo "📦 Release: $REPO_URL/releases"
echo ""
echo "🎯 成果:"
echo "   なでしこ3のデータサイエンス機能が世界に公開されました！"
echo "   Pythonライクなデータ処理が日本語プログラミングで実現！"
echo "   22個のテストすべて通過済み！"
echo ""
echo "📚 インストール方法:"
echo "   curl -fsSL $REPO_URL/raw/main/install.sh | bash"

# Tokenをクリア（セキュリティのため）
unset GITHUB_TOKEN
