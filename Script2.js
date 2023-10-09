function Mine(tr, td, mineNum) {
    this.tr = Number(tr);//行
    this.td = Number(td);//列
    this.mineNum = mineNum;//给定雷数
    this.squares = new Array(this.tr);
    for (let i = 0; i < this.tr; i++) {
        this.squares[i] = new Array(this.td);
        
    }
    console.log(this.squares[0][0]);
    this.tds = [];//每个格子的dom信息
    this.surplusMine = mineNum;//剩余雷
    this.mark = false;//标记雷
    this.parent = document.querySelector('.gamebox');//绑定父类棋盘
}
let arr3 = [];

let cl = ['zero', 'one', 'two', 'three', 'four', 'six', 'seven', 'eight'];

Mine.prototype.randomNum = function () {
    let length = Number(this.tr * this.td);
    let mysquare = new Array(length);
    for (let i = 0; i < length;i++) {
        mysquare[i] = i;
       
    }
    mysquare.sort(function () {
        return 0.5 - Math.random();
    }

    );
    return mysquare.slice(0, this.mineNum);
}
Mine.prototype.init = function () {//初始化游戏，加载mine类
    let random = this.randomNum();
    console.log(random);
    let n = 0;
    for (let i = 0; i < this.tr; i++) {
        for (let j = 0; j < this.td; j++) {
            //console.log('creatingMine');
            if (random.indexOf(++n)!=-1) {
                this.squares[i][j] = {
                    type: 'mine',
                    x: j,
                    y: i,
                    value: NaN
                }
                console.log(this.squares[i][j].value);
            }
            else {
                this.squares[i][j] = {
                    type: 'number',
                    x: j,
                    y: i,
                    value:0,
                }
                console.log(this.squares[i][j].value);

                //console.log('number++');
            }
        }
        
    }this.createDom();
    this.updateNum();
    //
    
    this.parent.oncontextmenu = function () {//禁用右键菜单
        return false;
    }
    this.mineNumDom = document.querySelector('.mineNum');
    this.mineNumDom.innerHTML = this.surplusMine;
    console.log('done!');

}


Mine.prototype.createDom = function () {
    let This = this;
    let table = document.createElement("table");
    for (let i = 0; i < this.tr; i++) {
        let domTr = document.createElement('tr');
        this.tds[i] = [];
        for (let j = 0; j < this.td; j++) {
            let domTd = document.createElement('td');
            this.tds[i][j] = domTd;
            domTd.pos = [i, j];
            domTd.addEventListener('mousedown', function (e) {
                if (e.button == 0) {
                    if (this.className != 'flag') {
                        console.log('click' + (i + 1) + ',' + (j + 1));
                        curSquare = This.squares[i][j];

                        if (curSquare.type == 'number') {
                            this.innerHTML = curSquare.value;
                            this.className = cl[curSquare.value];
                            if (curSquare.value == 0) {
                                this.innerHTML = '';
                            }
                            getAllZero(curSquare);
                        }
                    }
                    else {
                        This.gameOver(this);
                    }
                }
                if (e.button == 2) {
                    console.log('标记');
                    if (this.className && this.className != 'flag') {
                        return;
                    }
                    if (This.squares[i][j].type == 'mine') {
                        This.mark = true;
                        if (this.getAttribute('data') != 1) {
                            arr3.push(This.mark);
                            this.setAttribute('data', 1);
                        }
                    }
                    else {
                        This.mark = false;
                        if (this.getAttribute != 1) {
                            arr3.push(This.mark);
                            this.setAttribute('data', 1);
                        }
                    }
                    if (this.className == 'flag') {
                        This.mineNumDom.innerHTML = toString(--This.surplusMine);
                    }
                    else {
                        This.mineNumDom.innerHTML = toString(++This.surplusMine);
                    }
                    if (This.surplusMine == 0) {
                        let a3 = arr3.every(function (v) {
                            return v == true;
                        });
                        console.log(a3);
                        if (a3) {
                            alert("victory");
                        }
                        else {
                            alert("failure");
                            This.gameOver();
                        }
                    }
                }
            });
            domTr.appendChild(domTd);
        }
        table.appendChild(domTr);
    }
    this.parent.innerHTML = '';
    this.parent.appendChild(table);
}
//Mine.prototype.
Mine.prototype.getAround = function (mysquare) {
    let x = mysquare.x;
    let y = mysquare.y;
    let result = [];
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            console.log(i + ',' + j);
            if (
                i < 0 ||
                j < 0 ||
                i > Mine.td - 1 ||
                j > Mine.tr - 1 ||
                (i == x && j == y) 
            ) {
                continue;
            }
            if (true) {
                console.log(this.squares[i]);

                continue;
            }
            result.push([j, i]);
        }
        
    }
    console.log('getAround!!')
    return result;
}
Mine.prototype.updateNum = function () {
    for (let i = 0; i < this.tr; i++) {
        for (let j = 0; j < this.td; j++) {
            if (this.squares[i][j].type == 'number') {
                continue;
            }
            else {
                let num = this.getAround(this.squares[i][j]);
                for (let k = 0; k < num.length; k++) {
                    concole.log(num[k][0]);
                    concole.log(num[k][1]);
                    this.squares[num[k][0]][num[k][1]].value += 1;
                }
            }
        }
    }
}


Mine.prototype.gameOver = function (clickTd) {
    for (let i = 0; i < this.tr; i++) {
        for (let j = 0; j < this.td; j++) {
            if (this.squares[i][j].type == 'mine') {
                this.tds[i][j].className = 'mine';
            }
            this.tds[i][j].onmousedown = null;
        }
    }
    if (clickTd) {
        clickTd.style.backgroundColor = 'red';
        alert("defeat");
    }
}
let getAllZero = function (mysquare) {
    let around = Mine.getAround(mysquare);
    for (let i = 0; i < around.length;i++) {
        let x = around[i][0];
        let y = around[i][1];
        Mine.tds[x][y].className = cl[Mine.squares[x][y].value];
        if (Mine.squares.value == 0) {
            if (!Mine.tds[x][y].check) {
                Mine.tds[x][y].check = true;
                getAllZero(Mine.squares[x][y]);
            }
        }
        else {
            Mine.tds[x][y].innerHTML = Mine.squares[x][y].value;
        }
    }
}

let arr = [
    [9, 9, 10],
    [16, 16, 40],
    [28, 28, 99]
]
mine = new Mine(9,9,10);
mine.init();
console.log(mine.squares[0][0].type);