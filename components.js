function loadComponents() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            initNavbar();
            initMobileMenu();
        })
        .catch(error => {
            document.getElementById('navbar-container').innerHTML = `
                <header>
                    <div class="header-container">
                        <div class="logo">
                            <i class="fas fa-crystal"></i>
                            <h1><a href="index.html">CrystalLab</a></h1>
                        </div>
                        <nav>
                            <ul>
                                <li><a href="crystal-classification.html">培养指南</a></li>
                                <li><a href="portfolio.html">作品展示</a></li>
                                <li><a href="acknowledgements.html">特别鸣谢</a></li>
                                <li><a href="contribute.html">联系投稿</a></li>
                            </ul>
                        </nav>
                        <form class="search-box" method="get" action="search.html">
                            <input type="text" name="q" placeholder="搜索晶体相关内容..." required>
                            <button type="submit"><i class="fas fa-search"></i></button>
                        </form>
                        <button class="hamburger-menu" aria-label="菜单">
                            <i class="fas fa-bars"></i>
                        </button>
                    </div>
                    
                    <div class="mobile-menu-overlay">
                        <div class="mobile-menu-container">
                            <div class="mobile-menu-header">
                                <div class="mobile-logo">
                                    <i class="fas fa-crystal"></i>
                                    <h2>CrystalLab</h2>
                                </div>
                                <button class="close-menu-btn" aria-label="关闭菜单">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                            
                            <nav class="mobile-nav">
                                <ul>
                                    <li><a href="crystal-classification.html"><i class="fas fa-flask"></i>培养指南</a></li>
                                    <li><a href="portfolio.html"><i class="fas fa-images"></i>作品展示</a></li>
                                    <li><a href="acknowledgements.html"><i class="fas fa-hands-helping"></i>特别鸣谢</a></li>
                                    <li><a href="contribute.html"><i class="fas fa-edit"></i>联系投稿</a></li>
                                </ul>
                            </nav>
                            
                            <div class="mobile-search-box">
                                <form method="get" action="search.html">
                                    <input type="text" name="q" placeholder="搜索晶体相关内容..." required>
                                    <button type="submit"><i class="fas fa-search"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </header>
            `;
            initNavbar();
            initMobileMenu();
        });
    
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });
}

function initNavbar() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if(header) {
            header.style.boxShadow = window.scrollY > 50 ? '0 4px 15px rgba(0,0,0,0.15)' : '0 4px 15px rgba(0,0,0,0.1)';
        }
    });
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    initKeyboardShortcuts();
}

function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.search-box input[name="q"]');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
    });
    
    setTimeout(() => {
        const searchInput = document.querySelector('.search-box input[name="q"]');
        if (searchInput) searchInput.placeholder = '搜索相关内容... (Ctrl+K)';
    }, 1000);
}

function initMobileMenu() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');
    
    if (hamburgerMenu && mobileMenuOverlay) {
        hamburgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    function closeMobileMenu() {
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) closeMobileMenu();
        });
    }
    
    if (mobileMenuContainer) {
        mobileMenuContainer.addEventListener('click', e => e.stopPropagation());
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay?.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    const mobileSearchForm = document.querySelector('.mobile-search-box form');
    if (mobileSearchForm) mobileSearchForm.addEventListener('submit', closeMobileMenu);
}

document.addEventListener('DOMContentLoaded', loadComponents);