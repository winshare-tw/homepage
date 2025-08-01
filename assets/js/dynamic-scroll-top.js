/**
 * 動態回頂部按鈕效果
 * Dynamic Back to Top Button Effects
 */
(function($) {
    'use strict';

    // 動態回頂部功能
    function initDynamicBackToTop() {
        const $backToTop = $('.ekit-back-to-top-container, #mt-scrollup');
        const $icon = $backToTop.find('svg, .ekit-btt__button');
        
        if ($backToTop.length === 0) return;

        // 添加動態樣式
        const dynamicCSS = `
            <style id="dynamic-back-to-top-styles">
                .ekit-back-to-top-container,
                #mt-scrollup {
                    transition: all 0.3s ease-in-out;
                }
                
                .ekit-back-to-top-container .ekit-btt__button,
                #mt-scrollup {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    transform: translateY(0);
                }
                
                .ekit-back-to-top-container:hover .ekit-btt__button,
                #mt-scrollup:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
                }
                
                .ekit-back-to-top-container .ekit-btt__button svg,
                #mt-scrollup::before {
                    transition: transform 0.3s ease-in-out;
                }
                
                .ekit-back-to-top-container:hover .ekit-btt__button svg {
                    transform: translateY(-2px);
                    animation: pulse-up 1.5s infinite;
                }
                
                .ekit-back-to-top-container.scroll-progress .ekit-btt__button {
                    position: relative;
                    overflow: hidden;
                }
                
                .ekit-back-to-top-container.scroll-progress .ekit-btt__button::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 0%;
                    background: linear-gradient(180deg, rgba(199, 131, 29, 0.2) 0%, rgba(199, 131, 29, 0.1) 100%);
                    transition: height 0.3s ease-out;
                    z-index: -1;
                }
                
                .scroll-indicator {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 60px;
                    height: 60px;
                    border: 3px solid rgba(199, 131, 29, 0.3);
                    border-radius: 50%;
                    border-top-color: #c7831d;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                }
                
                .ekit-back-to-top-container:hover .scroll-indicator {
                    opacity: 1;
                    animation: rotate 2s linear infinite;
                }
                
                @keyframes pulse-up {
                    0%, 100% { transform: translateY(-2px); }
                    50% { transform: translateY(-6px); }
                }
                
                @keyframes rotate {
                    0% { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
                }
                
                /* 滾動進度顯示 */
                .scroll-progress-ring {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 60px;
                    height: 60px;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                }
                
                .scroll-progress-ring circle {
                    fill: none;
                    stroke: rgba(199, 131, 29, 0.3);
                    stroke-width: 3;
                }
                
                .scroll-progress-ring .progress {
                    stroke: #c7831d;
                    stroke-linecap: round;
                    transform: rotate(-90deg);
                    transform-origin: 50% 50%;
                    transition: stroke-dashoffset 0.3s linear;
                }
                
                .ekit-back-to-top-container.show-progress .scroll-progress-ring {
                    opacity: 1;
                }
            </style>
        `;
        
        // 添加樣式到頁面
        if ($('#dynamic-back-to-top-styles').length === 0) {
            $('head').append(dynamicCSS);
        }
        
        // 添加滾動進度環
        const progressRing = `
            <div class="scroll-progress-ring">
                <svg width="60" height="60">
                    <circle cx="30" cy="30" r="27"></circle>
                    <circle class="progress" cx="30" cy="30" r="27" 
                            stroke-dasharray="169.65" 
                            stroke-dashoffset="169.65"></circle>
                </svg>
            </div>
        `;
        
        // 添加滾動指示器
        if ($backToTop.find('.scroll-progress-ring').length === 0) {
            $backToTop.append('<div class="scroll-indicator"></div>');
            $backToTop.append(progressRing);
        }
        
        // 滾動事件處理
        let ticking = false;
        
        function updateScrollProgress() {
            const scrollTop = $(window).scrollTop();
            const docHeight = $(document).height() - $(window).height();
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            // 更新進度環
            const $progressCircle = $backToTop.find('.scroll-progress-ring .progress');
            const circumference = 169.65;
            const offset = circumference - (scrollPercent / 100) * circumference;
            $progressCircle.css('stroke-dashoffset', offset);
            
            // 根據滾動位置顯示不同效果
            if (scrollPercent > 10) {
                $backToTop.addClass('show-progress');
            } else {
                $backToTop.removeClass('show-progress');
            }
            
            // 更新填充效果
            const $fillEffect = $backToTop.find('.ekit-btt__button::before, #mt-scrollup::before');
            if (scrollPercent > 20) {
                $backToTop.addClass('scroll-progress');
            } else {
                $backToTop.removeClass('scroll-progress');
            }
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollProgress);
                ticking = true;
            }
        }
        
        // 綁定滾動事件
        $(window).on('scroll', requestTick);
        
        // 點擊動畫效果
        $backToTop.on('click', function(e) {
            const $this = $(this);
            
            // 添加點擊動畫
            $this.addClass('clicking');
            setTimeout(() => {
                $this.removeClass('clicking');
            }, 300);
            
            // 添加點擊波紋效果
            const ripple = $('<div class="click-ripple"></div>');
            const rippleCSS = `
                .click-ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(199, 131, 29, 0.3);
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear;
                    pointer-events: none;
                }
                
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                
                .clicking {
                    transform: scale(0.95) !important;
                }
            `;
            
            if ($('#ripple-styles').length === 0) {
                $('head').append(`<style id="ripple-styles">${rippleCSS}</style>`);
            }
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.css({
                width: size + 'px',
                height: size + 'px',
                left: x + 'px',
                top: y + 'px'
            });
            
            $this.append(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // 初始化
        requestTick();
    }
    
    // DOM 準備好後初始化
    $(document).ready(function() {
        // 延遲初始化以確保其他腳本已加載
        setTimeout(initDynamicBackToTop, 100);
    });
    
    // Elementor 前端準備好後也初始化（如果存在）
    if (typeof elementorFrontend !== 'undefined') {
        elementorFrontend.hooks.addAction('frontend/element_ready/elementskit-back-to-top.default', function($scope) {
            initDynamicBackToTop();
        });
    }
    
})(jQuery);