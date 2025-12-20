<<<<<<< HEAD
function loadComponents() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            initNavbar();
        })
        .catch(error => {
            console.error('加载导航栏失败:', error);
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
                        <form class="search-box" method="get" action="https://cse.google.com/cse" target="_blank">
                            <input type="hidden" name="cx" value="20995defc55444858">
                            <input type="text" name="q" placeholder="搜索相关内容..." required>
                            <button type="submit"><i class="fas fa-search"></i></button>
                        </form>
                    </div>
                </header>
            `;
            initNavbar();
        });
    
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => {
            console.error('加载页脚失败:', error);
        });
}

function initNavbar() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if(header) {
            if(window.scrollY > 50) {
                header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            }
        }
    });
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
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
        if (searchInput) {
            searchInput.placeholder = '搜索相关内容... (Ctrl+K)';
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    loadComponents();
=======
function loadComponents() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            initNavbar();
        })
        .catch(error => {
            console.error('加载导航栏失败:', error);
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
                        <form class="search-box" method="get" action="https://cse.google.com/cse" target="_blank">
                            <input type="hidden" name="cx" value="20995defc55444858">
                            <input type="text" name="q" placeholder="搜索相关内容..." required>
                            <button type="submit"><i class="fas fa-search"></i></button>
                        </form>
                    </div>
                </header>
            `;
            initNavbar();
        });
    
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => {
            console.error('加载页脚失败:', error);
        });
}

function initNavbar() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if(header) {
            if(window.scrollY > 50) {
                header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
            } else {
                header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            }
        }
    });
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
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
        if (searchInput) {
            searchInput.placeholder = '搜索相关内容... (Ctrl+K)';
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    loadComponents();
>>>>>>> ca3f345e54aa8670faf05de6cdf3c9d88f198d00
});