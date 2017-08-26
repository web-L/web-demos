$('.box .con ul li').hover(function(){
	var i=$(this).index();
	$(".box .con ul li").eq(i).addClass("hover").siblings().removeClass("hover");
	$('.box .con').css("background",'url(images/'+i+'.jpg)');
})