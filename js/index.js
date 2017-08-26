//布局
$(function(){
	var $main = $("#main");
	var linum = demoArr.length;//li 个数 
	var timer1 , timer2;

	init();
	function init(){//初始化
		for( var i = 0;i<linum;i++ ){
			var $li = $(
				"<li><P class='title'>"+ demoArr[i].title +"</p><p class='author'>"+  demoArr[0].author +"</p><p class='time'>"+ demoArr[i].date +"</p></li>"
			);
			//初始乱序
			var x = ( Math.random()-0.5 )*5000;
			var y = ( Math.random()-0.5 )*5000;
			var z = ( Math.random()-0.5 )*5000;
			$li.css({
				"-ms-transform" : "translate3d("+ x +"px,"+ y +"px,"+ z +"px)",
				"-moz-transform" : "translate3d("+ x +"px,"+ y +"px,"+ z +"px)",
				"-webkit-transform" : "translate3d("+ x +"px,"+ y +"px,"+ z +"px)",
				"-o-transform" : "translate3d("+ x +"px,"+ y +"px,"+ z +"px)"

			});
			$main.append($li);
		};
		setTimeout(function(){
			grid( );
			$("#styleBtn").css({
				transform : "scale(1)",
				opacity : 1
			});
		}, 500 );

		$("#styleBtn li").click(function(){
			var $index = $(this).index();
			switch( $index ){
				case 0:
					table()
					break;
				case 1:
					sphere()
					break;
				case 2:
					heilx();
					break;
				case 3:
					grid( );
					break;
				case 4:
					burst();
					break;
			}
		});
	};	
	//爆炸 布局
	function burst(){
		var $li = $("#main li");
		$li.each(function( i ){
			var x = ( Math.random()-0.5 )*80;
			var y = ( Math.random()-0.5 )*80;
			var z = ( Math.random()-0.5 )*80;
			$(this).css({
				"transform" : "translate3d("+ (i * x) +"px,"+ ( i*y ) +"px,"+ ( i*z ) +"px)",
				"transition":"4s cubic-bezier(1,-0.46, 0, 3.5)"
			});
		});
		
	}

	//方块 布局
	function grid( ){
		var tx = 300;//水平间隔
		var ty = 300;//垂直间隔
		var tz = 500;
		var firstX = -2*tx;//第一个li水平位置
		var firstY = -2*ty;//第一个li垂直位置
		var firstZ = -2*tz;//第一个Z轴偏移量
		$("#main li").each(function( i ){
			var ix = (i % 25 ) % 5;
			var iy = parseInt((i % 25 ) / 5 );
			var iz =parseInt(i / 25 )
			$(this).css({
				"transform" : "translate3d("+( firstX + ix * tx )+"px,"+ (firstY + iy * ty )+"px,"+ (firstZ + iz * tz) +"px)"
			});
		});
		
	};
	//螺旋 布局
	function heilx(){
		var roY = 10 , ty = 10;
		var midli = Math.floor( $("#main li").length / 2 );
		var firstty = -10 * midli ;

		$("#main li").each(function( i ){
			$(this).css({
				"transform" : "rotateY("+ 14 * i +"deg) translateY( "+ ( firstty + ty * i ) +"px ) translateZ(1000px)"
			})
		});
	};
	//球体 布局
	function sphere(){
		var arr = [1,6,13,15,18,23,28,25,23,19,15,12,6,1];//控球体的排列
		var roX = 180/arr.length;

		var fisrtRoX = 90;
		$('#main li').each(function( j ){
			var sum = 0;
			var index , num;
			for ( var i = 0 ; i<arr.length ; i++ ){
				
				sum += arr[i];

				if ( sum >= j+1 ){
					index = i;

					num = arr[i] - ( sum-j );

					break;
				}
			}
			var roY = 360/arr[index];

			var x = index % 2 ? fisrtRoX + index*roX : fisrtRoX - index*roX;

			var y = num * roY;
			var z = 0;
			if ( x > 90 && x < 270 ){
				z = 180;
			}
			$(this).css({
				"transform" : 'rotateY('+y+'deg) rotateX('+x+'deg) rotateZ('+z+'deg) translateZ(800px)'
			});
		});
		$('#main li:last').css({
			"transform" : "rotateY(0deg) rotateX(270.143deg) rotateZ(180deg) translateZ(800px)"
		})
	};
	//网格 布局
	function table(){
		
		var tX = 160 , tY = 200;

		var firstX = -9*tX + 60;

		var firstY = -4*tY;

		var arr = [
			{x:firstX,y:firstY},
			{x:firstX+17*tX,y:firstY},
			{x:firstX , y:firstY+tY },
			{x:firstX+tX , y:firstY+tY},
			{x:firstX+12*tX , y:firstY+tY },
			{x:firstX+13*tX , y:firstY+tY },
			{x:firstX+14*tX , y:firstY+tY },
			{x:firstX+15*tX , y:firstY+tY },
			{x:firstX+16*tX , y:firstY+tY },
			{x:firstX+17*tX , y:firstY+tY },
			{x:firstX , y:firstY+tY*2 },
			{x:firstX+tX , y:firstY+tY*2},
			{x:firstX+12*tX , y:firstY+tY*2 },
			{x:firstX+13*tX , y:firstY+tY*2 },
			{x:firstX+14*tX , y:firstY+tY*2 },
			{x:firstX+15*tX , y:firstY+tY*2 },
			{x:firstX+16*tX , y:firstY+tY*2 },
			{x:firstX+17*tX , y:firstY+tY*2 }
		];

		$('#main li').each(function(i){
			var x , y;
			if ( i < 18 ){
				x = arr[i].x;
				y = arr[i].y;
			}else{
				var iX = ( i+18 ) % 18;
				var iY = parseInt(( i+18 )/18) + 1;
				x = firstX+iX*tX;
				y = firstY+iY*tY;
			}
			$(this).css({
				transform : 'translate('+(x*1.2)+'px,'+y+'px)'
			});
		});

	};

	//拖拽
	(function(){
			var nowX , lastX , minusX = 0 , nowY , lastY , minusY = 0;
				
			var roY = 0 , roX = 0 , tz = -1000;

			$(document).mousedown(function( ev ){//鼠标按下事件
				
				ev = ev || window.event;
				lastX = ev.clientX;
				lastY = ev.clientY;
				clearInterval( timer1 );
				$(this).on('mousemove',function(ev){//鼠标移动事件
					ev = ev || window.event; //ev 事件对象 存放事件的相关信息

					nowX = ev.clientX;  // ev.clientX  clientX属性存放鼠标x坐标
					nowY = ev.clientY;

					minusX = nowX - lastX;  // 两者差值
					minusY = nowY - lastY;
					
					roY += minusX*0.2;
					roX -= minusY*0.2;
					
					$('#main').css({
						'transform' : 'translateZ('+ tz +'px) rotateX('+  roX +'deg) rotateY('+ roY  +'deg)',
						'-webkit-transform' : 'translateZ('+ tz +'px) rotateX('+  roX +'deg) rotateY('+ roY  +'deg)',
						'-moz-transform' : 'translateZ('+ tz +'px) rotateX('+  roX +'deg) rotateY('+ roY  +'deg)',
						'-ms-transform' : 'translateZ('+ tz +'px) rotateX('+  roX +'deg) rotateY('+ roY  +'deg)',
						'-o-transform' : 'translateZ('+ tz +'px) rotateX('+  roX +'deg) rotateY('+ roY  +'deg)',
					})

					lastX = nowX; // 存放前一点的x坐标
					lastY = nowY;
				});

			}).mouseup(function(){//鼠标抬起事件
					$(this).off('mousemove');
					//鼠标抬起后缓冲
					timer1 = setInterval(function(){
						minusX *= 0.95;//缓冲速度
						minusY *= 0.95;
						if ( Math.abs(minusX) < 0.5 && Math.abs(minusY) < 0.5 )
							clearInterval( timer1 );
						roY += minusX * 0.2;
						roX -= minusY * 0.2;
						$('#main').css({
							'transform' : 'translateZ('+ tz +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
						})
					} , 13)
				}).mousewheel(function( e , d){//滚轮事件
					clearInterval( timer2 );
					tz += d * 100;// 滚动速度
					tz = Math.min( 1000 , tz );//最大值
					tz = Math.max( -8000 , tz )//最小值
					$('#main').css({
						'transform' : 'translateZ('+ tz +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)',
						'-ms-transform' : 'translateZ('+ tz +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)',
						'-moz-transform' : 'translateZ('+ tz +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)',
						'-webkit-transform' : 'translateZ('+ tz +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)',
						'-o-transform' : 'translateZ('+ tz +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
					})
					//滚轮缓冲
					timer2 = setInterval(function(){
						d *= 0.85;
						
						if( Math.abs( d ) < 0.01 ){
							clearInterval( timer2 );
						}
						tz += d * 100;// 滚动速度
						tz = Math.min( 1000 , tz );//最大值
						tz = Math.max( -8000 , tz )//最小值
						$('#main').css({
							'transform' : 'translateZ('+ tz +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)',
							'-ms-transform' : 'translateZ('+ tz +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)',
							'-moz-transform' : 'translateZ('+ tz +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)',
							'-webkit-transform' : 'translateZ('+ tz +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)',
							'-o-transform' : 'translateZ('+ tz +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
						})
			}, 13 )
		});
	})();

	//弹出层
	(function(){
		var $mainLi = $("#main li");
		var $show = $("#show");	
		var $return =  $("#return");
		var $wrap = $("#wrap");
		var $frame = $("#frame");
		var $img = $("#show div.s_thumbnail img.t_img");
		var $title = $("#show div.s_title");
		var $iframe = $("#iframe");
		var href;
		var $index;
		

		$mainLi.click(function( ev ){
			$index = $(this).index();
			$show.fadeIn(1000).css({
				"transform" :"scale(1)"
			});
			ev.stopPropagation();//阻止冒泡

			$title.html( demoArr[$index].kt );
			$img.attr("src" , demoArr[$index].src );
			href = demoArr[$index].href;
		});
		
		$(document).click(function( ev ){
			ev = ev || window.event
			$show.fadeOut(1000).css({
					"transform" :"rotateY(0deg) scale(1.5)"
				});;
		});

		$show.click(function( ev ){
			ev = ev || window.ev;
			ev.stopPropagation();//阻止冒泡
		});

		$(".s_describe").click(function( ev ){
			$wrap.animate({
				marginLeft : "-100%"
			},1000,function(){
				$show.css("display" , "none");
			});
			$frame.show().animate({
				left : "0%"
			},1000,function(){
				$return.fadeIn(1000);
			}).find("iframe").attr("src",href );
			
			ev.stopPropagation();
		});

		$return.click(function( ){
			$frame.hide().animate({
				left : "100%"
			},300);
		
			$wrap.animate({
				marginLeft : "0%"
			},300,function(){
				$return.hide();
			});
			
		});
		
	})();
	
	alert("CSS3 3D转换 暂时不持 Firefox IE 浏览器，建议使用其他新版本浏览器打开！");

});