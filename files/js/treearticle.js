(function(){
	$.getJSON("files/data/articleslist.json",function(data){
		var articles = data['articles'];
		var $ul = $('#articles');
		var articlesHTML="";
		articles.forEach(function(item,index,array){
			articlesHTML += "<li><a href='"+ item['url'] + "' style='text-decoration:none;' target='_blank'>" + item['name'] + "</a></li><br/>";
		});
		$ul.html(articlesHTML);
	 });
})();
