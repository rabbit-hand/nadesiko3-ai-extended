# GitHub Personal Access Token (PAT) 設定ガイド

## PATの取得方法

1. **GitHubにログイン**
   - [GitHub](https://github.com)にアクセスしてログイン

2. **設定画面へ移動**
   - 右上のプロフィールアイコン → Settings
   - 左側メニューから「Developer settings」を選択
   - 「Personal access tokens」→「Tokens (classic)」を選択

3. **新しいTokenを生成**
   - 「Generate new token」→「Generate new token (classic)」をクリック
   - **Note**: `nadesiko3-upload` などの説明を入力
   - **Expiration**: 適切な有効期限を選択（例：30日）
   - **Select scopes**: 必要な権限を選択：
     - ✅ `repo` - リポジトリへの完全アクセス
     - ✅ `workflow` - GitHub Actions

4. **Tokenをコピー**
   - 「Generate token」をクリック
   - 表示されたTokenを**必ずコピー**（再表示されません）

## コマンドでのアップロード方法

### 方法1: 環境変数を使用
```bash
# Tokenを環境変数に設定
export GITHUB_TOKEN="あなたのTokenをここに貼り付け"

# リポジトリ作成とプッシュ
gh repo create nadesiko3-ai-datascience --public --source=. --push
```

### 方法2: 直接URLにTokenを埋め込む
```bash
# リモートリポジトリを追加（USERNAMEをあなたのGitHubユーザー名に）
git remote add origin https://YOUR_GITHUB_TOKEN@github.com/YOUR_USERNAME/nadesiko3-ai-datascience.git

# プッシュ
git push -u origin main
```

## 注意事項

⚠️ **重要**: Tokenはパスワードと同じです！
- 決して共有しないでください
- コードに含めないでください
- 使用後は必ず無効化してください

## セキュリティのための推奨手順

1. **Token取得**（上記手順）
2. **このファイルにTokenを貼り付け**
3. **アップロード実行**
4. **完了後、Tokenを無効化**

---

**🔑 準備ができたら、以下のコマンドでTokenを設定してください：**
```bash
export GITHUB_TOKEN="ここにTokenを貼り付け"
```
