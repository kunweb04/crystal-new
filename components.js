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

    const searchButton = document.querySelector('.search-box button');
    const searchInput = document.querySelector('.search-box input');
    
    if (searchButton && searchInput) {
        const performSearch = function() {
            const searchTerm = searchInput.value.trim();
            if(searchTerm !== '') {
                const cx = '20995defc55444858';
                const apiKey = 'AIzaSyBfyT9kVEV_9GECgBTWKhMmVQJxzXqAQNs';
                
                showSearchModal();
                executeGoogleSearch(searchTerm, cx, apiKey);
            } else {
                showFeedback('请输入搜索内容');
            }
        };

        searchButton.addEventListener('click', performSearch);
        
        searchInput.addEventListener('keypress', function(e) {
            if(e.key === 'Enter') {
                performSearch();
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

function showFeedback(message) {
    const feedback = document.createElement('div');
    feedback.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
    feedback.style.cssText = `
        position: fixed;
        top: 70px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--accent);
        color: white;
        padding: 14px 30px;
        border-radius: 50px;
        z-index: 2000;
        box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        animation: fadeIn 0.5s ease;
        font-size: 1.1rem;
        font-weight: 500;
    `;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.animation = 'fadeIn 0.5s ease reverse forwards';
        setTimeout(() => {
            if(feedback.parentNode) {
                document.body.removeChild(feedback);
            }
        }, 500);
    }, 3000);
}

function showSearchModal() {
    let modal = document.getElementById('searchResultsModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'searchResultsModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(8px);
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div id="searchModalContent" style="
                background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
                border-radius: 20px;
                width: 90%;
                max-width: 900px;
                max-height: 85vh;
                overflow-y: auto;
                padding: 2.5rem;
                position: relative;
                box-shadow: 0 25px 50px rgba(0,0,0,0.3);
                transform: translateY(20px);
                transition: transform 0.3s ease;
            ">
                <button id="closeSearchModal" style="
                    position: absolute;
                    top: 20px;
                    right: 25px;
                    background: transparent;
                    border: none;
                    color: var(--primary);
                    font-size: 1.8rem;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                    width: 45px;
                    height: 45px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                ">
                    <i class="fas fa-times"></i>
                </button>
                
                <div id="searchResultsContainer" style="margin-top: 2rem;">
                    <div style="text-align: center; padding: 3rem;">
                        <i class="fas fa-spinner fa-spin" style="font-size: 3rem; color: var(--accent);"></i>
                        <p style="margin-top: 1rem; color: var(--text-light); font-size: 1.1rem;">正在搜索...</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('closeSearchModal').addEventListener('click', closeSearchModal);
        modal.addEventListener('click', function(e) {
            if(e.target === modal) {
                closeSearchModal();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if(e.key === 'Escape' && modal.style.display === 'flex') {
                closeSearchModal();
            }
        });
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modal.style.opacity = '1';
        document.getElementById('searchModalContent').style.transform = 'translateY(0)';
    }, 10);
}

function closeSearchModal() {
    const modal = document.getElementById('searchResultsModal');
    if(modal) {
        modal.style.opacity = '0';
        document.getElementById('searchModalContent').style.transform = 'translateY(20px)';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

function executeGoogleSearch(query, cx, apiKey) {
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}&lr=lang_zh-CN`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data, query);
        })
        .catch(error => {
            console.error('搜索错误:', error);
            displaySearchError();
        });
}

function displaySearchResults(data, query) {
    const container = document.getElementById('searchResultsContainer');
    
    if(!data.items || data.items.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--text-light); opacity: 0.3;"></i>
                <h3 style="color: var(--primary); margin: 1.5rem 0 0.8rem;">未找到相关结果</h3>
                <p style="color: var(--text-light);">请尝试使用其他关键词搜索</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div style="margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 2px solid rgba(22, 160, 133, 0.1);">
            <h2 style="font-size: 2rem; color: var(--primary); margin-bottom: 0.5rem; font-family: 'Playfair Display', serif;">
                <i class="fas fa-search" style="color: var(--accent); margin-right: 0.5rem;"></i>
                搜索结果
            </h2>
            <p style="color: var(--text-light); font-size: 1.1rem;">
                找到约 ${data.searchInformation.formattedTotalResults} 条关于 "<strong style="color: var(--accent);">${query}</strong>" 的结果
            </p>
        </div>
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
    `;
    
    data.items.forEach(item => {
        const snippet = item.htmlSnippet || item.snippet || '';
        const cleanSnippet = snippet.replace(/<[^>]*>/g, '');
        
        html += `
            <div style="
                background: linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%);
                border-radius: 16px;
                padding: 1.8rem;
                border: 1px solid rgba(22, 160, 133, 0.1);
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
                cursor: pointer;
            " 
            onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 25px rgba(0, 0, 0, 0.1)'; this.style.borderColor='var(--accent-light)';"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0, 0, 0, 0.05)'; this.style.borderColor='rgba(22, 160, 133, 0.1)';"
            onclick="window.open('${item.link}', '_blank')">
                <h3 style="
                    font-size: 1.4rem;
                    color: var(--primary);
                    margin-bottom: 0.8rem;
                    font-weight: 600;
                    line-height: 1.3;
                ">${item.htmlTitle || item.title}</h3>
                
                <p style="
                    color: var(--accent);
                    font-size: 0.9rem;
                    margin-bottom: 0.8rem;
                    word-break: break-all;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                ">
                    <i class="fas fa-link" style="font-size: 0.8rem;"></i>
                    ${item.displayLink}
                </p>
                
                <p style="
                    color: var(--text-light);
                    line-height: 1.6;
                    font-size: 1rem;
                    margin: 0;
                ">${cleanSnippet}</p>
            </div>
        `;
    });
    
    html += '</div>';
    
    container.innerHTML = html;
}

function displaySearchError() {
    const container = document.getElementById('searchResultsContainer');
    container.innerHTML = `
        <div style="text-align: center; padding: 3rem;">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #e74c3c;"></i>
            <h3 style="color: var(--primary); margin: 1.5rem 0 0.8rem;">搜索出错</h3>
            <p style="color: var(--text-light);">请稍后再试</p>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    loadComponents();
});