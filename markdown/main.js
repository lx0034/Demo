(function(){
	var oMain = document.getElementById('main');

	var oSec = document.getElementsByTagName('section');

	oSec[0].addEventListener('keyup',function(){
		transform(oSec[0].innerHTML);
		oSec[1].innerHTML = oSec[0].innerHTML;

	},false);

	function transform(str){
		var Exp = /#(\w|\d+)/g;
		console.log(Exp.exec(str));
		if(Exp.exec(str)[1]){
			
		}
	}

})();