require.config({
	path: {

	}
});
require(['B.js'],function(B){
	alert(B.a);
	alert(B.c);
});