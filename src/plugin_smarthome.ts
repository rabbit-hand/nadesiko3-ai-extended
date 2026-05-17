// なでしこ3AI用 スマートホーム＆ジオフェンス拡張プラグイン

const PluginSmartHome = {
    'meta': {
        'type': 'plugin',
        'name': 'nadesiko3-plugin-smarthome',
        'description': 'スマホのGPS位置情報とスマート家電（エアコン・鍵）を連動させるプラグイン',
    },

    // ==========================================
    // 命令（コマンド）の定義
    // ==========================================
    '座標間距離計算': {
        'type': 'func',
        'josi': [['と'], ['の'], ['と'], ['の']], // 緯度1と 経度1の 緯度2と 経度2の
        'fn': function (lat1: number, lng1: number, lat2: number, lng2: number): number {
            // 地球の半径 (メートル)
            const R = 6371000; 
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLng = (lng2 - lng1) * Math.PI / 180;
            const a = 
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            // 2点間の直線距離（メートル）を返します
            return R * c; 
        },
        'return_none': false
    },

    'スマートリモコン送信': {
        'type': 'func',
        'josi': [['へ'], ['で']], // デバイス名へ コマンドで
        'fn': async function (device: string, command: string, sys: any) {
            console.log(`[スマートホーム] ${device} へ、コマンド「${command}」を送信中...`);
            
            // AWSやSwitchBot / Nature Remo等のWeb APIを叩く実際の通信ロジック
            // 本番環境に合わせてURLやトークンを設定します
            const targetUrl = 'https://api.switch-bot.com/v1.1/devices/YOUR_DEVICE_ID/commands';
            try {
                /*
                await fetch(targetUrl, {
                    method: 'POST',
                    headers: { 'Authorization': 'YOUR_API_TOKEN', 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 'command': command, 'parameter': 'default', 'commandType': 'command' })
                });
                */
            } catch (e) {
                console.error('スマート家電の制御に失敗しました:', e);
            }
        },
        'return_none': true
    },

    'ドアセンサー状態取得': {
        'type': 'func',
        'josi': [],
        'fn': function (): number {
            // 擬似的にドアの状態を返す（本来はIoTセンサーの値をHTTP等で取得）
            // 1: 正常に閉まっている、0: 開いている
            return 1; 
        },
        'return_none': false
    }
};

export default PluginSmartHome;

// なでしこ3のシステム登録用にエクスポート
if (typeof (navigator) === 'object') {
    let scope: any = window;
    scope['navigator']['nadesiko3']['plugins']['smarthome'] = PluginSmartHome;
}
