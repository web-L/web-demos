$(function(){
	var a = 0;
	var b = 0;
	var Play = null;
	var $img = $("#pic img");
	var $hov = $(".hov");
	var $butLi = $("#but li");
	var $Lilength = $butLi.length;

	$hov.hover(function(){
		$(this).children(".hid").css("z-index","2");
		$(this).children("span").show();
		$(this).children(".hid").animate({height:"200px"},200);
	},function(){
		$(this).children(".hid").css("z-index","1");
		$(this).children("span").hide();
		$(this).children(".hid").stop(true).delay(200).animate({height:"0px"},200);
	});

	
	$butLi.click(function(){
		$(this).addClass("cli").siblings().removeClass("cli");
		a = $(this).index();
		if( a > b){
			$img.eq( a ).css("left","682px").show();
			$img.eq(a).stop(true).animate({left:"0px"},300);
			$img.eq(b).stop(true).animate({left:"-682px"},300,function(){
				$(this).hide().css("left","0");
			});
		}else if(a < b){
			$img.eq(a).css("left","-682px").show();
			$img.eq(a).stop(true).animate({left:"0px"},300);
			$img.eq(b).stop(true).animate({left:"682px"},300,function(){
				$(this).hide().css("left","0");
			});
		}
		b = a;
	});

	$("#right").click(function(){
		a++;
		a %= $Lilength;
		banner();
		
	});

	$("#left").click(function(){
		a--;
		if( a < 0 ){ a = $Lilength-1 };
		banner();
		
	});

	$("#slider").hover(function(){
		clearInterval(Play);
	},function(){
			auto();
	});
	
	function banner(){
		$butLi.eq(a).addClass("cli").siblings().removeClass("cli");
		$("#pic img").eq(a).stop(true).fadeIn().siblings().stop(true).fadeOut();
	}

	function auto(){
		Play = setInterval(function(){
			a++;
			a %= $butLi.length;
			banner();
		},2000);
		
	};
	auto();
});