setTimeout(function(){
	$(document).scrollTop(0);
},10)
			
$(function(){
	var W = $(window).height();
	var $Li = $(".nav ul li");
	var $index = 0
	var Time = new Date();
	var $logo = $(".logo");
	var $p1_2Top = $(".p1_2");
	var $part = $(".wrap div.part");

	$logo.addClass("logoleft");
	$p1_2Top.addClass("p1_2Top");
	
	//当窗口发生改变的时候触发事件
	$(window).resize(function(){
		W = $("body").height();
		$(document).scrollTop( $index * W );
	});
	//滚动事件
	$(document).mousewheel(function( ev , date ){//date : 参数向下滚动 负值 向上滚正值
		aimate();
		if( new Date() - Time > 800 ){
			Time = new Date();

			date < 0 ? $index ++ : $index--;//判断往下滚动 还是 往上滚

			if( $index > 6 ){ $index = 6 };
			if( $index < 0){ $index = 0 };

			roll();
		}

		
	});

	//按钮
	$Li.click(function(){
		aimate();
		$index = $(this).index();
		roll();
	});


	function roll(){
		$Li.eq($index).addClass("on").siblings().removeClass("on");
		$("html,body").stop().animate({
				scrollTop : W * $index + "px"
			},1000,function(){
				$part.eq($index).addClass("on");
		});
	};

	function aimate(){
		$part.eq($index).removeClass("on");
	}
	
})