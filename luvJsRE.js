console.log("成功加载外部JS");
console.log(window.navigator.userAgent);
//删除线焦点事件
searchtext.onfocus = function () {
    //input.focus();
    this.classList.add("linenone");
    this.classList.remove("linethrough");
}
searchtext.onblur = function () {
    this.classList.add("linethrough");
    this.classList.remove("linenone");
};

//原生cssjs实现窗口

function cancelwindow() {
    const window = document.querySelector("#box");
    window.style.display = 'none';
}
function openNew() {
    window.open("https://blog.csdn.net/m0_51545690/article/details/123359959", '介绍cookie', 'resizable,scrollbars,status');
}
let imgs = ["pics\\didi.gif", "pics\\didi.gif", "pics\\didi.gif"];

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
if (window.scrollbars) {
    console.log(window.scrollY);
}
const setComment = document.querySelector("#setComment");
console.log(setComment);
//const typing = document.querySelectorAll("#writeComment input");
let comtext = document.querySelector("#comtext");
let comid = document.querySelector("#comid");
let i = 0;

comtext.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        if (comtext.value !== '' && comid !== '') {
            console.log(comtext.value);
            localStorage.setItem('comid-'+i, comid.value);
            localStorage.setItem("comtext-"+i, comtext.value);
            console.log(localStorage.length);
            i++;
            let li = document.createElement("li");
            let comment = document.createTextNode(comid.value + '-said:---\n' + comtext.value);

            li.appendChild(comment);
            setComment.appendChild(li);
            comtext.value = '';
            comid.value = '';
        }
        else {
            alert("没输入不给发");
        }
    }
})

function sentComments() {
    if (comtext.value !== '' && comid !== '') {
        console.log(comtext.value);
        localStorage.setItem("comid-"+i, comid.value);
        localStorage.setItem("comtext-"+i, comtext.value);
        console.log(localStorage.length);
        i++;
        let li = document.createElement("li");
        let comment = document.createTextNode(comid.value + '-said:---|\n' + comtext.value);

        li.appendChild(comment);
        setComment.appendChild(li);
        comtext.value = '';
        comid.value = '';
    }
    else {
        alert("没输入不给发XD");
    }
}


