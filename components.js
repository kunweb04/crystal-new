function loadComponents() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            initNavbar();
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
        if(window.scrollY > 50) {
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        }
    });

    const searchBox = document.getElementById('searchBox');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (searchBox && searchInput && searchButton) {
        function submitSearch() {
            const query = searchInput.value.trim();
            if (query === '') {
                showSearchMessage('请输入搜索内容', 'error');
                searchInput.focus();
            } else {
                window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
            }
        }
        
        searchButton.addEventListener('click', submitSearch);
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitSearch();
            }
        });
        
        searchInput.addEventListener('focus', function() {
            searchBox.style.boxShadow = '0 0 0 3px rgba(22, 160, 133, 0.2)';
        });
        
        searchInput.addEventListener('blur', function() {
            searchBox.style.boxShadow = '';
        });
        
        searchInput.addEventListener('input', function() {
            if (this.value.trim().length > 0) {
                searchBox.style.borderColor = '#16a085';
            } else {
                searchBox.style.borderColor = '';
            }
        });
        
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
}

function showSearchMessage(message, type) {
    const feedback = document.createElement('div');
    feedback.className = `search-feedback ${type}`;
    feedback.innerHTML = `<i class="fas fa-search"></i> ${message}`;
    
    feedback.style.cssText = `
        position: fixed;
        top: 70px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'error' ? '#e74c3c' : '#16a085'};
        color: white;
        padding: 14px 30px;
        border-radius: 50px;
        z-index: 2000;
        box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        animation: fadeIn 0.5s ease;
        font-size: 1.1rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 90%;
        text-align: center;
    `;
    
    const existingMessage = document.querySelector('.search-feedback');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.remove();
            }
        }, 500);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    loadComponents();
    
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
    });
    
    setTimeout(() => {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.placeholder = '搜索相关内容... (Ctrl+K)';
        }
    }, 1000);
});

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
        }
    }
    
    .search-box {
        position: relative;
    }
    
    .search-box input {
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }
    
    .search-box input:focus {
        outline: none;
        border-color: #16a085;
        box-shadow: 0 0 0 3px rgba(22, 160, 133, 0.2);
    }
    
    .search-feedback.error {
        background: #e74c3c !important;
    }
    
    .search-feedback.info {
        background: #16a085 !important;
    }
    
    .search-results-container {
        background: var(--card-bg);
        border-radius: 20px;
        padding: 3rem;
        box-shadow: var(--card-shadow);
        margin-top: 2rem;
    }
    
    .gsc-control-cse {
        font-family: 'Noto Sans SC', sans-serif !important;
        background: transparent !important;
        border: none !important;
        padding: 0 !important;
    }
    
    .gsc-results-wrapper-overlay {
        border: none !important;
        box-shadow: none !important;
    }
    
    .gsc-webResult.gsc-result {
        border: 1px solid var(--border-color) !important;
        border-radius: 12px !important;
        padding: 1.5rem !important;
        margin-bottom: 1.5rem !important;
        background: white !important;
        transition: all 0.3s ease !important;
    }
    
    .gsc-webResult.gsc-result:hover {
        border-color: #16a085 !important;
        box-shadow: 0 8px 25px rgba(22, 160, 133, 0.15) !important;
        transform: translateY(-3px) !important;
    }
    
    .gs-title {
        color: var(--primary-dark) !important;
        font-size: 1.3rem !important;
        font-weight: 600 !important;
        text-decoration: none !important;
        line-height: 1.4 !important;
        margin-bottom: 0.5rem !important;
    }
    
    .gs-title:hover {
        color: #16a085 !important;
        text-decoration: underline !important;
    }
    
    .gs-snippet {
        color: var(--text-light) !important;
        font-size: 1.05rem !important;
        line-height: 1.6 !important;
        margin-top: 0.5rem !important;
    }
    
    .gs-visibleUrl {
        color: #16a085 !important;
        font-size: 0.9rem !important;
        margin-top: 0.5rem !important;
    }
    
    .gsc-cursor-box {
        margin-top: 2rem !important;
        text-align: center !important;
    }
    
    .gsc-cursor-page {
        background: white !important;
        border: 1px solid var(--border-color) !important;
        border-radius: 8px !important;
        color: var(--text) !important;
        padding: 0.5rem 1rem !important;
        margin: 0 0.3rem !important;
        text-decoration: none !important;
        transition: all 0.3s ease !important;
    }
    
    .gsc-cursor-page:hover {
        background: #16a085 !important;
        color: white !important;
        border-color: #16a085 !important;
    }
    
    .gsc-cursor-current-page {
        background: #16a085 !important;
        color: white !important;
        border-color: #16a085 !important;
    }
    
    @media (max-width: 768px) {
        .search-box input {
            width: 100%;
        }
        
        .search-results-container {
            padding: 1.5rem;
        }
        
        .gsc-webResult.gsc-result {
            padding: 1rem !important;
        }
        
        .gs-title {
            font-size: 1.1rem !important;
        }
    }
`;
document.head.appendChild(style);