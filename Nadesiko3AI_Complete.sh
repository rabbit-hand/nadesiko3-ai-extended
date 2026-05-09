#!/bin/bash

# Nadesiko3AI Complete Launcher Script
# Multi-Language Programming Environment

echo ""
echo "🌟 Nadesiko3AI Complete - Multi-Language Programming Environment 🌟"
echo "==============================================================="
echo ""
echo "💡 Choose your mode and language:"
echo "💡 Example: \"Hello World!\" display or 「こんにちは」を表示"
echo "💡 Type \"exit\" to quit"
echo ""
echo "📱 Web Versions (Recommended):"
echo "1. Kids Japanese Web Version"
echo "2. Kids English Web Version"  
echo "3. Adult Japanese Web Version"
echo "4. Adult English Web Version"
echo ""
echo "💻 Command Versions:"
echo "5. Kids Japanese Command Version"
echo "6. Kids English Command Version"
echo "7. Adult Japanese Command Version"
echo "8. Adult English Command Version"
echo ""
echo "9. Exit"
echo ""

while true; do
    read -p "Choose (1-9): " choice
    
    case $choice in
        1)
            echo ""
            echo "🌐 Starting Kids Japanese Web Version..."
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
            echo "🌐 Starting Kids English Web Version..."
            echo "Browser will open, ready to use!"
            echo ""
            
            if command -v open &> /dev/null; then
                open "$(dirname "$0")/nadesiko3ai_web_en.html"
            elif command -v xdg-open &> /dev/null; then
                xdg-open "$(dirname "$0")/nadesiko3ai_web_en.html"
            else
                echo "Cannot open browser. Please open nadesiko3ai_web_en.html manually."
            fi
            ;;
        3)
            echo ""
            echo "🌐 Starting Adult Japanese Web Version..."
            echo "Browser will open, ready to use!"
            echo ""
            
            if command -v open &> /dev/null; then
                open "$(dirname "$0")/nadesiko3ai_adult_web.html"
            elif command -v xdg-open &> /dev/null; then
                xdg-open "$(dirname "$0")/nadesiko3ai_adult_web.html"
            else
                echo "Cannot open browser. Please open nadesiko3ai_adult_web.html manually."
            fi
            ;;
        4)
            echo ""
            echo "🌐 Starting Adult English Web Version..."
            echo "Browser will open, ready to use!"
            echo ""
            
            if command -v open &> /dev/null; then
                open "$(dirname "$0")/nadesiko3ai_adult_web_en.html"
            elif command -v xdg-open &> /dev/null; then
                xdg-open "$(dirname "$0")/nadesiko3ai_adult_web_en.html"
            else
                echo "Cannot open browser. Please open nadesiko3ai_adult_web_en.html manually."
            fi
            ;;
        5)
            echo ""
            echo "💻 Starting Kids Japanese Command Version..."
            echo ""
            node "$(dirname "$0")/nadesiko3ai_starter.js"
            ;;
        6)
            echo ""
            echo "💻 Starting Kids English Command Version..."
            echo ""
            node "$(dirname "$0")/nadesiko3ai_starter_en.js"
            ;;
        7)
            echo ""
            echo "💻 Starting Adult Japanese Command Version..."
            echo ""
            node "$(dirname "$0")/nadesiko3ai_adult_starter.js"
            ;;
        8)
            echo ""
            echo "💻 Starting Adult English Command Version..."
            echo ""
            node "$(dirname "$0")/nadesiko3ai_adult_starter_en.js"
            ;;
        9)
            echo ""
            echo "👋 Goodbye! See you again!"
            echo "🌟 Thank you for using Nadesiko3AI Complete!"
            exit 0
            ;;
        *)
            echo "Invalid choice. Please try again."
            ;;
    esac
    
    echo ""
    echo "Choose again (1-9): "
done
