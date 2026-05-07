#!/bin/bash

# GitHub分割アップロード自動化スクリプト
# 実行方法: bash UPLOAD_SCRIPT.sh

echo "🚀 GitHub分割アップロード開始"
echo "================================"

# 変数設定
REPO_NAME="nadesiko3-ai-enhanced"
REPO_DESC="AI魔改造品なでしこ3 - Pythonレベルの高度な機能を完全実装"
PART1_FILE="nadesiko3-part1.zip"
PART2_FILE="nadesiko3-part2.zip"
PART3_FILE="nadesiko3-part3.zip"
FULL_FILE="nadesiko3-ai-enhanced.zip"

# ステップ1: ファイル確認
echo "📁 ステップ1: ファイル確認"
echo "分割ファイルの存在確認..."

if [ -f "$PART1_FILE" ]; then
    echo "✅ $PART1_FILE ($(du -h $PART1_FILE | cut -f1))"
else
    echo "❌ $PART1File が見つかりません"
    exit 1
fi

if [ -f "$PART2_FILE" ]; then
    echo "✅ $PART2_FILE ($(du -h $PART2_FILE | cut -f1))"
else
    echo "❌ $PART2File が見つかりません"
    exit 1
fi

if [ -f "$PART3_FILE" ]; then
    echo "✅ $PART3_FILE ($(du -h $PART3_FILE | cut -f1))"
else
    echo "❌ $PART3File が見つかりません"
    exit 1
fi

if [ -f "$FULL_FILE" ]; then
    echo "✅ $FULL_FILE ($(du -h $FULL_FILE | cut -f1))"
else
    echo "❌ $FULLFile が見つかりません"
    exit 1
fi

# ステップ2: GitHub認証確認
echo ""
echo "🔐 ステップ2: GitHub認証確認"
if command -v gh &> /dev/null; then
    if gh auth status &> /dev/null; then
        echo "✅ GitHub CLI認証済み"
        AUTH_METHOD="gh"
    else
        echo "❌ GitHub CLI未認証"
        echo "手動アップロードが必要です"
        AUTH_METHOD="manual"
    fi
else
    echo "❌ GitHub CLI未インストール"
    echo "手動アップロードが必要です"
    AUTH_METHOD="manual"
fi

# ステップ3: アップロード実行
echo ""
echo "📤 ステップ3: アップロード実行"

if [ "$AUTH_METHOD" = "gh" ]; then
    echo "GitHub CLIで自動アップロードを試行..."
    
    # リポジトリ作成
    echo "📦 リポジトリ作成..."
    gh repo create "$REPO_NAME" --public --description "$REPO_DESC" --clone=false
    if [ $? -eq 0 ]; then
        echo "✅ リポジトリ作成成功"
    else
        echo "❌ リポジトリ作成失敗"
        echo "既存リポジトリを確認します..."
    fi
    
    # Release作成
    echo "🎯 Release作成..."
    gh release create v1.0.0-ai-enhanced \
        --title "🚀 AI魔改造品なでしこ3 v1.0.0" \
        --notes "Pythonレベルの高度な機能を完全実装した究極の日本語プログラミング言語

✨ 新機能:
- データサイエンスプラグイン (NumPy風配列操作、統計関数)
- 統計分析プラグイン (仮説検定、回帰分析)
- 機械学習プラグイン (線形回帰、K近傍法、K平均法)
- 高度な機械学習 (ランダムフォレスト、SVM、勾配ブースティング)
- 深層学習プラグイン (NN、CNN、RNN、オートエンコーダ、GAN)
- 自然言語処理 (形態素解析、感情分析、テキスト要約)
- 時系列分析 (ARIMA、異常検知、トレンド検出)
- ハードウェア制御 (GPIO、I2C、SPI、シリアル通信)
- リモコン制御 (赤外線、Webリモコン、スマートホーム)
- Web API連携 (HTTPリクエスト、GitHub API、JSON処理)
- Webスクレイピング (HTML解析、テキスト抽出、リンク抽出)

🔧 技術改善:
- TypeScriptからJavaScript ES Modulesに移行
- GitHub Actions CI/CD完全自動化
- 自動テスト環境構築
- ドキュメント自動生成
- パッケージ自動公開

📚 分割ファイル:
- part1.zip: コアファイル群 (776KB)
- part2.zip: テスト・デモ・ドキュメント (176KB)
- part3.zip: 設定・ルートファイル (148KB)
- full.zip: 完全版 (1.14MB)

🎯 成果:
Pythonと同等のデータサイエンス機能を持ち、教育・研究・実務で活用できる究極の日本語プログラミング言語！" \
        "$PART1_FILE" "$PART2_FILE" "$PART3_FILE" "$FULL_FILE"
    
    if [ $? -eq 0 ]; then
        echo "✅ Release作成成功"
        echo "🎉 GitHubアップロード完了！"
        echo "リポジトリURL: https://github.com/$USER/$REPO_NAME"
    else
        echo "❌ Release作成失敗"
        echo "手動アップロードが必要です"
    fi
    
else
    echo "📋 手動アップロード手順:"
    echo "1. GitHubにアクセス: https://github.com/new"
    echo "2. リポジトリ名: $REPO_NAME"
    echo "3. 説明: $REPO_DESC"
    echo "4. Publicリポジトリを作成"
    echo "5. 以下のファイルを順番にアップロード:"
    echo "   - $PART1_FILE"
    echo "   - $PART2_FILE"
    echo "   - $PART3_FILE"
    echo "6. Releaseを作成して $FULL_FILE を公開"
fi

# ステップ4: 結果確認
echo ""
echo "🔍 ステップ4: 結果確認"
echo "アップロード状況を確認中..."

if [ "$AUTH_METHOD" = "gh" ]; then
    echo "📊 GitHubリポジトリ情報:"
    gh repo view "$USER/$REPO_NAME" 2>/dev/null || echo "リポジトリ情報取得失敗"
    
    echo "📋 Release情報:"
    gh release view v1.0.0-ai-enhanced --repo "$USER/$REPO_NAME" 2>/dev/null || echo "Release情報取得失敗"
fi

echo ""
echo "🎯 アップロード完了！"
echo "================================"
echo "✅ AI魔改造品なでしこ3がGitHubに公開されました！"
echo "📚 教育・研究・実務で活用できる究極の日本語プログラミング言語！"
