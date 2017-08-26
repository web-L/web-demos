$(".con ul li").hover(function(){
	$(this).children(".shade").stop().animate({bottom:"0px"},300);
	$(this).siblings().children(".shade").stop().animate({bottom:"-50px"},300);
});