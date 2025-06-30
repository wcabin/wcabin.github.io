/**
 * 普通滚动控制脚本
 * 实现平滑的页面导航
 */

$(document).ready(function() {
    // 基本变量
    const sections = $('.section');
    const navLinks = $('.nav-link');
    
    // 初始化
    function init() {
        console.log("初始化页面");
        
        // 确保所有section都可见
        sections.each(function(index) {
            $(this).css({
                'display': 'flex',
                'opacity': 1,
                'position': 'relative',
                'top': 0
            });
            console.log("页面", index, "初始化完成:", $(this).attr('id'));
        });
        
        // 更新导航高亮
        updateNavOnScroll();
        
        // 绑定事件
        bindEvents();
    }
    
    // 根据滚动位置更新导航高亮
    function updateNavOnScroll() {
        let currentId = '';
        
        sections.each(function() {
            const sectionTop = $(this).offset().top - 100;
            const sectionHeight = $(this).outerHeight();
            const scrollPos = $(window).scrollTop();
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentId = $(this).attr('id');
            }
        });
        
        navLinks.removeClass('active');
        navLinks.filter(`[href="#${currentId}"]`).addClass('active');
        console.log("导航更新到:", currentId);
    }
    
    // 平滑滚动到指定section - 移除动画延迟，直接滚动
    function scrollToSection(id) {
        console.log("滚动到:", id);
        
        const targetOffset = $(id).offset().top - 70;
        
        // 直接设置滚动位置，不使用动画
        window.scrollTo({
            top: targetOffset,
            behavior: 'auto'
        });
        
        // 更新导航高亮
        navLinks.removeClass('active');
        navLinks.filter(`[href="${id}"]`).addClass('active');
        
        console.log("滚动完成");
    }
    
    // 绑定事件
    function bindEvents() {
        console.log("绑定事件");
        
        // 导航点击事件
        navLinks.on('click', function(e) {
            e.preventDefault();
            const targetId = $(this).attr('href');
            console.log("导航点击:", targetId);
            scrollToSection(targetId);
        });
        
        // 监听滚动事件
        $(window).on('scroll', function() {
            updateNavOnScroll();
        });
        
        // 键盘事件
        $(document).on('keydown', function(e) {
            // 上下箭头
            if (e.keyCode === 40) { // 下箭头
                e.preventDefault();
                const nextSection = getNextSection();
                if (nextSection) {
                    console.log("键盘下箭头");
                    scrollToSection('#' + nextSection);
                }
            } else if (e.keyCode === 38) { // 上箭头
                e.preventDefault();
                const prevSection = getPrevSection();
                if (prevSection) {
                    console.log("键盘上箭头");
                    scrollToSection('#' + prevSection);
                }
            }
        });
        
        // 触摸事件
        let touchStartY = 0;
        let touchEndY = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
            console.log("触摸开始:", touchStartY);
        }, { passive: true });
        
        document.addEventListener('touchend', function(e) {
            touchEndY = e.changedTouches[0].clientY;
            const diff = touchStartY - touchEndY;
            console.log("触摸结束:", touchEndY, "差值:", diff);
            
            // 判断滑动方向
            if (Math.abs(diff) > 50) { // 确保是有意义的滑动
                if (diff > 0) { // 向上滑动
                    const nextSection = getNextSection();
                    if (nextSection) {
                        console.log("向上滑动到下一页");
                        scrollToSection('#' + nextSection);
                    }
                } else { // 向下滑动
                    const prevSection = getPrevSection();
                    if (prevSection) {
                        console.log("向下滑动到上一页");
                        scrollToSection('#' + prevSection);
                    }
                }
            }
        }, { passive: true });
    }
    
    // 获取当前可见section的ID
    function getCurrentSection() {
        let currentId = '';
        let maxVisibility = 0;
        
        sections.each(function() {
            const rect = this.getBoundingClientRect();
            const windowHeight = $(window).height();
            
            // 计算可见区域的百分比
            const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            const visiblePercent = visibleHeight / $(this).outerHeight();
            
            if (visiblePercent > maxVisibility) {
                maxVisibility = visiblePercent;
                currentId = $(this).attr('id');
            }
        });
        
        return currentId;
    }
    
    // 获取下一个section的ID
    function getNextSection() {
        const currentId = getCurrentSection();
        let found = false;
        let nextId = null;
        
        sections.each(function() {
            if (found && !nextId) {
                nextId = $(this).attr('id');
            }
            
            if ($(this).attr('id') === currentId) {
                found = true;
            }
        });
        
        return nextId;
    }
    
    // 获取上一个section的ID
    function getPrevSection() {
        const currentId = getCurrentSection();
        let prevId = null;
        
        sections.each(function() {
            if ($(this).attr('id') === currentId) {
                return false; // 跳出each循环
            }
            
            prevId = $(this).attr('id');
        });
        
        return prevId;
    }
    
    // 修复favicon 404错误
    function fixFavicon() {
        const favicon = $('link[rel="shortcut icon"]');
        if (favicon.length) {
            favicon.attr('href', 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wL///8C////Av///wIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////Av///wL///8C////Av///wL///8C////AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8C////Av///wL///8C////Av///wL///8C////Av///wL///8CAAAAAAAAAAAAAAAAAAAAAP///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wIAAAAA////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8C////Av///wL///8CAAAAAAAAAAAAAAAAAAAAAAAAAAD///8C////Av///wL///8C////Av///wL///8C////AgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////Av///wL///8C////AgAAAAAAAAAAAAAAAAAAAAA=');
            console.log("Favicon已修复");
        }
    }
    
    // 初始化
    init();
    fixFavicon();
    
    // 导出全局方法，方便调试
    window.goToSection = function(id) {
        scrollToSection('#' + id);
    };
}); 