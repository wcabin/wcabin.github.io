$(document).ready(function() {
    // 检测DPI和高分辨率屏幕
    function detectHighDPI() {
        // 获取设备像素比
        const dpr = window.devicePixelRatio || 1;
        
        // 根据DPI添加相应的类
        if (dpr >= 2) {
            $('html').addClass('high-dpi dpr-2');
            console.log('检测到高DPI屏幕: 2x');
        } else if (dpr >= 1.5) {
            $('html').addClass('high-dpi dpr-1-5');
            console.log('检测到高DPI屏幕: 1.5x');
        } else if (dpr > 1) {
            $('html').addClass('high-dpi');
            console.log('检测到高DPI屏幕: ' + dpr + 'x');
        }
        
        // 检测4K或更高分辨率
        const width = window.screen.width * dpr;
        const height = window.screen.height * dpr;
        
        if (width >= 3840 || height >= 2160) {
            $('html').addClass('ultra-hd');
            console.log('检测到4K或更高分辨率屏幕');
        } else if (width >= 2560 || height >= 1440) {
            $('html').addClass('quad-hd');
            console.log('检测到2K或更高分辨率屏幕');
        }
        
        // 设置CSS变量以便在样式中使用
        document.documentElement.style.setProperty('--device-pixel-ratio', dpr);
    }
    
    // 执行DPI检测
    detectHighDPI();
    
    // 运行环境提取码复制功能
    $('#copyRuntimePassword, .password-text').on('click', function() {
        const password = $('.password-text').text();
        navigator.clipboard.writeText(password).then(function() {
            // 显示复制成功提示
            const statusMsg = $('<span class="copy-success">已复制</span>');
            $('#runtimePassword').append(statusMsg);
            setTimeout(function() {
                statusMsg.fadeOut(500, function() {
                    $(this).remove();
                });
            }, 1500);
        });
    });
    
    // 点击蓝奏云链接同时复制密码
    $('#runtimeLanzouLink').on('click', function() {
        const password = $('.password-text').text();
        navigator.clipboard.writeText(password);
    });
    
    // 防止缓存的函数
    function preventCaching() {
        // 获取当前时间戳作为版本号
        const timestamp = new Date().getTime();
        
        // 为所有CSS链接添加或更新版本号
        $('link[rel="stylesheet"]').each(function() {
            let href = $(this).attr('href');
            // 如果链接是本地的（不是CDN）
            if (href && href.indexOf('http') !== 0 && href.indexOf('//') !== 0) {
                // 移除旧的版本号参数（如果有）
                href = href.split('?')[0];
                // 添加新的版本号
                $(this).attr('href', href + '?v=' + timestamp);
            }
        });
        
        // 记录到控制台
        console.log('已更新资源版本号，防止缓存问题');
    }
    
    // 如果是开发环境或用户按下Ctrl+F5，执行防缓存措施
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || performance.navigation.type === 1) {
        preventCaching();
    }
    
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
    
    // 复制密码功能
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(function() {
            // 显示复制成功提示
            $('#copySuccess').fadeIn(200);
            setTimeout(function() {
                $('#copySuccess').fadeOut(500);
            }, 1500);
        }).catch(function(err) {
            console.error('无法复制: ', err);
            // 备用方案
            var textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            // 显示复制成功提示
            $('#copySuccess').fadeIn(200);
            setTimeout(function() {
                $('#copySuccess').fadeOut(500);
            }, 1500);
        });
    }
    
    // 点击密码复制
    $('#downloadPassword').on('click', function() {
        var password = $(this).text();
        copyToClipboard(password);
    });
    
    // 点击复制按钮
    $('#copyPasswordBtn').on('click', function() {
        var password = $('#downloadPassword').text();
        copyToClipboard(password);
    });
    
    // 点击下载按钮同时复制密码
    $('#downloadBtn').on('click', function() {
        var password = $('#downloadPassword').text();
        copyToClipboard(password);
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
    
    // 移动端菜单切换 - 修复移动端菜单显示问题
    $('#menuToggle').on('click', function() {
        // 切换菜单显示状态
        if ($('#mobileMenu').hasClass('show')) {
            // 隐藏菜单
            $('#mobileMenu').removeClass('show');
            $('#mobileMenu').css({
                'display': 'none'
            });
            // 更新aria-expanded属性
            $(this).attr('aria-expanded', 'false');
        } else {
            // 显示菜单
            $('#mobileMenu').addClass('show');
            $('#mobileMenu').css({
                'display': 'flex',
                'background-color': 'rgba(255, 255, 255, 0.85)',
                '-webkit-backdrop-filter': 'blur(25px)',
                'backdrop-filter': 'blur(25px)',
                'opacity': '1',
                'visibility': 'visible'
            });
            // 更新aria-expanded属性
            $(this).attr('aria-expanded', 'true');
        }
    });
    
    // 在移动设备上点击导航链接后关闭菜单
    $('.nav-link').on('click', function() {
        if ($(window).width() <= 640) {
            $('#mobileMenu').removeClass('show');
            $('#mobileMenu').css('display', 'none');
            // 更新菜单按钮的aria-expanded属性
            $('#menuToggle').attr('aria-expanded', 'false');
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
                $('#mobileMenu').css('display', 'none');
                // 更新菜单按钮的aria-expanded属性
                $('#menuToggle').attr('aria-expanded', 'false');
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
            $('.header').css('background-color', 'rgba(255, 255, 255, 0.95)');
            $('.nav-list.show').css('background-color', 'rgba(255, 255, 255, 0.95)');
        }
    }
    
    // 执行兼容性修复
    fixBackdropFilter();
    
    // 在窗口大小改变时重新应用样式
    $(window).on('resize', function() {
        // 如果屏幕宽度大于640px，确保菜单正常显示
        if ($(window).width() > 640) {
            $('#mobileMenu').css({
                'display': 'flex',
                'position': 'static',
                'background': 'none',
                'box-shadow': 'none',
                'flex-direction': 'row',
                'padding': '0'
            });
            // 如果有show类，移除它
            if ($('#mobileMenu').hasClass('show')) {
                $('#mobileMenu').removeClass('show');
                // 更新菜单按钮的aria-expanded属性
                $('#menuToggle').attr('aria-expanded', 'false');
            }
        } else if ($('#mobileMenu').hasClass('show')) {
            // 如果是移动设备并且菜单是展开状态，确保样式正确
            $('#mobileMenu').css({
                'display': 'flex',
                'background-color': 'rgba(255, 255, 255, 0.85)',
                '-webkit-backdrop-filter': 'blur(25px)',
                'backdrop-filter': 'blur(25px)',
                'opacity': '1',
                'visibility': 'visible'
            });
            // 更新菜单按钮的aria-expanded属性
            $('#menuToggle').attr('aria-expanded', 'true');
        }
    });
    
    // 处理反馈表单提交
    $('#feedbackForm').on('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const message = $('#message').val().trim();
        
        // 验证表单
        if (!name || !email || !message) {
            showSubmitStatus('请填写所有必填字段', true);
            return;
        }
        
        // 显示提交中状态
        $('#submitFeedback').prop('disabled', true).html('<span class="material-symbols-rounded">hourglass_empty</span> 提交中...');
        showSubmitStatus('正在提交...', false);
        
        // 解码邮箱地址
        const encodedEmail = [120, 105, 110, 103, 121, 117, 101, 64, 102, 111, 120, 110, 121, 120, 46, 116, 111, 112];
        const decodedEmail = String.fromCharCode.apply(null, encodedEmail);
        
        // 构建邮件内容
        const emailSubject = 'ESF启动器问题反馈';
        const emailBody = `昵称: ${name}\n联系方式: ${email}\n\n${message}`;
        const fullContent = `收件人: ${decodedEmail}\n主题: ${emailSubject}\n\n${emailBody}`;
        
        // 重置按钮状态
        $('#submitFeedback').prop('disabled', false).html('<span class="material-symbols-rounded">send</span> 提交反馈');
        
        // 自动复制内容到剪贴板
        navigator.clipboard.writeText(fullContent).then(function() {
            // 创建反馈结果容器
            const feedbackResult = $('<div class="feedback-result"></div>');
            
            // 添加成功提示
            feedbackResult.append('<div class="feedback-success"><span class="material-symbols-rounded">check_circle</span> 反馈内容已复制到剪贴板！</div>');
            feedbackResult.append('<p class="feedback-instruction">请选择以下方式之一发送您的反馈：</p>');
            
            // 创建常用邮箱按钮组
            const emailButtons = $('<div class="email-buttons"></div>');
            
            // QQ邮箱
            const qqMailBtn = $(`<a href="https://mail.qq.com/cgi-bin/compose_send" target="_blank" class="email-btn">
                <img src="https://rescdn.qqmail.com/zh_CN/htmledition/images/favicon/qqmail_favicon_32h.png" alt="QQ邮箱">
                <span>QQ邮箱</span>
            </a>`);
            
            // 网易邮箱
            const netEaseMailBtn = $(`<a href="https://mail.163.com/" target="_blank" class="email-btn">
                <img src="https://mail.163.com/favicon.ico" alt="网易邮箱">
                <span>网易邮箱</span>
            </a>`);
            
            // Gmail
            const gmailBtn = $(`<a href="https://mail.google.com/mail/?view=cm&fs=1" target="_blank" class="email-btn">
                <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico" alt="Gmail">
                <span>Gmail</span>
            </a>`);
            
            // 添加按钮到按钮组
            emailButtons.append(qqMailBtn).append(netEaseMailBtn).append(gmailBtn);
            
            // 添加邮箱按钮组到结果容器
            feedbackResult.append(emailButtons);
            
            // 添加说明文字
            const stepsList = $('<div class="steps-list"></div>');
            stepsList.append('<p class="feedback-note"><span class="material-symbols-rounded">looks_one</span> 点击上方邮箱图标打开对应邮箱</p>');
            stepsList.append('<p class="feedback-note"><span class="material-symbols-rounded">looks_two</span> 在邮箱页面中粘贴已复制的内容</p>');
            stepsList.append('<p class="feedback-note"><span class="material-symbols-rounded">looks_3</span> 填写收件人、主题等信息并发送</p>');
            feedbackResult.append(stepsList);
            
            // 添加重新复制按钮
            const recopyBtn = $(`<button class="recopy-btn">
                <span class="material-symbols-rounded">content_copy</span>
                重新复制内容
            </button>`);
            
            recopyBtn.on('click', function() {
                navigator.clipboard.writeText(fullContent).then(function() {
                    const statusMsg = $('<div class="copy-status">已重新复制！</div>');
                    $(this).after(statusMsg);
                    setTimeout(function() {
                        statusMsg.fadeOut(500, function() {
                            $(this).remove();
                        });
                    }, 1500);
                }.bind(this));
            });
            
            feedbackResult.append(recopyBtn);
            
            // 替换表单为结果
            $('.feedback-container').html(feedbackResult);
            
            // 滚动到结果顶部
            $('html, body').animate({
                scrollTop: $('.feedback-result').offset().top - 100
            }, 500);
        }).catch(function(err) {
            showSubmitStatus('复制内容失败，请手动复制以下内容并发送邮件：', true);
            const contentDisplay = $(`<div class="content-display">${fullContent.replace(/\n/g, '<br>')}</div>`);
            $('#submitStatus').append(contentDisplay);
        });
    });
    
    // 显示提交状态
    function showSubmitStatus(message, isError) {
        const statusElement = $('#submitStatus');
        statusElement.html(message);
        
        if (isError) {
            statusElement.addClass('error');
        } else {
            statusElement.removeClass('error');
        }
        
        statusElement.fadeIn(200);
    }
}); 