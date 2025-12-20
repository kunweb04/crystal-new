// 免责声明弹窗功能
const disclaimerModal = document.getElementById('disclaimerModal');
const disclaimerBtn = document.getElementById('disclaimer-btn');
const closeModal = document.getElementById('closeModal');
const acceptBtn = document.getElementById('acceptDisclaimer');

// 打开弹窗
disclaimerBtn.addEventListener('click', function(e) {
    e.preventDefault();
    disclaimerModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // 防止背景滚动
});

// 关闭弹窗
function closeDisclaimer() {
    disclaimerModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeModal.addEventListener('click', closeDisclaimer);
acceptBtn.addEventListener('click', closeDisclaimer);

// 点击弹窗外部关闭
disclaimerModal.addEventListener('click', function(e) {
    if (e.target === disclaimerModal) {
        closeDisclaimer();
    }
});

// 按ESC键关闭
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && disclaimerModal.classList.contains('active')) {
        closeDisclaimer();
    }
});

// 搜索功能
document.querySelector('.search-box button').addEventListener('click', function() {
    const searchTerm = document.querySelector('.search-box input').value;
    if(searchTerm.trim() !== '') {
        // 创建搜索反馈元素
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
        
        // 3秒后移除反馈
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

// 卡片悬停效果增强
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// 创建更多浮动水晶
const hero = document.querySelector('.hero');
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

// 页面加载动画
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.body.style.opacity = 1;
    }, 100);
    
    // 添加卡片动画
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'fadeIn 0.8s ease forwards';
            card.style.opacity = '0';
        }, index * 150);
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if(window.scrollY > 50) {
        header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    }
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