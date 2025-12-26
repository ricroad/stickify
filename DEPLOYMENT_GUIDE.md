# Stickify BYOK 版本 - 部署和使用指南

## 项目概述

Stickify 是一个将日常照片转换为手持速写本风格素描的 AI 应用。采用 **BYOK (Bring Your Own Key)** 模式，用户自带 Replicate API Token，无需服务器端存储密钥。

### 核心特性
- ✨ **极简 Lovart 设计风格**：黑白配色、大留白、Grid 布局
- 🔐 **BYOK 模式**：用户自带 API Key，本地存储在浏览器
- 🎨 **内置优化提示词**：手机直出风 + 漫画手绘风格
- ⚡ **快速处理**：使用 SDXL 模型进行高质量图像变换
- 📱 **响应式设计**：支持移动端和桌面端

---

## 本地开发

### 前置要求
- Node.js 22+ 和 pnpm 10+
- Replicate 账户和 API Token（从 https://replicate.com/account/api-tokens 获取）

### 安装和运行

```bash
# 1. 克隆或下载项目
cd stickify

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm dev

# 4. 打开浏览器访问
# http://localhost:3000
```

### 开发工作流

```bash
# 构建生产版本
pnpm build

# 预览生产构建
pnpm preview

# 代码检查
pnpm check

# 代码格式化
pnpm format
```

---

## 部署到 Vercel

由于 BYOK 模式的简洁性，部署变得非常简单：

### 步骤 1：推送到 GitHub

```bash
git init
git add .
git commit -m "Initial commit: Stickify BYOK version"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/stickify.git
git push -u origin main
```

### 步骤 2：在 Vercel 导入项目

1. 访问 https://vercel.com/new
2. 选择 "Import Git Repository"
3. 输入你的 GitHub 仓库 URL
4. **重要**：不需要配置任何 Environment Variables（因为使用 BYOK 模式）
5. 点击 "Deploy"

### 步骤 3：完成

Vercel 会自动构建和部署你的应用。部署完成后，你会获得一个公开 URL。

---

## 使用指南

### 用户流程

1. **访问应用**：打开 Stickify 网站
2. **设置 API Key**：
   - 点击右上角 "Set API Key" 按钮
   - 从 https://replicate.com/account/api-tokens 复制你的 Token
   - 粘贴到输入框，点击保存
   - Key 会自动保存到浏览器本地存储
3. **上传图片**：
   - 点击左侧上传区域
   - 选择 JPG 或 PNG 图片
   - 等待处理（通常需要 30-60 秒）
4. **下载结果**：
   - 处理完成后，右侧会显示生成的素描
   - 点击 "Download Asset" 下载图片

### 提示词说明

应用内置的提示词结合了以下元素：

**正面提示词**：
- 超现实业余摄影风格（手机直出）
- 手持速写本 POV 视角
- 标记笔素描风格（nanao-banana art）
- 纸张纹理和光影效果

**负面提示词**：
- 避免完美构图和过度处理
- 移除数字艺术效果和3D渲染
- 保持自然、不完美的美感

---

## 项目结构

```
stickify/
├── client/                    # 前端应用
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.tsx       # 主页面（Lovart 风格 UI）
│   │   ├── App.tsx            # 应用入口
│   │   └── index.css          # 全局样式
│   ├── public/                # 静态资源
│   └── index.html             # HTML 模板
├── server/
│   ├── index.ts               # Express 服务器
│   └── api.ts                 # API 代理路由
├── package.json               # 项目依赖
└── README.md                  # 项目说明
```

---

## 技术栈

| 层级 | 技术 |
|------|------|
| **前端框架** | React 19 + Vite |
| **样式** | Tailwind CSS 4 |
| **动画** | Framer Motion |
| **图标** | Lucide React |
| **后端** | Express.js |
| **AI 模型** | Replicate (SDXL) |
| **部署** | Vercel |

---

## 环境变量

**本地开发**：不需要任何环境变量配置

**生产部署**：也不需要配置任何环境变量（BYOK 模式）

---

## 常见问题

### Q: API Key 会被保存到服务器吗？
**A**: 不会。Key 只存储在用户的浏览器本地存储中，服务器不保存任何密钥。

### Q: 支持哪些图片格式？
**A**: 支持 JPG 和 PNG 格式。建议使用 2-5MB 以内的图片以获得最佳性能。

### Q: 处理一张图片需要多长时间？
**A**: 通常需要 30-60 秒，取决于 Replicate 的服务负载。

### Q: 可以修改提示词吗？
**A**: 当前版本使用内置提示词。如需自定义，可以修改 `server/api.ts` 中的 `SYSTEM_PROMPT` 和 `NEGATIVE_PROMPT`。

### Q: 如何处理 API 配额限制？
**A**: 每个 Replicate 账户都有免费配额。超出后需要付费。用户可以在 Replicate 控制面板查看使用情况。

---

## 自定义和扩展

### 修改设计风格

编辑 `client/src/index.css` 中的 CSS 变量来改变颜色方案：

```css
:root {
  --background: oklch(1 0 0);      /* 背景色 */
  --foreground: oklch(0.235 0.015 65);  /* 文字色 */
}
```

### 修改提示词

编辑 `server/api.ts` 中的 `SYSTEM_PROMPT` 和 `NEGATIVE_PROMPT`：

```typescript
const SYSTEM_PROMPT = `
  你的自定义提示词...
`;
```

### 更换 AI 模型

在 `server/api.ts` 中修改 `replicate.run()` 的模型 ID：

```typescript
const output = await replicate.run(
  "your-model-id:hash",
  { input: { ... } }
);
```

---

## 故障排除

### 问题：上传图片后显示 "Missing or invalid API Key"
**解决**：确保 API Key 正确复制，没有多余空格。

### 问题：处理超时
**解决**：Replicate 可能过载。稍后重试或使用更小的图片。

### 问题：生成的图片质量不理想
**解决**：尝试调整 `server/api.ts` 中的参数：
- `prompt_strength`: 0.3-0.7（越高越接近原图）
- `guidance_scale`: 5.0-10.0（越高越遵循提示词）
- `num_inference_steps`: 20-50（越高质量越好但速度越慢）

---

## 许可证

MIT License

---

## 支持

如有问题或建议，请提交 Issue 或 Pull Request。

---

**最后更新**：2025 年 12 月 26 日
