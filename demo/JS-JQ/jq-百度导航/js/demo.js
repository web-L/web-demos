$(function(){
	var a = 0; //当前点击的点
	var b = 1; //先前最后一次点击的点
	$(".nav ul li").click(function(){
			$(this).addClass("bg").siblings().removeClass("bg");
			a = $(this).index();
			if( a < b )
		{
			$(".con img").eq( a ).animate({top:"0px"},300);
			$(".con img").eq( b ).animate({top:"315px"},300);
			b = a; //动态修改最后一次点击的点 p的值
		}
		else if( a > b)
		{ 
			$(".con img").eq(a).css("top","315px");
			$(".con img").eq(a).animate({top:"0px"},300);
			$(".con img").eq(b).animate({top:"-315px"},300);
			b = a;
		}
	})
});