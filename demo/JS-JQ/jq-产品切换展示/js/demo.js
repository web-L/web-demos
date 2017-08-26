$(function(){
		var clicknum=0;
	//左按扭鼠标点击事件
	$("#Con img.but1").click(function(){
		clicknum++;//鼠标点击次数加1 clicknum=clicknum+1

		if( clicknum <=2 ){
			$("#Con .scroll .ImgList").animate({left:"-"+clicknum*510+"px"},500);
		}else{ 
			clicknum=2; 
		}
	});

	//右按扭鼠标点击事件
	$("#Con img.but2").click(function(){
		clicknum--;// 点击次数减1 clicknum-1;	
		if( clicknum >= 0 ){
			$("#Con .scroll .ImgList").animate({left:"-"+clicknum*510+"px"},500);
		}else{
			clicknum=0;
		}
	});
})