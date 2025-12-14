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
    
    initSearch();
    
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
    
    initKeyboardShortcuts();
}

function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchBtn || !searchResults) return;
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (!query) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            return;
        }
        
        const searchUrl = `https://cse.google.com/cse?cx=20995defc55444858&q=${encodeURIComponent(query)}`;
        
        searchResults.innerHTML = `
            <div class="search-results-header">
                <h4>搜索结果: "${query}"</h4>
                <button class="close-search"><i class="fas fa-times"></i></button>
            </div>
            <div class="search-results-content">
                <iframe 
                    src="${searchUrl}" 
                    frameborder="0"
                    width="100%"
                    height="500"
                    title="Google 自定义搜索结果">
                </iframe>
            </div>
            <div class="search-results-footer">
                <a href="${searchUrl}" target="_blank" class="view-all-results">
                    <i class="fas fa-external-link-alt"></i> 查看更多结果
                </a>
            </div>
        `;
        
        searchResults.style.display = 'block';
        
        const closeBtn = searchResults.querySelector('.close-search');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                searchResults.style.display = 'none';
                searchInput.value = '';
            });
        }
        
        searchResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    searchBtn.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    searchInput.addEventListener('input', () => {
        if (!searchInput.value.trim()) {
            searchResults.style.display = 'none';
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!searchResults.contains(e.target) && 
            !searchInput.contains(e.target) && 
            !searchBtn.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
    });
    
    setTimeout(() => {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.placeholder = '搜索相关内容... (Ctrl+K)';
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    loadComponents();
    
    const style = document.createElement('style');
    style.textContent = `
        .search-box {
            position: relative;
            width: 320px;
        }
        
        .search-box input {
            width: 100%;
            padding: 0.7rem 1.5rem;
            border: 2px solid rgba(22, 160, 133, 0.2);
            border-radius: 50px;
            background: rgba(255, 255, 255, 0.9);
            color: var(--primary);
            font-size: 1rem;
            transition: all 0.3s ease;
        }
        
        .search-box input:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 0 3px rgba(22, 160, 133, 0.2);
            background: white;
        }
        
        .search-box input::placeholder {
            color: var(--text-light);
        }
        
        .search-box button {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: var(--accent);
            color: white;
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .search-box button:hover {
            background: var(--accent-light);
            transform: translateY(-50%) scale(1.1);
        }
        
        .search-results {
            display: none;
            position: absolute;
            top: calc(100% + 10px);
            left: 0;
            width: 600px;
            max-width: 90vw;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            border: 1px solid var(--border-color);
            overflow: hidden;
            animation: fadeInDown 0.3s ease;
        }
        
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .search-results-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 1.5rem;
            background: var(--primary-dark);
            color: white;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .search-results-header h4 {
            margin: 0;
            font-size: 1.1rem;
            font-weight: 600;
        }
        
        .close-search {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1.2rem;
            padding: 5px;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s ease;
        }
        
        .close-search:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        .search-results-content {
            padding: 0;
            height: 500px;
            overflow: hidden;
        }
        
        .search-results-content iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
        
        .search-results-footer {
            padding: 1rem 1.5rem;
            border-top: 1px solid var(--border-color);
            background: var(--light-gray);
            text-align: center;
        }
        
        .view-all-results {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: var(--accent);
            text-decoration: none;
            font-weight: 500;
            font-size: 0.95rem;
            transition: color 0.3s ease;
        }
        
        .view-all-results:hover {
            color: var(--accent-light);
        }
        
        @media (max-width: 1100px) {
            .search-box {
                width: 280px;
            }
            
            .search-results {
                width: 500px;
            }
        }
        
        @media (max-width: 768px) {
            .search-box {
                width: 100%;
                margin-top: 1rem;
                order: 3;
            }
            
            .search-results {
                width: calc(100vw - 40px);
                left: 50%;
                transform: translateX(-50%);
            }
        }
        
        @media (max-width: 480px) {
            .search-results {
                width: calc(100vw - 20px);
            }
            
            .search-results-content {
                height: 400px;
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
});