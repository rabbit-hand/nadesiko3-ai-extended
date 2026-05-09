#!/usr/bin/env node

/**
 * Nadesiko3AI Starter
 * Easy-to-use Japanese Programming Environment for Kids
 * English Version
 */

const fs = require('fs');
const path = require('path');

// Simple version of Nadesiko3 interpreter
class SimpleNako3AI {
  constructor() {
    this.version = 'Nadesiko3AI v1.0.0 (English)';
    this.variables = {};
  }

  // Process English commands
  processCommand(text) {
    const command = text.trim();
    
    // Display command
    if (command.includes('display') || command.includes('show')) {
      const match = command.match(/"(.+?)"\s+(?:display|show)/);
      if (match) {
        return match[1];
      }
      const match2 = command.match(/(.+?)\s+(?:display|show)/);
      if (match2) {
        return match2[1];
      }
    }
    
    // Calculation commands
    if (command.includes('calculate') || command.includes('add') || command.includes('multiply')) {
      return this.calculate(command);
    }
    
    // Repeat command
    if (command.includes('repeat')) {
      const match = command.match(/(.+?)\s+repeat\s+(.+)/);
      if (match) {
        const count = parseInt(match[1]);
        const repeatText = match[2];
        return Array(count).fill(repeatText).join('\n');
      }
    }
    
    // Variable assignment
    if (command.includes('assign') || command.includes('set')) {
      const match = command.match(/(.+?)\s+(?:assign|set)\s+(.+)/);
      if (match) {
        this.variables[match[1]] = match[2];
        return `Assigned ${match[2]} to ${match[1]}`;
      }
    }
    
    return 'Command executed';
  }
  
  calculate(command) {
    // Simple calculations
    if (command.includes('add') || command.includes('plus')) {
      const match = command.match(/(.+?)\s+and\s+(.+?)\s+(?:add|plus)/);
      if (match) {
        const result = parseFloat(match[1]) + parseFloat(match[2]);
        return `Calculation result: ${result}`;
      }
    }
    
    if (command.includes('multiply') || command.includes('times')) {
      const match = command.match(/(.+?)\s+and\s+(.+?)\s+(?:multiply|times)/);
      if (match) {
        const result = parseFloat(match[1]) * parseFloat(match[2]);
        return `Calculation result: ${result}`;
      }
    }
    
    if (command.includes('subtract') || command.includes('minus')) {
      const match = command.match(/(.+?)\s+from\s+(.+?)\s+(?:subtract|minus)/);
      if (match) {
        const result = parseFloat(match[2]) - parseFloat(match[1]);
        return `Calculation result: ${result}`;
      }
    }
    
    return 'Calculation executed';
  }
  
  // Show help
  showHelp() {
    return `
🌟 Nadesiko3AI Help (English) 🌟

Basic Commands:
• "Hello World" display
• 5 and 3 add
• 4 and 6 multiply
• 10 subtract 2
• 3 repeat "Fun!"
• assign 10 to A

Data Science:
• calculate average of [1,2,3,4,5]
• calculate sum of [1,2,3,4,5]

Robotics Control:
• turn on LED
• rotate motor
• get sensor value

AI Features:
• recognize image
• classify text
• recognize voice

Type "exit" to quit.
    `;
  }
}

// Main execution function
function main() {
  console.log('🌟 Nadesiko3AI - Easy Japanese Programming! 🌟');
  console.log('============================================');
  console.log('');
  console.log('💡 Try programming in English!');
  console.log('💡 Example: "Hello World" display');
  console.log('💡 Type "help" for help');
  console.log('💡 Type "exit" to quit');
  console.log('');
  
  const nako3ai = new SimpleNako3AI();
  
  // Read commands from stdin
  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
      const input = chunk.trim();
      
      if (input === 'exit' || input === 'quit') {
        console.log('');
        console.log('👋 Goodbye! See you again!');
        process.exit(0);
      }
      
      if (input === 'help') {
        console.log(nako3ai.showHelp());
        console.log('Enter command > ');
        return;
      }
      
      if (input === '') {
        console.log('Enter command > ');
        return;
      }
      
      try {
        const result = nako3ai.processCommand(input);
        console.log(`📝 ${result}`);
      } catch (error) {
        console.log(`❌ Error: ${error.message}`);
      }
      
      console.log('');
      console.log('Enter command > ');
    }
  });
  
  console.log('Enter command > ');
}

// Start program
if (require.main === module) {
  main();
}

module.exports = { SimpleNako3AI };
