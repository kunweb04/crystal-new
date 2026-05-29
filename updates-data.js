// 全站更新數據
const CONFIG = {
    ANNOUNCEMENT_VERSION: 'v1.0.08', 
    UPDATE_DATE: '2026.03.23'
};

const updatesData = [
    {
        date: "2026.5.28",
        badge: "v1.0.09",
        title: "小幅度优化",
        desc: "修复了一些小问题，提升了整体性能和用户体验。",
        link: "faq.html"
    }
    ,{
        date: "2026.4.29",
        badge: "v1.0.08",
        title: "首页与导航栏优化",
        desc: "新增导航栏下拉菜单，首页动态更新模块，提升用户体验与内容展示效果。",
        link: "faq.html"
    },
    {
        date: "2026.4.26",
        badge: "v1.0.07",
        title: "FAQ章节上线",
        desc: "常见问题解答：解答用户在使用过程中遇到的常见问题，提供实用的解决方案。",
        link: "faq.html"
    },
    {
        date: "2026.4.18",
        badge: "v1.0.06",
        title: "网站一周年庆！",
        desc: "感谢大家一年来的支持与关注！CrystalLab 将继续致力于提供优质的内容！",
    },
    {
        date: "2026.4.06",
        badge: "v1.0.05",
        title: "晶系理论专文上线",
        desc: "晶系理论详解：从立方晶系到单斜晶系的结构与性质分析。",
        link: "crystal-systems.html"
    },
    {
        date: "2026.3.13",
        badge: "v1.0.04",
        title: "卡片UI优化",
        desc: "全新设计的卡片UI，提升视觉体验与信息传达效果。",
    },
    {
        date: "2026.3.09",
        badge: "v1.0.03",
        title: "紫晶雨专文发布",
        desc: "紫晶雨的秘密：晶体结构与独特性质解析。",
        link: "purple-crystal-rain.html"
    },
    {
        date: "2026.2.14",
        badge: "v1.0.03",
        title: "蓝晶雨专文发布",
        desc: "蓝晶雨的秘密：晶体结构与独特性质解析。",
        link: "blue-crystal-rain.html"
    },
    {
        date: "2026.2.09",
        badge: "v1.0.03",
        title: "春节UI发布",
        desc: "迎新春，焕新颜：CrystalLab春节UI设计发布，带来喜庆与创新的视觉盛宴。",
    },
    {
        date: "2026.1.26",
        badge: "v1.0.02",
        title: "移动端适配优化",
        desc: "新增汉堡菜单和响应式设计，提升移动设备上的用户体验。",
    },
    {
        date: "2025.11.07",
        badge: "v1.0.01",
        title: "铬明矾专文发布",
        desc: "紫色混晶的秘密：铬明矾的晶体结构与独特性质解析。",
        link: "chromium-alum.html"
    }
];

// 渲染首頁卡片的函數
function renderUpdatesCards() {
    const track = document.getElementById('updates-track');
    if (!track) return;
    
    track.innerHTML = updatesData.map(item => `
        <div class="update-card">
            <span class="update-date">${item.date}</span>
            <span class="update-badge">${item.badge}</span>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <a href="${item.link}">查看詳情 →</a>
        </div>
    `).join('');
}