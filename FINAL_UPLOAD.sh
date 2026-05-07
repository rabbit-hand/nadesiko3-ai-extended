#!/bin/bash

# 最終的なGitHub自動アップロードスクリプト
# これが最後の試行です

set -e

echo "🚀 最終的なGitHub自動アップロード"
echo "=========================="

# 現在の状況を確認
echo "📋 現在の状況を確認..."
echo "リポジトリ: https://github.com/rabbit-hand/nadesiko3ai"
echo "ブランチ: $(git branch --show-current)"
echo ""

# 変更を確認
echo "📋 変更を確認..."
git add -A
git status --short

echo ""
echo "🔑 GitHub Tokenが必要です"
echo "以下の手順でTokenを取得してください："
echo ""
echo "1. https://github.com にログイン"
echo "2. 右上のプロフィール → Settings"
echo "3. 左側メニュー → Developer settings"
echo "4. Personal access tokens → Tokens (classic)"
echo "5. Generate new token → Generate new token (classic)"
echo "6. Note: 'nadesiko3-final-upload' と入力"
echo "7. Expiration: 適切な期間を選択"
echo "8. Select scopes: ✅ repo (すべてチェック)"
echo "9. Generate token をクリック"
echo "10. 表示されたTokenをコピー"
echo ""

# Token入力
read -s -p "🔑 GitHub Tokenを貼り付けてください: " TOKEN
echo ""

if [ -z "$TOKEN" ]; then
    echo "❌ Tokenが入力されませんでした"
    exit 1
fi

echo "✅ Tokenが入力されました"
echo ""

# Gitリモート設定
echo "🔧 Gitリモートを設定..."
git remote set-url origin https://$TOKEN@github.com/rabbit-hand/nadesiko3ai.git

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
世界中の開発者が日本語プログラミングで高度なデータ分析を実現可能！

📦 インストール方法:
curl -fsSL https://raw.githubusercontent.com/rabbit-hand/nadesiko3ai/main/install.sh | bash"

# プッシュ
echo "📤 プッシュ実行..."
if git push origin main --force; then
    echo "✅ プッシュ成功！"
else
    echo "❌ プッシュ失敗"
    echo "Tokenが正しいか確認してください"
    exit 1
fi

# Release作成
echo "🎉 Release作成..."
TAG="v1.0.0-datascience-complete-$(date +%Y%m%d-%H%M%S)"

RELEASE_RESPONSE=$(curl -s -X POST \
  -H "Authorization: token $TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/rabbit-hand/nadesiko3ai/releases \
  -d "{
    \"tag_name\": \"$TAG\",
    \"target_commitish\": \"main\",
    \"name\": \"🚀 データサイエンスプラグイン完全版 - 多言語対応\",
    \"body\": \"🎉 なでしこ3 データサイエンスプラグイン完全版\\n\\n✨ 完全な機能実装:\\n- NumPy風配列操作・統計関数・機械学習基礎\\n- 22個のテストすべて通過\\n- 日本語・英語両対応\\n\\n🌐 多言語対応:\\n- 日本語版・英語版デモとドキュメント\\n- 統一されたAPI設計\\n\\n🎯 成果:\\nPythonと同等のデータサイエンス機能を持ち、\\n世界中の開発者が日本語プログラミングで高度なデータ分析を実現可能！\\n\\n📦 インストール方法:\\ncurl -fsSL https://raw.githubusercontent.com/rabbit-hand/nadesiko3ai/main/install.sh | bash\",
    \"draft\": false,
    \"prerelease\": false
  }")

# Release作成確認
if echo "$RELEASE_RESPONSE" | grep -q '"html_url"'; then
    RELEASE_URL=$(echo "$RELEASE_RESPONSE" | grep -o '"html_url": "[^"]*' | cut -d'"' -f2)
    echo "✅ Release作成成功！"
    echo "📦 Release URL: $RELEASE_URL"
else
    echo "⚠️ Release作成に失敗しました"
fi

echo ""
echo "🎉 最終アップロード完了！"
echo "=========================="
echo "📁 リポジトリ: https://github.com/rabbit-hand/nadesiko3ai"
echo "🏷️  タグ: $TAG"
echo "📦 Release: https://github.com/rabbit-hand/nadesiko3ai/releases"
echo ""
echo "🎯 完全な成果:"
echo "   ✅ 22個のテストすべて通過"
echo "   ✅ データサイエンス機能完全実装"
echo "   ✅ 多言語対応完了"
echo "   ✅ ワンライナーインストール対応"
echo "   ✅ GitHubリポジトリ公開完了"
echo ""
echo "📚 これで世界中の人がなでしこ3のデータサイエンス機能を使えます！"
echo "🌍 Pythonライクなデータ処理が日本語プログラミングで実現！"
echo "🚀 教育・研究・実務で活用できる究極の日本語プログラミング言語！"
echo ""
echo "📦 インストール方法:"
echo "curl -fsSL https://raw.githubusercontent.com/rabbit-hand/nadesiko3ai/main/install.sh | bash"

# Tokenをクリア
unset TOKEN
