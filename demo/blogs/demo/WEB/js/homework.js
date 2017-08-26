$(function(){
	$("#nav ul li").click(function(e){
		e.stopPropagation();
		$(this).children("ul").slideToggle().parent()
			.siblings().children("ul").slideUp();
		$(this).children("h3").css({"opacity":0.8,"color":"#fff"}).parent()
			.siblings().children("h3").css({"opacity":1,"color":"#fff"});
	});
})