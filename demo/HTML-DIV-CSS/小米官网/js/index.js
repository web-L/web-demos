$(function(){
	
	//header start
	(function(){
		var $shop = $("#header div.h_top div.t_right div.r_shop");
		var $hide = $("#header div.h_top div.t_right div.r_shop .r_hide");
		$shop.hover(function(){
			$hide.stop().slideDown()
		},function(){
			$hide.stop().slideUp();
		})

	})();
	
	//search
	(function(){
		var $input = $("#nav div.s_left input");
		var $span = $("#nav div.n_search div.s_left span");
		var $input = $("#nav div.s_left input");
		var $right = $("#nav div.s_right");
		var $s_hide = $("#nav div.n_search div.s_hidn");
		$input.focus(function(){
			$span.fadeOut(200);
			$input.addClass("focus1");
			$right.css("border-color","#ff6700");
			$s_hide.show();
		});
		$input.blur(function(enent){
			$span.fadeIn();
			$input.removeClass("focus1");
			$right.css("border-color","")
			setTimeout(function(){
				$s_hide.hide();
			},200);
		});

	})();

	//nav_hide
	(function(){
		var $li = $("#nav div.n_main ul li:lt(7)");
		var $div = $("#nav div.n_main div.n_hide div");
		var $hide = $("#nav div.n_main div.n_hide");
		var $index = 0;
		$li.hover(function(){
			$hide.stop().slideDown(100);
			$index = $(this).index();
			$div.eq($index).addClass("show").siblings().removeClass("show");
		},function(){
			$hide.stop().slideUp(200);
		});
		$hide.hover(function(){
			$(this).stop().slideDown(300);
		},function(){
			$(this).stop().slideUp(200);
		})
	})();
	
	//banner 
		(function(){
			var $tab = $("#banner div.b_Main div.M_tab ul li");
			var $pic_Li = $("#banner div.b_Main div.M_pic ul li");
			var $M_last = $("#banner div.b_Main a.M_last");
			var $M_next = $("#banner div.b_Main a.M_next");
			var $M_pic = $("#banner div.b_Main");
			var $Li_length = $pic_Li.length
			var $index = 0;
			var Time = null;
			$tab.hover(function(){
				$(this).addClass("hover");
			},function(){
				$(this).removeClass("hover");
			}).click(function(){
				$index = $(this).index();
				banner();
			});
			
			$M_next.click(function(){
				$index++
				$index %= $Li_length;
				banner();
			})
			
			$M_last.click(function(){
				$index--
				if( $index < 0 )$index = $Li_length-1;
				banner();
			})
			
			$M_pic.hover(function(){
				clearInterval( Time );
			},function(){
				auto();
			});

			function auto(){
				Time = setInterval(function(){
					$index++
					$index %= $Li_length;
					banner();
				},3000);
			}
			auto();
			function banner(){
				$tab.eq($index).addClass("click").siblings().removeClass("click");
				$pic_Li.eq($index).stop(true).fadeIn().siblings().stop(true).fadeOut();
			}
		})();
	//end header	

	//Main start
		//b_Mainbav
		(function(){
			var $M_Li =  $("#banner div.b_Mainbav ul li");
			var $h_Li = $("#banner div.b_Mainbav ul li div.M_hide ul li");
			$M_Li.hover(function(){
				$(this).addClass("hover");
				$h_Li.removeClass("hover");
			},function(){
				$(this).removeClass("hover");
				
			});
		})();
		
		//pain_box
		(function(){
			//#pain_box1
			var $pain = $("#pain_box1 div.box-bd");
			var $pain_a = $("#pain_box1 div.b_title p a");
			var $pain_next = $("#pain_box1 div.b_title p a.next");
			var $pain_last = $("#pain_box1 div.b_title p a.last");
			var $pain_Ul = $("#pain_box1 div.box-bd ul"); 
			var $index = 0;
			var Time = null;
			$pain_next.click(function(){
				$index = $(this).index();
				banner();
			});
			$pain_last.click(function(){
				$pain_Ul.stop().animate({"left":$index+"px"},500)
			});
			
			$pain_a.click(function(){
				$(this).addClass("click").siblings().removeClass("click");	
			});
			
			$pain.hover(function(){
				clearInterval( Time );
			},function(){
				auto();
			});

			$pain_a.hover(function(){
				clearInterval( Time );
			},function(){
				auto();
			});
			
			function auto(){
				Time = setInterval(function(){
					$index++
					$index %= 2;
					banner();
				},5000);
			};
			auto();
			function banner(){
				$pain_a.eq($index).addClass("click").siblings().removeClass("click");
				$pain_Ul.stop().animate({"left":-$index*1226+"px"},500);

			};

			//#pain_box2
			var $pain2 = $("#pain_box2 div.box-bd");
			var $pain_Ul2 = $("#pain_box2 div.box-bd ul"); 
			var $pain_li = $("#pain_box2 div.box-bd ul li");
			var $pain_next2 = $("#pain_box2 div.b_title p a.next");//上一页
			var $pain_last2 = $("#pain_box2 div.b_title p a.last");//下一页
			var $index2 = 0;
			$pain_li.css({
					"background":"#fff",
					"position":"relative",
					"top":"0px",
					"left":"0px",
					"transition":"top 0.5s"
				});
			$pain_li.hover(function(){
				$(this).css("top","-4px")
			},function(){
				$(this).css("top","0px")
			});
			$pain_next2.click(function(){
				$index2++
				if( $index2 >= 1 ){
					$pain_last2.removeClass("click");
					if( $index2 >= 2 ){
						$index2 = 2;
						$(this).addClass("click");
					}else if( $index2 ){
						$(this).removeClass("click");
					}
				}
				$pain_Ul2.animate({"left":-$index2*1246+"px"},300);

			});

			$pain_last2.click(function(){
				$index2--
				if( $index2 <= 0 ){
					$pain_next2.removeClass("click");
					$(this).addClass("click");
					$index2 = 0;
				}
				$pain_Ul2.animate({"left":-$index2*1246+"px"},300);
			});

		})();

		//Part2
		(function(){
			var $P_R_Li = $("div.Part div.P_Right div.R_Control ul li.C_li");
			var $P_L_a = $("div.Part div.P_Left a");
			var $P_Li_top = $("div.R_Control ul li.C_the div.t_top");
			var $P_Li_bottom = $("div.R_Control ul li.C_the div.t_bottom");
			var $Tab1 = $("#Part1 div.P_title div.t_Tab ul li");
			var $div1 = $("#Part1 div.P_Right div.R_Control");
			var $Tab2 = $("#Part2 div.P_title div.t_Tab ul li");
			var $div2 = $("#Part2 div.P_Right div.R_Control");
			var $Tab3 = $("#Part3 div.P_title div.t_Tab ul li");
			var $div3 = $("#Part3 div.P_Right div.R_Control");

			var $index;
			$P_R_Li.hover(function(){
				$(this).find(".P_hide").stop().animate({"height":"78px","opacity":"1",},300)
			},function(){
				$(this).find(".P_hide").stop().animate({"height":"0px","opacity":"0",},300)
			});
			tab($Tab1 , $div1 );
			tab($Tab2 , $div2 );
			tab($Tab3 , $div3 );
			function tab( obj , attr ){
				obj.hover(function(){
					$index = $(this).index();
					$(this).addClass("hover").siblings().removeClass("hover");
					attr.eq($index).addClass("R_show").siblings().removeClass("R_show");
				});
			}
			classHover($P_R_Li);
			classHover($P_L_a);
			classHover($P_Li_top);
			classHover($P_Li_bottom);

			function classHover(obj){
				obj.hover(function(){
					$(this).addClass("hover");
					
				},function(){
					$(this).removeClass("hover");
				});	
			};

		})();
		
		//Part4
		(function(){
			var $Part4_li = $("#Part4 div.P_com ul li");
			$Part4_li.hover(function(){
				$(this).addClass("hover");
			},function(){
				$(this).removeClass("hover");		
			});
		})();
	
		//Prat5
		(function(){
			var $Prat_li = $("#Prat5 ul.P_content li.c_li");
			var $btn = $("#Prat5 ul.P_content li a.t_btu");
			var $tab_li = $("#Prat5 ul.P_content li div.c_tab ul li");
			var $tab = $("#Prat5 ul.P_content li div.c_tab");
			var $box_wrap = $("#Prat5 ul.P_content li div.c_box_wrap");
			var length = $box_wrap.length;
			var color = "";
			// li top边框线颜色
			$Prat_li.each(function(i){
				switch( i ){
					case 0:
						color = "#ffac13";
					break;
					case 1:
						color = "#83c44e";
					break;
					case 2:
						color = "#e53935";
					break;
					case 3:
						color = "#2196f3";
					break;
				}
				$(this).css("border-color",color).find("h3").css("color",color);
			});
			
			$box_wrap.each(function(){ 
				this.a = 0;
			});
			
			$Prat_li.hover(function(){
				$(this).find("a.t_btu").stop().fadeIn();
			},function(){
				$(this).find("a.t_btu").stop().fadeOut();
			});
			//小点点切换
			$tab_li.click(function(){
				var $index = $(this).index();
				var $pIndex = $(this).parent().parent().parent().index();//获取对应 li 的序列号
				$box_wrap.eq($pIndex)[0].a  = $index;
				$(this).addClass("click").siblings().removeClass("click");
				$box_wrap.eq($pIndex).stop(true).animate({
					left : -$box_wrap.eq($pIndex)[0].a * 296 +"px",
				},500);
			});

			$btn.click(function(){//切换按钮
				
				var i = $(this).index();//获取当前按钮序列号
				var $pIndex = $(this).parent().parent().index();//找到当前按钮的父元素的父 li元素 得到他序列号 
				
				if( i ){//右按钮		
					$box_wrap.eq($pIndex)[0].a ++;
					if( $box_wrap.eq($pIndex)[0].a > length-1 ){
						$box_wrap.eq($pIndex)[0].a = length-1
					}
				}else{//左按钮
					$box_wrap.eq($pIndex)[0].a --;
					if( $box_wrap.eq($pIndex)[0].a < 0 ){
						$box_wrap.eq($pIndex)[0].a = 0
					}
				}
				//切换动画
				$tab.eq($pIndex).find("li").eq( $box_wrap.eq($pIndex)[0].a ).addClass("click").siblings().removeClass("click");
				$box_wrap.eq($pIndex).stop(true).animate({
					left : -$box_wrap.eq($pIndex)[0].a * 296 +"px",
				},500)
			});
		})();


		//video
		(function(){
			var $v_img = $("#video ul.v_com li a.v_img");
			var $v_icon = $("#video ul.v_com li span");
			var $v_hide = $("#video div.v_hide");
			var $v_li = $("#video ul.v_com li") ;
			var $span = $("#video div.v_hide div.h_centent div.c_title span");
			var $modal_bd = $("#video div.v_hide div.h_centent div.modal-bd")
			var $ifear = $("#video div.v_hide div.h_centent div.modal-bd .iframe");

			$v_img.hover(function(){
				var $index = $(this).parent().index();
				$v_icon.eq($index).addClass("hover");	
			},function(){
				var $index = $(this).parent().index();
				$v_icon.eq($index).removeClass("hover");
			});
			$v_icon.hover(function(){
				$(this).addClass("hover");	
			},function(){
				$(this).removeClass("hover");
			});
			
			
			hsize();
			function hsize(){
				$v_hide.css({
					width : $(window).width()+"px",
					height : $(window).height()+"px"
				})
			};
			$(window).resize(hsize);

			$v_img.click(function(){
				var html = $(this).parent().find(".P_p1").text();
				$v_hide.find("p").html( html );
				$modal_bd.append($ifear);
				$v_hide.fadeIn(500,function(){
					$(this).find("div.h_centent").animate({
						opacity : "1"
					},500,function(){
						$(this).animate({
							top : "50%"

						},400);
					});
				});
			});

			$span.click(function(){
				$ifear.remove();
				$(this).parent().parent().animate({
					top : "-40%",
					opacity : "0"
				},300,function(){
					$v_hide.fadeOut(200);
				});
				
			});
		})()	

	//end Main
})