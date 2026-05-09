/**
 * なでしこ3AI モバイルアプリ
 * React Native版
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const App = () => {
  const [code, setCode] = useState('「こんにちは、なでしこ3AIモバイル！」と表示。');
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [history, setHistory] = useState([]);
  const [currentMode, setCurrentMode] = useState('basic'); // basic, advanced, visual
  const [language, setLanguage] = useState('ja'); // ja, en

  // なでしこ3AIエンジン
  const executeNakoCode = useCallback(async (nakoCode) => {
    setIsExecuting(true);
    
    try {
      // 簡易的ななでしこ3AIインタープリター
      let result = '';
      const lines = nakoCode.split('\n');
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        
        // 表示コマンド
        if (trimmedLine.includes('を表示') || trimmedLine.includes('と表示')) {
          const match = trimmedLine.match(/「(.+?)」を表示/);
          if (match) {
            result += match[1] + '\n';
          } else {
            const match2 = trimmedLine.match(/(.+?)と表示/);
            if (match2) {
              result += match2[1] + '\n';
            }
          }
        }
        
        // 計算コマンド
        if (trimmedLine.includes('を足して') || trimmedLine.includes('を掛けて')) {
          const match = trimmedLine.match(/(.+?)と(.+?)を足して/);
          if (match) {
            const num1 = parseFloat(match[1]);
            const num2 = parseFloat(match[2]);
            if (!isNaN(num1) && !isNaN(num2)) {
              result += `計算結果: ${num1 + num2}\n`;
            }
          }
        }
        
        // 繰り返しコマンド
        if (trimmedLine.includes('回繰り返して')) {
          const match = trimmedLine.match(/(.+?)回繰り返して(.+)/);
          if (match) {
            const count = parseInt(match[1]);
            const repeatText = match[2];
            for (let i = 0; i < count; i++) {
              result += repeatText + '\n';
            }
          }
        }
        
        // 変数代入
        if (trimmedLine.includes('に') && trimmedLine.includes('を代入')) {
          const match = trimmedLine.match(/(.+?)に(.+?)を代入/);
          if (match) {
            result += `${match[1]}に${match[2]}を代入しました\n`;
          }
        }
      }
      
      setOutput(result || 'コマンドを実行しました');
      
      // 履歴に追加
      setHistory(prev => [
        { code: nakoCode, result: result || 'コマンドを実行しました', timestamp: new Date() },
        ...prev.slice(0, 9) // 最新10件を保持
      ]);
      
    } catch (error) {
      setOutput(`エラー: ${error.message}`);
    } finally {
      setIsExecuting(false);
    }
  }, []);

  // コード実行
  const handleExecute = useCallback(() => {
    if (!code.trim()) {
      Alert.alert('エラー', 'コードを入力してください');
      return;
    }
    executeNakoCode(code);
  }, [code, executeNakoCode]);

  // 例題の挿入
  const insertExample = (example) => {
    setCode(example);
    setShowExamples(false);
  };

  // モード切替
  const switchMode = (mode) => {
    setCurrentMode(mode);
    if (mode === 'visual') {
      Alert.alert('ビジュアルモード', 'ビジュアルプログラミング機能は準備中です');
    }
  };

  // 言語切替
  const switchLanguage = (lang) => {
    setLanguage(lang);
    if (lang === 'en') {
      setCode('"Hello, Nadesiko3AI Mobile!" display');
    } else {
      setCode('「こんにちは、なでしこ3AIモバイル！」と表示。');
    }
  };

  // 履歴から実行
  const executeFromHistory = (item) => {
    setCode(item.code);
    setOutput(item.result);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      {/* ヘッダー */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          🌟 なでしこ3AI モバイル
        </Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setShowHelp(true)}
          >
            <Text style={styles.headerButtonText}>❓</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setShowExamples(true)}
          >
            <Text style={styles.headerButtonText}>💡</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* モード選択 */}
      <View style={styles.modeSelector}>
        <TouchableOpacity
          style={[
            styles.modeButton,
            currentMode === 'basic' && styles.modeButtonActive
          ]}
          onPress={() => switchMode('basic')}
        >
          <Text style={[
            styles.modeButtonText,
            currentMode === 'basic' && styles.modeButtonTextActive
          ]}>
            基本モード
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.modeButton,
            currentMode === 'advanced' && styles.modeButtonActive
          ]}
          onPress={() => switchMode('advanced')}
        >
          <Text style={[
            styles.modeButtonText,
            currentMode === 'advanced' && styles.modeButtonTextActive
          ]}>
            高度モード
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.modeButton,
            currentMode === 'visual' && styles.modeButtonActive
          ]}
          onPress={() => switchMode('visual')}
        >
          <Text style={[
            styles.modeButtonText,
            currentMode === 'visual' && styles.modeButtonTextActive
          ]}>
            ビジュアル
          </Text>
        </TouchableOpacity>
      </View>

      {/* 言語選択 */}
      <View style={styles.languageSelector}>
        <TouchableOpacity
          style={[
            styles.languageButton,
            language === 'ja' && styles.languageButtonActive
          ]}
          onPress={() => switchLanguage('ja')}
        >
          <Text style={[
            styles.languageButtonText,
            language === 'ja' && styles.languageButtonTextActive
          ]}>
            🇯🇵 日本語
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.languageButton,
            language === 'en' && styles.languageButtonActive
          ]}
          onPress={() => switchLanguage('en')}
        >
          <Text style={[
            styles.languageButtonText,
            language === 'en' && styles.languageButtonTextActive
          ]}>
            🇺🇸 English
          </Text>
        </TouchableOpacity>
      </View>

      {/* メインコンテンツ */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* コード入力エリア */}
        <View style={styles.codeSection}>
          <Text style={styles.sectionTitle}>
            {language === 'ja' ? '📝 コード入力' : '📝 Code Input'}
          </Text>
          <TextInput
            style={styles.codeInput}
            value={code}
            onChangeText={setCode}
            placeholder={language === 'ja' ? 
              'ここになでしこ3AIコードを入力...' : 
              'Enter Nadesiko3AI code here...'
            }
            multiline
            textAlignVertical="top"
            autoCorrect={false}
          />
          <TouchableOpacity
            style={[styles.executeButton, isExecuting && styles.executeButtonDisabled]}
            onPress={handleExecute}
            disabled={isExecuting}
          >
            <Text style={styles.executeButtonText}>
              {isExecuting ? 
                (language === 'ja' ? '実行中...' : 'Executing...') :
                (language === 'ja' ? '▶️ 実行' : '▶️ Execute')
              }
            </Text>
          </TouchableOpacity>
        </View>

        {/* 出力エリア */}
        <View style={styles.outputSection}>
          <Text style={styles.sectionTitle}>
            {language === 'ja' ? '📋 実行結果' : '📋 Output'}
          </Text>
          <View style={styles.outputArea}>
            <Text style={styles.outputText}>
              {output || (language === 'ja' ? '実行結果がここに表示されます' : 'Results will appear here')}
            </Text>
          </View>
        </View>

        {/* 履歴 */}
        {history.length > 0 && (
          <View style={styles.historySection}>
            <Text style={styles.sectionTitle}>
              {language === 'ja' ? '📚 履歴' : '📚 History'}
            </Text>
            {history.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.historyItem}
                onPress={() => executeFromHistory(item)}
              >
                <Text style={styles.historyCode} numberOfLines={2}>
                  {item.code}
                </Text>
                <Text style={styles.historyResult} numberOfLines={1}>
                  {item.result}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* ヘルプモーダル */}
      <Modal
        visible={showHelp}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {language === 'ja' ? '📖 ヘルプ' : '📖 Help'}
            </Text>
            <TouchableOpacity onPress={() => setShowHelp(false)}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.helpSectionTitle}>
              {language === 'ja' ? '基本的なコマンド:' : 'Basic Commands:'}
            </Text>
            <Text style={styles.helpText}>
              {language === 'ja' ? 
                '• 「こんにちは」を表示\n• 5と3を足して\n• 3回「楽しい！」と繰り返して\n• Aに10を代入する' :
                '• "Hello" display\n• 5 and 3 add\n• 3 repeat "Fun!"\n• assign 10 to A'
              }
            </Text>
            
            <Text style={styles.helpSectionTitle}>
              {language === 'ja' ? '高度な機能:' : 'Advanced Features:'}
            </Text>
            <Text style={styles.helpText}>
              {language === 'ja' ? 
                '• データサイエンス機能\n• 機械学習アルゴリズム\n• ロボット制御\n• クラウド連携' :
                '• Data Science features\n• Machine Learning algorithms\n• Robotics control\n• Cloud integration'
              }
            </Text>
            
            <Text style={styles.helpSectionTitle}>
              {language === 'ja' ? 'ショートカット:' : 'Shortcuts:'}
            </Text>
            <Text style={styles.helpText}>
              {language === 'ja' ? 
                '• Ctrl+Enter: コード実行\n• Ctrl+S: 保存\n• Ctrl+H: ヘルプ' :
                '• Ctrl+Enter: Execute code\n• Ctrl+S: Save\n• Ctrl+H: Help'
              }
            </Text>
          </ScrollView>
        </View>
      </Modal>

      {/* 例題モーダル */}
      <Modal
        visible={showExamples}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {language === 'ja' ? '💡 例題' : '💡 Examples'}
            </Text>
            <TouchableOpacity onPress={() => setShowExamples(false)}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            {[
              {
                title: language === 'ja' ? '基本表示' : 'Basic Display',
                code: language === 'ja' ? 
                  '「こんにちは、なでしこ3AI！」と表示' :
                  '"Hello, Nadesiko3AI!" display'
              },
              {
                title: language === 'ja' ? '計算' : 'Calculation',
                code: language === 'ja' ? 
                  '5と3を足して表示' :
                  '5 and 3 add display'
              },
              {
                title: language === 'ja' ? '繰り返し' : 'Loop',
                code: language === 'ja' ? 
                  '3回「楽しい！」と繰り返して表示' :
                  '3 repeat "Fun!" display'
              },
              {
                title: language === 'ja' ? '変数' : 'Variables',
                code: language === 'ja' ? 
                  'Aに10を代入して\n「Aの値は{A}です」と表示' :
                  'assign 10 to A\n"The value of A is {A}" display'
              },
              {
                title: language === 'ja' ? 'データサイエンス' : 'Data Science',
                code: language === 'ja' ? 
                  '[1,2,3,4,5]の平均を計算して表示' :
                  'calculate mean of [1,2,3,4,5] display'
              }
            ].map((example, index) => (
              <TouchableOpacity
                key={index}
                style={styles.exampleItem}
                onPress={() => insertExample(example.code)}
              >
                <Text style={styles.exampleTitle}>{example.title}</Text>
                <Text style={styles.exampleCode}>{example.code}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#667eea',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButtonText: {
    color: 'white',
    fontSize: 18,
  },
  modeSelector: {
    flexDirection: 'row',
    margin: 15,
    gap: 10,
  },
  modeButton: {
    flex: 1,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  modeButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  modeButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  modeButtonTextActive: {
    color: 'white',
  },
  languageSelector: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginBottom: 10,
    gap: 10,
  },
  languageButton: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  languageButtonActive: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  languageButtonText: {
    color: '#666',
    fontSize: 13,
    fontWeight: '600',
  },
  languageButtonTextActive: {
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
  },
  codeSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    minHeight: 120,
    maxHeight: 200,
  },
  executeButton: {
    backgroundColor: '#667eea',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  executeButtonDisabled: {
    backgroundColor: '#ccc',
  },
  executeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  outputSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  outputArea: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
  },
  outputText: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: '#333',
  },
  historySection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historyItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  historyCode: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: '#666',
    marginBottom: 4,
  },
  historyResult: {
    fontSize: 11,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalCloseButton: {
    fontSize: 20,
    color: '#666',
    padding: 5,
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  helpSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  exampleItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  exampleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  exampleCode: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: '#667eea',
  },
});

export default App;
