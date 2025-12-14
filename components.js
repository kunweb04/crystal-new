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

    const searchForm = document.getElementById('searchForm');
    const searchInput = document.querySelector('.search-box input[name="q"]');
    const searchButton = document.querySelector('.search-box button');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            const searchTerm = searchInput.value.trim();
            
            if(searchTerm === '') {
                e.preventDefault();
                showSearchMessage('请输入搜索内容', 'error');
                searchInput.focus();
            } else {
                showSearchMessage(`正在搜索: ${searchTerm}`, 'info');
                setTimeout(() => {
                    this.submit();
                }, 500);
            }
        });
        
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            searchForm.dispatchEvent(new Event('submit'));
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 0 3px rgba(22, 160, 133, 0.2)';
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = '';
        });
        
        searchInput.addEventListener('input', function() {
            if (this.value.trim().length > 0) {
                this.style.borderColor = 'var(--accent)';
            } else {
                this.style.borderColor = '';
            }
        });
    }
    
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

function showSearchMessage(message, type) {
    const feedback = document.createElement('div');
    feedback.className = `search-feedback ${type}`;
    feedback.innerHTML = `<i class="fas fa-search"></i> ${message}`;
    
    feedback.style.cssText = `
        position: fixed;
        top: 70px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'error' ? '#e74c3c' : 'var(--accent)'};
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
});

const style = document.createElement('style');
style.textContent = `
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
        border-color: var(--accent);
        box-shadow: 0 0 0 3px rgba(22, 160, 133, 0.2);
    }
    
    .search-feedback.error {
        background: #e74c3c !important;
    }
    
    .search-feedback.info {
        background: var(--accent) !important;
    }
    
    @media (max-width: 768px) {
        .search-box input {
            width: 100%;
        }
    }
`;
document.head.appendChild(style);