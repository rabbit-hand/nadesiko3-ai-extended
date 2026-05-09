// PluginAPI - API機能プラグイン
const PluginAPI = {
    '初期化': {
        type: 'func',
        josi: [],
        pure: true,
        fn: function (sys) {
        }
    },
    // --- HTTP API送受信 ---
    'API送信': {
        type: 'func',
        josi: [['に'], ['を'], ['で']],
        pure: true,
        fn: function (url, data, method = 'GET') {
            if (!url)
                return { error: 'URLが指定されていません' };
            const headers = {
                'Content-Type': 'application/json',
                'User-Agent': 'Nadesiko3AI/1.0'
            };
            const options = {
                method: method.toUpperCase(),
                headers: headers
            };
            if (method.toUpperCase() !== 'GET' && data) {
                options.body = JSON.stringify(data);
            }
            return {
                url: url,
                method: method.toUpperCase(),
                headers: headers,
                body: data,
                options: options,
                status: 'prepared',
                timestamp: Date.now()
            };
        }
    },
    'API受信': {
        type: 'func',
        josi: [['から']],
        pure: true,
        fn: function (request) {
            if (!request)
                return { error: 'リクエストが指定されていません' };
            // モックレスポンス
            const mockResponses = {
                'GET': {
                    status: 200,
                    data: { message: 'GETリクエスト成功', timestamp: Date.now() },
                    headers: { 'Content-Type': 'application/json' }
                },
                'POST': {
                    status: 201,
                    data: { message: 'POSTリクエスト成功', created: true, id: Math.floor(Math.random() * 1000) },
                    headers: { 'Content-Type': 'application/json' }
                },
                'PUT': {
                    status: 200,
                    data: { message: 'PUTリクエスト成功', updated: true },
                    headers: { 'Content-Type': 'application/json' }
                },
                'DELETE': {
                    status: 200,
                    data: { message: 'DELETEリクエスト成功', deleted: true },
                    headers: { 'Content-Type': 'application/json' }
                }
            };
            const response = mockResponses[request.method] || mockResponses['GET'];
            return {
                status: response.status,
                data: response.data,
                headers: response.headers,
                url: request.url,
                method: request.method,
                timestamp: Date.now(),
                responseTime: Math.random() * 1000 // モック応答時間
            };
        }
    },
    'API実行': {
        type: 'func',
        josi: [['を']],
        pure: true,
        fn: function (request) {
            if (!request)
                return { error: 'リクエストが指定されていません' };
            // リクエスト実行のシミュレーション
            const response = PluginAPI['API受信'].fn(request);
            return {
                request: request,
                response: response,
                success: response.status >= 200 && response.status < 300,
                timestamp: Date.now()
            };
        }
    },
    // --- RESTful API ---
    'REST_GET': {
        type: 'func',
        josi: [['から']],
        pure: true,
        fn: function (url, params = {}) {
            const queryString = Object.keys(params)
                .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
                .join('&');
            const fullUrl = queryString ? `${url}?${queryString}` : url;
            const request = PluginAPI['API送信'].fn(fullUrl, null, 'GET');
            return PluginAPI['API実行'].fn(request);
        }
    },
    'REST_POST': {
        type: 'func',
        josi: [['に'], ['を']],
        pure: true,
        fn: function (url, data) {
            const request = PluginAPI['API送信'].fn(url, data, 'POST');
            return PluginAPI['API実行'].fn(request);
        }
    },
    'REST_PUT': {
        type: 'func',
        josi: [['に'], ['を']],
        pure: true,
        fn: function (url, data) {
            const request = PluginAPI['API送信'].fn(url, data, 'PUT');
            return PluginAPI['API実行'].fn(request);
        }
    },
    'REST_DELETE': {
        type: 'func',
        josi: [['から']],
        pure: true,
        fn: function (url) {
            const request = PluginAPI['API送信'].fn(url, null, 'DELETE');
            return PluginAPI['API実行'].fn(request);
        }
    },
    // --- APIサーバー作成 ---
    'APIサーバー作成': {
        type: 'func',
        josi: [['の']],
        pure: true,
        fn: function (port = 3000) {
            return {
                port: port,
                routes: {},
                middleware: [],
                status: 'created',
                startTime: Date.now()
            };
        }
    },
    'APIルート追加': {
        type: 'func',
        josi: [['に'], ['を'], ['で']],
        pure: true,
        fn: function (server, path, handler) {
            if (!server || !path)
                return { error: 'サーバーまたはパスが指定されていません' };
            if (!server.routes)
                server.routes = {};
            server.routes[path] = {
                handler: handler,
                method: 'GET',
                created: Date.now()
            };
            return {
                server: server,
                route: path,
                status: 'added',
                timestamp: Date.now()
            };
        }
    },
    'APIミドルウェア追加': {
        type: 'func',
        josi: [['に'], ['を']],
        pure: true,
        fn: function (server, middleware) {
            if (!server)
                return { error: 'サーバーが指定されていません' };
            if (!server.middleware)
                server.middleware = [];
            server.middleware.push({
                name: middleware.name || 'anonymous',
                handler: middleware,
                added: Date.now()
            });
            return {
                server: server,
                middleware: middleware,
                status: 'added',
                timestamp: Date.now()
            };
        }
    },
    'APIサーバー起動': {
        type: 'func',
        josi: [['を']],
        pure: true,
        fn: function (server) {
            if (!server)
                return { error: 'サーバーが指定されていません' };
            return {
                server: server,
                status: 'running',
                url: `http://localhost:${server.port}`,
                startTime: Date.now(),
                uptime: 0
            };
        }
    },
    // --- WebSocket API ---
    'WebSocket接続': {
        type: 'func',
        josi: [['に']],
        pure: true,
        fn: function (url) {
            if (!url)
                return { error: 'URLが指定されていません' };
            return {
                url: url,
                status: 'connected',
                connected: true,
                readyState: 1, // WebSocket.OPEN
                timestamp: Date.now()
            };
        }
    },
    'WebSocket送信': {
        type: 'func',
        josi: [['に'], ['を']],
        pure: true,
        fn: function (websocket, data) {
            if (!websocket || !websocket.connected) {
                return { error: 'WebSocket接続が確立されていません' };
            }
            return {
                websocket: websocket,
                data: data,
                sent: true,
                timestamp: Date.now()
            };
        }
    },
    'WebSocket受信': {
        type: 'func',
        josi: [['から']],
        pure: true,
        fn: function (websocket) {
            if (!websocket || !websocket.connected) {
                return { error: 'WebSocket接続が確立されていません' };
            }
            // モック受信データ
            const mockData = {
                type: 'message',
                data: 'WebSocketメッセージ受信',
                timestamp: Date.now()
            };
            return {
                websocket: websocket,
                data: mockData,
                received: true,
                timestamp: Date.now()
            };
        }
    },
    // --- GraphQL API ---
    'GraphQLクエリ': {
        type: 'func',
        josi: [['に'], ['を']],
        pure: true,
        fn: function (url, query, variables = {}) {
            if (!url || !query)
                return { error: 'URLまたはクエリが指定されていません' };
            const graphqlRequest = {
                query: query,
                variables: variables
            };
            const request = PluginAPI['API送信'].fn(url, graphqlRequest, 'POST');
            return PluginAPI['API実行'].fn(request);
        }
    },
    'GraphQLミューテーション': {
        type: 'func',
        josi: [['に'], ['を']],
        pure: true,
        fn: function (url, mutation, variables = {}) {
            if (!url || !mutation)
                return { error: 'URLまたはミューテーションが指定されていません' };
            const graphqlRequest = {
                query: mutation,
                variables: variables
            };
            const request = PluginAPI['API送信'].fn(url, graphqlRequest, 'POST');
            return PluginAPI['API実行'].fn(request);
        }
    },
    // --- API認証・セキュリティ ---
    'APIキー生成': {
        type: 'func',
        josi: [],
        pure: true,
        fn: function () {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let apiKey = '';
            for (let i = 0; i < 32; i++) {
                apiKey += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return apiKey;
        }
    },
    'JWT生成': {
        type: 'func',
        josi: [['の']],
        pure: true,
        fn: function (payload) {
            if (!payload)
                return '';
            // 簡易JWT生成（実際はより複雑な処理が必要）
            const header = { alg: 'HS256', typ: 'JWT' };
            const encodedHeader = Buffer.from(JSON.stringify(header)).toString('base64');
            const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
            const signature = Buffer.from(`${encodedHeader}.${encodedPayload}`).toString('base64');
            return `${encodedHeader}.${encodedPayload}.${signature}`;
        }
    },
    'JWT検証': {
        type: 'func',
        josi: [['の']],
        pure: true,
        fn: function (token) {
            if (!token)
                return { valid: false, error: 'トークンが指定されていません' };
            try {
                const parts = token.split('.');
                if (parts.length !== 3)
                    return { valid: false, error: '無効なトークン形式' };
                const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
                return {
                    valid: true,
                    payload: payload,
                    header: JSON.parse(Buffer.from(parts[0], 'base64').toString()),
                    timestamp: Date.now()
                };
            }
            catch (error) {
                return { valid: false, error: 'トークン解析エラー' };
            }
        }
    },
    'API認証ヘッダー': {
        type: 'func',
        josi: [['で'], ['を']],
        pure: true,
        fn: function (token, type = 'Bearer') {
            return `${type} ${token}`;
        }
    },
    // --- APIテスト・デバッグ ---
    'APIテスト': {
        type: 'func',
        josi: [['の']],
        pure: true,
        fn: function (endpoint) {
            if (!endpoint)
                return { error: 'エンドポイントが指定されていません' };
            const testResults = [];
            // GETテスト
            const getTest = PluginAPI['REST_GET'].fn(endpoint);
            testResults.push({
                method: 'GET',
                success: getTest.success,
                status: getTest.response.status,
                responseTime: getTest.response.responseTime
            });
            // POSTテスト
            const postTest = PluginAPI['REST_POST'].fn(endpoint, { test: 'data' });
            testResults.push({
                method: 'POST',
                success: postTest.success,
                status: postTest.response.status,
                responseTime: postTest.response.responseTime
            });
            return {
                endpoint: endpoint,
                tests: testResults,
                successRate: testResults.filter(t => t.success).length / testResults.length,
                averageResponseTime: testResults.reduce((sum, t) => sum + t.responseTime, 0) / testResults.length,
                timestamp: Date.now()
            };
        }
    },
    'APIデバッグ': {
        type: 'func',
        josi: [['の']],
        pure: true,
        fn: function (request) {
            if (!request)
                return { error: 'リクエストが指定されていません' };
            return {
                request: request,
                debug: {
                    url: request.url,
                    method: request.method,
                    headers: request.headers,
                    body: request.body,
                    timestamp: request.timestamp
                },
                suggestions: [
                    'URLが正しいか確認してください',
                    'HTTPメソッドが適切か確認してください',
                    'リクエストヘッダーが正しいか確認してください',
                    'リクエストボディの形式が正しいか確認してください'
                ],
                timestamp: Date.now()
            };
        }
    },
    // --- APIドキュメンテーション ---
    'APIドキュメント生成': {
        type: 'func',
        josi: [['の']],
        pure: true,
        fn: function (server) {
            if (!server)
                return { error: 'サーバーが指定されていません' };
            const documentation = {
                title: 'API Documentation',
                version: '1.0.0',
                baseUrl: `http://localhost:${server.port}`,
                routes: [],
                generated: Date.now()
            };
            if (server.routes) {
                Object.keys(server.routes).forEach(path => {
                    documentation.routes.push({
                        path: path,
                        method: server.routes[path].method,
                        description: `${path}エンドポイント`,
                        parameters: [],
                        responses: {
                            '200': { description: '成功' },
                            '400': { description: 'リクエストエラー' },
                            '500': { description: 'サーバーエラー' }
                        }
                    });
                });
            }
            return documentation;
        }
    },
    'API仕様書作成': {
        type: 'func',
        josi: [['の']],
        pure: true,
        fn: function (server) {
            const doc = PluginAPI['APIドキュメント生成'].fn(server);
            let spec = `# ${doc.title}\n\n`;
            spec += `## バージョン\n${doc.version}\n\n`;
            spec += `## ベースURL\n${doc.baseUrl}\n\n`;
            spec += `## エンドポイント\n\n`;
            doc.routes.forEach((route) => {
                spec += `### ${route.method} ${route.path}\n\n`;
                spec += `${route.description}\n\n`;
                spec += `#### パラメータ\n`;
                spec += `- なし\n\n`;
                spec += `#### レスポンス\n`;
                Object.keys(route.responses).forEach(status => {
                    spec += `- ${status}: ${route.responses[status].description}\n`;
                });
                spec += `\n`;
            });
            return spec;
        }
    },
    // --- API監視 ---
    'API監視': {
        type: 'func',
        josi: [['の']],
        pure: true,
        fn: function (endpoint) {
            if (!endpoint)
                return { error: 'エンドポイントが指定されていません' };
            const testResult = PluginAPI['APIテスト'].fn(endpoint);
            return {
                endpoint: endpoint,
                availability: testResult.successRate,
                averageResponseTime: testResult.averageResponseTime,
                status: testResult.successRate > 0.8 ? 'healthy' : 'unhealthy',
                lastCheck: Date.now(),
                metrics: {
                    requestsPerMinute: Math.floor(Math.random() * 100),
                    errorRate: (1 - testResult.successRate) * 100,
                    uptime: Math.random() * 100
                }
            };
        }
    },
    'APIログ': {
        type: 'func',
        josi: [['の']],
        pure: true,
        fn: function (server) {
            if (!server)
                return [];
            // モックログデータ
            const logs = [];
            const now = Date.now();
            for (let i = 0; i < 10; i++) {
                logs.push({
                    timestamp: now - (i * 60000), // 1分間隔
                    method: ['GET', 'POST', 'PUT', 'DELETE'][Math.floor(Math.random() * 4)],
                    url: `/api/endpoint${i}`,
                    status: [200, 201, 400, 404, 500][Math.floor(Math.random() * 5)],
                    responseTime: Math.random() * 1000,
                    userAgent: 'Nadesiko3AI/1.0'
                });
            }
            return logs.sort((a, b) => b.timestamp - a.timestamp);
        }
    },
    'meta': {
        type: 'const',
        value: {
            pluginName: 'plugin_api',
            description: 'API機能を提供するプラグイン',
            pluginVersion: '1.0.0',
            nakoRuntime: ['cnako', 'wnako'],
            nakoVersion: '3.6.0'
        }
    }
};
export default PluginAPI;
