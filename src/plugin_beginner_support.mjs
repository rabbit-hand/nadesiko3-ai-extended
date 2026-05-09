// PluginBeginnerSupport - プログラミング初心者支援プラグイン
const PluginBeginnerSupport = {
    '初期化': {
        type: 'func',
        josi: [],
        pure: true,
        fn: function (sys) {
        }
    },
    // --- 自然言語プログラミング ---
    '自然言語変換': {
        type: 'func',
        josi: [['を']],
        pure: true,
        fn: function (naturalText) {
            if (!naturalText || typeof naturalText !== 'string') {
                return { error: '自然言語テキストが必要です' };
            }
            const patterns = [
                {
                    pattern: /(.+)を表示して/,
                    action: '表示',
                    extract: (match) => ({ content: match[1] })
                },
                {
                    pattern: /(.+)を出力して/,
                    action: '表示',
                    extract: (match) => ({ content: match[1] })
                },
                {
                    pattern: /(.+)を印刷して/,
                    action: '表示',
                    extract: (match) => ({ content: match[1] })
                },
                {
                    pattern: /(.+)と(.+)を足して|(.+)に(.+)を足して|(.+)プラス(.+)/,
                    action: '計算',
                    extract: (match) => ({
                        operation: 'add',
                        values: [parseFloat(match[1]), parseFloat(match[2] || match[4] || match[6])]
                    })
                },
                {
                    pattern: /(.+)と(.+)を掛けて|(.+)に(.+)を掛けて|(.+)かける(.+)/,
                    action: '計算',
                    extract: (match) => ({
                        operation: 'multiply',
                        values: [parseFloat(match[1]), parseFloat(match[2] || match[4] || match[6])]
                    })
                },
                {
                    pattern: /(.+)から(.+)を引いて|(.+)マイナス(.+)/,
                    action: '計算',
                    extract: (match) => ({
                        operation: 'subtract',
                        values: [parseFloat(match[1]), parseFloat(match[2] || match[4])]
                    })
                },
                {
                    pattern: /(.+)を(.+)で割って|(.+)割る(.+)/,
                    action: '計算',
                    extract: (match) => ({
                        operation: 'divide',
                        values: [parseFloat(match[1]), parseFloat(match[2] || match[4])]
                    })
                },
                {
                    pattern: /(.+)回繰り返して|(.+)回ループして/,
                    action: '繰り返し',
                    extract: (match) => ({ count: parseInt(match[1]) })
                },
                {
                    pattern: /もし(.+)なら|もし(.+)だったら/,
                    action: '条件',
                    extract: (match) => ({ condition: match[1] === 'true' || match[1] === '真' })
                },
                {
                    pattern: /(.+)を入力して|(.+)を尋ねて/,
                    action: '入力',
                    extract: (match) => ({ prompt: match[1] })
                },
                {
                    pattern: /(.+)に(.+)を代入する|(.+)に(.+)を入れる/,
                    action: '代入',
                    extract: (match) => ({
                        variable: match[1],
                        value: match[2] || match[4]
                    })
                },
                {
                    pattern: /(.+)を(.+)と比較して|(.+)と(.+)を比べる/,
                    action: '比較',
                    extract: (match) => ({
                        left: match[1],
                        right: match[2] || match[4]
                    })
                }
            ];
            let converted = null;
            for (const pattern of patterns) {
                const match = naturalText.match(pattern.pattern);
                if (match) {
                    converted = {
                        originalText: naturalText,
                        action: pattern.action,
                        parameters: pattern.extract(match),
                        confidence: 0.9
                    };
                    break;
                }
            }
            if (!converted) {
                return {
                    originalText: naturalText,
                    action: '不明',
                    parameters: {},
                    confidence: 0.1,
                    suggestion: '「〜を表示して」「〜と〜を足して」などの形で試してください'
                };
            }
            return converted;
        }
    },
    '自然言語実行': {
        type: 'func',
        josi: [['を']],
        pure: true,
        fn: function (naturalText) {
            const converted = PluginBeginnerSupport['自然言語変換'].fn(naturalText);
            if (converted.action === '不明') {
                return {
                    success: false,
                    error: 'コマンドを理解できません',
                    suggestion: converted.suggestion
                };
            }
            let result = { action: converted.action, output: null };
            try {
                switch (converted.action) {
                    case '表示':
                        result.output = converted.parameters.content;
                        break;
                    case '計算':
                        if (converted.parameters.operation === 'add') {
                            result.output = converted.parameters.values.reduce((sum, val) => sum + val, 0);
                        }
                        else if (converted.parameters.operation === 'multiply') {
                            result.output = converted.parameters.values.reduce((prod, val) => prod * val, 1);
                        }
                        else if (converted.parameters.operation === 'subtract') {
                            result.output = converted.parameters.values[0] - converted.parameters.values[1];
                        }
                        else if (converted.parameters.operation === 'divide') {
                            result.output = converted.parameters.values[0] / converted.parameters.values[1];
                        }
                        break;
                    case '繰り返し':
                        result.output = `${converted.parameters.count}回繰り返しました`;
                        break;
                    case '条件':
                        result.output = converted.parameters.condition ? '条件は真です' : '条件は偽です';
                        break;
                    case '入力':
                        result.output = `${converted.parameters.prompt}の入力を受け付けました`;
                        break;
                    case '代入':
                        result.output = `${converted.parameters.variable}に${converted.parameters.value}を代入しました`;
                        break;
                    case '比較':
                        result.output = `${converted.parameters.left}と${converted.parameters.right}を比較しました`;
                        break;
                    default:
                        result.output = 'コマンドを実行しました';
                }
            }
            catch (error) {
                return {
                    success: false,
                    error: '実行エラー',
                    details: error
                };
            }
            return {
                success: true,
                originalText: naturalText,
                converted: converted,
                result: result,
                timestamp: Date.now()
            };
        }
    },
    // --- 対話型プログラミング支援 ---
    '対話開始': {
        type: 'func',
        josi: [],
        pure: true,
        fn: function () {
            return {
                sessionId: `session_${Date.now()}`,
                started: true,
                context: [],
                suggestions: [
                    '「こんにちは」と表示して',
                    '1と2を足して表示して',
                    '3回繰り返して',
                    'もし10より大きいなら'
                ],
                timestamp: Date.now()
            };
        }
    },
    '対話応答': {
        type: 'func',
        josi: [['に'], ['を']],
        pure: true,
        fn: function (session, userInput) {
            if (!session || !session.started) {
                return { error: '対話セッションが開始されていません' };
            }
            const execution = PluginBeginnerSupport['自然言語実行'].fn(userInput);
            // 文脈を更新
            session.context.push({
                input: userInput,
                output: execution.success ? execution.result.output : execution.error,
                timestamp: Date.now()
            });
            // 次の提案を生成
            let nextSuggestions = [];
            if (execution.success) {
                if (execution.converted.action === '表示') {
                    nextSuggestions = [
                        '別のものを表示して',
                        '計算結果を表示して',
                        '条件付きで表示して'
                    ];
                }
                else if (execution.converted.action === '計算') {
                    nextSuggestions = [
                        '計算結果を表示して',
                        '別の計算をして',
                        '結果を使って計算して'
                    ];
                }
                else if (execution.converted.action === '繰り返し') {
                    nextSuggestions = [
                        '繰り返しの中で何かをして',
                        '違う回数で繰り返して',
                        '繰り返しの結果を表示して'
                    ];
                }
            }
            else {
                nextSuggestions = [
                    '「〜を表示して」试试',
                    '「〜と〜を足して」试试',
                    '「〜回繰り返して」试试'
                ];
            }
            return {
                session: session,
                userInput: userInput,
                response: execution,
                nextSuggestions: nextSuggestions,
                progress: {
                    stepsCompleted: session.context.length,
                    confidence: execution.success ? 0.8 : 0.3
                },
                timestamp: Date.now()
            };
        }
    },
    // --- テンプレート機能 ---
    'テンプレート一覧': {
        type: 'func',
        josi: [],
        pure: true,
        fn: function () {
            return [
                {
                    name: '挨拶プログラム',
                    difficulty: '初心者',
                    category: '基本',
                    description: '簡単な挨拶を表示するプログラム',
                    template: '「こんにちは、なでしこ3AI！」と表示。',
                    features: ['文字列表示', '基本的な文法']
                },
                {
                    name: '電卓プログラム',
                    difficulty: '初心者',
                    category: '計算',
                    description: '簡単な計算を行うプログラム',
                    template: 'A = 10\nB = 20\nC = A + B\n「計算結果: {C}」と表示。',
                    features: ['変数', '四則演算', '表示']
                },
                {
                    name: '繰り返し練習',
                    difficulty: '初級',
                    category: '制御',
                    description: '繰り返し処理を学ぶプログラム',
                    template: '5回\n  「こんにちは！」と表示。\nここまで。',
                    features: ['繰り返し', 'インデント']
                },
                {
                    name: '条件分岐',
                    difficulty: '初級',
                    category: '制御',
                    description: 'if文を使った条件分岐',
                    template: '年齢 = 15\nもし、年齢 >= 18ならば\n  「大人です」と表示。\n違えば\n  「未成年です」と表示。\nここまで。',
                    features: ['条件分岐', '比較演算子']
                },
                {
                    name: '配列操作',
                    difficulty: '中級',
                    category: 'データ',
                    description: '配列の操作を学ぶプログラム',
                    template: 'リスト = [「りんご」, 「ばなな」, 「みかん」]\nリストを反復\n  「{対象}が好きです」と表示。\nここまで。',
                    features: ['配列', '反復処理']
                },
                {
                    name: '関数定義',
                    difficulty: '中級',
                    category: '関数',
                    description: '自作関数の定義と使用',
                    template: '●挨拶する(名前)\n  「こんにちは、{名前}さん！」と表示。\nここまで\n\n挨拶するする(\"田中\")',
                    features: ['関数定義', '引数', '呼び出し']
                }
            ];
        }
    },
    'テンプレート適用': {
        type: 'func',
        josi: [['を']],
        pure: true,
        fn: function (templateName) {
            const templates = PluginBeginnerSupport['テンプレート一覧'].fn();
            const template = templates.find((t) => t.name === templateName);
            if (!template) {
                return { error: 'テンプレートが見つかりません' };
            }
            return {
                template: template,
                applied: true,
                code: template.template,
                explanation: template.description,
                features: template.features,
                timestamp: Date.now()
            };
        }
    },
    // --- エラー支援 ---
    'エラー解決案': {
        type: 'func',
        josi: [['の']],
        pure: true,
        fn: function (errorMessage) {
            const errorSolutions = {
                '未解決の単語': {
                    cause: 'スペルミスまたは未定義の単語',
                    solutions: [
                        '単語のスペルを確認してください',
                        '単語が正しく定義されているか確認してください',
                        '助詞（「の」「を」「に」など）が正しいか確認してください'
                    ],
                    examples: [
                        '正: 「こんにちは」と表示する',
                        '誤: 「こんにちは」と表示すろ'
                    ]
                },
                '文法エラー': {
                    cause: '文法的な間違い',
                    solutions: [
                        '文の終わりに句点（。）があるか確認してください',
                        '括弧の対応が正しいか確認してください',
                        'インデントが正しいか確認してください'
                    ],
                    examples: [
                        '正: もし、条件ならば\n  処理\nここまで。',
                        '誤: もし、条件ならば\n  処理'
                    ]
                },
                '計算エラー': {
                    cause: '数値計算の間違い',
                    solutions: [
                        '数値が正しい形式か確認してください',
                        '割り算で0で割っていないか確認してください',
                        '変数に数値が代入されているか確認してください'
                    ],
                    examples: [
                        '正: A = 10 / 2',
                        '誤: A = 10 / 0'
                    ]
                }
            };
            let solution = null;
            Object.keys(errorSolutions).forEach(errorType => {
                if (errorMessage.includes(errorType)) {
                    solution = errorSolutions[errorType];
                    solution.type = errorType;
                }
            });
            if (!solution) {
                solution = {
                    type: '一般エラー',
                    cause: '原因不明のエラー',
                    solutions: [
                        'プログラム全体を見直してください',
                        'エラーが発生した行を確認してください',
                        '簡単なプログラムから試してください'
                    ],
                    examples: []
                };
            }
            return {
                originalError: errorMessage,
                solution: solution,
                helpful: true,
                timestamp: Date.now()
            };
        }
    },
    // --- 学習支援 ---
    '学習パス生成': {
        type: 'func',
        josi: [['の'], ['で']],
        pure: true,
        fn: function (level, interest) {
            const learningPaths = {
                '初心者': {
                    'ゲーム': [
                        { step: 1, title: '文字を表示する', template: '挨拶プログラム', time: 15 },
                        { step: 2, title: '簡単な計算', template: '電卓プログラム', time: 20 },
                        { step: 3, title: '繰り返し処理', template: '繰り返し練習', time: 25 },
                        { step: 4, title: '簡単なゲーム作成', template: 'ゲーム基本', time: 30 }
                    ],
                    'アート': [
                        { step: 1, title: '図形を描く', template: '図形描画', time: 15 },
                        { step: 2, title: '色の変更', template: '色彩操作', time: 20 },
                        { step: 3, title: 'アニメーション', template: '簡単アニメ', time: 25 },
                        { step: 4, title: '作品作成', template: 'アート作品', time: 30 }
                    ],
                    '科学': [
                        { step: 1, title: '科学計算', template: '科学計算基本', time: 15 },
                        { step: 2, title: 'データ表示', template: 'データ可視化', time: 20 },
                        { step: 3, title: '実験シミュレーション', template: '簡単実験', time: 25 },
                        { step: 4, title: '科学アプリ', template: '科学ツール', time: 30 }
                    ]
                },
                '中級者': {
                    'ゲーム': [
                        { step: 1, title: '関数の活用', template: 'ゲーム関数', time: 20 },
                        { step: 2, title: '配列管理', template: 'データ管理', time: 25 },
                        { step: 3, title: 'イベント処理', template: 'イベント駆動', time: 30 },
                        { step: 4, title: '本格的ゲーム', template: '本格ゲーム', time: 40 }
                    ],
                    'アート': [
                        { step: 1, title: '複雑な図形', template: '複雑図形', time: 20 },
                        { step: 2, title: '対話アート', template: '対話アート', time: 25 },
                        { step: 3, title: 'ジェネラティブ', template: '生成アート', time: 30 },
                        { step: 4, title: '作品展示', template: 'ギャラリー', time: 40 }
                    ],
                    '科学': [
                        { step: 1, title: '高度な計算', template: '科学計算上級', time: 20 },
                        { step: 2, title: 'シミュレーション', template: '詳細シミュレーション', time: 25 },
                        { step: 3, title: 'データ分析', template: '科学データ分析', time: 30 },
                        { step: 4, title: '研究ツール', template: '研究支援', time: 40 }
                    ]
                }
            };
            const path = learningPaths[level]?.[interest] || [];
            if (path.length === 0) {
                return {
                    level: level,
                    interest: interest,
                    path: [],
                    message: 'この組み合わせの学習パスはまだ準備中です',
                    suggestion: '初心者レベルから試してください'
                };
            }
            return {
                level: level,
                interest: interest,
                path: path,
                totalTime: path.reduce((sum, step) => sum + step.time, 0),
                estimatedDays: Math.ceil(path.reduce((sum, step) => sum + step.time, 0) / 30),
                difficulty: '段階的',
                timestamp: Date.now()
            };
        }
    },
    '進捗確認': {
        type: 'func',
        josi: [['の']],
        pure: true,
        fn: function (progressData) {
            if (!progressData || !progressData.completedSteps) {
                return { error: '進捗データが必要です' };
            }
            const completedSteps = progressData.completedSteps || [];
            const totalSteps = progressData.totalSteps || 1;
            const timeSpent = progressData.timeSpent || 0;
            const completionRate = (completedSteps.length / totalSteps) * 100;
            const averageTimePerStep = timeSpent / Math.max(completedSteps.length, 1);
            let level = '初心者';
            if (completionRate > 80)
                level = '上級者';
            else if (completionRate > 50)
                level = '中級者';
            const nextSteps = totalSteps - completedSteps.length;
            const estimatedTimeRemaining = nextSteps * averageTimePerStep;
            return {
                completedSteps: completedSteps.length,
                totalSteps: totalSteps,
                completionRate: completionRate,
                level: level,
                timeSpent: timeSpent,
                averageTimePerStep: averageTimePerStep,
                nextSteps: nextSteps,
                estimatedTimeRemaining: estimatedTimeRemaining,
                encouragement: completionRate > 50 ? '素晴らしい進捗です！' : '頑張ってください！',
                timestamp: Date.now()
            };
        }
    },
    // --- アクセシビリティ機能 ---
    '音声読み上げ': {
        type: 'func',
        josi: [['を']],
        pure: true,
        fn: function (text) {
            if (!text)
                return { error: 'テキストが必要です' };
            return {
                text: text,
                speech: {
                    enabled: true,
                    speed: 'normal',
                    voice: 'japanese-female',
                    volume: 0.8
                },
                readable: true,
                timestamp: Date.now()
            };
        }
    },
    '文字サイズ調整': {
        type: 'func',
        josi: [['に']],
        pure: true,
        fn: function (size) {
            const sizes = {
                '小さい': { fontSize: '12px', lineHeight: '1.4' },
                '普通': { fontSize: '16px', lineHeight: '1.5' },
                '大きい': { fontSize: '20px', lineHeight: '1.6' },
                '特大': { fontSize: '24px', lineHeight: '1.7' }
            };
            const setting = sizes[size] || sizes['普通'];
            return {
                size: size,
                settings: setting,
                accessibility: true,
                timestamp: Date.now()
            };
        }
    },
    // --- 簡単化機能 ---
    'プログラム簡素化': {
        type: 'func',
        josi: [['を']],
        pure: true,
        fn: function (complexCode) {
            if (!complexCode)
                return { error: 'コードが必要です' };
            // 簡単化ルール
            let simplified = complexCode;
            // 複雑な表現を簡単に
            simplified = simplified.replace(/console\.log/g, '表示');
            simplified = simplified.replace(/var |let |const /g, '');
            simplified = simplified.replace(/\{|\}/g, '');
            simplified = simplified.replace(/;/g, '');
            // 数字を漢数字に
            simplified = simplified.replace(/1/g, '１');
            simplified = simplified.replace(/2/g, '２');
            simplified = simplified.replace(/3/g, '３');
            return {
                original: complexCode,
                simplified: simplified,
                complexity: 'simple',
                readability: 'high',
                timestamp: Date.now()
            };
        }
    },
    'meta': {
        type: 'const',
        value: {
            pluginName: 'plugin_beginner_support',
            description: 'プログラミング初心者支援機能を提供するプラグイン',
            pluginVersion: '1.0.0',
            nakoRuntime: ['cnako', 'wnako'],
            nakoVersion: '3.6.0'
        }
    }
};
export default PluginBeginnerSupport;
