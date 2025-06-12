# wildlife-triangulation

Wildlife Triangulation
本專案提供一套野生動物定位與三角測量工具，支援離線使用，特別設計給保育人員與研究者在野外缺乏網路的環境中進行精準紀錄與追蹤。

📦 專案特色
離線運作：無需網路即可使用

多平台支援：Android 與 iOS 手機皆可使用

支援拍照、地點記錄與多點三角測量

適合野外調查、保育紀錄與教育用途

📱 如何在手機端安裝與使用（Android / iOS）
Android 使用者
方法 1：使用 PWA（推薦）
使用 Chrome 或 Firefox 開啟專案頁面：
https://proudfish07.github.io/wildlife-triangulation

點選右上角選單（⋮）> 選擇「安裝應用程式」或「加入主畫面」

App 會以全螢幕方式啟動，並可離線使用

iOS 使用者
使用 PWA（推薦）
使用 Safari 瀏覽器開啟：
https://proudfish07.github.io/wildlife-triangulation

點選下方「分享」圖示（⤴️）> 選擇「加入主畫面」

點擊加入後，主畫面會出現 App 圖示，可像原生 App 一樣使用

首次載入後資料會快取，可於離線狀態下使用

🔧 本地開發
如需修改或自行建置：

bash
複製
編輯
git clone https://github.com/proudfish07/wildlife-triangulation.git
cd wildlife-triangulation
npm install
npm run build
建置完成的檔案會位於 /dist 資料夾，可用於部署或包裝成行動 App。

🛠️ 技術架構
使用 Vue / Vite 開發

支援 PWA（Progressive Web App）

離線快取使用 Workbox

🐛 回報問題
請至 Issue 區 回報錯誤或功能需求。

📄 授權
本專案採用 MIT License，詳見 LICENSE。
