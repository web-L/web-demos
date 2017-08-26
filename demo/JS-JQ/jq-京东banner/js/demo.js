$(function(){
			
	var $tabLi = $('#banner .tab li');
	var $picLi = $('#banner .pic li');
	var $btn = $('#banner .btn');
	var $btnDiv = $('#banner .btn div');
	var $banner = $('#banner');
	var index = 0;
	var timer;

	$tabLi.hover(function(){
		index = $(this).index();
		fn();
	});

	$banner.hover(function(){
		$btn.show();
		clearInterval(timer);
	},function(){
		$btn.hide();
		auto();
	});

	$btnDiv.click(function(){
		var i = $(this).index();
		if ( i )
		{
			index ++;
			index %= $tabLi.length;
		}
		else
		{
			index --;
			if(index<0)index = $tabLi.length-1;
		}
		fn();
	}).mousedown(function(){
		return false;
	});
	
	auto();
	function auto(){
		timer = setInterval(function(){
			index ++;
			index %= $tabLi.length;
			fn();
		},5000);
	}
	function fn(){
		$tabLi.eq(index).addClass('on').siblings().removeClass('on');
		$picLi.eq(index).stop(true).fadeIn().siblings().stop(true).fadeOut();
	}
});