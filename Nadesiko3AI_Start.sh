#!/bin/bash

# Nadesiko3AI Startup Script
# Easy Japanese Programming for Kids!

echo ""
echo "🌟 Nadesiko3AI - Easy Japanese Programming for Kids! 🌟"
echo "==================================================="
echo ""
echo "💡 Try programming in simple English or Japanese!"
echo "💡 Example: \"Hello World!\" display or 「こんにちは」を表示"
echo "💡 Type \"exit\" to quit"
echo ""
echo "1. Start Web Version (Recommended)"
echo "2. Start Japanese Command Version"
echo "3. Start English Command Version"
echo "4. Exit"
echo ""

while true; do
    read -p "Choose (1-4): " choice
    
    case $choice in
        1)
            echo ""
            echo "🌐 Starting Web Version..."
            echo "Browser will open, ready to use!"
            echo ""
            
            # Open HTML file in default browser
            if command -v open &> /dev/null; then
                # macOS
                open "$(dirname "$0")/nadesiko3ai_web.html"
            elif command -v xdg-open &> /dev/null; then
                # Linux
                xdg-open "$(dirname "$0")/nadesiko3ai_web.html"
            else
                echo "Cannot open browser. Please open nadesiko3ai_web.html manually."
            fi
            ;;
        2)
            echo ""
            echo "💻 Starting Japanese Command Version..."
            echo ""
            node "$(dirname "$0")/nadesiko3ai_starter.js"
            ;;
        3)
            echo ""
            echo "💻 Starting English Command Version..."
            echo ""
            node "$(dirname "$0")/nadesiko3ai_starter_en.js"
            ;;
        4)
            echo ""
            echo "👋 Goodbye! See you again!"
            exit 0
            ;;
        *)
            echo "Invalid choice. Please try again."
            ;;
    esac
    
    echo ""
    echo "Choose again (1-4): "
done
