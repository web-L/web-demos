var index=0;
var playCount=null;

$(".but li").hover(function(){
	clearInterval(playCount);
	$(this).addClass("current").siblings().removeClass('current');
	index=$(this).index();
	$(".con li").eq(index).fadeIn().siblings().fadeOut();
	
}).mouseout(function(){
	auto_play();
});

function auto_play(){
playCount=setInterval(function(){
	index++;
	if(index>3){index=0;}//判断，当序列号超出我们的序列号时，设置为0
	//alert("自动播放的序列号"+index);
	$(".but li").eq(index).addClass("current").siblings().removeClass("current");
	$(".con li").eq(index).fadeIn().siblings().fadeOut();
},3000);
	

};

auto_play();//调用方法