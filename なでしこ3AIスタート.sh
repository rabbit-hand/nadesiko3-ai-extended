#!/bin/bash

# なでしこ3AI スタートスクリプト
# 子供でも簡単！日本語プログラミング

echo ""
echo "🌟 なでしこ3AI - 子供でも簡単！日本語プログラミング 🌟"
echo "==================================================="
echo ""
echo "💡 ヒント: 日本語でプログラミングしてみよう！"
echo "💡 例: 「こんにちは」を表示"
echo "💡 終了するには「終了」と入力"
echo ""
echo "1. Web版で始める (推奨)"
echo "2. コマンド版で始める"
echo "3. 終了"
echo ""

while true; do
    read -p "選択してください (1-3): " choice
    
    case $choice in
        1)
            echo ""
            echo "🌐 Web版を起動します..."
            echo "ブラウザが開いたら、すぐに始められます！"
            echo ""
            
            # デフォルトブラウザでHTMLファイルを開く
            if command -v open &> /dev/null; then
                # macOS
                open "$(dirname "$0")/nadesiko3ai_web.html"
            elif command -v xdg-open &> /dev/null; then
                # Linux
                xdg-open "$(dirname "$0")/nadesiko3ai_web.html"
            else
                echo "ブラウザを開けませんでした。手動で nadesiko3ai_web.html を開いてください。"
            fi
            ;;
        2)
            echo ""
            echo "💻 コマンド版を起動します..."
            echo ""
            node "$(dirname "$0")/nadesiko3ai_starter.js"
            ;;
        3)
            echo ""
            echo "👋 なでしこ3AIを終了します。また遊んでね！"
            exit 0
            ;;
        *)
            echo "無効な選択です。もう一度試してください。"
            ;;
    esac
    
    echo ""
    echo "もう一度選択してください (1-3): "
done
