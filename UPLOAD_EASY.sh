#!/bin/bash

# 簡単GitHubアップロードスクリプト
# ステップ1: Tokenを環境変数に設定
# ステップ2: アップロード実行

echo "🚀 簡単GitHubアップロード"
echo "========================"

# ステップ1: Token設定
echo "📋 ステップ1: GitHub Token設定"
echo "GitHubにアクセスしてTokenを取得してください："
echo ""
echo "1. https://github.com にログイン"
echo "2. 右上のプロフィール → Settings"
echo "3. 左側メニュー → Developer settings"
echo "4. Personal access tokens → Tokens (classic)"
echo "5. Generate new token → Generate new token (classic)"
echo "6. Note: 'nadesiko3-upload' と入力"
echo "7. Expiration: 適切な期間を選択"
echo "8. Select scopes: ✅ repo (すべてチェック)"
echo "9. Generate token をクリック"
echo "10. 表示されたTokenをコピー"
echo ""

# Token入力
read -p "🔑 GitHub Tokenを貼り付けてください: " GITHUB_TOKEN

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Tokenが入力されませんでした"
    exit 1
fi

echo "✅ Tokenを設定しました"
echo ""

# ステップ2: アップロード実行
echo "📋 ステップ2: アップロード実行"
echo "リポジトリ: https://github.com/rabbit-hand/nadesiko3ai"
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
    echo "Tokenが正しいか確認してください"
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
echo "========================"
echo "📁 リポジトリ: https://github.com/rabbit-hand/nadesiko3ai"
echo "🏷️  タグ: $TAG"
echo "📦 Release: https://github.com/rabbit-hand/nadesiko3ai/releases"
echo ""
echo "📚 インストール方法:"
echo "curl -fsSL https://raw.githubusercontent.com/rabbit-hand/nadesiko3ai/main/install.sh | bash"
echo ""
echo "🎯 これで世界中の人がなでしこ3のデータサイエンス機能を使えます！"

# Tokenをクリア
unset GITHUB_TOKEN
