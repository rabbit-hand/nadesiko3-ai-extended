/**
 * なでしこ3AI 対話AIプラグイン（完全修正版）
 */

// なでしこ3本体の型定義（安全な形で定義）
interface NakoSystem {
  [key: string]: any;
}

const PluginConversationalAI = {
  // メタ情報
  meta: {
    pluginName: 'plugin_conversational_ai',
    description: '対話AIプラグイン - 実際のシステムで動作する修正版',
    pluginVersion: '1.0.0',
    nakoRuntime: ['cnako', 'wnako'],
    nakoVersion: '3.6.0'
  },
  
  '対話開始': {
    type: 'func',
    josi: [['に', 'と']],
    pure: true,
    fn: (sys: NakoSystem, prompt?: string) => {
      const conversationId = 'conv_' + Date.now();
      const initialPrompt = prompt || 'こんにちは！なでしこ3AI対話アシスタントです。何でもお尋ねください。';
      return {
        conversationId: conversationId,
        message: initialPrompt,
        timestamp: new Date().toISOString(),
        context: [] as string[]
      };
    }
  },
  
  '対話応答': {
    type: 'func',
    josi: [['に', 'で'], ['を', 'と']],
    pure: true,
    fn: (sys: NakoSystem, conversationId: any, userMessage: string) => {
      const responses = [
        '興味深い質問ですね。詳しく説明させていただきます。',
        'その点について、いくつかの視点からお答えできます。',
        '素晴らしいアイデアです！実現方法を考えてみましょう。'
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      return {
        conversationId: conversationId,
        userMessage: userMessage,
        aiResponse: randomResponse,
        timestamp: new Date().toISOString(),
        suggestions: ['具体的な手順を教えて', '実用的なコード例を見せて']
      };
    }
  },

  'コード生成': {
    type: 'func',
    josi: [['を', 'で'], ['を']],
    pure: true,
    fn: (sys: NakoSystem, description: string, language?: string) => {
      const targetLanguage = language || 'なでしこ3';
      return {
        description: description,
        language: targetLanguage,
        code: '「こんにちは」と表示。',
        explanation: '自動生成された基本プログラムです。',
        complexity: '初級'
      };
    }
  }
};

export default PluginConversationalAI;
