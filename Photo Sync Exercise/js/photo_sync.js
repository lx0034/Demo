	(function(){

	var nextURL = null;

	/*
	*	对传入的数据按时间分组函数
	*/
	function group( photo ){
		var result = {};		//定义一个需要返回的字面量对象

		sort(photo,"time");		//按time属性进行排序

		//遍历数组内的每个值
		photo.forEach(function(item, index, array){

			//传入毫秒数，返回一个日期字符串（YYYY-MM-DD）
			var dateTime = getTrueTime(parseInt(item.time));

			if(dateTime in result){				//如果dateTime在返回的对象中存在

				result[dateTime].push(item);	//则将item添加进数组

			}else{								//如果dateTime在返回的对象中不存在

				result[dateTime] = [];			//则创建一个新数组
				result[dateTime].push(item);	//并将初始值添加进去

			}
		});

		return result;
	}


	/*
	*	将传入的毫秒值转换为YYYY-MM-DD的形式
	*/
	function getTrueTime(ms){
		var date = new Date(ms);
		var year = date.getFullYear(),
			month = date.getMonth() + 1,	//getMonth方法获得的值加一为当前月份
			day = date.getDate();

		var result = year + '-' + month + '-' + (day < 10 ? '0' + day : day);

		return result;
	}


	/*
	*	排序函数，对传入的数组，根据相应的name值进行排序
	*/
	function sort(arr,name){
		arr.sort(function(num1, num2){
			var pre = parseInt(num1[name]);
			var aft = parseInt(num2[name]);
			return aft - pre;
		});
	}


	/*
	*	封装ajax方法
	*/
	function Ajax(url, options, callback){

		var getXHR = (function(){			//惰性载入函数
			if(typeof XMLHttpRequest !== 'undefined'){
				return function(){
					return new XMLHttpRequest();	
				};
			}else if(typeof ActiveXObject !== 'undefined'){
				return function(){
					return new ActiveXObject('Microsoft XMLHTTP');
				};
			}else{
				return function(){
					throw new Error("No XHR object available");
				};
			}
		})();

		var xhr = getXHR();
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
					callback( JSON.parse(xhr.responseText) );
				}
			}
		};

		var param = ""; //请求参数。
	    //只有data存在，且为对象使才执行
	    var data = options.data ? options.data : -1; //缓存data
	    if (typeof (data) === "object") {
	        for (var key in data) { //请求参数拼接
	            if (data.hasOwnProperty(key)) {
	                param += key + "=" + data[key] + "&";
	            }
	        }
	        param.replace(/&$/, "");
	    } else {
	        param = "timestamp=" + new Date().getTime();
	    }

	    var type = options.type ? options.type.toUpperCase() : "GET";
	    if (type === "GET") {
	        xhr.open("GET", url + "?" + param, true);
	        xhr.send(null);
	    } else {
	        xhr.open("POST", url, true);
	        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	        xhr.send(param);
	    }
	}


	/*
	*	ajax方法回调函数
	*/
	function HandleAjax(data){
		var dataObj = group(data.photos);
		for(var attr in dataObj){

			//向渲染函数传入时间值和对应的图片数组
			renderDom(attr, dataObj[attr]);	

			//将下一页数据地址存放进外部变量，以便页面拖动到底部时获取
			nextURL = data.nextURL;

		}
	}


	/*
	*	DOM操作函数，在ajax回调函数中调用
	*/
	function renderDom(name, dateObj){
		var cFrag = document.createDocumentFragment(),
			cSection = document.createElement('section');
			cH3 = document.createElement('h3'),
			cFigure = document.createElement('figure');

		cH3.innerHTML = name;
		cSection.appendChild(cH3);

		//遍历某天对应的数组
		dateObj.forEach(function(item, index, array){
			var cImg = document.createElement('img');
			cImg.src = item.imageURL;
			cImg.alt = 'testImg';

			if(item.width > item.height){

				//图片宽度大于高度时，设置图片最大宽度为160px，高度auto
				cImg.classList.add('maxWidth');	

			}else if(item.width < item.height){

				//图片宽度小于高度时，设置图片最大高度为160px,宽度auto
				cImg.classList.add('maxHeight');

			}else{

				//图片快读等于高度时，设置图片宽度160px，高度160px
				cImg.classList.add('equal')

			}

			cFrag.appendChild(cImg);

			if( (index + 1) % 5 == 0 ){		//判断当前行图片是否超过5张
				var cBr = document.createElement('br');
				cFrag.appendChild(cBr);
			}

		});
		cFigure.appendChild(cFrag);
		cSection.appendChild(cFigure);
		document.body.appendChild(cSection);
	}


	/*
	*	函数节流：如果一个DOM事件触发过于频繁，则可以采用函数节流的方式，控制其触发次数，从而达到提高性能的目的
	*/
	function throttle(method, context){		//函数节流

		//清除上一次定时器
		clearTimeout(method.tId);

		//设置一个定时器，其延时时间即为事件监听函数触发频率
		method.tId = setTimeout(function(){
			method.call(context);
		},100);

	}


	/*
	*	scroll事件监听函数
	*/
	function HandleScroll(){
		if(nextURL){
			//数据预加载：当滚动高度距离页面底部小于300像素时，ajax获取nextURL数据内容并加载到页面底部
			//或者当页面滚动到底部时，加loading图标告知用户下一页数据正在请求
			if(document.body.offsetHeight - window.innerHeight - 300 < document.body.scrollTop){
				Ajax(nextURL, {type:'get',data:null}, HandleAjax);
			}
		}
	}


	/*
	*	绑定事件
	*/
	window.onscroll = function(){
		throttle(HandleScroll);
	};


	/*
	*	调用ajax方法（get方式、无参数）
	*/
	Ajax('http://photo-sync.herokuapp.com/photos', {type:"get",data:null}, HandleAjax);

	})();