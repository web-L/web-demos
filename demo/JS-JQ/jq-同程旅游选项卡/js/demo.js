var r_color =["#209ef6","rgb(80, 180, 0)","rgb(255, 102, 0)","rgb(80, 180, 0)","rgb(255, 102, 0)","rgb(32, 158, 246)","rgb(80, 180, 0)","rgb(15, 197, 204)"]
$("li").click(function(){
	$(this).addClass("hover").siblings().removeClass("hover");
	var _index = $(this).index();//获取当下索引
	$(this).css("color",r_color[_index]).siblings().css("color","#fff");
	$(".con").eq(_index).fadeIn().siblings().fadeOut();
})