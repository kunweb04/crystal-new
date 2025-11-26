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
                { img: '作品1.png', author: '迷路的野指针' },
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
                { img: '作品33.png', author: '迷路的野指针', description: '银' },
                { img: '作品35.png', author: 'mo', description: '铯' },
                { img: '作品26.png', author: '清蒸带鱼', description: '铜' },
                { img: '作品66.jpg', author: '关关', description: '铜' },
                { img: '电解铜2.jpg', author: '食堂人民科学协会-荣', description: '铜' },
                { img: '作品71.jpg', author: '紫色硫酸铜', description: '铜' },
                { img: '作品103.jpg', author: '紫色硫酸铜', description: '铜' },
                { img: '作品104.jpg', author: '紫色硫酸铜', description: '铜' },
                { img: '作品75.jpg', author: '青于', description: '铜' },
                { img: '作品76.jpg', author: '青于', description: '铜' },
                { img: '作品77.jpg', author: '青于', description: '铜' },
                { img: '作品78.jpg', author: '青于', description: '铜' },
                { img: '作品79.jpg', author: '青于', description: '铁' },
                { img: '作品80.jpg', author: '青于', description: '铁' },
                { img: '作品81.jpg', author: '青于', description: '铁' },
                { img: '作品82.jpg', author: '青于', description: '铁' },
                { img: '作品72.jpg', author: 'Chlorine', description: '碘' },
                { img: '作品73.jpg', author: 'Chlorine', description: '碘' },
                { img: '作品74.jpg', author: 'Chlorine', description: '碘' },
                { img: '作品111.png', author: '群青丨Ultramarine', description: '碘' },
                { img: '作品112.png', author: '群青丨Ultramarine', description: '碘' },
                { img: '作品70.jpg', author: 'Chlorine', description: '白磷 '},
                { img: '作品105.jpg', author: '氟氙Cryptand', description: '四丁基铵八氯二铼酸盐丨四丁基铵八溴二铼酸盐 丨合成by yusaki'},
                { img: '作品106.jpg', author: '氟氙Cryptand', description: '二(μ-2羟基)双(二(2-甲基咪唑基)络铜)）二高氯酸盐二水合物'},
                { img: '作品108.jpg', author: '氟氙Cryptand', description: '六氰合铁（III）酸钾'},
                { img: '作品109.jpg', author: '氟氙Cryptand', description: '四（异硫氰酸根）络锰(II)双[水·（18-冠-6醚）络钾]18-冠-6醚络钾硫氰酸盐'},
                { img: '作品110.jpg', author: '氟氙Cryptand', description: '二乙烯三胺四氯合铜酸盐一氯化物'},
                { img: '作品17.png', author: '迷路的野指针', description: '硫酸三乙二胺络镍' },
                { img: '作品9.png', author: '迷路的野指针', description: '二水合二氯化二乙二胺络铜' },
                { img: '作品23.png', author: '待到群星闪耀时', description: '三水合丙二酸铁钾' },
                { img: '作品24.png', author: '待到群星闪耀时', description: '三水合丙二酸铁钾' },
                { img: '作品25.png', author: '待到群星闪耀时', description: '四氯二水合铜酸钾' },
                { img: '作品42.png', author: '迷路的野指针', description: '三氯化三乙二胺络钴' },
                { img: '作品52.png', author: '青于', description: '四氯合锰酸甜菜碱锰' },
                { img: '作品58.jpg', author: '青于', description: '四氯合锰酸四乙基铵' },
                { img: '作品59.jpg', author: '青于', description: '四氯合锰酸四乙基铵' },
                { img: '作品83.jpg', author: '冰冰', description: '四氯一氧钨' },
                { img: '作品84.jpg', author: '冰冰', description: '五氧化二磷' },
                { img: '作品85.jpg', author: '冰冰', description: '铁氰化钾' },
                { img: '作品86.jpg', author: '冰冰', description: '碘化亚铟' },
                { img: '作品87.jpg', author: '冰冰', description: '二氯二氧钨' },
                { img: '作品88.jpg', author: '冰冰', description: '二水草酸铜钾' },
                { img: '作品89.jpg', author: '冰冰', description: '二水乙酸铜' },
                { img: '作品90.jpg', author: '冰冰', description: '硝酸亚汞' },
                { img: '作品91.jpg', author: '冰冰', description: '四水草酸铜钾' },
                { img: '作品92.jpg', author: '冰冰', description: '硒化亚铜' },
                { img: '作品93.jpg', author: '冰冰', description: '碲化亚铜' },
                { img: '作品94.jpg', author: '冰冰', description: '碘化铋' },
                { img: '作品95.jpg', author: '冰冰', description: 'γ三氧化硫' },
                { img: '作品96.jpg', author: '冰冰', description: '三氯化铁' },
                { img: '作品97.jpg', author: '冰冰', description: '二水氟化铜' },
                { img: '作品98.jpg', author: '冰冰', description: '三氯化铝' },
                { img: '作品99.jpg', author: '冰冰', description: '四氯一氧钨' },
                { img: '作品100.jpg', author: '冰冰', description: '三氯化铁' },
                { img: '作品101.jpg', author: '冰冰', description: '氯化汞' },
                { img: '作品102.jpg', author: '冰冰', description: '三溴氧磷' },
                { img: '作品20.png', author: '迷路的野指针', description: '草酸氢钠' },
                { img: '作品21.png', author: 'LX虫管吖Galvin', description: '乙酸铕' },
                { img: '作品22.png', author: 'LX虫管吖Galvin', description: '乙酸铕' },
                { img: '作品27.png', author: '青于', description: '高铼酸钾' },
                { img: '作品28.png', author: '青于', description: '高铼酸钾' },
                { img: '作品29.png', author: '青于', description: '高铼酸钾' },
                { img: '作品62.jpg', author: '紫色硫酸铜', description: '铁氰化钾' },
                { img: '作品63.jpg', author: '紫色硫酸铜', description: '铁氰化钾' },
                { img: '作品30.png', author: '泠鳞', description: '硫酸钐' },
                { img: '作品32.png', author: '泠鳞', description: '硫酸钕' },
                { img: '作品61.jpg', author: '紫色硫酸铜', description: '硫酸钕' },
                { img: '作品64.jpg', author: '紫色硫酸铜', description: '硫酸钕' },
                { img: '作品31.png', author: '泠鳞', description: '硫酸镨' },
                { img: '作品49.png', author: '青于', description: '硫酸镨' },
                { img: '作品50.png', author: '青于', description: '硫酸镨' },
                { img: '作品107.jpg', author: '氟氙Cryptand', description: '硫酸镍六水合物'},
                { img: '作品51.png', author: '青于', description: '硫酸镍' },
                { img: '作品69.jpg', author: '紫色硫酸铜', description: '硫酸镍' },
                { img: '作品65.jpg', author: '关关', description: '硫酸铝钾' },
                { img: '作品60.jpg', author: '青于', description: '硝酸甜菜碱铜' },
                { img: '作品67.jpg', author: 'Kerbal123', description: '硝酸脲铁' },
                { img: '作品53.png', author: '泠鳞', description: '硫酸镨晶簇' },
                { img: '作品54.png', author: '泠鳞', description: '柠檬酸单晶' },
                { img: '作品68.jpg', author: 'Kerbal123', description: '乙酸铜钙' },
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
                // 创建作品包装容器
                const workContainer = document.createElement('div');
                workContainer.className = 'portfolio-work';
                
                // 设置搜索数据
                let searchData = '';
                if (work.author) searchData += work.author + ' ';
                if (work.description) searchData += work.description + ' ';
                if (sectionData.title) searchData += sectionData.title + ' ';
                workContainer.setAttribute('data-search', searchData.trim());
                
                const img = document.createElement('img');
                // 使用data-src存储真实图片路径
                img.dataset.src = `p/portfolio/${work.img}`;
                // 初始使用一个极小的base64占位图
                img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                img.className = 'content-image';
                img.alt = work.author ? `${work.author}作品` : '作品图片';
                img.loading = 'lazy'; // 使用原生懒加载
                
                workContainer.appendChild(img);
                
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
                workContainer.appendChild(p);
                
                section.appendChild(workContainer);
            });
            
            // 插入到安全内容容器中
            safetyContent.appendChild(section);
        });

        // 初始化回退懒加载（为不支持原生懒加载的浏览器）
        initFallbackLazyLoad();
    }

    // 回退懒加载方案
    function initFallbackLazyLoad() {
        // 检查浏览器是否支持原生懒加载
        if ('loading' in HTMLImageElement.prototype) {
            // 浏览器支持原生懒加载，将data-src转移到src
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
            return;
        }
        
        // 回退方案：监听滚动事件实现懒加载
        const lazyImages = [].slice.call(document.querySelectorAll('img[data-src]'));
        
        let lazyLoadThrottle;
        
        function lazyLoad() {
            if (lazyLoadThrottle) {
                clearTimeout(lazyLoadThrottle);
            }
            
            lazyLoadThrottle = setTimeout(function() {
                const scrollTop = window.pageYOffset;
                
                lazyImages.forEach(function(img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop + 200)) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                });
                
                if (lazyImages.length == 0) {
                    document.removeEventListener('scroll', lazyLoad);
                    window.removeEventListener('resize', lazyLoad);
                    window.removeEventListener('orientationchange', lazyLoad);
                }
            }, 20);
        }
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);
        lazyLoad(); // 初始加载视口内的图片
    }

    // 初始化作品集内容
    createPortfolioContent();
});