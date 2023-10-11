### 一切的开端
我是从军训开始学习htm的，本身也有c的基础所以很快上手了简单的htm标签使用
同时看到了SynX的招新题，开始依照黑马的教程学习js、css
在后来买了本css指南、直到现在都在看
期间查阅了很多资料、也有很多学长提供了帮助

### 原始的htm
刚开始执着于把学到的所有东西塞进去，所以有特别多不规范的地方（大多数保留在luvroc.htm）
比如行内css、js，比如a嵌套button，比如没有规范的布局、乱七八糟的注释(我保留了一部分XD)
算是初步体验了史山的形成过程

### css
直到现在我也不是很熟悉css里面的部分内容
比如
> @media用法
    inline-block?
    样式之间的互相覆盖
    form内的元素不受css影响...


结果上它们不怎么影响我实现我的想法，一套不行就换一套，大不了就原始一点
最后我学了栅格布局后，花了一天从头写了一个Re版，又加了点新东西

### js
两个版本（luvroc&luvrocRe）的js代码很多都是一样的
接下来我会以js为主介绍Re中完成的功能

## 导航栏&搜索栏
最开始是手搓的，用ul+li+a的形式加上混乱的css
搜索栏也没有真正实现搜索（很遗憾
值得一提的是我求助群里帮助时，徐千学长提出了用focus、blur来改变搜索栏显示变化

    searchtext.onfocus = function () {
        //删除线焦点事件
        this.classList.add("linenone");
        this.classList.remove("linethrough");
    }
    searchtext.onblur = function () {
        this.classList.add("linethrough");
        this.classList.remove("linenone");
    };

## 开始窗口
我仿照一些网站的界面，想写一个能提示用户同意cookie的窗口
事实上它只是个窗口，因为我发现cookie的掌握有点为时过早
js只写了两个事件，一个弹出介绍cookie的链接和两个删除窗口的按纽

## 弹簧式手风琴
我到现在也不知道该叫它什么
一开始我只是仿照别人的成品代码
发现怎么都做不到同样的效果
只好自己改了部分css和js
主要通过放大样式的宽度高度实现展示悬停照片
同时算是真正接触dom后开始的成果


    let imgs = ["./pics/0.jpg", "./pics/0.jpg", "./pics/0.jpg"];
    //图片展示
    const ul = document.querySelector("#picsqueue");
    console.log(imgs);
    for (let i = 0; i < imgs.length; i++) {
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.src = imgs[i];
        li.appendChild(img);
        ul.appendChild(li);
    }
    for (let i = 0; i < imgs.length; i++) {//插入元素
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.src = imgs[i];
        li.appendChild(img);
        ul.appendChild(li);
    }
    let lis = document.querySelectorAll("#picsqueue li");
	//缩放图片
    window.onload = window.onresize = function () {
        for (let i = 0; i < lis.length; i++) {
            lis[i].style.width = (ul.offsetWidth / imgs.length) - 250 + "px";
        }
    }
    let imgM = document.querySelectorAll("#picsqueue img");
    for (let i = 0; i < lis.length; i++) {
        imgM[i].onmouseenter = function () {
            lis[i].style.width = imgM[i].offsetWidth + 250 + "px";
        }
        imgM[i].onmouseleave = function () {
            for (let i = 0; i < lis.length; i++) {
                lis[i].style.width = (ul.offsetWidth / imgs.length) - 250 + "px";
            }
        }
    }
	
## 评论
黑马教程里有类似案例
但我不想照抄案例里b站的样式和他的代码
自己尝试修改添加
遇到了存储评论的问题
在杨萌学长的提示下，使用了localStorage的方式实现了存储
出于对这部分东西的兴趣，现在在看node.js的功能


    function sentComments() {
        if (comtext.value !== '' && comid !== '') {//有个bug，comid没有用value值，但意外地实现了匿名的功能
            console.log(comtext.value);
            localStorage.setItem("comid-"+i, comid.value);
            localStorage.setItem("comtext-"+i, comtext.value);
            console.log(localStorage.length);
            i++;//i定义在函数外，赋值为0,仓促下添加的无奈，存储键值对为什么不能是数组。。。
            let li = document.createElement("li");
            let comment = document.createTextNode(comid.value + '-said:---|\n' + comtext.value);
    //还是很原始，对吧XD
            li.appendChild(comment);
            setComment.appendChild(li);
            comtext.value = '';
            comid.value = '';
        }
        else {
            alert("没输入不给发布XD");
        }
    }
    

## 被我放弃的功能
有两个被我放弃的功能
切换导航栏背景（当时初学觉得渐变色很好看，后面觉得好突兀）
图片轮播（和另一个图片展示的冲突了）
在luvroc.htm内可以看见它们稚嫩的模样XD

## 一个无聊的产物
如果在re里复制粘贴文本
会有额外的文字附上
起因是被csdn的复制限制麻烦到了（好的不学学坏的XD
火狐上没有效果。。。

    
        document.oncopy = function (e) {
        e.preventDefault();
        const selection = window.getSelection();
        const mylink = '\n luvroc.没有服务器';
        console.log(mylink);
        console.log(selection);
        const copytext = selection + mylink;
        if (e.clipboardData) {
            e.clipboardData.setData('text', copytext);
        }
        else {
            window.clipboardData.setData('text', copytext);
        }
    }
	
## 遇到的问题
兼容：有些功能在火狐上实现不了，于是我暂时只在chrome和edge上编辑测试（这俩差别不大）
css：没学到动画部分，很遗憾不能做到更多（比如写个游戏！）
html：很多标签还是没用上