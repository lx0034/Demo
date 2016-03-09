window.onload = function(){
		var oUl = document.getElementById('list1');
		var oCss = document.getElementById('css');
		var oOl = document.getElementById('list2');
		var aBtn = oOl.getElementsByTagName('li');
		var aLi = oUl.getElementsByTagName('li');
		var liwidth = 50;
		var num = oUl.offsetWidth/liwidth;
		var ipic = '';
		var html = '';
		var icss = '';
		var iNow = 0;
		var zIndex = 0;
		for(var i=0;i<num;i++){
			i>num/2?zIndex--:zIndex++;
			ipic += '<li><a href=""></a><a href=""></a><a href=""></a><a href=""></a><span></span><span></span></li>'
			icss += '#list1>li:nth-of-type('+(i+1)+')>a{background-position:-'+(i*liwidth)+'px 0;}'
			icss += '#list1>li:nth-of-type('+(i+1)+'){z-index:'+ zIndex +'}'
		}
		oUl.innerHTML = ipic;
		oCss.innerHTML += icss;
		for(var i=0;i<aBtn.length;i++){
			(function(a){
				aBtn[a].onclick = function(){
					for(var i=0;i<aLi.length;i++){
						aLi[i].style.transition = '0.5s '+(i*50)+'ms';
						aLi[i].style.WebkitTransform = 'rotateX(-'+a*90+'deg)';
					}
					this.className = 'action';
					aBtn[iNow].className = '';
					iNow = a;
				};
			})(i)
		}
	}