/**
 * なでしこ3AI 簡素化版プラグイン
 */
const PluginConversationalAI = {
  meta: {
    pluginName: 'plugin_conversational_ai',
    description: 'AI対話機能（シンプル版）',
    pluginVersion: '1.0.0',
    nakoRuntime: ['cnako', 'wnako'],
    nakoVersion: '3.6.0'
  },
  'AI話す': {
    type: 'func',
    josi: [['と', 'に']],
    pure: true,
    fn: (sys: any, msg: string) => {
      return `AIの応答: 「${msg}」についてですね。お調べいたします。`;
    }
  }
};

export default PluginConversationalAI;
