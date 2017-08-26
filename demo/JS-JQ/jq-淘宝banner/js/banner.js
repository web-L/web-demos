function banner( BJson ){
	var $banner = BJson.banner;
	var $btn = BJson.btn;
	var $TabLi = BJson.tabLi;
	var $Ul = BJson.Ul;
	var $Time = BJson.time || 1000;
	
	var auto;
	if( BJson.auto ){
		
		if( BJson.auto ){
			auto = BJson.auto;
		}else{
			auto = BJson.auto;
		}
	};

	var speed = BJson.speed || 500;

	var $Liwidth = $Ul.find("li").width();
	var $index = 0;
	var nowTime = new Date();
	var $tabLi_length  = $TabLi.length;
	var Time = null;

	$TabLi.click(function(){
		console.log(1)
		$index = $(this).index();
		$(this).addClass("li").siblings().removeClass("li");
		$Ul.stop().animate({
			"marginLeft" : -$Liwidth * ($index+1) + "px"
		},speed)
	});

	$banner.hover(function(){
		$btn.fadeIn();
		if( auto ){
			clearInterval( Time )
		};
	},function(){
		$btn.fadeOut();
		if( auto ){
			auto();
		}
	});
		
	$btn.children().click(function(){
		if( new Date() - nowTime > speed ){
			nowTime = new Date();

			var i = $(this).index();

			i ? $index++ : $index--;
			
			banner();
		};
	});

	if( auto ){
		function auto(){
			Time = setInterval(function(){
				$index++;
				banner();
			},$Time)
		};
		auto();
	}
	
	function banner(){
		var li_index = $index;
		if( li_index >= $tabLi_length ){
			
			li_index = 0;
		}else if( li_index < 0 ){
			li_index = $tabLi_length-1;
		}

		$TabLi.eq(li_index).addClass("li").siblings().removeClass("li");

		$Ul.stop().animate({
			"marginLeft" : -$Liwidth * ( $index + 1 ) + "px"
		},speed,function(){
			if( $index >= $tabLi_length ){
				$Ul.css("marginLeft" , -$Liwidth+"px");
				$index = 0;
			}else if( $index < 0 ){
				$Ul.css("marginLeft" , -$Liwidth*( $tabLi_length )+"px");
				$index = $tabLi_length-1
			}
		});	
	};
};