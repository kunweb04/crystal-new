document.addEventListener('DOMContentLoaded', function() {
    const announcementModal = document.getElementById('announcementModal');
    const closeAnnouncement = document.getElementById('closeAnnouncement');
    const acceptAnnouncement = document.getElementById('acceptAnnouncement');
    const versionBadge = document.querySelector('.version-badge');
    const versionDate = document.querySelector('.version-date');
    const updateList = document.getElementById('modal-update-list');

    // 从 updates-data.js 读取最新一条更新记录（统一公告弹窗数据）
    const latest = (typeof updatesData !== 'undefined' && Array.isArray(updatesData) && updatesData.length > 0) ? updatesData[0] : null;

    const announcementVersion = latest ? latest.badge : ((typeof CONFIG !== 'undefined' && CONFIG.ANNOUNCEMENT_VERSION) ? CONFIG.ANNOUNCEMENT_VERSION : 'v1.0.08');
    const updateDate = latest ? latest.date : ((typeof CONFIG !== 'undefined' && CONFIG.UPDATE_DATE) ? CONFIG.UPDATE_DATE : '2026.03.23');

    if (versionBadge) { versionBadge.textContent = announcementVersion; }
    if (versionDate) { versionDate.textContent = updateDate; }

    // 填充最新一条更新记录
    if (updateList && latest) {
        const linkHtml = latest.link ? ` <a href="${latest.link}" style="color:#6a5acd;text-decoration:underline;">查看详情 →</a>` : '';
        updateList.innerHTML = `
            <li>
                <strong>[${latest.badge || ''}] ${latest.title}</strong>
                <span style="color:#888;margin-left:8px;font-size:0.85em;">${latest.date}</span>
                <p style="margin:4px 0 0 0;color:#555;">${latest.desc}${linkHtml}</p>
            </li>
        `;
    }

    function showAnnouncement() {
        const today = new Date().toDateString();
        const lastSeenDate = localStorage.getItem('announcementLastSeenDate');
        const lastSeenVersion = localStorage.getItem('announcementLastSeenVersion');

        if (!lastSeenDate || lastSeenDate !== today || lastSeenVersion !== announcementVersion) {
            console.log('显示公告:', { lastSeenDate, today, lastSeenVersion, announcementVersion });
            setTimeout(() => {
                announcementModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }, 1500);
        } else {
            console.log('不显示公告，条件:', { lastSeenDate, today, lastSeenVersion, announcementVersion });
        }
    }

    function closeAnnouncementModal() {
        announcementModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        localStorage.setItem('announcementLastSeenDate', new Date().toDateString());
        localStorage.setItem('announcementLastSeenVersion', announcementVersion);
        console.log('公告已关闭，存储信息');
    }

    if (closeAnnouncement) { closeAnnouncement.addEventListener('click', closeAnnouncementModal); }
    if (acceptAnnouncement) { acceptAnnouncement.addEventListener('click', closeAnnouncementModal); }

    announcementModal.addEventListener('click', function(e) {
        if (e.target === announcementModal) { closeAnnouncementModal(); }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && announcementModal.classList.contains('active')) {
            closeAnnouncementModal();
        }
    });

    // Ctrl+Shift+R 清除存储
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
