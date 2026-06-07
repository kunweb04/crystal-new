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
      display: none !important;
    }
    #custom-dify-trigger {
      position: fixed !important;
      bottom: 24px !important;
      right: 24px !important;
      left: auto !important;
      top: auto !important;
      z-index: 99999 !important;
      display: flex !important;
      align-items: center !important;
      flex-direction: row-reverse !important;
      gap: 12px !important;
      cursor: pointer !important;
    }
    .custom-dify-btn {
      width: 80px !important;
      height: 80px !important;
      overflow: hidden !important;
      transition: transform 0.3s ease !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-radius: 50% !important;
    }
    .custom-dify-btn img {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
      display: block !important;
    }
    #custom-dify-trigger:hover .custom-dify-btn {
      transform: scale(1.08) !important;
    }
    .custom-dify-popover {
      background: #ffffff !important;
      color: #1a1a1a !important;
      padding: 10px 14px !important;
      border-radius: 12px !important;
      font-size: 14px !important;
      font-weight: 500 !important;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
      white-space: nowrap !important;
      position: relative !important;
      animation: popoverFade 0.3s ease forwards !important;
    }
    .custom-dify-popover::after {
      content: '' !important;
      position: absolute !important;
      right: -6px !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      border-width: 6px 0 6px 6px !important;
      border-style: solid !important;
      border-color: transparent transparent transparent #ffffff !important;
    }
    @keyframes popoverFade {
      from { opacity: 0; transform: translateX(10px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    .custom-dify-tooltip {
      position: absolute !important;
      bottom: calc(100% + 10px) !important;
      right: 10px !important;
      background: rgba(0,0,0,0.75) !important;
      color: #fff !important;
      padding: 6px 14px !important;
      border-radius: 10px !important;
      font-size: 13px !important;
      white-space: nowrap !important;
      opacity: 1 !important;
      transition: opacity 0.6s ease !important;
      pointer-events: none !important;
      z-index: 1 !important;
    }
    .custom-dify-tooltip.hide {
      opacity: 0 !important;
    }
    .custom-dify-tooltip::after {
      content: '' !important;
      position: absolute !important;
      top: 100% !important;
      right: 20px !important;
      border-width: 6px !important;
      border-style: solid !important;
      border-color: rgba(0,0,0,0.75) transparent transparent transparent !important;
    }
    #dify-chatbot-bubble-window {
      width: 24rem !important;
      height: 40rem !important;
      position: fixed !important;
      bottom: 148px !important;
      right: 24px !important;
      left: auto !important;
      top: auto !important;
      z-index: 99999 !important;
      border-radius: 16px !important;
      box-shadow: 0 10px 40px rgba(0,0,0,0.15) !important;
    }
    @media (max-width: 768px) {
      #custom-dify-trigger {
        bottom: 16px !important;
        right: 16px !important;
        gap: 8px !important;
      }
      .custom-dify-btn {
        width: 56px !important;
        height: 56px !important;
      }
      .custom-dify-popover {
        font-size: 13px !important;
        padding: 8px 12px !important;
      }
      .custom-dify-tooltip {
        font-size: 12px !important;
        padding: 5px 10px !important;
        right: 4px !important;
      }
      .custom-dify-tooltip::after {
        right: 16px !important;
      }
      #dify-chatbot-bubble-window {
        width: calc(100vw - 32px) !important;
        height: 70vh !important;
        bottom: 84px !important;
        right: 16px !important;
        left: auto !important;
      }
    }
  `;
  document.head.appendChild(style);
})();

function initCustomDifyTrigger() {
  if (document.getElementById('custom-dify-trigger')) return;
  var div = document.createElement('div');
  div.id = 'custom-dify-trigger';
  div.onclick = function() {
    var btn = document.getElementById('dify-chatbot-bubble-button');
    if (btn) btn.click();
  };
  div.innerHTML = '<div class="custom-dify-tooltip" id="dify-tooltip">需要帮助吗？</div><div class="custom-dify-btn"><img src="ai_icon.png" alt="Help"></div>';
  document.body.appendChild(div);

  setTimeout(function() {
    var tooltip = document.getElementById('dify-tooltip');
    if (tooltip) tooltip.classList.add('hide');
  }, 3000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCustomDifyTrigger);
} else {
  initCustomDifyTrigger();
}

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