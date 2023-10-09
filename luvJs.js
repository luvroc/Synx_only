(function () {
    console.log("成功加载外部js");

    }());
window.addEventListener("load", function () {
    console.log("我是外部js test1");
})

function test2() {
    console.log("test2print");
}
const nav = document.querySelector('#nav');
console.log(nav);
let tempvar = true;
function navSwitch() {//按钮改变导航栏颜色成功案例
    if (tempvar) {
        nav.classList.remove("nav");
        nav.classList.add("navalter");
        tempvar=false
    }
    else {
        nav.classList.remove("navalter");
        nav.classList.add("nav");
        tempvar=true
    }
    console.log(nav.style.backgroundColor);
    return;
};
function titleSwitch() {

}
//document.querySelector()
/*function animate(element, target) {
    let step = 10;
    let time = 10;
    let gap = (Math.abs(target - element.offsetLeft) / slider_item_width);
    if (gap > 1) {
        step *= gap;
        time /= gap;
    }
    if (element) {
        step = (element.offsetLeft > target) ? -step : step;
        clearInterval();
    }
}
*/
const searchform = document.forms['searchform'];

    //无需设置input的id属性，只设置name即可

const text = document.querySelector('#searchtext');
const list = document.querySelector("#nav .mylist");
(function () {
    
    console.log(list);
    list.left = text.getBoundingClientRect().left;
    list.right = text.getBoundingClientRect().right;
    list.top = text.getBoundingClientRect().top;

}());
searchtext.onfocus = function () {
    //input.focus();
    this.classList.add("linenone");
    this.classList.remove("linethrough");
}
searchtext.onblur = function () {
    this.classList.add("linethrough");
    this.classList.remove("linenone");
}
const pics = [{
    url:".\\pics\\0.jpg",
    title:"test1"
},
{
    url:".\\pics\\1.jpg",
    title:"test2",
},
{
    url:".\\pics\\2.jpg",
    title:"test3",
}


]
//C:\Users\luvrocLazy\Desktop\luvrocweb
console.log(pics[0]);
let i = 0;
let playing = document.querySelector('#playing');
console.log(playing.src);
setInterval(function () {
    playing.src = pics[i].url;
    playing.title = pics[i].title;
    
    i++;
    if (i == 3)
        i = 0;
}, 2000);

const arr = ['A', 'B', 'C', 'D', 'E'];
const start = document.querySelector("start");
/*start.addEventListener('click', function () {
    console.log("点击触发点名");
    const random = parseInt(Math.random()*arr.length);
    console.log("点名random:${random}")
});*/
function cancelwindow() {
    const window = document.querySelector("#box");
    window.style.display = 'none';
}
function openNew() {
    window.open("https://blog.csdn.net/m0_51545690/article/details/123359959", '介绍cookie', 'resizable,scrollbars,status');
}
const ul = document.querySelector("#picsqueue");
let imgs = [".\\pics\\0.jpg", ".\\pics\\0.jpg", ".\\pics\\0.jpg"];

console.log(imgs);
for (let i = 0; i < imgs.length; i++) {
    let li = document.createElement("li");
    let img = document.createElement("img");
    img.src = imgs[i];
    li.appendChild(img);
    ul.appendChild(li);
}
for (let i = 0; i < imgs.length; i++) {
    let li = document.createElement("li");
    let img = document.createElement("img");
    img.src = imgs[i];
    li.appendChild(img);
    ul.appendChild(li);
}
let lis = document.querySelectorAll("#picsqueue li");
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
(function () {
    let scrollY = window.scrollY;
    console.log(`scrollY: ${scrollY}`);
}());
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