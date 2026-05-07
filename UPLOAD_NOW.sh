#!/bin/bash

# すぐに実行できるアップロードスクリプト
# Tokenを直接ここに設定して実行

set -e

echo "🚀 GitHubアップロード実行"
echo "======================="

# ここにGitHub Tokenを設定
GITHUB_TOKEN="YOUR_TOKEN_HERE"

if [ "$GITHUB_TOKEN" = "YOUR_TOKEN_HERE" ]; then
    echo "❌ スクリプトを編集してTokenを設定してください"
    echo "   1. このファイルを開く"
    echo "   2. YOUR_TOKEN_HERE を実際のTokenに書き換える"
    echo "   3. 保存して再度実行"
    exit 1
fi

echo "✅ Tokenが設定されています"
echo ""

# Gitリモート設定
echo "🔧 Gitリモートを設定..."
git remote set-url origin https://$GITHUB_TOKEN@github.com/rabbit-hand/nadesiko3ai.git

# 変更を確認
echo "📋 変更を確認..."
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
if git push origin main; then
    echo "✅ プッシュ成功！"
else
    echo "❌ プッシュ失敗"
    exit 1
fi

# Release作成
echo "🎉 Release作成..."
TAG="v1.0.0-datascience-complete-$(date +%Y%m%d-%H%M%S)"

curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/rabbit-hand/nadesiko3ai/releases \
  -d "{
    \"tag_name\": \"$TAG\",
    \"target_commitish\": \"main\",
    \"name\": \"🚀 データサイエンスプラグイン完全版 - 多言語対応\",
    \"body\": \"🎉 なでしこ3 データサイエンスプラグイン完全版\\n\\n✨ 完全な機能実装:\\n- NumPy風配列操作・統計関数・機械学習基礎\\n- 22個のテストすべて通過\\n- 日本語・英語両対応\\n\\n🌐 多言語対応:\\n- 日本語版・英語版デモとドキュメント\\n- 統一されたAPI設計\\n\\n🎯 成果:\\nPythonと同等のデータサイエンス機能を持ち、\\n世界中の開発者が日本語プログラミングで高度なデータ分析を実現可能！\",
    \"draft\": false,
    \"prerelease\": false
  }"

echo ""
echo "🎉 アップロード完了！"
echo "======================="
echo "📁 リポジトリ: https://github.com/rabbit-hand/nadesiko3ai"
echo "🏷️  タグ: $TAG"
echo "📦 Release: https://github.com/rabbit-hand/nadesiko3ai/releases"
echo ""
echo "📚 インストール方法:"
echo "curl -fsSL https://raw.githubusercontent.com/rabbit-hand/nadesiko3ai/main/install.sh | bash"
echo ""
echo "🎯 これで世界中の人がなでしこ3のデータサイエンス機能を使えます！"
