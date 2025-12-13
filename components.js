// components.js - 只保留必要的功能

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

// 页面完全加载后初始化浮动水晶
window.addEventListener('load', function() {
    initFloatingCrystals();
});