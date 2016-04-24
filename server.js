var cheerio = require('cheerio');
var request = require('request');

var http = require('http');
var fs = require('fs');
var ejs = require('ejs');



http.createServer(function(req,res){
	fs.readFile('ttt.ejs','utf8',function(error,data){
		var url = "http://web.humoruniv.com/board/humor/list.html?table=pds&st=week";
		request(url, function(error, response, html){
			if (error) {throw error};
			
			//console.log (html);
			
			var $ = cheerio.load(html);
			
			var targetTables = $("table");
			var targetTable = targetTables[3];	
			var targetTr = targetTable.children[5]; 	
			
			var lnk = "http://web.humoruniv.com/board/humor/"+targetTr.children[3].children[1].attribs["href"];	
			console.log(lnk);
			var title = targetTr.children[3].children[1].children[0].data;
			console.log(title);
			var imgSRC = targetTr.children[1].children[1].children[0].attribs["src"];
			console.log(imgSRC);
			res.writeHead(200,{'Content-Type':'text/html'});
			res.end(ejs.render(data,{
				lnk : lnk,
				title : title,
				imgSRC : imgSRC
			}));
		});
	});
}).listen(52273,function(){
	console.log("server running");
});