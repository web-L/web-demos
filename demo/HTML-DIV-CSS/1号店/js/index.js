$(function(){//浏览器加载完html文档再调用js
	//alert($);弹出对话框
	//头部banner动画 开始
	var wark =  1;//定义变量 wrak
	$("#hd_header_wrap .hd_banner p").click(function(){//click 点击事件 当用户点击的时候执行函数
		if(wark == 1){//条件判断
			$(this).children("span").html("收缩");
			$(this).children("i").css(
				{"border-bottom-color":"#fff",
				"border-top-color":"transparent",
				"margin-top":"-5px"
			});
			$(this).siblings().attr("src","images/banner2.jpg").animate({
				"height":"300px"
			},300);
			wark = 0;
		}else{
			$(this).children("span").html("展开");
			$(this).children("i").css(
				{
				"border-bottom-color":"transparent",
				"border-top-color":"#fff",
				"margin-top":"0px"
			});
			$(this).siblings().animate({
				"height":"60px"
			},300,function(){
				$(this).attr("src","images/banner1.jpg");
			});
			wark = 1;
		}
	});
	//结束 头部banner动画

	//头部搜索框动画 开始
	$("#hd_header_wrap #site_header .hd_search .form input").click(function(){
		$(this).siblings("label").css("color","#ccc");
		var $this = $(this)
		setTimeout(function(){
			$this.siblings("div.search_don").show();
		},500);
	});
	$("#hd_header_wrap #site_header .hd_search .form .search_don").mouseout(function(){
		$(this).hide();
	});
	/*搜索框前面小箭头动画
	$("#hd_header_wrap #site_header .hd_search .form").hover(function(){
		$(this).animate({
			"background-position-Y":"-70px"
		},500);
		},function(){
			$(this).animate({
				"background-position-Y":"-60px"
			},500);
		});*/
	
	//结束 头部搜索框动画

	//右则导航切换动画
	var index = 0;
	$("#banner .layout .l_shop ul li").hover(function(){
		index = $(this).index();
		//console.log(index);
		$(this).addClass("s_tips").siblings().removeClass("s_tips");
	$("#banner .layout .l_shop div").eq(index).show().siblings("div").hide();
		//$(this).children("div").show().parent().siblings().childrent("div").hide();
		
	});

	//banner轮播特效 开始
	var i = 0;
	var time = null;
	$("#banner .box ul li").hover(function(){
		i = $(this).index();//获取到对应元素的索引值
		play();
		
	});
	$("#banner").hover(function(){//光标移进来发会生什么 
		$("#banner .b").show();//显示
		clearInterval(time);
	},function(){//光标移开发会生什么
		$("#banner .b").hide();//隐藏
		autoplay();
	});
	$("#banner .right").click(function(){//光标点击时发生什么
		i++;
		i%=8;
		play();
		/*if(i>7){
			i = 0;
		}*/
	});
	$("#banner .left").click(function(){
		i--;
		play();
	});
	function play(){
		i%=8;
		$("#banner .box ul li").eq(i).addClass("curr").siblings().removeClass("curr");
		$(".banner ul li").eq(i).fadeIn().siblings().fadeOut();
	};
	function autoplay(){	
		time = setInterval(function(){
			i++;
			play();
		},2000);
	};
	autoplay();
	//banner轮播特效 结束
	
	//自动轮播特效 开始
	var n = 0;
	var	timr =null;
	var $p2_li = $("#mainCon .part2 .b_con .icon_box li");
	var $p2_ul = $("#mainCon .part2 .b_con .img");
	$p2_li.hover(function(){
		n = $(this).index();
		$(this).addClass("big").siblings().removeClass("big");
		$(this).children().css("width","30px").parent().siblings().children().css("width","0px");
		$("#mainCon .part2 .b_con .img").animate({"left":-n*330+"px"},200);
		
	});
	
	timr = setInterval(function(){
		$p2_li.eq(n).addClass("big").siblings().removeClass("big");
		$p2_li.eq(n).children().animate({"width":"30px"},2000,function(){
			$(this).css("width","0px");
			$p2_ul.animate({"left":-n*330+"px"},200);
		});
		n++;
		n%=3;
	},2200);
	//自动轮播特效 结束
	var $index = 0;
	//右则楼梯式导航特效
	//点击滚动到相应的内容块
	$("#iconflor a").click(function(){
		$index = $(this).index();
		if($index<10){
			var $top = $(".part2").eq($index).offset().top;//获取对应序列号part2内容块相对于浏览器的上偏移量
			$("html,body").animate({"scrollTop":$top-100},800)//让浏览器滚动条滚动到相应的内容块
		}else if($index==10){
			$("html,body").animate({"scrollTop":0},1000)
		}
	});
	//滚动条特效
	var h = $(window).height();//获取浏览器高度
	$(window).scroll(function(){
		var $t = $(window).scrollTop();
		//console.log($t);
		if($t>0){
			$("#iconflor").show();
		}else if($t==0){
			$("#iconflor").hide();
		}
	});
	/*$("#iconflor a")click(function(){
		$(document).scrollTop(0);
	});*/
	//刷新页面 滚动条高度为0
	setTimeout(function(){
		$(document).scrollTop(0);
	},10);

	//滚动切换
	var j = 0;
	$("#mainCon .hd_bannerad #left1").click(function(){
		//alert(1);
		j++;
		if(j==3){
			j = 0;
			//alert("操");
		}
		//alert(j);
		$(".hd_bannerad ul").animate({
			left:-1200*j
		},900);
	});
	$("#mainCon .hd_bannerad #right1").click(function(){
		//alert(1);
		j--;
		if(j==-1){
			j = 2;
		}
		//alert(j);
		$(".hd_bannerad ul").animate({
			left:-1200*j
		},900);
	});




});