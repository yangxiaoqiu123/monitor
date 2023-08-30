const tabsContainer = document.getElementById('tabsContainer');
const addTabButton = document.getElementById('addTabButton');
const closeTabButton = document.getElementById('closeTabButton');
const exitButton = document.getElementById('exitButton');
const homeTab = document.querySelector('[data-tab-id="home"]');
const homeContent = document.getElementById('homeContent');
let srcNameAndTokens = {};
let tabCount = 1; // 初始化标签计数
let openTabCount = 1;
// 添加标签按钮点击事件,点击查看按钮
addTabButton.addEventListener('click', () => {


    closeTabButton.style.display = 'flex';
    exitButton.style.display = 'none';


    let srcName = document.getElementById('src-name').value;
    let srcToken = document.getElementById('src-token').value;
    if (srcName == '' || srcToken == '') {
        alert('请填写正确的屏幕名称和token'); return;
    }
    let srcNameAndToken = {
        [`tab-${tabCount}`]: {
            name: srcName,
            token: srcToken
        }
    };
    srcNameAndTokens = Object.assign(srcNameAndTokens, srcNameAndToken);
    if (openTabCount >= 10) {
        tabsContainer.style.overflowX = 'scroll';
        // 如果标签数达到10个，启用水平滚动
    }

    const newTab = document.createElement('div');
    newTab.classList.add('tab');
    newTab.textContent = srcName;
    // tabsContainer.insertBefore(newTab, homeTab.nextSibling);
    tabsContainer.appendChild(newTab);
    newTab.setAttribute('data-tab-id', `tab-${tabCount}`);
    // 创建新的标签元素
    const newTabContent = document.createElement('div');
    newTabContent.classList.add('tab-content');
    newTabContent.setAttribute('id', `tab-${tabCount}-content`);
    //newTabContent.textContent = `标签 ${tabCount} 内容`;
    document.body.appendChild(newTabContent);

    document.getElementById(`tab-${tabCount}-content`).innerHTML = ` <div class="tab-src-name">
    <div>
      <img src="./img/desk.png" class="icon-desk">
    </div>
    <div class="src-name">
      ${srcName}
    </div>
  </div>
  <div id="tab-${tabCount}-xterm-content" class="xterm-content"></div>
  `;

    termContent(srcName, srcToken, `tab-${tabCount}-xterm-content`)

    tabCount++;
    openTabCount++;

    // 创建新的标签内容元素
    // 标签点击事件
    newTab.addEventListener('click', (event) => {
        //每次切换tab栏重新渲染一次数据
        //alert('要重新渲染了'+newTab.getAttribute('data-tab-id') + `-xterm-content`);
        let Element = newTab.getAttribute('data-tab-id') + `-xterm-content`;
        document.getElementById(Element).innerHTML = '';
        //alert(newTab.getAttribute('data-tab-id') + `-xterm-content`);
        termContent(srcName, srcToken, newTab.getAttribute('data-tab-id') + `-xterm-content`);
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        newTab.classList.add('active');
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => content.classList.remove('active'));
        newTabContent.classList.add('active');
        // 切换选中的标签和对应的内容
        closeTabButton.style.display = 'flex';
        exitButton.style.display = 'none';
    });
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    newTab.classList.add('active');
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    newTabContent.classList.add('active');

    // 将新标签设为活跃状态
});

// 关闭标签按钮点击事件
closeTabButton.addEventListener('click', () => {
    if (tabCount > 1) {
        const activeTab = document.querySelector('.tab.active');
        if (activeTab && !activeTab.classList.contains('no-close')) {
            const activeTabId = activeTab.getAttribute('data-tab-id');
            tabsContainer.removeChild(activeTab);
            //tabCount--;
            openTabCount--;

            if (openTabCount < 10) {
                tabsContainer.style.overflowX = 'auto';
            }

            if (openTabCount == 1) {
                closeTabButton.style.display = 'none';
                exitButton.style.display = 'inline-block';
            }

            const tabContent = document.getElementById(`${activeTabId}-content`);
            if (tabContent) {
                tabContent.remove();
            }

            // 切换回首页标签
            homeTab.click();
        }
    } else if (openTabCount === 1) {
        window.close(); // 如果只剩下首页标签，关闭浏览器标签页
    }
});

// 退出按钮点击事件
exitButton.addEventListener('click', () => {

    if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") != -1) {
        window.location.href = "about:blank";
        window.close();
    } else {
        window.opener = null;
        window.open("", "_self");
        window.close();

    }
    // window.close(); // 关闭浏览器标签页
});


// 首页标签点击事件
homeTab.addEventListener('click', () => {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    homeTab.classList.add('active');
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    homeContent.classList.add('active');
    closeTabButton.style.display = 'none';
    exitButton.style.display = 'flex';
    // 切换到首页标签时，关闭按钮隐藏
});

//动态修改tab栏内容
function termContent(srcName, token, tabId) {
    // api接口 start
    //测试接口
    //const url = `http://zmc.host/xterm-api.php`;
    const url = `https://factual-sawfly-38887.upstash.io/get/${srcName}`;
    //const token = "AZfnACQgMjUzMjJmNTYtZGE3Ny00YWZhLWFkMzgtN2RhZDliNTM5ODBiYjA0NjIyMzIwNjQ4NGE0MzkzMjY0YTkyYzYzZGU5NGI=";
    fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            // base64解码
            // 解码 Base64 数据为二进制数据
            const binaryData = atob(data.result);
            var decodedBinaryData = new TextDecoder().decode(new Uint8Array([...binaryData].map(char => char.charCodeAt(0))));
            console.log(decodedBinaryData);

            // 将原始的换行字符转换为 xterm 能够识别的控制序列
            const formattedText = decodedBinaryData.replace(/\n/g, '\r\n');
            //term.write(formattedText);
            // 滚动到顶部
            console.log(formattedText);

            const htmlOutput = convertAnsiToHtml(formattedText);



            document.getElementById(tabId).innerHTML = htmlOutput;

            function convertAnsiToHtml(ansiText) {
                const ansiCodesToHtml = {
                    '[0m': '</span>',
                    '[1m': '<span style="font-weight: bold;">',
                    '[30m': '<span style="color: black;">',   // Black text color
                    '[31m': '<span style="color: red;">',     // Red text color
                    '[32m': '<span style="color: green;">',   // Green text color
                    '[33m': '<span style="color: yellow;">',  // Yellow text color
                    '[34m': '<span style="color: blue;">',    // Blue text color
                    '[35m': '<span style="color: purple;">',  // Purple text color
                    '[36m': '<span style="color: cyan;">',    // Cyan text color
                    '[37m': '<span style="color: white;">',   // White text color
                    '[39m': '</span>',
                    '[0m': '</span>',                        // Reset text style
                    '[1m': '<span style="font-weight: bold;">',  // Bold text
                    '[49m': '</span>',                       // Reset background color
                    // Add more ANSI codes and their corresponding HTML styles here
                };

                let htmlText = ansiText;
                for (const ansiCode in ansiCodesToHtml) {
                    htmlText = htmlText.split(ansiCode).join(ansiCodesToHtml[ansiCode]);
                }
                return htmlText;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    // api接口 end
}

let refreshInterval; // 声明全局变量，用于存储定时器 ID
function refreshActiveTabData() {
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
        const tabId = activeTab.getAttribute('data-tab-id');
        // 在这里执行您的操作，例如重新请求数据
        if (tabId != 'home') {
            //alert('点击标签切换')
            document.getElementById(tabId + '-xterm-content').innerHTML = '';
            termContent(srcNameAndTokens[tabId]['name'], srcNameAndTokens[tabId]['token'], tabId + '-xterm-content');
        }

    }
}

// 启动定时器
function startRefreshInterval() {
    // 只有当 refreshInterval 不存在时，才启动定时器
    if (!refreshInterval) {
        refreshActiveTabData(); // 初始加载时先执行一次

        // 每十分钟获取活跃的 tab 数据 10 * 60 * 1000
        refreshInterval = setInterval(refreshActiveTabData, 10 * 60 * 1000);
    }
}

// 标签切换事件
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        clearInterval(refreshInterval); // 清除旧的定时器
        refreshInterval = null; // 将定时器 ID 设置为 null
        startRefreshInterval(); // 启动新的定时器
        // 更新活跃标签的数据
        refreshActiveTabData();
    });
});

// 初始加载时启动定时器
startRefreshInterval();

// 获取实际高度,兼容苹果设备
!(function (n, e) {
    function setViewHeight() {
        var windowVH = e.innerHeight / 100
        n.documentElement.style.setProperty('--vh', windowVH + 'px')
    }
    var i = 'orientationchange' in window ? 'orientationchange' : 'resize'
    n.addEventListener('DOMContentLoaded', setViewHeight)
    e.addEventListener(i, setViewHeight)
})(document, window)
