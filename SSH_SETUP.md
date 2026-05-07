# SSHキー設定手順

## SSH公開キー
以下のSSH公開キーをGitHubに登録してください：

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIO/MdqsprBMT7kg+P4GACDJVNnxGZ2Z8PWijh+J2TC/ nadesiko3ai@github.com
```

## 登録手順

1. **GitHubにアクセス**
   - [GitHub](https://github.com)にログイン
   - 右上のプロフィールアイコン → Settings
   - 左側メニューから「SSH and GPG keys」を選択

2. **新しいSSHキーを追加**
   - 「New SSH key」をクリック
   - **Title**: `nadesiko3-ai-key` などの説明を入力
   - **Key type**: `Authentication Key` を選択
   - **Key**: 上記の公開キーを貼り付け

3. **キーを追加**
   - 「Add SSH key」をクリック

## 自動アップロード実行

SSHキー登録後、以下のコマンドで自動アップロードを実行：

```bash
./AUTO_UPLOAD.sh
```

## Gitリモート設定

SSHキー登録後、GitリモートをSSHに変更：

```bash
git remote set-url origin git@github.com:rabbit-hand/nadesiko3ai.git
```

## 確認

SSH接続を確認：

```bash
ssh -T git@github.com
```

成功すると「Hi rabbit-hand! You've successfully authenticated...」と表示されます。
