window.difyChatbotConfig = {
  token: 't6geQ7E2a02dkUU9',
  inputs: {},
  systemVariables: {},
  userVariables: {}
};

(function() {
  var s = document.createElement('script');
  s.src = 'https://udify.app/embed.min.js';
  s.id = 't6geQ7E2a02dkUU9';
  s.defer = true;
  document.head.appendChild(s);

  var style = document.createElement('style');
  style.textContent = `
    #dify-chatbot-bubble-button {
      position: fixed !important;
      bottom: 24px !important;
      right: 24px !important;
      left: auto !important;
      top: auto !important;
      width: 56px !important;
      height: 56px !important;
      border-radius: 50% !important;
      background: transparent !important;
      background-image: url('ai_icon.png') !important;
      background-size: cover !important;
      background-position: center !important;
      background-repeat: no-repeat !important;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25) !important;
      border: none !important;
      padding: 0 !important;
      overflow: hidden !important;
      z-index: 99999 !important;
    }
    #dify-chatbot-bubble-button svg,
    #dify-chatbot-bubble-button img,
    #dify-chatbot-bubble-button i,
    #dify-chatbot-bubble-button span,
    #dify-chatbot-bubble-button * {
      display: none !important;
    }
    #dify-chatbot-bubble-window {
      bottom: 92px !important;
      right: 24px !important;
      left: auto !important;
      top: auto !important;
      width: 24rem !important;
      height: 40rem !important;
      z-index: 99999 !important;
    }
    #ai-helper-tooltip {
      position: fixed;
      bottom: 88px;
      right: 24px;
      background: #ffffff;
      color: #1f2937;
      padding: 8px 14px;
      border-radius: 12px;
      font-size: 13px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      box-shadow: 0 2px 12px rgba(0,0,0,0.15);
      white-space: nowrap;
      opacity: 0;
      transform: translateY(6px);
      transition: opacity 0.35s ease, transform 0.35s ease;
      pointer-events: none;
      z-index: 99998;
    }
    #ai-helper-tooltip.show {
      opacity: 1;
      transform: translateY(0);
    }
    #ai-helper-tooltip::after {
      content: '';
      position: absolute;
      bottom: -5px;
      right: 22px;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #ffffff;
    }
  `;
  document.head.appendChild(style);

  function initTooltip() {
    if (document.getElementById('ai-helper-tooltip')) return;
    var tooltip = document.createElement('div');
    tooltip.id = 'ai-helper-tooltip';
    tooltip.textContent = '需要帮助吗？';
    document.body.appendChild(tooltip);
    
    requestAnimationFrame(function() {
      tooltip.classList.add('show');
    });
    
    setTimeout(function() {
      tooltip.classList.remove('show');
      setTimeout(function() {
        if (tooltip.parentNode) tooltip.parentNode.removeChild(tooltip);
      }, 350);
    }, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTooltip);
  } else {
    initTooltip();
  }
})();

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
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                const header = document.querySelector('header');
                if (header) {
                    header.style.boxShadow = window.scrollY > 50 ? '0 4px 15px rgba(0,0,0,0.15)' : '0 4px 15px rgba(0,0,0,0.1)';
                }
                ticking = false;
            });
            ticking = true;
        }
    });
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