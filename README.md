# 球震 QIUZHEN · 即时比分平台

紫色主题体育数据平台，包含即时比分、赔率中心、AI预测、球吧社区、资料库，
球迷观点功能由 **Firebase Firestore** 实时驱动。

---

## 📁 项目结构

```
qiuzhen/
├── index.html              # 主页面（唯一 HTML）
├── css/
│   └── main.css            # 全部样式
├── js/
│   ├── firebase-config.js  # ⚙️  Firebase 配置（需要填写）
│   ├── firebase-service.js # Firestore CRUD 封装
│   ├── data.js             # 静态赛事数据
│   ├── render.js           # 所有渲染函数
│   └── app.js              # 主入口：页面切换 / 弹窗 / 表单
├── firebase.json           # Firebase Hosting 配置
├── firestore.rules         # Firestore 安全规则
├── firestore.indexes.json  # Firestore 复合索引
└── .firebaserc             # Firebase 项目别名
```

---

## 🚀 部署步骤

### 第一步：填写 Firebase 配置

打开 `js/firebase-config.js`，替换为你的项目配置：

```js
export const firebaseConfig = {
  apiKey:            "xxx",
  authDomain:        "xxx.firebaseapp.com",
  projectId:         "xxx",
  storageBucket:     "xxx.appspot.com",
  messagingSenderId: "xxx",
  appId:             "xxx"
};
```

> Firebase Console → 项目设置 → 你的应用 → SDK 设置和配置

---

### 第二步：打开 `.firebaserc`，填写项目 ID

```json
{
  "projects": {
    "default": "你的-project-id"
  }
}
```

---

### 第三步：推送到 GitHub

```bash
git init
git add .
git commit -m "🎉 初始提交：球震平台"
git branch -M main
git remote add origin https://github.com/你的用户名/qiuzhen.git
git push -u origin main
```

---

### 第四步：部署到 Firebase Hosting

```bash
# 安装 Firebase CLI（只需一次）
npm install -g firebase-tools

# 登录
firebase login

# 部署 Hosting + Firestore 规则 + 索引
firebase deploy
```

部署完成后访问：`https://你的project-id.web.app`

---

### 第五步：创建 Firestore 数据库

1. Firebase Console → Firestore Database → **新建数据库**
2. 选择 **生产模式**（安全规则已在 `firestore.rules` 中配置）
3. 选择离你最近的区域（推荐 `asia-east1` 台湾 或 `asia-southeast1` 新加坡）

---

## 🔒 Firestore 安全规则说明

`firestore.rules` 已配置：

| 操作 | 权限 |
|------|------|
| 读取预测 | ✅ 所有人 |
| 发布预测 | ✅ 所有人（匿名可发） |
| 点赞（likes +1）| ✅ 所有人 |
| 删除 / 修改内容 | ❌ 禁止 |

---

## 📦 Firestore 数据结构

**集合：** `predictions`

| 字段 | 类型 | 说明 |
|------|------|------|
| `matchId`   | string    | 比赛ID，如 `match_ac_inter` |
| `matchName` | string    | 显示名称，如 `AC米兰 vs 国际米兰` |
| `username`  | string    | 用户昵称 |
| `content`   | string    | 看法内容（最多200字） |
| `vote`      | string    | 预测方向：主胜 / 平局 / 客胜 |
| `likes`     | number    | 点赞数（默认0） |
| `createdAt` | timestamp | Firebase serverTimestamp |

---

## ⚡ GitHub Actions 自动部署（可选）

在 GitHub 仓库设置 → Secrets 添加 `FIREBASE_TOKEN`（通过 `firebase login:ci` 获取），
然后创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Firebase
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_TOKEN }}
          projectId: 你的-project-id
```

之后每次 `git push` 自动部署 ✅

---

## 🛠 本地开发

因为用了 ES Module（`import/export`），**不能直接双击打开 HTML**，需要本地服务器：

```bash
# 方法1：用 VS Code 的 Live Server 插件（推荐）
# 方法2：Python
python3 -m http.server 8080
# 方法3：Node
npx serve .
```

然后访问 `http://localhost:8080`
