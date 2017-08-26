//初始化banner
		function initBanner(){
			//获取图片的盒子对象
			var $ulDom = $("#banner_ul");
			//控制轮播的索引
			var index = 1;
			//获取宽度
			var w = $ulDom.find("li").eq(0).width();
			//动画执行的时间
			var timer = 2000;
			//定时器
			var bannerTimer = null;
			
			//附加元素收尾相加的元素
			var $first = $ulDom.find("li:first").clone();
			var $last= $ulDom.find("li:last").clone();
			//var $first = $ulDom.find("li").eq(0);
			//var $last= $ulDom.find("li").eq(length-1);
			$ulDom.append($first);
			$ulDom.prepend($last);
			//获取长度
			var length = $("#banner_ul").children().length;

			//下一张
			$("#next").click(function(){
				//清除动画
				clearInterval(bannerTimer);
				index++;
				if(index == length-1){
					$ulDom.css("left",0);
					index = 1;
				};
				$ulDom.stop(true,true).animate({"left":-1 * w * index });
				$("#bannerbox").find(".cyclebox li").eq(index-1).addClass("selected").siblings().removeClass("selected");
			}).mouseleave(function(){
				//离开的执行动画
				playBanner();
			}).mouseover(function(){
				clearInterval(bannerTimer);
			});
		
			//上一张
			$("#prev").click(function(){
				//清除动画
				clearInterval(bannerTimer);
				index--;
				if(index == 0){
					//最后一张
					index = length - 2;	
					$ulDom.stop(true,true).animate({"left":0},function(){
						//显示最后一个张图片
						$(this).css("left",-1 * w * index);
					});
				}else{
					$ulDom.stop(true,true).animate({"left":-1 * w * index});
				}

				$("banner_ul").find(".cyclebox li").eq(index-1).addClass("selected").siblings().removeClass("selected");
			}).mouseleave(function(){
				//离开的执行动画
				playBanner();
			}).mouseover(function(){
				clearInterval(bannerTimer);
			});


			/*小圆圈的绑定事件*/
			$("#bannerbox").find(".c_banner li").click(function(){
				clearInterval(bannerTimer);
				index = $(this).index()+1;
				$(this).addClass("selected").siblings().removeClass("selected");
				$ulDom.stop(true,true).animate({"left":-1 * w * index });
			}).mouseleave(function(){
				//离开的执行动画
				playBanner();
			}).mouseover(function(){
				clearInterval(bannerTimer);
			});

			//banner的定时器轮播
			function playBanner(){
				bannerTimer = setInterval(function(){
					$("#next").trigger("click");
				},timer);	
			};
			
			//执行轮播
			playBanner();
		};


		$(function(){
			//调用banner效果
			initBanner();
		});
			$(function(){

		// 按钮淡入淡出
		$(window).scroll(function(){
			if($(window).scrollTop() >= 100){
				$(".tz_top").fadeIn(500);
			} else {
				$(".tz_top").stop(true,true).fadeOut(500);
			}
		});
		
		// 回到顶部
		$(".tz_top").click(function(){
			$("html,body").animate({
				scrollTop:0
			},1000);
		});
	});