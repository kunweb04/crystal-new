// components.js
// 加载导航栏和页脚组件
function loadComponents() {
    // 加载导航栏
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            initNavbar();
            initGoogleSearch();
        });
    
    // 加载页脚
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });
}

// 初始化Google自定义搜索
function initGoogleSearch() {
    // 创建Google搜索元素
    const searchContainer = document.createElement('div');
    searchContainer.id = 'google-search-container';
    searchContainer.style.position = 'relative';
    
    // 找到搜索框的位置
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.parentNode.insertBefore(searchContainer, searchBox);
        searchBox.style.display = 'none'; // 隐藏原来的搜索框
    }
    
    // 创建Google搜索框
    const gcseScript = document.createElement('script');
    gcseScript.src = 'https://cse.google.com/cse.js?cx=20995defc55444858';
    gcseScript.async = true;
    document.head.appendChild(gcseScript);
    
    // 添加搜索结果容器（隐藏状态）
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'google-search-results';
    resultsContainer.style.cssText = `
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        border-radius: 0 0 12px 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        z-index: 1000;
        max-height: 400px;
        overflow-y: auto;
        padding: 1rem;
    `;
    searchContainer.appendChild(resultsContainer);
    
    // 监听Google搜索加载完成
    window.__gcse = {
        parsetags: 'explicit',
        callback: function() {
            if (window.google && google.search && google.search.cse) {
                // 创建搜索元素
                const element = google.search.cse.element.getElement('searchresults-only0');
                if (element) {
                    // 自定义搜索结果容器
                    const renderOptions = {
                        webSearchResultSetSize: true,
                        webSearchResultSetSize: 5,
                        webSearchSnippetLength: 100,
                        resultSetSize: 5
                    };
                    
                    element.execute('CrystalLab');
                    
                    // 监听搜索事件
                    const input = document.querySelector('input.gsc-input');
                    if (input) {
                        input.placeholder = '搜索相关内容...';
                        input.style.cssText = `
                            width: 100%;
                            padding: 0.8rem 1rem;
                            border: 2px solid rgba(22, 160, 133, 0.2);
                            border-radius: 50px;
                            font-size: 1rem;
                            outline: none;
                            background: rgba(255,255,255,0.9);
                        `;
                        
                        input.addEventListener('focus', function() {
                            this.style.borderColor = 'var(--accent)';
                            this.style.boxShadow = '0 0 0 3px rgba(22, 160, 133, 0.2)';
                        });
                        
                        input.addEventListener('blur', function() {
                            this.style.borderColor = 'rgba(22, 160, 133, 0.2)';
                            this.style.boxShadow = 'none';
                        });
                    }
                    
                    // 自定义搜索按钮
                    const searchButton = document.querySelector('.gsc-search-button');
                    if (searchButton) {
                        searchButton.style.cssText = `
                            background: linear-gradient(135deg, var(--accent-light), var(--accent));
                            border: none;
                            border-radius: 50px;
                            padding: 0.8rem 1.5rem;
                            color: white;
                            cursor: pointer;
                            transition: all 0.3s ease;
                        `;
                        
                        searchButton.addEventListener('mouseenter', function() {
                            this.style.background = 'linear-gradient(135deg, var(--accent), var(--accent-secondary))';
                            this.style.transform = 'scale(1.05)';
                        });
                        
                        searchButton.addEventListener('mouseleave', function() {
                            this.style.background = 'linear-gradient(135deg, var(--accent-light), var(--accent))';
                            this.style.transform = 'scale(1)';
                        });
                    }
                    
                    // 搜索结果样式调整
                    setTimeout(() => {
                        const results = document.querySelectorAll('.gsc-results');
                        results.forEach(result => {
                            result.style.cssText = `
                                background: white;
                                padding: 1rem;
                                border-radius: 8px;
                            `;
                        });
                        
                        const resultItems = document.querySelectorAll('.gsc-result');
                        resultItems.forEach(item => {
                            item.style.cssText = `
                                border-bottom: 1px solid rgba(22, 160, 133, 0.1);
                                padding: 0.8rem 0;
                                margin-bottom: 0.5rem;
                            `;
                        });
                        
                        const titles = document.querySelectorAll('.gs-title');
                        titles.forEach(title => {
                            title.style.cssText = `
                                color: var(--primary);
                                font-weight: 600;
                                font-size: 1.1rem;
                                text-decoration: none;
                            `;
                            
                            title.addEventListener('mouseenter', function() {
                                this.style.color = 'var(--accent)';
                            });
                            
                            title.addEventListener('mouseleave', function() {
                                this.style.color = 'var(--primary)';
                            });
                        });
                        
                        const snippets = document.querySelectorAll('.gs-snippet');
                        snippets.forEach(snippet => {
                            snippet.style.cssText = `
                                color: var(--text-light);
                                font-size: 0.95rem;
                                line-height: 1.5;
                            `;
                        });
                    }, 500);
                }
            }
        }
    };
}

// 初始化导航栏功能
function initNavbar() {
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if(window.scrollY > 50) {
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        }
    });
    
    // 设置当前页面的活动导航项
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    loadComponents();
    
    // 添加键盘快捷键 Ctrl+K 聚焦搜索框
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('input.gsc-input');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
    });
    
    // 添加搜索框快捷键提示
    setTimeout(() => {
        const searchInput = document.querySelector('input.gsc-input');
        if (searchInput) {
            searchInput.placeholder = '搜索相关内容... (Ctrl+K)';
        }
    }, 1000);
});