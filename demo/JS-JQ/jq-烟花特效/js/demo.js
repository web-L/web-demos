$(function(){
$(document).click(function(evet){
	var $div = $("<div class='box'></div>");//创建元素
	$div.addClass("box");
	$div.css({background:"#"+getColor(),boxShadow:"0px 2px 20px #"+getColor()+",0px 4px 30px "+getColor()})
	$("body").append($div);//添加元素

	var $height = $(document).height();//获取文档页面高度
	var $width = $(document).width();//获取文档页面宽度

	var x = evet.clientX//获取当前鼠标点击垂直位置
	var y = evet.clientY;//获取当前鼠标点击水平位置
	
	$div.css({"top":$height,"left":x+"px"});
	$div.animate({"left":x,"top":y},200,function(){
		$(this).remove();
	});

	//创建烟花
	var The = 30//烟花个数
	var div = []
	var Time
	for( var i=0;i<The;i++ ){

		div[i] = $("<div class='div'></div>");
		div[i].addClass("div");
		div[i].css({background:"#"+getColor(),boxShadow:"0px 2px 20px #"+getColor()+",0px 4px 30px "+getColor(),borderRadius:"10px","left":x,"top":y});
		$("body").append(div[i]);
		//烟花移动距离
		div[i].speedY = Math.random()*50-20;//水平
		div[i].speedX = Math.random()*50-20;//垂直
		
	}
	Time = setInterval(function(){
		for( var j = 0;j<30;j++ ){
			if( div[j] == null ){
				continue;
			}
			//烟花扩散
			div[j].css({
				left:div[j].position().left+div[j].speedX,
				top:div[j].position().top+div[j].speedY
			});
			//烟花下坠
			div[j].speedY += 0.8;
			//small_div[j].fadeOut(2000);
			var position =  div[j].position();
			if( position.left < 0|| position.left > $width ||position.top > $height ){
				div[j].remove();
				div[j] = null;
			}
		}
	},30)
});
//随机颜色
function getColor(){
	//16777215   ffffff的10进制
	var color = parseInt(Math.random()*16777215).toString(16);//获取16进制随机颜色
	while(color.length < 6){
		color = "0"+color;
	}
	return color;
}
});