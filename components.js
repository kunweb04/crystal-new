
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
});

// 页面完全加载后初始化
window.addEventListener('load', function() {
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