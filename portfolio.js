// portfolio.js - 动态生成作品集页面
document.addEventListener('DOMContentLoaded', function() {
    // 作品集数据结构
    const portfolioData = [
        {
            id: 'copper-sulfate',
            title: '硫酸铜晶体',
            type: 'gallery',
            works: [
                { img: '紫色硫酸铜01.png', author: '紫色硫酸铜' },
                { img: '作品12.png', author: '迷路的野指针' },
                { img: '作品14.png', author: '迷路的野指针' },
                { img: '作品34.png', author: '长街听风' }
            ]
        },
        {
            id: 'x1',
            title: '铬明矾混晶',
            type: 'gallery',
            works: [
                { img: '作品2.png', author: '迷路的野指针' },
                { img: '作品3.png', author: '迷路的野指针' },
                { img: '作品6.png', author: '迷路的野指针' },
                { img: '作品7.png', author: '迷路的野指针' },
                { img: '作品57.jpg', author: '紫色硫酸铜' }
            ]
        },
        {
            id: 'sulfate2',
            title: '硫酸亚铁铵晶体',
            type: 'gallery',
            works: [
                { img: '作品18.png', author: '迷路的野指针' },
                { img: '作品19.png', author: '迷路的野指针' }
            ]
        },
        {
            id: 'sulfate3',
            title: '草酸铝（铬）酸钠',
            type: 'gallery',
            works: [
                { img: '作品10.png', author: '紫色硫酸铜' },
                { img: '作品11.png', author: '迷路的野指针' }
            ]
        },
        {
            id: 'sulfate4',
            title: '其他好看晶体',
            type: 'gallery',
            works: [
                { img: '作品9.png', author: '迷路的野指针', description: '二水合二氯化二乙二胺络铜' },
                { img: '作品26.png', author: '清蒸带鱼', description: '铜' },
                { img: '作品17.png', author: '迷路的野指针', description: '硫酸三乙二胺络镍' },
                { img: '作品20.png', author: '迷路的野指针', description: '草酸氢钠' },
                { img: '作品21.png', author: 'LX虫管吖Galvin', description: '乙酸铕' },
                { img: '作品22.png', author: 'LX虫管吖Galvin', description: '乙酸铕' },
                { img: '作品23.png', author: '待到群星闪耀时', description: '三水合丙二酸铁钾' },
                { img: '作品24.png', author: '待到群星闪耀时', description: '三水合丙二酸铁钾' },
                { img: '作品25.png', author: '待到群星闪耀时', description: '四氯二水合铜酸钾' },
                { img: '作品27.png', author: '青于', description: '高铼酸钾' },
                { img: '作品28.png', author: '青于', description: '高铼酸钾' },
                { img: '作品29.png', author: '青于', description: '高铼酸钾' },
                { img: '作品30.png', author: '泠鳞', description: '硫酸钐' },
                { img: '作品31.png', author: '泠鳞', description: '硫酸谱' },
                { img: '作品32.png', author: '泠鳞', description: '硫酸钕' },
                { img: '作品33.png', author: '迷路的野指针', description: '银' },
                { img: '作品35.png', author: 'mo', description: '铯' },
                { img: '作品42.png', author: '迷路的野指针', description: '三氯化三乙二胺络钴' },
                { img: '作品49.png', author: '青于', description: '硫酸镨' },
                { img: '作品50.png', author: '青于', description: '硫酸镨' },
                { img: '作品51.png', author: '青于', description: '硫酸镍' },
                { img: '作品52.png', author: '青于', description: '四氯合锰酸甜菜碱锰' },
                { img: '作品58.jpg', author: '青于', description: '四氯合锰酸四乙基铵' },
                { img: '作品59.jpg', author: '青于', description: '四氯合锰酸四乙基铵' },
                { img: '作品60.jpg', author: '青于', description: '硝酸甜菜碱铜' },
                { img: '作品53.png', author: '泠鳞', description: '硫酸镨晶簇' },
                { img: '作品54.png', author: '泠鳞', description: '柠檬酸单晶' }
            ]
        },
        {
            id: 'sulfate5',
            title: '饼の美学',
            type: 'blessing',
            works: [
                { img: '作品36.png', author: ''},
                { img: '作品37.png', author: '迷路的野指针' },
                { img: '作品38.png', author: '迷路的野指针' },
                { img: '作品39.png', author: '迷路的野指针' },
                { img: '作品40.png', author: '迷路的野指针' },
                { img: '作品41.png', author: '迷路的野指针' },
                { img: '作品43.png', author: '迷路的野指针' },
                { img: '作品44.png', author: '迷路的野指针' },
                { img: '作品56.jpg', author: 'Circle' },
                { img: '作品45.png', author: '氯' },
                { img: '作品46.png', author: '长街听风' },
                { img: '作品47.png', author: '长街听风' },
                { img: '作品48.png', author: '冰麒麟' },
                { img: '作品55.png', author: '食堂人民科学协会-荣', description: '乙二胺四乙酸钴(Ⅲ)酸钠' }
            ]
        }
    ];

    // 创建作品集内容
    function createPortfolioContent() {
        const safetyContent = document.querySelector('.safety-content');
        
        // 移除现有的section元素（保留标题和装饰元素）
        const existingSections = safetyContent.querySelectorAll('section');
        existingSections.forEach(section => section.remove());
        
        // 创建新的section元素
        portfolioData.forEach(sectionData => {
            const section = document.createElement('section');
            section.id = sectionData.id;
            
            const h2 = document.createElement('h2');
            h2.textContent = sectionData.title;
            section.appendChild(h2);
            
            // 处理祝福语（仅饼の美学）
            if (sectionData.type === 'blessing') {
                const blessingP = document.createElement('p');
                blessingP.style.textAlign = 'center';
                blessingP.style.color = 'var(--primary)';
                blessingP.style.fontSize = '1.5em';
                blessingP.style.fontWeight = 'bold';
                blessingP.style.marginBottom = '2rem';
                blessingP.textContent = '在这里，预祝大家';
                section.appendChild(blessingP);
            }
            
            // 添加作品图片
            sectionData.works.forEach(work => {
                const img = document.createElement('img');
                img.src = `p/portfolio/${work.img}`;
                img.className = 'content-image';
                img.alt = work.author ? `${work.author}作品` : '作品图片';
                section.appendChild(img);
                
                const p = document.createElement('p');
                p.style.textAlign = 'center';
                p.style.color = 'var(--accent)';
                p.style.marginBottom = '3rem';
                
                let text = '';
                if (work.author) {
                    text += `作者：${work.author}`;
                }
                if (work.description) {
                    text += work.author ? `，晶体：${work.description}` : work.description;
                }
                
                p.textContent = text;
                section.appendChild(p);
            });
            
            // 插入到安全内容容器中
            safetyContent.appendChild(section);
        });
    }

    // 初始化作品集内容
    createPortfolioContent();
});