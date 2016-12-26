## NCNU 105軟體工程 第三組
# 麵包工廠
## 組員 & 分工
資管三 陳莞青 - 流程、SQL、DEMO報告
資管三 楊竣憲 - 後端、SQL
資工五 吳梓麟 - 前端

# 前端架構與設計
- 使用 SPA (single page application) 設計方式，所有與後端的溝通都由 ajax 來完成，再由 JQuery 來操作 html dom 元素，以 CSS 加上部分 JQuery 來呈現畫面
- 使用 EJS 模板引擎，將需要的功能頁面事先準備 ejs 檔案，需要時在從 Javascript 呼叫來使用，讓整體的 html dom tree 更為簡潔 (詳見 index.php)
- 使用 Font-Awesome 的向量圖型來將介面的按鈕美化

# 後端
- 用 PHP 來撰寫後端 API，並使用 MVC 架構
- 資料庫系統為 MySQL
- 撰寫 SQL 的 stored procedure，購物/販售 時只需輸入 ID 和數量，計算流程與金錢的計算全部交給 MySQL 執行

# DEMO 影片
- https://youtu.be/jNV412eZfKM