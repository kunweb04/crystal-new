const ANNOUNCEMENT_VERSION = 'v1.0.5';

document.addEventListener('DOMContentLoaded', function() {
    const announcementModal = document.getElementById('announcementModal');
    const closeAnnouncement = document.getElementById('closeAnnouncement');
    const acceptAnnouncement = document.getElementById('acceptAnnouncement');
    const versionBadge = document.querySelector('.version-badge');
    
    // 更新版本号显示
    if (versionBadge) {
        versionBadge.textContent = ANNOUNCEMENT_VERSION;
    }
    
    function showAnnouncement() {
        const today = new Date().toDateString();
        const lastSeenDate = localStorage.getItem('announcementLastSeenDate');
        const lastSeenVersion = localStorage.getItem('announcementLastSeenVersion');
        
        // 如果从未看过公告，或者日期不同，或者版本不同，则显示公告
        if (!lastSeenDate || lastSeenDate !== today || lastSeenVersion !== ANNOUNCEMENT_VERSION) {
            console.log('显示公告:', { lastSeenDate, today, lastSeenVersion, ANNOUNCEMENT_VERSION });
            setTimeout(() => {
                announcementModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }, 1500);
        } else {
            console.log('不显示公告，条件:', { lastSeenDate, today, lastSeenVersion, ANNOUNCEMENT_VERSION });
        }
    }
    
    function closeAnnouncementModal() {
        announcementModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // 存储查看日期和版本号
        localStorage.setItem('announcementLastSeenDate', new Date().toDateString());
        localStorage.setItem('announcementLastSeenVersion', ANNOUNCEMENT_VERSION);
        console.log('公告已关闭，存储信息');
    }
    
    if (closeAnnouncement) {
        closeAnnouncement.addEventListener('click', closeAnnouncementModal);
    }
    
    if (acceptAnnouncement) {
        acceptAnnouncement.addEventListener('click', closeAnnouncementModal);
    }
    
    announcementModal.addEventListener('click', function(e) {
        if (e.target === announcementModal) {
            closeAnnouncementModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && announcementModal.classList.contains('active')) {
            closeAnnouncementModal();
        }
    });
    
    // 开发者调试功能 - 添加清除存储的快捷键 (Ctrl+Shift+R)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'R') {
            e.preventDefault();
            localStorage.removeItem('announcementLastSeenDate');
            localStorage.removeItem('announcementLastSeenVersion');
            alert('公告存储已清除，刷新页面后公告将重新显示。');
        }
    });
    
    showAnnouncement();
    
    // 添加水晶装饰
    const content = document.querySelector('.announcement-content');
    const topLeftCrystal = document.createElement('div');
    topLeftCrystal.className = 'crystal-decoration top-left';
    topLeftCrystal.innerHTML = '<i class="fas fa-gem"></i>';
    content.appendChild(topLeftCrystal);
    
    const bottomRightCrystal = document.createElement('div');
    bottomRightCrystal.className = 'crystal-decoration bottom-right';
    bottomRightCrystal.innerHTML = '<i class="fas fa-gem"></i>';
    content.appendChild(bottomRightCrystal);
});