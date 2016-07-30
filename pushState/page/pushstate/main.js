console.log( $('#main').html() );

var oDiv = document.getElementById('main');
var oBtn = document.getElementsByTagName('button')[0];

/*
产生随机数
 */
function randomNum(all, num) {
    var arr = [];
    for(var i=0; i < num; i++){
        arr.push( Math.floor( Math.random()*all ) );
    }
    return arr;
}

/*
替换当前页面history对象下存储的对象
 */
history.replaceState({
    name: 'lixiong',
    age: 23,
    height: 174,
    weight: 53
},'','');

/*
点击按钮时替换div内的随机数
并把此随机数添加进跳转后页面的history对象下
 */
oBtn.onclick = function () {
    var num = randomNum(30, 8);
    oDiv.innerHTML = num;
    history.pushState(num,'','');
};

/*
当历史记录改变时触发事件
 */
window.onpopstate = function () {
    var str = '';
    console.log(history);
    if(history.state.name) {
        str = history.state.name;
        str += history.state.age;
        str += history.state.height;
        str += history.state.weight;
        oDiv.innerHTML = str;
    }else {
        oDiv.innerHTML = history.state;
    }
    
    
    
}



