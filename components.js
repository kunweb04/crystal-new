// 加载导航栏和页脚组件
function loadComponents() {
    // 加载导航栏
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            
            // 设置当前页面的活动导航项
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('nav a');
            navLinks.forEach(link => {
                const linkPage = link.getAttribute('href');
                if (linkPage === currentPage) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
            
            // 初始化Google搜索
            initGoogleSearch();
        })
        .catch(error => console.error('Error loading navbar:', error));
    
    // 加载页脚
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

// 初始化Google自定义搜索
function initGoogleSearch() {
    // 配置Google自定义搜索
    window.__gcse = {
        parsetags: 'explicit',
        initializationCallback: function() {
            if (typeof google !== 'undefined' && google.search && google.search.cse) {
                // 渲染搜索框
                google.search.cse.element.render({
                    div: 'google-custom-search',
                    tag: 'searchbox-only',
                    attributes: {
                        resultsUrl: 'search-results.html',
                        newWindow: false,
                        queryParameterName: 'q',
                        autoCompleteMaxCompletions: 5
                    }
                });
                
                // 自定义搜索框placeholder
                setTimeout(() => {
                    const searchInput = document.querySelector('.gsc-input-box input');
                    if (searchInput) {
                        searchInput.placeholder = '搜索相关内容...';
                        searchInput.style.color = 'white';
                    }
                }, 100);
            }
        }
    };
    
    // 加载Google CSE脚本
    const existingScript = document.querySelector('script[src*="cse.google.com/cse.js"]');
    if (!existingScript) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://cse.google.com/cse.js?cx=20995defc55444858';
        document.head.appendChild(script);
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    loadComponents();
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            }
        }
    });
    
    // 页面加载动画
    setTimeout(function() {
        document.body.style.opacity = 1;
    }, 100);
    
    // 卡片悬停效果
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 按钮悬停效果
    const buttons = document.querySelectorAll('.card-btn, .featured-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// 免责声明弹窗功能（如果在页面中存在）
function initDisclaimerModal() {
    const disclaimerModal = document.getElementById('disclaimerModal');
    const disclaimerBtn = document.getElementById('disclaimer-btn');
    const closeModal = document.getElementById('closeModal');
    const acceptBtn = document.getElementById('acceptDisclaimer');
    
    if (disclaimerModal && disclaimerBtn && closeModal && acceptBtn) {
        // 打开弹窗
        disclaimerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            disclaimerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // 关闭弹窗函数
        function closeDisclaimer() {
            disclaimerModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // 点击关闭按钮
        closeModal.addEventListener('click', closeDisclaimer);
        
        // 点击接受按钮
        acceptBtn.addEventListener('click', closeDisclaimer);
        
        // 点击弹窗外部关闭
        disclaimerModal.addEventListener('click', function(e) {
            if (e.target === disclaimerModal) {
                closeDisclaimer();
            }
        });
        
        // 按ESC键关闭
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && disclaimerModal.classList.contains('active')) {
                closeDisclaimer();
            }
        });
    }
}

// 文章页面导航功能（如果在页面中存在）
function initArticleNavigation() {
    const articleNav = document.querySelector('.safety-nav');
    
    if (articleNav) {
        document.querySelectorAll('.safety-nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                const offset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                document.querySelectorAll('.safety-nav a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
        
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.safety-nav a[href^="#"]');
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop - 150) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// 浮动水晶效果
function initFloatingCrystals() {
    const hero = document.querySelector('.hero');
    if (hero) {
        // 检查是否已经有足够的水晶
        const existingCrystals = hero.querySelectorAll('.crystal').length;
        if (existingCrystals < 6) {
            for (let i = 0; i < 3; i++) {
                const crystal = document.createElement('div');
                crystal.className = 'crystal';
                crystal.innerHTML = '<i class="fas fa-diamond"></i>';
                crystal.style.top = Math.random() * 100 + '%';
                crystal.style.left = Math.random() * 100 + '%';
                crystal.style.fontSize = (Math.random() * 1 + 1) + 'rem';
                crystal.style.animationDelay = Math.random() * 5 + 's';
                
                // 随机颜色
                const colors = [
                    'rgba(52, 152, 219, 0.8)', 
                    'rgba(26, 188, 156, 0.8)', 
                    'rgba(155, 89, 182, 0.8)', 
                    'rgba(231, 76, 60, 0.8)', 
                    'rgba(241, 196, 15, 0.8)', 
                    'rgba(230, 126, 34, 0.8)'
                ];
                crystal.style.color = colors[Math.floor(Math.random() * colors.length)];
                
                // 添加闪耀动画
                crystal.style.animation = `float ${8 + Math.random() * 4}s infinite ease-in-out, sparkle ${3 + Math.random() * 2}s infinite`;
                
                hero.appendChild(crystal);
            }
        }
    }
}

// 初始化所有功能
function initAll() {
    initDisclaimerModal();
    initArticleNavigation();
    initFloatingCrystals();
}

// 页面完全加载后初始化所有功能
window.addEventListener('load', initAll);