$(function(){
	$('ul li').hover(function(){
		
		$(this).children("p").stop().animate({bottom:"-74px"},300);
	},function(){
		$(this).children("p").stop().animate({bottom:"0px"},300);
	})

	$('.button').click(function(  ){
		$(this).fadeOut(100);
		$('.web').fadeIn(2000);

	})

	$('.wrap').click(function(  ){
		$('.button').fadeIn(2000);
		$('.web').fadeOut();	
	});
		
	$('ul li').click(function(){
			var i=$(this).index();
			$('.wrap').css({"background":'url(images/'+i+'.jpg)',"background-size":"100% 100%"});
	})
});