# Foxokiso Tarot v3.0 — Golden Master

## 📜 專案簡介 Project Overview
Foxokiso Tarot v3.0 是最新的 Golden Master 版本，採用 Vite 打包。  
入口檔案與資源結構已簡化為最小執行條件，確保部署快速且穩定。

Foxokiso Tarot v3.0 is the latest Golden Master release, built with Vite.  
The entry file and asset structure are reduced to the minimal execution requirement for fast and stable deployment.

---

## 🧩 結構 Structure

- **核心檔案 Core files**: `index.html` + `assets/*.js`  
- **打包工具 Build tool**: Vite (產生帶 hash 的 JS/CSS)  
- **最小執行條件 Minimal requirement**: 入口檔 + 對應的 JS bundle  

---

## 🚀 部署方式 Deployment Options

### 方案 A：快速部署 Fast Deployment
- GitHub Pages → Source: `main` 分支  
- Folder: `/dist`  
- 優點 Pros: 打包完直接推上去即可  
- 缺點 Cons: 倉庫結構混合原始碼與打包結果  

### 方案 B：乾淨部署 Clean Deployment
- 把 `index.html` + `assets/` 移到根目錄  
- GitHub Pages → Source: `main` 分支 → `/root`  
- 優點 Pros: 結構清晰，版本控制乾淨  
- 缺點 Cons: 需要額外搬檔案  

---

## ⚠️ 注意事項 Notes
- `index.html` 必須引用正確路徑 Must reference correct path:  
  ```html
  <script type="module" src="./assets/index-<hash>.js"></script>
