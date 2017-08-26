$(".imgList .List div").hover(function(){
		$(this).find("p").stop().animate({height:"28px",paddingTop:"7px"},1000);//鼠标放上去
	},function(){
		$(this).find("p").stop().animate({height:"0px",paddingTop:"0px"},1000);//鼠标移开
	});	