
Object.prototype.log = function () {
    console.log(this);
}

function Mine(tr, td, mineNum) {
    this.tr = tr;
    this.td = td;
    this.mineNum = mineNum;
    this.squares = [];
    this.tds = [];
    this.surplusMine = mineNum;//剩余雷
    this.mark = false;
    this.parent = document.querySelector('.gamebox');
}
Mine.log;

Mine.prototype.randomNum = function () {
    let square = new Array(parseInt(this.tr * this.td));
    for (let i = 0; i < square.length; i++) {
        square[i] = i;
    }
    square.sort(function () {
        return 0.5 - Math.random();
    });
    return square.slice(0, this.mineNum);

}

Mine.prototype.init = function () {
    let Rnposition = this.randomNum();
    let n = 0;
    for (let i = 0; i < this.tr; i++) {
        this.squares[i] = [];
        for (let j = 0; j < this.td; j++) {
            if (Rnposition.indexOf(++n) != -1) {
                this.squares[i][j] = {
                    type: 'mine',
                    x: j,
                    y: i
                }
            } else {
                this.squares[i][j] = {
                    type: 'number',
                    x: j,
                    y: i,
                    value: 0
                }
            }
        }
    }
    this.updateNum();
    this.creatDom();
    this.parent.oncontextmenu = function () {
        return false;
    }

    this.mineNumDom = document.querySelector('mineNum');
    this.mineNumDom.innerHTML = this.surplusMine;
}

Mine.prototype.creatDom = function () {
    let This = this;
    let table = document.createElement("table");

    for (let i = 0; i < this.tr; i++) {
        let domTr = document.createElement("tr");
        this.tds[i] = [];
        for (let j = 0; j < this.td; j++) {
            let domTd = document.createElement('td');
            this.tds[i][j] = domTd;
            domTd.pos = [i, j];
            domTd.onmousedown = function () {
                //This.play(e, this);
            }
            domTr.appendChild(DomTd);
        }
        table.appendChild(domTr);
    }
    this.parent.innerHTML = '';
    this.parent.appendChild(table);
}

Mine.prototype.getAround = function (square) {
    let x = square.x;
    let y = square.y;
    let result = [];
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (
                i < 0 ||
                j < 0 ||
                i > this.td - 1 ||
                j > this.tr - 1 ||
                (i == x && j == y) ||
                this.squares[j][i].type == 'mine'
            ) {
                continue;
            }
            result.push([j, i]);
        }
    }
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
                    this.squares[num[k][0]][num[k][1]].value += 1;

                }
            }
        }
    }
}

mine.prototype.play = function (e, obj) {
    let This = this;
    if (e.which == 1 && obj.className != 'flag') {
        let curSquare = this.squares[obj.pos[0]][obj.pos[1]];
        let cl = ['zero', 'one', 'two', 'three', 'four', 'six', 'seven', 'eight'];
        if (curSquare.type == 'number') {
            obj.innerHTML = curSquare.value;
            obj.className = cl[curSquare.value];
            if (curSquare.value == 0) {
                obj.innerHTML = '';
                function getAllZero(square) {
                    let around = This.getAround(square);
                    for (let i = 0; i < around.length; i++) {
                        let x = around[i][0];
                        let y = around[i][1];
                        This.tds[x][y].className = cl[This.squares[x][y].value];
                        if (This.squares[x][y].value == 0) {
                            if (!This.tds[x][y].check) {
                                This.tds[x][y].check = true;
                                getAllZero(This.squares[x][y]);
                            }
                        }
                        else {
                            This.tds[x][y].innerHTML = This.squares[x][y].value;
                        }
                    }
                }
                getAllZero(curSquare);
            }
        }
        else {
            this.gameOver(obj);
        }
    }
    if (e.which == 3) {
        if (obj.className && obj.className != 'flag') {
            return;
        }
        obj.className = obj.className == 'flag' ? '' : 'flag';
        if (this.squares[obj.pos[0]][obj.pos[1]].type == 'mine') {
            this.mark = true;
            if (obj.getAttribute('data') != 1) {
                arr3.push(this.mark);
                obj.setAttribute('data', 1);
            }
        }
        else {
            this.mark = false;
            console.log(obj.getAttribute('data'));
            if (obj.getAttribute('data') != 1) {
                arr3.push(this.mark);
                obj.setAttribute('data', 1);
            }
        }
        if (obj.className == 'flag') {
            this.mineNumDom.innerHTML = --this.surplusMine;
        }
        else {
            this.mineNumDom.innerHTML = ++this.surplusMine;
        }
        if (this.surplusMine == 0) {
            let a3 = arr3.every(function (v) {
                return v == true;
            })
            console.log(a3);
            if (a3) {
                alert('恭喜');
            }
            else {
                alert('defeat');
                this.gameOver();
            }
        }
    }
};

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
        alert('defeat');
    }
}


let arr = [
    [9, 9, 10],
    [16, 16, 40],
    [28, 28, 99]
]
mine = new Mine(arr[0]);
mine.init();

/*
let btn = document.querySelector('.level button');
let min = null;
let Ln = 0;


window.addEventListener("click", function () {
    btn.className = '';
    this.className = 'active';
    mine = new Mine(arr[0]);
    mine.init();
    Ln = i;
})/*

/*for (let i = 0; i < btn.length - 1; i++) {
    (function (i) {
        btn[i].onclick = function (i) {
            btn[Ln].className = '';
            this.className = 'active';
            mine = new Mine(arr[i]);
            mine.init();
            Ln = i;
            btn[3].onclick = (function (i) {
                mine = new Mine(arr[Ln]);
                mine.init();
                arr3 = [];
            }
            )}
    }
        (i));
}*/


    //btn[0].onclick();
