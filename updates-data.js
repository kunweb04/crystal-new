const CONFIG = {
    ANNOUNCEMENT_VERSION: 'v1.3.2',
    UPDATE_DATE: '2026.7.15'
};

const updatesData = [
    {
        date: "2026.7.15",
        badge: "v1.3.2",
        title: "关于我们与新配合物专文上线",
        desc: "新增关于我们页面，详细介绍CrystalLab的使命与愿景；同时上线了首篇配合物专文，深入解析二水四氯合铜酸铵的结构与性质。",
    },
    {
        date: "2026.6.19",
        badge: "v1.3.1",
        title: "内容设计优化",
        desc: "文章步骤区块、笔记区块、警示区块UI调整，使其更清晰易读，提升整体内容的可读性。",
    },
    {
        date: "2026.6.9",
        badge: "v1.3.0",
        title: "AI小助手晶核上线！",
        desc: "固定于用户视窗右下角的AI智能助手晶核，随时为您提供智能问答、内容推荐和个性化服务！",
    },
    {
        date: "2026.6.8",
        badge: "v1.2.0",
        title: "作品集与全站优化",
        desc: "修复小问题，同时改造了作品集面板，使其更容易浏览和过滤作品。",
    },
    {
        date: "2026.5.28",
        badge: "v1.1.5",
        title: "小幅度优化",
        desc: "修复了一些小问题，提升了整体性能和用户体验。",
    },
    {
        date: "2026.4.29",
        badge: "v1.1.4",
        title: "首页与导航栏优化",
        desc: "新增导航栏下拉菜单，首页动态更新模块，提升用户体验与内容展示效果。",
    },
    {
        date: "2026.4.26",
        badge: "v1.1.3",
        title: "FAQ章节上线",
        desc: "常见问题解答：解答用户在使用过程中遇到的常见问题，提供实用的解决方案。",
        link: "faq.html"
    },
    {
        date: "2026.4.18",
        badge: "v1.1.2",
        title: "网站一周年庆！",
        desc: "感谢大家一年来的支持与关注！CrystalLab 将继续致力于提供优质的内容！",
    },
    {
        date: "2026.4.06",
        badge: "v1.1.1",
        title: "晶系理论专文上线",
        desc: "晶系理论详解：从立方晶系到单斜晶系的结构与性质分析。",
        link: "crystal-systems.html"
    },
    {
        date: "2026.3.13",
        badge: "v1.1.0",
        title: "卡片UI优化",
        desc: "全新设计的卡片UI，提升视觉体验与信息传达效果。",
    },
    {
        date: "2026.3.09",
        badge: "v1.0.4",
        title: "紫晶雨专文发布",
        desc: "紫晶雨的秘密：晶体结构与独特性质解析。",
        link: "purple-crystal-rain.html"
    },
    {
        date: "2026.2.14",
        badge: "v1.0.3",
        title: "蓝晶雨专文发布",
        desc: "蓝晶雨的秘密：晶体结构与独特性质解析。",
        link: "blue-crystal-rain.html"
    },
    {
        date: "2026.2.09",
        badge: "v1.0.2",
        title: "春节UI发布",
        desc: "迎新春，焕新颜：CrystalLab春节UI设计发布，带来喜庆与创新的视觉盛宴。",
    },
    {
        date: "2026.1.26",
        badge: "v1.0.1",
        title: "移动端适配优化",
        desc: "新增汉堡菜单和响应式设计，提升移动设备上的用户体验。",
    },
    {
        date: "2025.11.07",
        badge: "v1.0.0",
        title: "铬明矾专文发布",
        desc: "紫色混晶的秘密：铬明矾的晶体结构与独特性质解析。",
        link: "chromium-alum.html"
    }
];

function renderUpdatesCards() {
    const track = document.getElementById('updates-track');
    if (!track) return;

    track.innerHTML = updatesData.map(item => `
        <div class="update-card">
            <span class="update-date">${item.date}</span>
            <span class="update-badge">${item.badge}</span>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            ${item.link ? `<a href="${item.link}">查看详情 →</a>` : ''}
        </div>
    `).join('');
}

// 自动渲染
renderUpdatesCards();
