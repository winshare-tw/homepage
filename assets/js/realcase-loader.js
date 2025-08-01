// 實績案例動態載入系統
class RealCaseLoader {
    constructor() {
        this.casePath = './realcase/';
        this.cases = [];
        this.isLoading = false;
    }

    // 載入所有實績案例
    async loadAllCases() {
        if (this.isLoading) return this.cases;
        this.isLoading = true;
        
        try {
            // 這裡我們需要先定義案例列表，因為瀏覽器無法直接讀取資料夾
            const caseNumbers = ['001', '002', '003']; // 可以動態擴展
            
            for (const caseNum of caseNumbers) {
                try {
                    const caseData = await this.loadCase(caseNum);
                    if (caseData) {
                        this.cases.push(caseData);
                    }
                } catch (error) {
                    console.log(`案例 ${caseNum} 載入失敗:`, error);
                    // 繼續載入其他案例
                }
            }
            
            // 按編號排序
            this.cases.sort((a, b) => a.number.localeCompare(b.number));
            
            return this.cases;
        } catch (error) {
            console.error('載入實績案例失敗:', error);
            return [];
        } finally {
            this.isLoading = false;
        }
    }

    // 載入單一案例
    async loadCase(caseNumber) {
        try {
            const basePath = `${this.casePath}${caseNumber}/`;
            
            // 並行載入所有文件
            const [title, desc, imageExists] = await Promise.all([
                this.loadTextFile(`${basePath}realcase-title.txt`),
                this.loadTextFile(`${basePath}realcase-desc.txt`),
                this.checkImageExists(`${basePath}realcase.png`)
            ]);

            return {
                number: caseNumber,
                title: title || `實績案例 ${caseNumber}`,
                description: desc || '詳細內容請聯絡我們',
                image: imageExists ? `${basePath}realcase.png` : './assets/img/default-case.png',
                hasImage: imageExists
            };
        } catch (error) {
            console.error(`載入案例 ${caseNumber} 失敗:`, error);
            return null;
        }
    }

    // 載入文字檔案
    async loadTextFile(url) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                return await response.text();
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    // 檢查圖片是否存在
    async checkImageExists(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    // 渲染實績案例到頁面
    renderCases(containerId = 'realcase-container') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('找不到實績案例容器');
            return;
        }

        // 設置容器最小高度以防止抖動
        container.style.minHeight = '400px';
        
        if (this.cases.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <p>暫無實績案例</p>
                </div>
            `;
            return;
        }

        // 直接替換整個內容，避免分階段更新造成抖動
        let html = '';
        this.cases.forEach(caseData => {
            html += this.generateCaseHTML(caseData);
        });
        
        container.innerHTML = html;
        
        // 載入完成後移除最小高度限制
        setTimeout(() => {
            container.style.minHeight = 'auto';
        }, 500);
    }

    // 生成單一案例的 HTML
    generateCaseHTML(caseData) {
        return `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="elementskit-post-image-card">
                    <div class="elementskit-entry-header">
                        <div class="elementskit-entry-thumb" style="height: 250px; overflow: hidden; display: flex; align-items: center; justify-content: center; background: #f5f5f5;">
                            <img decoding="async" 
                                 src="${caseData.image}" 
                                 alt="${caseData.title}"
                                 style="width: 100%; height: 100%; object-fit: cover;"
                                 onerror="this.src='./assets/img/default-case.png'; this.style.objectFit='contain';"
                                 loading="lazy">
                        </div>
                    </div>
                    <div class="elementskit-post-body" style="min-height: 150px; padding: 20px;">
                        <h2 class="entry-title" style="font-size: 18px; margin-bottom: 10px; line-height: 1.4;">${caseData.title}</h2>
                        <p style="font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 15px;">${caseData.description}</p>
                        <div class="case-meta">
                            <span class="case-number" style="font-size: 12px; color: #999;">案例編號: ${caseData.number}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 初始化 - 改名為 initialize 避免與重複調用
    async initialize() {
        if (this.isLoading) return;
        
        // 先顯示載入狀態，設置固定高度
        const container = document.getElementById('realcase-container');
        if (container) {
            container.style.minHeight = '400px';
            container.innerHTML = `
                <div class="col-12 text-center" style="padding: 100px 0;">
                    <div class="spinner-border text-primary mb-3" role="status">
                        <span class="sr-only">載入中...</span>
                    </div>
                    <p>載入實績案例中...</p>
                </div>
            `;
        }
        
        await this.loadAllCases();
        this.renderCases();
    }
}

// 全域存取
window.RealCaseLoader = RealCaseLoader;
