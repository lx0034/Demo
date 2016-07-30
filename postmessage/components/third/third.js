var $container = exports.$container = $('.form_third');

/***
* 唤醒当前页面
*
*/
var is_step_initialized = false;
var forward,back;
exports.wakeup = function(params, next, previous){
	forward = function(){
		next();
	}
	back = function(){
		previous();
	}
	if(is_step_initialized === false){
		is_step_initialized = true;
		//页面初始化
		step_initialize();
	
	}
}
/**
* 只执行一次
*
*
*/
function step_initialize(){


	$container.on('click', '.next,.prev', function(e){
		switch($(e.currentTarget).attr('class')){
			case 'prev':
				back();
			break;
			case 'next':
				forward();
			break;
		}
	});

}
