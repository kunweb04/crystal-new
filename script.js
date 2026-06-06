document.addEventListener('DOMContentLoaded', function() {
    const disclaimerModal = document.getElementById('disclaimerModal');
    const disclaimerBtn = document.getElementById('disclaimer-btn');
    const closeModal = document.getElementById('closeModal');
    const acceptBtn = document.getElementById('acceptDisclaimer');

    function closeDisclaimer() {
        if (disclaimerModal) {
            disclaimerModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (disclaimerBtn) {
        disclaimerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (disclaimerModal) {
                disclaimerModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
    if (closeModal) closeModal.addEventListener('click', closeDisclaimer);
    if (acceptBtn) acceptBtn.addEventListener('click', closeDisclaimer);

    if (disclaimerModal) {
        disclaimerModal.addEventListener('click', function(e) {
            if (e.target === disclaimerModal) closeDisclaimer();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && disclaimerModal && disclaimerModal.classList.contains('active')) {
            closeDisclaimer();
        }
    });

    const searchBtn = document.querySelector('.search-box button');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchInput = document.querySelector('.search-box input');
            const searchTerm = searchInput ? searchInput.value : '';
            if (searchTerm.trim() !== '') {
                const feedback = document.createElement('div');
                feedback.innerHTML = '<i class="fas fa-search"></i> 正在搜索: ' + searchTerm;
                feedback.style.cssText = 'position:fixed;top:70px;left:50%;transform:translateX(-50%);background:var(--accent);color:white;padding:14px 30px;border-radius:50px;z-index:2000;box-shadow:0 6px 20px rgba(0,0,0,0.25);animation:fadeIn 0.5s ease;font-size:1.1rem;font-weight:500;';
                document.body.appendChild(feedback);

                setTimeout(() => {
                    feedback.style.animation = 'fadeIn 0.5s ease reverse forwards';
                    setTimeout(() => {
                        if (feedback.parentNode) feedback.parentNode.removeChild(feedback);
                    }, 500);
                }, 3000);
            } else {
                alert('请输入搜索内容');
            }
        });
    }

    const cards = document.querySelectorAll('.card');
    if (cards.length) {
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    const hero = document.querySelector('.hero');
    if (hero) {
        for (let i = 0; i < 3; i++) {
            const crystal = document.createElement('div');
            crystal.className = 'crystal';
            crystal.innerHTML = '<i class="fas fa-gem"></i>';
            crystal.style.position = 'absolute';
            crystal.style.top = Math.random() * 90 + '%';
            crystal.style.left = Math.random() * 90 + '%';
            crystal.style.fontSize = (Math.random() * 1 + 1) + 'rem';
            crystal.style.animationDelay = Math.random() * 5 + 's';

            const colors = [
                'rgba(52, 152, 219, 0.8)',
                'rgba(26, 188, 156, 0.8)',
                'rgba(155, 89, 182, 0.8)',
                'rgba(231, 76, 60, 0.8)',
                'rgba(241, 196, 15, 0.8)',
                'rgba(230, 126, 34, 0.8)'
            ];
            crystal.style.color = colors[Math.floor(Math.random() * colors.length)];
            crystal.style.animation = 'float ' + (8 + Math.random() * 4) + 's infinite ease-in-out, sparkle ' + (3 + Math.random() * 2) + 's infinite';
            hero.appendChild(crystal);
        }
    }

    setTimeout(function() {
        document.body.style.opacity = 1;
    }, 100);

    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'fadeIn 0.8s ease forwards';
            card.style.opacity = '0';
        }, index * 150);
    });

    const buttons = document.querySelectorAll('.card-btn, .featured-btn');
    if (buttons.length) {
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-6px)';
            });
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        header.style.boxShadow = window.scrollY > 50 ? '0 4px 15px rgba(0,0,0,0.15)' : '0 4px 15px rgba(0,0,0,0.1)';
    }
});
