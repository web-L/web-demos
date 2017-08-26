$('.main .nav li').hover(function(){
	var i=$(this).index();
	$('.main .con li').eq( i ).show().siblings().hide();
	$(".main .nav li").eq( i ).addClass("hover").siblings().removeClass("hover");
})	