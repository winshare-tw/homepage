# 實績案例更新說明

## 🎯 完美解決方案！

現在您有一個完全自動化的解決方案來更新實績案例內容，**不需要任何服務器，完全解決 CORS 問題**！

## 📁 文件結構

```
homepage/
├── index.html                 # 主網頁文件
├── update_cases.py           # Python 更新腳本 (主要)
├── update_cases.sh           # Mac/Linux 快速執行腳本
├── update_cases.bat          # Windows 快速執行腳本
├── UPDATE_GUIDE.md           # 本說明文件
└── realcase/
    ├── 001/
    │   ├── realcase-title.txt    # 案例標題
    │   ├── realcase-desc.txt     # 案例描述
    │   └── realcase.png          # 案例圖片
    ├── 002/
    │   ├── realcase-title.txt
    │   ├── realcase-desc.txt
    │   └── realcase.png
    └── 003/
        ├── realcase-title.txt
        ├── realcase-desc.txt
        └── realcase.png
```

## 🚀 使用方法

### 步驟 1：修改內容
編輯 `realcase/*/realcase-desc.txt` 或 `realcase-title.txt` 文件，修改您想要的內容。

### 步驟 2：運行更新腳本

#### Mac/Linux 用戶：
```bash
./update_cases.sh
```

#### Windows 用戶：
雙擊 `update_cases.bat` 文件

#### 或者直接運行 Python：
```bash
python3 update_cases.py
```

### 步驟 3：查看結果
直接雙擊 `index.html` 打開網頁，您的修改已經生效！

## ✨ 優點

- ✅ **零配置**：不需要任何服務器設置
- ✅ **無 CORS 問題**：完全避開瀏覽器安全限制
- ✅ **即時更新**：修改文件 → 運行腳本 → 立即生效
- ✅ **安全可靠**：直接更新 HTML 文件中的數據
- ✅ **跨平台**：支持 Windows, Mac, Linux
- ✅ **備份友好**：所有更改都反映在 HTML 文件中

## 🔧 工作原理

1. 腳本讀取 `realcase/*/realcase-*.txt` 文件
2. 將內容轉換為 JavaScript 數組格式
3. 直接更新 `index.html` 文件中的 `realCasesData` 數組
4. 網頁打開時使用更新後的數據

## 📝 範例

修改 `realcase/003/realcase-desc.txt`：
```
🔥 最新 AI 開發解決方案！我們提供革命性的自動化開發工具，讓您的團隊效率提升 300%！
```

運行更新腳本：
```bash
./update_cases.sh
```

結果：網頁立即顯示新內容，無需任何服務器！

## 🎉 完美解決方案

這個方案徹底解決了：
- ❌ CORS 政策限制
- ❌ 文件協議問題
- ❌ 服務器配置需求
- ❌ 瀏覽器兼容性問題

現在您可以：
- ✅ 直接修改 txt 文件
- ✅ 運行一個簡單腳本
- ✅ 立即看到結果
- ✅ 分享給任何人都能正常工作
