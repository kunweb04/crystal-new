document.addEventListener('DOMContentLoaded', function() {
    const portfolioData = [
        {
            id: 'copper-sulfate',
            title: '硫酸铜晶体',
            type: 'gallery',
            works: [
                { img: '紫色硫酸铜01.png', author: '紫色硫酸铜' },
                { img: '作品12.webp', author: '迷路的野指针' },
                { img: '作品14.webp', author: '迷路的野指针' },
                { img: '作品34.webp', author: '长街听风' }
            ]
        },
        {
            id: 'x1',
            title: '铬明矾混晶',
            type: 'gallery',
            works: [
                { img: '作品1.webp', author: '迷路的野指针' },
                { img: '作品2.webp', author: '迷路的野指针' },
                { img: '作品3.webp', author: '迷路的野指针' },
                { img: '作品6.webp', author: '迷路的野指针' },
                { img: '作品7.webp', author: '迷路的野指针' },
                { img: '作品57.webp', author: '紫色硫酸铜' },
                { img: '作品144.webp', author: 'Kerbal123' },
                { img: '作品152.webp', author: '紫色硫酸铜' },
                { img: '作品167.webp', author: '金平糖' },
                { img: '作品196.webp', author: 'DAOZAO' },
                { img: '作品197.webp', author: 'DAOZAO' },
                { img: '作品198.webp', author: 'DAOZAO' },
                { img: '作品199.webp', author: 'DAOZAO' },
                { img: '作品200.webp', author: 'DAOZAO' },
                { img: '作品201.webp', author: 'DAOZAO' },
                { img: '作品236.webp', author: 'DAOZAO' },
                { img: '作品231.webp', author: 'DAOZAO' },
                { img: '作品288.webp', author: '紫色硫酸铜' }
            ]
        },
        {
            id: 'sulfate2',
            title: '硫酸亚铁铵晶体',
            type: 'gallery',
            works: [
                { img: '作品18.webp', author: '迷路的野指针' },
                { img: '作品19.webp', author: '迷路的野指针' },
                { img: '作品255.webp', author: 'Printhe' },
                { img: '作品267.webp', author: 'Printhe' },
            ]
        },
        {
            id: 'sulfate3',
            title: '草酸铝（铬）酸钠',
            type: 'gallery',
            works: [
                { img: '作品10.webp', author: '紫色硫酸铜' },
                { img: '作品11.webp', author: '迷路的野指针' },
                { img: '作品181.webp', author: 'DAOZAO' },
                { img: '作品182.webp', author: 'DAOZAO' },
                { img: '作品183.webp', author: 'DAOZAO' },
                { img: '作品184.webp', author: 'DAOZAO' },
            ]
        },
        {
            id: 'sulfate4',
            title: '电解铜',
            type: 'gallery',
            works: [
                { img: '作品26.webp', author: '清蒸带鱼', description: '铜' },
                { img: '作品66.webp', author: '关关', description: '铜' },
                { img: '电解铜2.jpg', author: '食堂人民科学协会-荣', description: '铜' },
                { img: '作品71.webp', author: '紫色硫酸铜', description: '铜' },
                { img: '作品103.webp', author: '紫色硫酸铜', description: '铜' },
                { img: '作品104.webp', author: '紫色硫酸铜', description: '铜' },
                { img: '作品147.webp', author: '紫色硫酸铜', description: '铜' },
                { img: '作品75.webp', author: '青于', description: '铜' },
                { img: '作品76.webp', author: '青于', description: '铜' },
                { img: '作品77.webp', author: '青于', description: '铜' },
                { img: '作品78.webp', author: '青于', description: '铜' },
                { img: '作品143.webp', author: 'Chlorine', description: '铜' },
                { img: '作品149.webp', author: 'Chlorine', description: '铜' },
                { img: '作品150.webp', author: 'Chlorine', description: '铜' },
                { img: '作品243.webp', author: '山云', description: '铜' },
                { img: '作品245.webp', author: '山云', description: '铜' },
                { img: '作品283.webp', author: 'mo', description: '铜' },
                { img: '作品290.webp', author: 'mo', description: '铜' },
            ]
        },
        {
            id: 'sulfate5',
            title: '其他好看晶体',
            type: 'gallery',
            works: [
                { img: '作品141.webp', author: 'Eutopia', description: '晶相铍' },
                { img: '作品70.webp', author: 'Chlorine', description: '白磷 '},
                { img: '作品140.webp', author: 'mo', description: '电解钪' },
                { img: '作品248.webp', author: '山云', description: '钛' },
                { img: '作品129.webp', author: 'Eutopia', description: '铬' },
                { img: '作品130.webp', author: 'Eutopia', description: '铬' },
                { img: '作品131.webp', author: 'Eutopia', description: '铬' },
                { img: '作品132.webp', author: 'Eutopia', description: '铬' },
                { img: '作品133.webp', author: 'Eutopia', description: '铬' },
                { img: '作品127.webp', author: 'Eutopia', description: '锰' },
                { img: '作品128.webp', author: 'Eutopia', description: '锰' },
                { img: '作品79.webp', author: '青于', description: '铁' },
                { img: '作品80.webp', author: '青于', description: '铁' },
                { img: '作品81.webp', author: '青于', description: '铁' },
                { img: '作品82.webp', author: '青于', description: '铁' },
                { img: '作品238.webp', author: '山云', description: '化学气相沉积铁' },
                { img: '作品239.webp', author: '山云', description: '化学气相沉积铁' },
                { img: '作品240.webp', author: '山云', description: '化学气相沉积铁' },
                { img: '作品115.webp', author: 'Eutopia', description: 'CVD 铜' },
                { img: '作品116.webp', author: 'Eutopia', description: 'CVD 铜' },
                { img: '作品279.webp', author: '山云', description: '化学气相沉积铜' },
                { img: '作品280.webp', author: '山云', description: '化学气相沉积铜' },
                { img: '作品281.webp', author: '山云', description: '熔炼铜' },
                { img: '作品291.webp', author: 'mo', description: '提拉铜' },
                { img: '作品292.webp', author: 'mo', description: '提拉铜' },
                { img: '作品294.webp', author: '青于', description: '电解锌' },
                { img: '作品295.webp', author: '青于', description: '电解锌' },
                { img: '作品126.webp', author: 'Eutopia', description: '铌' },
                { img: '作品145.webp', author: 'Eutopia', description: '铌' },
                { img: '作品278.webp', author: '山云', description: '蒸馏钼' },
                { img: '作品33.webp', author: '迷路的野指针', description: '银' },
                { img: '作品117.webp', author: 'Eutopia', description: '蒸馏银' },
                { img: '作品118.webp', author: 'Eutopia', description: '蒸馏银' },
                { img: '作品119.webp', author: 'Eutopia', description: '蒸馏银' },
                { img: '作品284.webp', author: 'mo', description: '电解银' },
                { img: '作品285.webp', author: 'mo', description: '电解银' },
                { img: '作品249.webp', author: '山云', description: '锑' },
                { img: '作品282.webp', author: '山云', description: '蒸馏锑' },
                { img: '作品120.webp', author: 'Eutopia', description: 'pvd 碲' },
                { img: '作品121.webp', author: 'Eutopia', description: 'pvd 碲' },
                { img: '作品122.webp', author: 'Eutopia', description: 'pvd 碲' },
                { img: '作品123.webp', author: 'Eutopia', description: 'pvd 碲' },
                { img: '作品72.webp', author: 'Chlorine', description: '碘' },
                { img: '作品73.webp', author: 'Chlorine', description: '碘' },
                { img: '作品74.webp', author: 'Chlorine', description: '碘' },
                { img: '作品111.webp', author: '群青丨Ultramarine', description: '碘' },
                { img: '作品112.webp', author: '群青丨Ultramarine', description: '碘' },
                { img: '作品113.webp', author: '群青丨Ultramarine', description: '碘' },
                { img: '作品114.webp', author: '群青丨Ultramarine', description: '碘' },
                { img: '作品163.webp', author: '紫色硫酸铜', description: '碘' },
                { img: '作品35.webp', author: 'mo', description: '铯' },
                { img: '作品247.webp', author: '山云', description: '镨' },
                { img: '作品293.webp', author: 'mo', description: '铕' },
                { img: '作品124.webp', author: 'Eutopia', description: '钨' },
                { img: '作品125.webp', author: 'Eutopia', description: '钨' },
                { img: '作品242.webp', author: '山云', description: '化学气相沉积金' },
                { img: '作品244.webp', author: '山云', description: '熔融金 电化学沉积银' },
                { img: '作品97.webp', author: '𝓐𝛵 ⁠🧊', description: '二水氟化铜' },
                { img: '作品263.webp', author: 'Printhe', description: '氯化铵' },
                { img: '作品98.webp', author: '𝓐𝛵 ⁠🧊', description: '三氯化铝' },
                { img: '作品253.webp', author: 'Printhe', description: '氯化钙' },
                { img: '作品254.webp', author: 'Printhe', description: '氯化钙' },
                { img: '作品159.webp', author: '紫色硫酸铜', description: '氯化锰' },
                { img: '作品160.webp', author: '紫色硫酸铜', description: '氯化锰' },
                { img: '作品161.webp', author: '紫色硫酸铜', description: '氯化锰' },
                { img: '作品162.webp', author: '紫色硫酸铜', description: '氯化锰' },
                { img: '作品177.webp', author: 'DAOZAO', description: '氯化锰' },
                { img: '作品179.webp', author: 'DAOZAO', description: '氯化锰' },
                { img: '作品180.webp', author: 'DAOZAO', description: '氯化锰' },
                { img: '作品232.webp', author: 'DAOZAO', description: '氯化锰' },
                { img: '作品233.webp', author: 'DAOZAO', description: '氯化锰' },
                { img: '作品234.webp', author: 'DAOZAO', description: '氯化锰' },
                { img: '作品235.webp', author: 'DAOZAO', description: '氯化锰' },
                { img: '作品96.webp', author: '𝓐𝛵 ⁠🧊', description: '三氯化铁' },
                { img: '作品100.webp', author: '𝓐𝛵 ⁠🧊', description: '三氯化铁' },
                { img: '作品148.webp', author: '紫色硫酸铜', description: '氯化铜' },
                { img: '作品268.webp', author: 'Printhe', description: '氯化铜' },
                { img: '作品101.webp', author: '𝓐𝛵 ⁠🧊', description: '氯化汞' },
                { img: '作品241.webp', author: '山云', description: '一溴化碘' },
                { img: '作品86.webp', author: '𝓐𝛵 ⁠🧊', description: '碘化亚铟' },
                { img: '作品94.webp', author: '𝓐𝛵 ⁠🧊', description: '碘化铋' },
                { img: '作品87.webp', author: '𝓐𝛵 ⁠🧊', description: '二氯二氧钨' },
                { img: '作品83.webp', author: '⁠𝓐𝛵 ⁠🧊 ', description: '四氯一氧钨' },
                { img: '作品99.webp', author: '𝓐𝛵 ⁠🧊', description: '四氯一氧钨' },
                { img: '作品102.webp', author: '𝓐𝛵 ⁠🧊', description: '三溴氧磷' },
                { img: '作品84.webp', author: '𝓐𝛵 ⁠🧊', description: '五氧化二磷' },
                { img: '作品95.webp', author: '𝓐𝛵 ⁠🧊', description: 'γ三氧化硫' },
                { img: '作品92.webp', author: '𝓐𝛵 ⁠🧊', description: '硒化亚铜' },
                { img: '作品93.webp', author: '𝓐𝛵 ⁠🧊', description: '碲化亚铜' },
                { img: '作品67.webp', author: 'Kerbal123', description: '硝酸脲铁' },
                { img: '作品273.webp', author: 'Kerbal123', description: '硝酸脲铁' },
                { img: '作品261.webp', author: 'Printhe', description: '硝酸六脲合铁' },
                { img: '作品262.webp', author: 'Printhe', description: '硝酸六脲合铁' },
                { img: '作品60.webp', author: '青于', description: '硝酸甜菜碱铜' },
                { img: '作品139.webp', author: 'Kerbal123', description: '硝酸高铈铵' },
                { img: '作品90.webp', author: '𝓐𝛵 ⁠🧊', description: '硝酸亚汞' },
                { img: '作品252.webp', author: '迷路的野指针', description: '硫酸双胍' },
                { img: '作品65.webp', author: '关关', description: '硫酸铝钾' },
                { img: '作品151.webp', author: '紫色硫酸铜', description: '硫酸铝钾' },
                { img: '作品156.webp', author: '紫色硫酸铜', description: '硫酸铝钾' },
                { img: '作品157.webp', author: '紫色硫酸铜', description: '硫酸铝钾' },
                { img: '作品158.webp', author: '紫色硫酸铜', description: '硫酸铝钾' },
                { img: '作品164.webp', author: '紫色硫酸铜', description: '硫酸铝钾' },
                { img: '作品165.webp', author: '紫色硫酸铜', description: '硫酸铝钾' },
                { img: '作品166.webp', author: '紫色硫酸铜', description: '硫酸铝钾' },
                { img: '作品271.webp', author: '关关', description: '硫酸铝钾' },
                { img: '作品274.webp', author: 'DAOZAO', description: '硫酸铝钾' },
                { img: '作品275.webp', author: 'DAOZAO', description: '硫酸铝钾' },
                { img: '作品264.webp', author: 'Printhe', description: '硫酸锰' },
                { img: '作品168.webp', author: '金平糖', description: '硫酸亚铁' },
                { img: '作品265.webp', author: 'Printhe', description: '硫酸亚铁' },
                { img: '作品286.webp', author: '紫色硫酸铜', description: '硫酸亚铁' },
                { img: '作品287.webp', author: '紫色硫酸铜', description: '硫酸亚铁' },
                { img: '作品269.webp', author: 'Printhe', description: '硫酸钴' },
                { img: '作品51.webp', author: '青于', description: '硫酸镍' },
                { img: '作品69.webp', author: '紫色硫酸铜', description: '硫酸镍' },
                { img: '作品107.webp', author: '氟氙Cryptand', description: '硫酸镍六水合物'},
                { img: '作品170.webp', author: 'DAOZAO', description: '六水硫酸镍' },
                { img: '作品172.webp', author: 'DAOZAO', description: '六水硫酸镍' },
                { img: '作品173.webp', author: 'DAOZAO', description: '六水硫酸镍' },
                { img: '作品204.webp', author: 'DAOZAO', description: '六水硫酸镍' },
                { img: '作品205.webp', author: 'DAOZAO', description: '六水硫酸镍' },
                { img: '作品185.webp', author: 'DAOZAO', description: '七水硫酸镍' },
                { img: '作品186.webp', author: 'DAOZAO', description: '七水硫酸镍' },
                { img: '作品187.webp', author: 'DAOZAO', description: '七水硫酸镍' },
                { img: '作品188.webp', author: 'DAOZAO', description: '七水硫酸镍' },
                { img: '作品189.webp', author: 'DAOZAO', description: '七水硫酸镍' },
                { img: '作品289.webp', author: '紫色硫酸铜', description: '七水硫酸镍' },
                { img: '作品212.webp', author: 'DAOZAO', description: '硫酸镍铵' },
                { img: '作品213.webp', author: 'DAOZAO', description: '硫酸镍铵' },
                { img: '作品214.webp', author: 'DAOZAO', description: '硫酸镍铵' },
                { img: '作品215.webp', author: 'DAOZAO', description: '硫酸镍铵' },
                { img: '作品216.webp', author: 'DAOZAO', description: '硫酸镍铵' },
                { img: '作品217.webp', author: 'DAOZAO', description: '硫酸镍铵' },
                { img: '作品31.webp', author: '泠鳞', description: '硫酸镨' },
                { img: '作品49.webp', author: '青于', description: '硫酸镨' },
                { img: '作品50.webp', author: '青于', description: '硫酸镨' },
                { img: '作品53.webp', author: '泠鳞', description: '硫酸镨晶簇' },
                { img: '作品32.webp', author: '泠鳞', description: '硫酸钕' },
                { img: '作品61.webp', author: '紫色硫酸铜', description: '硫酸钕' },
                { img: '作品64.webp', author: '紫色硫酸铜', description: '硫酸钕' },
                { img: '作品30.webp', author: '泠鳞', description: '硫酸钐' },
                { img: '作品169.webp', author: '金平糖', description: '硫酸铒' },
                { img: '作品27.webp', author: '青于', description: '高铼酸钾' },
                { img: '作品28.webp', author: '青于', description: '高铼酸钾' },
                { img: '作品29.webp', author: '青于', description: '高铼酸钾' },
                { img: '作品137.webp', author: 'Kerbal123', description: '高铼酸钾' },
                { img: '作品136.webp', author: 'Kerbal123', description: '氯铼酸钾' },
                { img: '作品134.webp', author: 'Kerbal123', description: '六氯铼酸钾' },
                { img: '作品135.webp', author: 'Kerbal123', description: '六氯铼酸钾' },
                { img: '作品20.webp', author: '迷路的野指针', description: '草酸氢钠' },
                { img: '作品206.webp', author: 'DAOZAO', description: 'K₅Na₁₉［Al（C₂O₄）₃］₈·32H₂O（铬掺杂）' },
                { img: '作品207.webp', author: 'DAOZAO', description: 'K₅Na₁₉［Al（C₂O₄）₃］₈·32H₂O（铬掺杂）' },
                { img: '作品208.webp', author: 'DAOZAO', description: 'K₅Na₁₉［Al（C₂O₄）₃］₈·32H₂O（铬掺杂）' },
                { img: '作品250.webp', author: 'DAOZAO', description: '三草酸合铝酸钠' },
                { img: '作品251.webp', author: 'DAOZAO', description: '三草酸合铝酸钠' },
                { img: '作品194.webp', author: 'DAOZAO', description: '三草酸合铁酸钾' },
                { img: '作品195.webp', author: 'DAOZAO', description: '三草酸合铁酸钾' },
                { img: '作品88.webp', author: '𝓐𝛵 ⁠🧊', description: '二水草酸铜钾' },
                { img: '作品91.webp', author: '𝓐𝛵 ⁠🧊', description: '四水草酸铜钾' },
                { img: '作品23.webp', author: '待到群星闪耀时', description: '三水合丙二酸铁钾' },
                { img: '作品24.webp', author: '待到群星闪耀时', description: '三水合丙二酸铁钾' },
                { img: '作品54.webp', author: '泠鳞', description: '柠檬酸单晶' },
                { img: '作品68.webp', author: 'Kerbal123', description: '乙酸铜钙' },
                { img: '作品174.webp', author: 'DAOZAO', description: '乙酸铜钙' },
                { img: '作品175.webp', author: 'DAOZAO', description: '乙酸铜钙' },
                { img: '作品176.webp', author: 'DAOZAO', description: '乙酸铜钙' },
                { img: '作品272.webp', author: 'Kerbal123', description: '乙酸铜钙' },
                { img: '作品218.webp', author: 'DAOZAO', description: '乙酸铜' },
                { img: '作品219.webp', author: 'DAOZAO', description: '乙酸铜' },
                { img: '作品220.webp', author: 'DAOZAO', description: '乙酸铜' },
                { img: '作品221.webp', author: 'DAOZAO', description: '乙酸铜' },
                { img: '作品256.webp', author: 'Printhe', description: '乙酸铜' },
                { img: '作品257.webp', author: 'Printhe', description: '乙酸铜' },
                { img: '作品89.webp', author: '𝓐𝛵 ⁠🧊', description: '二水乙酸铜' },
                { img: '作品153.webp', author: '紫色硫酸铜', description: '乙酸钐' },
                { img: '作品154.webp', author: '紫色硫酸铜', description: '乙酸钐' },
                { img: '作品155.webp', author: '紫色硫酸铜', description: '乙酸钐' },
                { img: '作品225.webp', author: 'DAOZAO', description: '乙酸钐' },
                { img: '作品227.webp', author: 'DAOZAO', description: '乙酸钐' },
                { img: '作品228.webp', author: 'DAOZAO', description: '乙酸钐' },
                { img: '作品229.webp', author: 'DAOZAO', description: '乙酸钐' },
                { img: '作品276.webp', author: 'DAOZAO', description: '乙酸钐（荧光）' },
                { img: '作品277.webp', author: 'DAOZAO', description: '乙酸钐（荧光）' },
                { img: '作品21.webp', author: 'LX虫管吖Galvin', description: '乙酸铕' },
                { img: '作品22.webp', author: 'LX虫管吖Galvin', description: '乙酸铕' },
                { img: '作品222.webp', author: 'DAOZAO', description: '乙酸铒' },
                { img: '作品223.webp', author: 'DAOZAO', description: '乙酸铒' },
                { img: '作品224.webp', author: 'DAOZAO', description: '乙酸铒' },
                { img: '作品146.webp', author: '迷路的野指针', description: '甜菜碱锰' },
                { img: '作品209.webp', author: 'DAOZAO', description: '甜菜碱锰' },
                { img: '作品210.webp', author: 'DAOZAO', description: '甜菜碱锰' },
                { img: '作品211.webp', author: 'DAOZAO', description: '甜菜碱锰' },
                { img: '作品52.webp', author: '青于', description: '四氯合锰酸甜菜碱锰' },
                { img: '作品58.webp', author: '青于', description: '四氯合锰酸四乙基铵' },
                { img: '作品59.webp', author: '青于', description: '四氯合锰酸四乙基铵' },
                { img: '作品142.webp', author: '迷路的野指针', description: 'Cs₂FeCl₅(H₂O)'},
                { img: '作品25.webp', author: '待到群星闪耀时', description: '四氯二水合铜酸钾' },
                { img: '作品258.webp', author: 'Printhe', description: '四氯二水合铜酸钾' },
                { img: '作品105.webp', author: '氟氙Cryptand', description: '四丁基铵八氯二铼酸盐丨四丁基铵八溴二铼酸盐 丨合成by yusaki'},
                { img: '作品190.webp', author: 'DAOZAO', description: '亚铁氰化钾' },
                { img: '作品191.webp', author: 'DAOZAO', description: '亚铁氰化钾' },
                { img: '作品192.webp', author: 'DAOZAO', description: '亚铁氰化钾' },
                { img: '作品193.webp', author: 'DAOZAO', description: '亚铁氰化钾' },
                { img: '作品108.webp', author: '氟氙Cryptand', description: '六氰合铁（III）酸钾'},
                { img: '作品62.webp', author: '紫色硫酸铜', description: '铁氰化钾' },
                { img: '作品63.webp', author: '紫色硫酸铜', description: '铁氰化钾' },
                { img: '作品85.webp', author: '𝓐𝛵 ⁠🧊', description: '铁氰化钾' },
                { img: '作品109.webp', author: '氟氙Cryptand', description: '四（异硫氰酸根）络锰(II)双[水·（18-冠-6醚）络钾]18-冠-6醚络钾硫氰酸盐'},
                { img: '作品138.webp', author: 'Kerbal123', description: '硫氰酸乙二胺镍' },
                { img: '作品42.webp', author: '迷路的野指针', description: '三氯化三乙二胺络钴' },
                { img: '作品17.webp', author: '迷路的野指针', description: '硫酸三乙二胺络镍' },
                { img: '作品9.webp', author: '迷路的野指针', description: '二水合二氯化二乙二胺络铜' },
                { img: '作品259.webp', author: 'Printhe', description: '二溴化三联吡啶合锰' },
                { img: '作品260.webp', author: 'Printhe', description: '二氯化三联吡啶合镍' },
                { img: '作品106.webp', author: '氟氙Cryptand', description: '二(μ-2羟基)双(二(2-甲基咪唑基)络铜)）二高氯酸盐二水合物'},
                { img: '作品110.webp', author: '氟氙Cryptand', description: '二乙烯三胺四氯合铜酸盐一氯化物'},
                { img: '作品266.webp', author: 'Printhe', description: '硫酸四咪唑合铜' }
            ]
        },
        {
            id: 'sulfate6',
            title: '饼の美学',
            type: 'blessing',
            works: [
                { img: '作品36.webp', author: ''},
                { img: '作品37.webp', author: '迷路的野指针' },
                { img: '作品38.webp', author: '迷路的野指针' },
                { img: '作品39.webp', author: '迷路的野指针' },
                { img: '作品40.webp', author: '迷路的野指针' },
                { img: '作品41.webp', author: '迷路的野指针' },
                { img: '作品43.webp', author: '迷路的野指针' },
                { img: '作品44.webp', author: '迷路的野指针' },
                { img: '作品56.webp', author: 'Circle' },
                { img: '作品45.webp', author: 'Chlorine' },
                { img: '作品46.webp', author: '长街听风' },
                { img: '作品47.webp', author: '长街听风' },
                { img: '作品48.webp', author: '冰麒麟' },
                { img: '作品55.webp', author: '食堂人民科学协会-荣', description: '乙二胺四乙酸钴(Ⅲ)酸钠' }
            ]
        }
    ];

    const AUTHOR_FILTER_THRESHOLD = 2;

    const sidebar = document.getElementById('filterGroups');
    const contentContainer = document.getElementById('portfolioContent');
    const searchInput = document.getElementById('sidebarSearch');
    const resetBtn = document.getElementById('filterResetBtn');

    function extractFilters() {
        const sections = portfolioData.map(function(d) { return { id: d.id, title: d.title }; });
        const authorCounts = {};
        const crystalSet = new Set();
        portfolioData.forEach(function(d) {
            d.works.forEach(function(w) {
                if (w.author) {
                    authorCounts[w.author] = (authorCounts[w.author] || 0) + 1;
                }
                if (w.description) crystalSet.add(w.description);
            });
        });
        const authors = Object.keys(authorCounts)
            .filter(function(a) { return authorCounts[a] > AUTHOR_FILTER_THRESHOLD; })
            .sort(function(a, b) { return a.localeCompare(b, 'zh-CN'); });
        const crystals = Array.from(crystalSet).sort(function(a, b) { return a.localeCompare(b, 'zh-CN'); });

        const crystalSubGroups = {
            '金属晶体': ['银', '蒸馏银', '铜', 'CVD 铜', '铁', '铬', 'pvd 碲', '钨', '铌', '铯']
        };

        var groupedCrystals = {};
        var otherCrystals = [];
        crystals.forEach(function(c) {
            var found = false;
            for (var groupName in crystalSubGroups) {
                if (crystalSubGroups[groupName].indexOf(c) !== -1) {
                    if (!groupedCrystals[groupName]) groupedCrystals[groupName] = [];
                    groupedCrystals[groupName].push(c);
                    found = true;
                    break;
                }
            }
            if (!found) otherCrystals.push(c);
        });

        return { sections: sections, authors: authors, groupedCrystals: groupedCrystals, otherCrystals: otherCrystals };
    }

    function createFilterGroups() {
        const filters = extractFilters();
        const sections = filters.sections;
        const authors = filters.authors;
        const groupedCrystals = filters.groupedCrystals;
        const otherCrystals = filters.otherCrystals;

        const sectionOptions = sections.map(function(s) {
            return {
                value: s.id,
                label: s.title,
                count: portfolioData.find(function(d) { return d.id === s.id; }).works.length
            };
        });

        const authorOptions = authors.map(function(a) {
            return {
                value: a,
                label: a,
                count: portfolioData.reduce(function(sum, d) {
                    return sum + d.works.filter(function(w) { return w.author === a; }).length;
                }, 0)
            };
        });

        var crystalGroups = [];
        for (var groupName in groupedCrystals) {
            crystalGroups.push({
                name: groupName,
                options: groupedCrystals[groupName].map(function(c) {
                    return {
                        value: c,
                        label: c,
                        count: portfolioData.reduce(function(sum, d) {
                            return sum + d.works.filter(function(w) { return w.description === c; }).length;
                        }, 0)
                    };
                })
            });
        }

        var crystalOtherOptions = otherCrystals.map(function(c) {
            return {
                value: c,
                label: c,
                count: portfolioData.reduce(function(sum, d) {
                    return sum + d.works.filter(function(w) { return w.description === c; }).length;
                }, 0)
            };
        });

        sidebar.appendChild(createFilterGroup('作品分类', sectionOptions));
        sidebar.appendChild(createFilterGroup('作者', authorOptions));
        if (crystalGroups.length > 0 || crystalOtherOptions.length > 0) {
            sidebar.appendChild(createNestedFilterGroup('晶体种类', crystalGroups, crystalOtherOptions));
        }
    }

    function createFilterGroup(name, options) {
        const group = document.createElement('div');
        group.className = 'filter-group';
        group.dataset.group = name;

        const header = document.createElement('div');
        header.className = 'filter-group-header';
        header.innerHTML = '<h4>' + name + '</h4><i class="fas fa-chevron-down"></i>';
        header.addEventListener('click', function() {
            group.classList.toggle('expanded');
        });

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'filter-group-options';

        options.forEach(function(opt) {
            const label = document.createElement('label');
            label.className = 'filter-option';
            label.innerHTML = '<input type="checkbox" value="' + opt.value + '" data-group="' + name + '"><span>' + opt.label + '</span><span class="option-count">' + opt.count + '</span>';
            const checkbox = label.querySelector('input');
            checkbox.addEventListener('change', applyFilters);
            optionsContainer.appendChild(label);
        });

        group.appendChild(header);
        group.appendChild(optionsContainer);
        return group;
    }

    function createNestedFilterGroup(name, subGroups, otherOptions) {
        const group = document.createElement('div');
        group.className = 'filter-group';
        group.dataset.group = name;

        const header = document.createElement('div');
        header.className = 'filter-group-header';
        header.innerHTML = '<h4>' + name + '</h4><i class="fas fa-chevron-down"></i>';
        header.addEventListener('click', function() {
            group.classList.toggle('expanded');
        });

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'filter-group-options';

        subGroups.forEach(function(sub) {
            const subGroupEl = document.createElement('div');
            subGroupEl.className = 'filter-subgroup';

            const subHeader = document.createElement('div');
            subHeader.className = 'filter-subgroup-header';
            subHeader.innerHTML = '<h5>' + sub.name + '</h5><i class="fas fa-chevron-down"></i>';
            subHeader.addEventListener('click', function(e) {
                e.stopPropagation();
                subGroupEl.classList.toggle('expanded');
            });

            const subOptions = document.createElement('div');
            subOptions.className = 'filter-subgroup-options';

            sub.options.forEach(function(opt) {
                const label = document.createElement('label');
                label.className = 'filter-option filter-option-sub';
                label.innerHTML = '<input type="checkbox" value="' + opt.value + '" data-group="' + name + '"><span>' + opt.label + '</span><span class="option-count">' + opt.count + '</span>';
                const checkbox = label.querySelector('input');
                checkbox.addEventListener('change', applyFilters);
                subOptions.appendChild(label);
            });

            subGroupEl.appendChild(subHeader);
            subGroupEl.appendChild(subOptions);
            optionsContainer.appendChild(subGroupEl);
        });

        otherOptions.forEach(function(opt) {
            const label = document.createElement('label');
            label.className = 'filter-option';
            label.innerHTML = '<input type="checkbox" value="' + opt.value + '" data-group="' + name + '"><span>' + opt.label + '</span><span class="option-count">' + opt.count + '</span>';
            const checkbox = label.querySelector('input');
            checkbox.addEventListener('change', applyFilters);
            optionsContainer.appendChild(label);
        });

        group.appendChild(header);
        group.appendChild(optionsContainer);
        return group;
    }

    function createSkeleton() {
        const wrapper = document.createElement('div');
        wrapper.className = 'skeleton-img-wrapper';
        wrapper.innerHTML = '<div class="skeleton-img" style="height:300px;"></div><div class="skeleton-text"><div class="skeleton-line" style="width:60%;margin:0 auto;"></div></div>';
        return wrapper;
    }

    function createPortfolioContent() {
        contentContainer.innerHTML = '';

        const h1 = document.createElement('h1');
        h1.innerHTML = '晶体作品集';
        contentContainer.appendChild(h1);

        portfolioData.forEach(function(sectionData) {
            const section = document.createElement('section');
            section.id = sectionData.id;
            section.dataset.section = sectionData.id;

            const h2 = document.createElement('h2');
            h2.textContent = sectionData.title;
            section.appendChild(h2);

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

            sectionData.works.forEach(function(work) {
                const workContainer = document.createElement('div');
                workContainer.className = 'portfolio-work';

                let searchData = '';
                if (work.author) searchData += work.author + ' ';
                if (work.description) searchData += work.description + ' ';
                if (sectionData.title) searchData += sectionData.title + ' ';
                workContainer.setAttribute('data-search', searchData.trim());
                workContainer.setAttribute('data-author', work.author || '');
                workContainer.setAttribute('data-crystal', work.description || '');
                workContainer.setAttribute('data-section', sectionData.id);

                const skeleton = createSkeleton();
                workContainer.appendChild(skeleton);

                const img = document.createElement('img');
                img.dataset.src = 'p/portfolio/' + work.img;
                img.className = 'content-image';
                img.alt = work.author ? work.author + '作品' : '作品图片';
                img.style.display = 'none';
                img.style.opacity = '0';

                img.addEventListener('load', function() {
                    skeleton.style.display = 'none';
                    img.style.display = 'block';
                    requestAnimationFrame(function() {
                        img.style.opacity = '1';
                    });
                });

                img.addEventListener('error', function() {
                    skeleton.innerHTML = '<p style="text-align:center;color:#999;padding:2rem;">图片加载失败</p>';
                });

                workContainer.appendChild(img);

                const p = document.createElement('p');
                p.style.textAlign = 'center';
                p.style.color = 'var(--accent)';
                p.style.marginBottom = '3rem';

                let text = '';
                if (work.author) text += '作者：' + work.author;
                if (work.description) text += work.author ? '，晶体：' + work.description : work.description;
                p.textContent = text;

                workContainer.appendChild(p);
                section.appendChild(workContainer);
            });

            contentContainer.appendChild(section);
        });
    }

    function initLazyLoad() {
        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var skeleton = entry.target;
                        var img = skeleton.nextElementSibling;
                        if (img && img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                    }
                });
            }, { rootMargin: '200px' });

            document.querySelectorAll('.skeleton-img-wrapper').forEach(function(skeleton) {
                observer.observe(skeleton);
            });
        } else {
            document.querySelectorAll('img[data-src]').forEach(function(img) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    function applyFilters() {
        const checkedSections = Array.from(sidebar.querySelectorAll('input[data-group="作品分类"]:checked')).map(function(cb) { return cb.value; });
        const checkedAuthors = Array.from(sidebar.querySelectorAll('input[data-group="作者"]:checked')).map(function(cb) { return cb.value; });
        const checkedCrystals = Array.from(sidebar.querySelectorAll('input[data-group="晶体种类"]:checked')).map(function(cb) { return cb.value; });
        const searchTerm = searchInput.value.trim().toLowerCase();

        const sections = contentContainer.querySelectorAll('section');
        let visibleCount = 0;
        let firstVisibleWork = null;

        sections.forEach(function(section) {
            const sectionId = section.dataset.section;
            const sectionMatch = checkedSections.length === 0 || checkedSections.indexOf(sectionId) !== -1;
            let sectionVisible = false;

            const works = section.querySelectorAll('.portfolio-work');
            works.forEach(function(work) {
                const author = work.getAttribute('data-author');
                const crystal = work.getAttribute('data-crystal');
                const searchData = work.getAttribute('data-search').toLowerCase();

                const authorMatch = checkedAuthors.length === 0 || checkedAuthors.indexOf(author) !== -1;
                const crystalMatch = checkedCrystals.length === 0 || checkedCrystals.indexOf(crystal) !== -1;
                const searchMatch = searchTerm === '' || searchData.indexOf(searchTerm) !== -1;

                const show = sectionMatch && authorMatch && crystalMatch && searchMatch;
                work.style.display = show ? 'block' : 'none';
                if (show) {
                    sectionVisible = true;
                    if (!firstVisibleWork) firstVisibleWork = work;
                }
            });

            section.style.display = sectionVisible ? 'block' : 'none';
            if (sectionVisible) visibleCount++;
        });

        let noResults = contentContainer.querySelector('.no-results');
        if (visibleCount === 0) {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.innerHTML = '<i class="fas fa-search"></i><p>没有找到匹配的作品</p>';
                contentContainer.appendChild(noResults);
            }
        } else if (noResults) {
            noResults.remove();
        }

        requestAnimationFrame(function() {
            if (firstVisibleWork) {
                var top = firstVisibleWork.getBoundingClientRect().top + window.scrollY - 16;
                var maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
                var targetScroll = Math.max(0, Math.min(top, maxScroll));
                window.scrollTo({ top: targetScroll, behavior: 'auto' });
            }
        });
    }

    searchInput.addEventListener('input', applyFilters);

    resetBtn.addEventListener('click', function() {
        sidebar.querySelectorAll('input[type="checkbox"]').forEach(function(cb) { cb.checked = false; });
        searchInput.value = '';
        applyFilters();
    });

    createFilterGroups();
    createPortfolioContent();
    initLazyLoad();
});

