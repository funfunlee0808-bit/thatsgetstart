# 品味小舖 GitHub Pages 網站

這個 repo 內含從 Google 地圖匯出的評論、特色與照片，並以 GitHub Pages 可直接部署的 `docs/` 靜態網站呈現。

## 如何瀏覽
- 將 repo 設定 GitHub Pages 來源為 `docs/` 資料夾即可上線。
- 本機預覽：
  ```bash
  python -m http.server --directory docs 8000
  ```
  然後在瀏覽器開啟 <http://localhost:8000>。

## 更新資料
1. 修改或覆蓋最新的 CSV 檔案：
   - `google-2025-12-23.csv`（評論列表）
   - `google-簡介.csv`（店家特色）
   - `google-地圖.csv`（照片/縮圖）
2. 執行資料生成腳本，產出靜態網站使用的 JSON：
   ```bash
   python scripts/build_data.py
   ```
3. `docs/data/data.json` 更新後即可重新部署。

## 專案結構
- `docs/index.html`：網站首頁骨架。
- `docs/styles.css`：版型、色彩、排版設定。
- `docs/app.js`：讀取 `docs/data/data.json` 並渲染特色、評論與照片。
- `scripts/build_data.py`：將 CSV 轉為網站可用的 JSON。

歡迎根據需要調整設計與文案，讓品味小舖的好評更好被看見！
