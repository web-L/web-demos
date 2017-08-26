$(function(){

var $top = $(".top");
var $step = $("#content .main ol li div.main_step");
var $seidlLi = $(".slide ul li");
var steplength = $step.length;


$(window).scroll(function(){//当页面滚动时触发
	var scrllTop = $(document).scrollTop();
	//导航吸顶
	scrllTop > 150 ? $top.fadeIn() : $top.fadeOut();

	var $index = 0;
	//小圈圈悬浮
	$step.each(function( i ){
		var a = $(this).offset().top - $(document).scrollTop();
		if( a < ( 42+32*i ) ){
			$seidlLi.eq( i ).show();
			$index = i+1;
			
		}else{
			$seidlLi.eq( i ).hide();
		} 
	});
	//改变圈圈背景
	$step.eq( $index ).addClass("on").parent().siblings().find(".main_step").removeClass("on");
	$index && $seidlLi.eq( $index - 1 ).addClass("on").siblings().removeClass("on");
});

//点击跳转
$seidlLi.click(function(){
	var $index = $(this).index();
	$("body,html").animate({
		scrollTop : $step.eq( $index ).offset().top
	},500);
}).hover(function(){
	$(this).addClass("hover");
},function(){
	$(this).removeClass("hover");
});

});