var first = require('first');
var second = require('second');
var third = require('third');

var pageControl = [first, second, third];
var $page = $('.form');
//用于浏览器的默认返回功能
var lastHash;
var next, previous;
var lastIndex = 0;
var switcher = function(index, req){
	next = function(req){

		if(index < pageControl.length - 1){
			switcher(index + 1, req);
		//完成所有步骤，注册完成
		}else if(index ===  pageControl.length -1){
			alert('已经是最后一页');
		}
	}
	previous = function(req){
		if(index > 0){
			switcher(index - 1, req);
		}
	}

	//进行动画切换
	animate(
		$page.eq(lastIndex),
		$page.eq(index),
		function(){
			pageControl[index].wakeup(req || {}, next,previous);
			//留下任意历史纪录方便返回
			lastHash = location.hash;
			location.href= '#h' + ~~(Math.random() * 1E6)
			// scrollTo(0,0);
		}
	 );
	
	lastIndex = index;

}
$page.hide();
//初始化页面
switcher(lastIndex);
//绑定回退处理
addEventListener('hashchange', function(){
	if(location.hash === lastHash){
		previous();
	}
});


/**
* 动画函数
* @$from 将要离开的页面 
* @$to 将要进入的页面
* @callback 完成动画之后的回调函数
*/
function animate($from, $to, callback, dir){
	if( $from[0] == $to[0] ){
		$to.show();
		callback();	
		return;
	}
	$from.addClass('from_page');
	$to.addClass('to_page');
	$('.main').attr('class','main animate begin_animate');
	setTimeout(function(){
		$('.main').attr('class','main animate end_animate');
	}, 0 );
	setTimeout(function(){
		$from.removeClass('from_page').hide();
		$to.removeClass('to_page').show();
		callback();
	}, 350);
}










