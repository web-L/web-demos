$(function(){
var $next = $("#next");
var $prev = $("#prev");
var $showUl = $("#show ul");
var $index = 0;
var Time  = new Date();
var time = null;
var $wrap = $("#wrap");
//右按钮
$next.click(function(){
	if( new Date() - Time > 500 ){
		Time = new Date();
		$index++;
		cut();
	}
	
});	
//左按钮
$prev.click(function(){
	if( new Date() - Time > 500 ){
		Time = new Date();
		if( $index == 0 ){
			$showUl.css("marginLeft" , -152 * 4 + "px");
			$index = 4;
		}
		$index--;
		cut();
	}
});

function cut(){
	$showUl.animate({
		marginLeft : -152*$index+"px"
	},500,function(){
		if( $index == 4 ){
			$showUl.css("marginLeft" , "0");
			$index = 0;
		}
	});
};
	
$wrap.hover(function(){
	clearInterval( time );
},function(){
	 auto();
});
//轮播
function auto(){
	time = setInterval(function(){
		$index++;
		cut();
	},3000);
};
 auto();
});