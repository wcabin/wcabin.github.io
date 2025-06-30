$(document).ready(function() {
    // 初始化AOS动画库，减少延迟时间
    AOS.init({
        duration: 600, // 减少动画持续时间
        easing: 'ease-out',
        once: false,
        offset: 50, // 减少偏移量，更快触发动画
        delay: 0 // 移除延迟
    });
    
    // 页面加载动画，减少等待时间
    setTimeout(function() {
        $('.page-loader').addClass('loaded');
        setTimeout(function() {
            $('.page-loader').hide();
        }, 300); // 减少隐藏时间
    }, 800); // 减少加载时间
    
    // 立即应用毛玻璃效果，确保导航栏始终保持毛玻璃效果
    $('.header').css({
        'background': 'rgba(255, 255, 255, 0.24)',
        'backdrop-filter': 'blur(20px)',
        '-webkit-backdrop-filter': 'blur(20px)',
        'box-shadow': '0 2px 10px rgba(0, 0, 0, 0.1)'
    });
    
    // 页面滚动时改变导航栏样式
    $(window).on('scroll', function() {
        // 不管滚动位置如何，都保持毛玻璃效果
        $('.header').css({
            'background': 'rgba(255, 255, 255, 0.24)',
            'backdrop-filter': 'blur(20px)',
            '-webkit-backdrop-filter': 'blur(20px)',
            'box-shadow': '0 2px 10px rgba(0, 0, 0, 0.1)'
        });
    });
    
    // 移动端菜单切换 - 增强毛玻璃效果
    $('#menuToggle').on('click', function() {
        $('#mobileMenu').toggleClass('show');
        
        // 强制应用毛玻璃效果
        if ($('#mobileMenu').hasClass('show')) {
            // 确保样式被直接应用，解决某些移动设备的兼容性问题
            $('#mobileMenu').css({
                'display': 'flex',
                'background-color': 'rgba(255, 255, 255, 0.5)',
                '-webkit-backdrop-filter': 'blur(25px)',
                'backdrop-filter': 'blur(25px)'
            });
        }
    });
    
    // 图片缩放效果
    $('.hero-image').on('mouseenter', function() {
        $(this).find('.preview-image').css('transform', 'scale(1.05)');
    }).on('mouseleave', function() {
        $(this).find('.preview-image').css('transform', 'scale(1)');
    });
    
    // 下载按钮闪光效果
    $('.download-btn').on('mouseenter', function() {
        $(this).css('transform', 'translateY(-3px)');
    }).on('mouseleave', function() {
        $(this).css('transform', 'translateY(0)');
    });
    
    // 特性卡片悬停效果
    $('.feature-card').each(function(index) {
        $(this).css({
            'transition-delay': `${index * 0.05}s` // 减少延迟时间
        });
    });
    
    // 下载按钮点击事件
    $('.btn-primary.btn-large').on('click', function(e) {
        // 这里可以添加下载统计或其他功能
        console.log('下载按钮被点击');
        
        // 添加下载动画效果
        $(this).addClass('downloading');
        setTimeout(() => {
            $(this).removeClass('downloading');
        }, 2000);
    });
    
    // 选项链接点击事件
    $('.option-link').on('click', function(e) {
        e.preventDefault();
        
        const linkText = $(this).text().trim();
        if (linkText === '32位版本下载') {
            alert('开始下载 ESF EVOLUTION 启动器 32位版本');
        } else if (linkText === 'ARM版本下载') {
            alert('开始下载 ESF EVOLUTION 启动器 ARM版本');
        } else if (linkText === '往期怀旧版下载') {
            alert('查看历史版本');
        }
    });
    
    // SVG交互效果（可选）
    $('svg rect, svg text').each(function() {
        const $this = $(this);
        if ($this.attr('cursor') === 'pointer' || $this.parent().attr('cursor') === 'pointer') {
            $this.on('click', function() {
                const id = $this.attr('id') || '';
                
                if (id.includes('close')) {
                    alert('关闭启动器');
                } else if (id.includes('minimize')) {
                    alert('最小化启动器');
                } else if (id.includes('start-game')) {
                    alert('开始游戏');
                }
            });
        }
    });
    
    // 添加jQuery easing效果
    jQuery.extend(jQuery.easing, {
        easeInOutExpo: function(x, t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeOutQuad: function(x, t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        }
    });
    
    // 添加首页图片放大动画，减少延迟
    setTimeout(function() {
        $('.hero-image img').addClass('zoom-in');
    }, 800);
    
    // 导航链接点击事件，使用scroll.js的页面切换功能
    $('.nav-link').on('click', function(e) {
        e.preventDefault();
        const targetId = $(this).attr('href').substring(1); // 移除#号
        
        // 如果window.goToSection函数存在（由scroll.js提供），则使用它
        if (typeof window.goToSection === 'function') {
            window.goToSection(targetId);
            
            // 确保点击后导航栏保持毛玻璃效果
            $('.header').css({
                'background': 'rgba(255, 255, 255, 0.24)',
                'backdrop-filter': 'blur(20px)',
                '-webkit-backdrop-filter': 'blur(20px)',
                'box-shadow': '0 2px 10px rgba(0, 0, 0, 0.1)'
            });
            
            // 在移动设备上点击导航链接后关闭菜单
            if ($(window).width() <= 640) {
                $('#mobileMenu').removeClass('show');
            }
        }
    });
    
    // 为了解决某些移动设备上的毛玻璃效果问题，添加额外的兼容处理
    function fixBackdropFilter() {
        // 检测是否支持backdrop-filter
        const isBackdropFilterSupported = 'backdropFilter' in document.documentElement.style || 
                                         '-webkit-backdrop-filter' in document.documentElement.style;
        
        if (!isBackdropFilterSupported) {
            // 如果不支持毛玻璃效果，使用更不透明的背景色作为替代
            $('.header').css('background-color', 'rgba(255, 255, 255, 0.85)');
            $('.nav-list.show').css('background-color', 'rgba(255, 255, 255, 0.85)');
        }
    }
    
    // 执行兼容性修复
    fixBackdropFilter();
    
    // 在窗口大小改变时重新应用样式
    $(window).on('resize', function() {
        if ($('#mobileMenu').hasClass('show') && $(window).width() <= 640) {
            $('#mobileMenu').css({
                'display': 'flex',
                'background-color': 'rgba(255, 255, 255, 0.5)',
                '-webkit-backdrop-filter': 'blur(25px)',
                'backdrop-filter': 'blur(25px)'
            });
        }
    });
}); 