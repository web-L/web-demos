$(function(){
	//搜索框
	var d_Value = $(".search input.txt").val();//获取到他的默认的值
	//获取焦点时
	$(".search input.txt").focus(function(){
		if($(this).val()==d_Value){
			$(this).val("");//当前输入框的值设置为空
		}
	});
	//失去焦点
	$(".search input.txt").blur(function(){
		if($(this).val()==""){
			$(this).val(d_Value);//给他赋他的初始值
		}
	});

	//二级菜单的实现
	$(".Nav .mainNav ul li").hover(function(){
		$(this).find(".menu").stop().slideDown();//显示 .menu 盒子 slideDown 慢慢向下展开
		$(this).addClass("hover");//给li添加 class="hover"
	},function(){
		$(this).find(".menu").stop().slideUp();//隐藏
		$(this).removeClass("hover");//移除 li class="hover"
	});

	//banner 轮播
	var Time = null;
	var _index = 0;//初始化序列  
	var $Li = $("#banner ul.button li");
	var $Div = $("#banner div.Imglist");
	var timePlay = null;
	banner( $Li ,$Div )
	function banner( obj , botu ){
		obj.eq(0).show().siblings("div").hide();//最开始显示第一张
		obj.hover(function(){/*鼠标在上面*/ 
			clearInterval( Time );//清处定时播放器
			_index = $(this).index();//获取当前li序列号
			$(this).addClass("hover").siblings().removeClass("hover");//显示按扭
			//fadeIn  淡入  fadeOut 淡出  
			botu.eq( _index ).fadeIn().siblings("div").fadeOut(1000);//显示图片
		},function(){/*鼠标移开*/
			
			autoPlay();//启用定时播放器
		});
	}
	

//自动轮播
function autoPlay(){
	//设置定时器
	Time = setInterval(function(){
		_index++;
		if( _index < 4 ){
			if(_index==3){_index = -1; }//变成-1 
			$Li.eq( _index ).addClass("hover").siblings().removeClass("hover");//显示按扭
			$Div.eq( _index ).fadeIn().siblings("div").fadeOut(1000);//显示图片
			 
		}else{_index = -1;}
	},2000);	
};
autoPlay();

	//P_left 轮播
	var Time2 = null;
	var $index2 = 0;
	var $p = $("#Part1 div.P_left div.l_box p");
	var $Li2 = $("#Part1 div.P_left ul.l_list li");
	var $Ul = $("#Part1 div.P_left div.l_imgs ul");
	$Li2.eq( $index2 ).addClass("hover");
	$Li2.hover(function(){
		clearInterval( Time2 );
		$index2 = $(this).index();//获取li当前的序列号
		$(this).addClass("hover").siblings().removeClass("hover");
		$p.eq($index2).show().siblings().hide();
		$Ul.stop().animate({"left":"-"+ ($index2 * 339) +"px"},500);//.stop() 停止之前动画
	},function(){
		$Li2.stop(true,true);
		atuoPlay2();
	});

	function atuoPlay2(){
		Time2 = setInterval(function(){
			$index2++
			$index2 %= 5;
			if($index2 <= 4){
				$Li2.eq($index2).addClass("hover").siblings().removeClass("hover");
				$p.eq( $index2 ).show().siblings().hide();
				$Ul.animate({"left":"-"+$index2*339+"px"},500);
			}else{$index2 = -1;};
		},2000)
	}
	atuoPlay2();
		
	//路线推荐 图文滑动效果
	$("div.b_com ul.c_show li").hover(function(){
		$(this).find("p").stop().animate({"height":"41px"},200);
	},function(){
		$(this).find("p").stop().animate({"height":"0px"},200);
	});

	//P_right1 Tab
	
	function partTab1( $Li , $bCom ){
		var $index3 = 0;
		$Li.hover(function(){
			$index3 = $(this).index();
			$(this).addClass("onmoves").siblings().removeClass("onmoves");
			$bCom.eq($index3).show().siblings().hide();
		});
	}
	partTab1( $("#Part1 div.P_right ul.r_Tab li") , $("#Part1 div.P_right div.r_box div.b_com") );

	//Part3 Tab

	function partTab2( $Part3_a , icon ,leftImg , rightCom ){
		var i;
		$Part3_a.mouseover(function(){
			i = $(this).index();
			$Part3_a.eq(i).addClass("bg").siblings().removeClass("bg");
			icon.hide();
			icon.eq(i).show();
			leftImg.eq(i).show().siblings().hide();
			rightCom.eq(i).show().siblings().hide();
		})
	}
	partTab2( $("#Part3 p a.sel_a") , $("#Part3 p a img") , $("#Part3 div.P_part3Con div.C_left img") , $("#Part3 div.P_part3Con div.P_box div.C_right") )
	partTab2( $("#Part4 p a.sel_a") , $("#Part4 p a img") , $("#Part4 div.P_part3Con div.C_left img") , $("#Part4 div.P_part3Con div.P_box div.C_right") )

	//part5 Tab
	function part5Tab( btu , obj ){
		var i;
		btu.mouseover(function(){
			i = $(this).index()
			btu.eq(i).addClass("hover").siblings().removeClass("hover");
			obj.eq(i).fadeIn().siblings().stop().hide();
		});
	}
	part5Tab( $("#Part5 ul.P5_nav li") , $("#Part5 div.P5_Con div.C_centent") );
	//风景详细页的图片切换效果
	part5Tab( $("#Deltail_part1 .Deltail_part1_L .Deltail_but img"),$("#Deltail_part1 .Deltail_part1_L .Deltail_img img") );


	//mybrand 特效

	$("#Part5 div.P5_Con div.C_centent div.C_brand div.part5show").hover(function(){
		$(this).find("p").stop().slideDown();
	},function(){
		$(this).find("p").stop().slideUp();
	});

	//扫一扫 hover
	var $ing = $("#fixedBox div.box_Com ul li.C_list_4 img.none");
	$("#fixedBox div.box_Com ul li.C_list_4 img.show").hover(function(){
		$ing.stop().fadeIn()
	},function(){
		$ing.stop().fadeOut()
	});

	var $Top;
	$(document).scroll(function(){
		$Top = $(document).scrollTop();
		if( $Top >= 866 ){
			$("#fixedBox").fadeIn();
			
		}
		if( $Top <= 866 ){
				$("#fixedBox").fadeOut();
			}
	});
	var $kf = $("#kf");
	$(document).scroll(function(){
		var a = $Top+34;
		$kf.css("top",+ a +"px")
	})

	$("#kf img.k_but_close").click(function(){
		$kf.fadeOut();
	});
});


	var click_num=0;//点击次数
	var setTime3=null;//向左定时器
	var setTime4=null;//向右定时器
	var len=$("#webPart2_Scroll .webPart2_ScrollCon dl").length;//获取有多少个 dl(图片列表)
$("#webPart2_r img.dirl").click(function(){
		clearInterval(setTime3);//清除定时器
		click_num++;// 点击次数加1
		//alert(click_num);
		if(click_num<len-2){
		$("#webPart2_Scroll .webPart2_ScrollCon").animate({left:-168*click_num+"px"},1000);
		}else{alert("到头了"); click_num=len-3;}
});

	//右切换按扭效果
	$("#webPart2_r img.dirr").click(function(){
			clearInterval(setTime3);//清除定时器
			click_num--;//点击次数减1 
			//alert(click_num);
		if(click_num>=0){
			$("#webPart2_Scroll .webPart2_ScrollCon").animate({left:-168*click_num+"px"},1000);
		}else{alert("右边到头了!!"); click_num=0;}
	});

	//自动轮播

function autoPlay3(){
		setTime3=setInterval(function(){
			//alert("ss");
			click_num++;// 点击次数加1
			if(click_num<len-2){
				$("#webPart2_Scroll .webPart2_ScrollCon").animate({left:-168*click_num+"px"},1000);
			}else{click_num=len-3; autoPlay4();clearInterval(setTime3);//清除定时器 
				}
		},1000);

			
			//alert("自动轮播");
			}
autoPlay3();//调用函数

function autoPlay4(){
		setTime4=setInterval(function(){

			click_num--;//点击次数减1 
		if(click_num>=0){
			$("#webPart2_Scroll .webPart2_ScrollCon").animate({left:-168*click_num+"px"},1000);
		}else{ click_num=0;autoPlay3();clearInterval(setTime4);//清除定时器
			}

		},1000);
}



//内页广告轮播器样式
var web_index=0;
var up_click=0;
var sjs=0;
var arrylist=null;
$("ul.webAdvbutton li").click(function(){
	web_index=$(this).index();//获取当前点击li的序列号，赋给变量 web_index;
	$(this).addClass("hover").siblings().removeClass("hover");//当前点击的加上 class="hover" 其它 li 移除class="hover"
	$(".webAdvcon img").eq(up_click).css("z-index","3");//把移走的那张图片调到最上面
	$(".webAdvcon img").eq(web_index).css("z-index","2")
	//文字动画效果
	$(".text dd").eq(web_index).show().siblings().hide();
		sjs=getRandom(4)-1;
		arrylist=[{"top":"-270px"},{"right":"-361px"},{"bottom":"-270px"},{"left":"-361px"}];
		
		if(up_click==web_index){}else{//当前面点击的序列号和现在点击的序列号不相等时，就执行
	//if(sjs==1){
			$(".webAdvcon img").eq(up_click).stop(true,true).animate(arrylist[sjs],500,function(){
			//$(".webAdvcon img").eq(0).css({"top":"0px","z-index":"0"});
			$(".webAdvcon img").eq(up_click).removeAttr("style");
			up_click=web_index;//保存发前按扭点击对应的序列号
			});
	//}
}

});



//随机函数，获到到 0-n之间的整数
	function getRandom( n ){
		 return Math.floor(Math.random()*n+1)    
	}

	

/*签证页详细内容的滚动效果*/
var web_index=0;
var h1=0 //第一个按扭滚动的高度
var h2=h1+$(".Web_QzScrollCon").eq(0).height();//第二个按扭滚动的高度
var h3=h2+$(".Web_QzScrollCon").eq(1).height();//第三个按扭滚动的高度
var h4=h3+$(".Web_QzScrollCon").eq(2).height();//第四个按扭滚动的高度
var h5=h4+$(".Web_QzScrollCon").eq(3).height();//第五个按扭滚动的高度
var arrlis=[h1,h2,h3,h4,h5];

$(".Web_QzNav span").hover(function(){
		web_index=$(this).index();//获取到对应的序列号
		//alert(web_index);
		$(this).addClass("hover").siblings("span").removeClass("hover");
		$(".Web_QzScroll").stop(true,true).animate({scrollTop:arrlis[web_index-1]+"px"},500);

		
});