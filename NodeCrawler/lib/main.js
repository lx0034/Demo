// var cheerio = require('cheerio');
// var nodemailer = require('nodemailer');
var http = require('http');
var request = require('request');

// var url = 'http://www.lagou.com/jobs/positionAjax.json?px=new&needAddtionalResult=false';
// http.get(url,function(res){
// 	var source = '';
// 	res.on('data',function(data){
// 		source += data;
// 	});
// 	res.on('end',function(){
// 		console.log(source);
// 		var $ = cheerio.load(source);
// 	});
// });

// http.createServer(function(){

// });
var options = {
	url:'http://www.lagou.com/jobs/positionAjax.json?px=new&needAddtionalResult=false',

	headers:{
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Content-Length':20,
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Cache-Control':'no-cache'
	},

	form:{
		first:'false',
		pn:'2',
		kd:''
	}
};
http.createServer(function(req,res){

	request.post(options, function(error, response, body){
		if(!error && response.statusCode == 200){
			console.log(body);
		}else{
			console.log(response.statusCode);
		}
	});

}).listen(8888);
	


