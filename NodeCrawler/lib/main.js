var cheerio = require('cheerio');
var nodemailer = require('nodemailer');
var http = require('http');

var url = 'http://www.lx0034.me';
http.get(url,function(res){
	var source = '';
	res.on('data',function(data){
		source += data;
	});
	res.on('end',function(){
		// console.log(source);
		var $ = cheerio.load(source);
		$
	});
});
