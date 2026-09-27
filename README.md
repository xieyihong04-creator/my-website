# my-website

深夜書桌 × Glassmorphism 個人網站 —— 單檔靜態頁面，無框架、無建置步驟。

## 檔案

僅 `index.html` 一個檔案（HTML + CSS + 原生 JS 全部內嵌）。
直接用瀏覽器打開即可預覽，不需本地伺服器。

## 部署

Cloudflare Pages / GitHub Pages / 任何靜態空間皆可，**無需 build command**，
輸出目錄就是倉庫根目錄（`index.html` 在根）。

## 更新內容

頁面底部鉛筆圖示**連點三下**（或 `Ctrl+Shift+A`）開啟管理面板。

面板存的是瀏覽器 localStorage，只有自己看得到。要讓所有人看到：
面板按「匯出 JSON」→ 貼回 `index.html` 裡的 `const DEFAULT_DATA = { ... }` → commit。

## 外部相依

只有 Google Fonts（Noto Sans TC / LXGW WenKai TC / JetBrains Mono）。
字體載入失敗時會退回系統字型，版面不會跑掉。
