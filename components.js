// 加载导航栏和页脚组件
function loadComponents() {
    // 加载导航栏
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            initNavbar();
        });
    
    // 加载页脚
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });
}

// 初始化导航栏功能
function initNavbar() {
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if(window.scrollY > 50) {
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        }
    });

    // 搜索功能
    const searchButton = document.querySelector('.search-box button');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchTerm = document.querySelector('.search-box input').value;
            if(searchTerm.trim() !== '') {
                const feedback = document.createElement('div');
                feedback.innerHTML = `<i class="fas fa-search"></i> 正在搜索: ${searchTerm}`;
                feedback.style.position = 'fixed';
                feedback.style.top = '70px';
                feedback.style.left = '50%';
                feedback.style.transform = 'translateX(-50%)';
                feedback.style.background = 'var(--accent)';
                feedback.style.color = 'white';
                feedback.style.padding = '14px 30px';
                feedback.style.borderRadius = '50px';
                feedback.style.zIndex = '2000';
                feedback.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
                feedback.style.animation = 'fadeIn 0.5s ease';
                feedback.style.fontSize = '1.1rem';
                feedback.style.fontWeight = '500';
                document.body.appendChild(feedback);
                
                setTimeout(() => {
                    feedback.style.animation = 'fadeIn 0.5s ease reverse forwards';
                    setTimeout(() => {
                        document.body.removeChild(feedback);
                    }, 500);
                }, 3000);
            } else {
                alert('请输入搜索内容');
            }
        });
    }
    
    // 设置当前页面的活动导航项
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

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    loadComponents();
});