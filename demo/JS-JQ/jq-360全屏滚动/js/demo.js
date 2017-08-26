var $navLi = $("#header div.nav ul li");
var $nav = $("#header div.nav");
var $border = $("#border");
var $slideuLi = $("#slideu ul li");
var $index = 0;
var Time = new Date();

//导航
$navLi.hover(function(){
	var w = $(this).width();
	var left = $(this).position().left;
	$(this).addClass("on").siblings().removeClass("on");
	$border.stop().animate({
		width : w + 28 + "px",
		left : left + -10 + "px"
	},200);
});

$nav.mouseleave(function(){
	$navLi.eq(0).addClass("on").siblings().removeClass("on");
	$border.stop().animate({
		width : "58px",
		left : "-10px"
	},200);
});


//按钮点击滚动
$slideuLi.click(function(){
	$index = $(this).index();
	sheel();
});


$(document).mousewheel(function( e , d ){//滚动事件
	if( new Date - Time > 500 ){
		Time = new Date();
		if( d < 0 ){
			$index++;
			if( $index > $slideuLi.length-1 ){
				$index = $slideuLi.length
			}
		}else{
			$index--;
			if( $index < 0 ){
				$index = 0;
			}
		}
		sheel();
	}
});
//当窗口发生改变触发事件
$(window).resize(function(){
	var widnowH = $(window).height();
	$(document).scrollTop( $index * widnowH );
});

function sheel(){
	var widnowH = $(window).height();
	$slideuLi.eq($index).addClass("on").siblings().removeClass("on");
	$("body,html").stop().animate({
		scrollTop : $index * widnowH
	},500);
}

window.onload = function(){
	setTimeout(function(){
		$(document).scrollTop(0);
	},10)
	
};