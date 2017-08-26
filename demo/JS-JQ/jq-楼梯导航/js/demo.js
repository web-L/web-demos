$(function(){
	//导航定位
	(function(){
		var $nav = $("#nav");

		$(window).resize(function(){
			nav();
		});
		
		function nav(){
			var w =  $("body").width();
			if( w < 1110 ){
				$nav.css({
					right:0,
					marginRight:0,
				});
			}else{
				$nav.css({
					top: 50+"%",
					right: 50+"%",
					marginRight: -550+"px",
				})
			}
		};
		nav();
	})();

	//导航效果
	(function(){
		
		var $navLi = $("#nav ul li");
		var $part = $(".box div.part");
		var $blue = $("#nav ul li.hide");
		var $partlength = $part.length; 
		var $index = 0;
		var off = true;

		$navLi.click(function(){
			off = false;
			$index = $(this).index();
			$(this).addClass("on").siblings().removeClass("on");
			var offsetTop = $part.eq($index).offset().top;
			
			$("body,html").stop().animate({
				scrollTop : offsetTop
			},300,function(){
				off = true;
			});
			var This = this;

			$blue.show().stop().animate({
				top : $(This).position().top + "px"
			},500,function(){
				$(this).hide();
			});
		});
		//当页面滚动时触发
		$(window).scroll(function(){
			if( off ){
				var scrollTop = $(document).scrollTop();
				
				for( var i = 0 ; i<$partlength ;i++  ){
					if( scrollTop <  $part.eq( i ).offset().top ){
						$index = i - 1;
						if( $index < 0 ){
							$index = 0;
							$navLi.removeClass("on");
						}else{
							$navLi.eq($index).addClass("on").siblings().removeClass("on");
							
							$blue.show().stop().animate({
								top : $navLi.eq($index).position().top + "px"
							},30,function(){
								$(this).hide();
							});
						}
						break;
					}
				}
			}
		});
		
	})();
})
