# GitHubトークン設定手順

## トークン取得方法

1. **GitHubにアクセス**
   - [GitHub](https://github.com)にログイン
   - 右上のプロフィールアイコン → Settings
   - 左側メニューから「Developer settings」を選択
   - 「Personal access tokens」→「Tokens (classic)」を選択

2. **新しいTokenを生成**
   - 「Generate new token」→「Generate new token (classic)」をクリック
   - **Note**: `nadesiko3-upload` などの説明を入力
   - **Expiration**: 適切な有効期限を選択（例：30日）
   - **Select scopes**: 必要な権限を選択：
     - ✅ `repo` - リポジトリへの完全アクセス
     - ✅ `workflow` - GitHub Actions

3. **Tokenをコピー**
   - 「Generate token」をクリック
   - 表示されたTokenを**必ずコピー**（再表示されません）

## トークン設定コマンド

以下のコマンドでトークンを設定してアップロード：

```bash
# トークンを環境変数に設定（YOUR_TOKENを取得したトークンに置き換え）
export GITHUB_TOKEN="YOUR_TOKEN"

# Gitリモートを設定
git remote set-url origin https://YOUR_TOKEN@github.com/rabbit-hand/nadesiko3ai.git

# プッシュ実行
git push -u origin main
```

## 重要な注意事項

⚠️ **セキュリティ警告**:
- Tokenはパスワードと同じです！
- 決して共有しないでください
- 使用後は必ず無効化してください
- コードや公開場所に含めないでください

## 代替手段

トークンを使用できない場合は、Webブラウザから手動アップロードも可能です：
1. [https://github.com/rabbit-hand/nadesiko3ai](https://github.com/rabbit-hand/nadesiko3ai)
2. 「Add file」→「Upload files」
