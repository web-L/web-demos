
var oList = document.getElementById("list");
var oLeft = document.getElementById("left");
var oRight = document.getElementById("right");
var oLi = oList.getElementsByTagName("li");//动态获取li
var li,num = 1,Timer = null;
for ( var i=0;i<15;i++ )
{
	var x = i % 5;
	var y = Math.floor( i/5 );//Math.floor 向下取整
	li = document.createElement('li');
	li.style.backgroundPosition = x*-192 + 'px '+ y*-200 +'px';//改变每张li的背景图片位置
	oList.appendChild( li );//动态在ul里添加li
};


oRight.onclick = function(){
	clearInterval( Timer )//清除定时器	
	cha( 0)
};
oLeft.onclick = function(){
	clearInterval( Timer )//清除定时器	
	cha( 1 )
};

function cha( dr ){
	if(dr){
		num--
		if( num < 1 ){
			num = 8
		}
	}else{
		num++
		if(num > 8){
			num = 1
		}
	}
	var arr = []
	for(var i = 0;i<15;i++){
		arr[i] = i
	}
	Timer = setInterval(function(){//setInterval 定时器
		var index = Math.floor(Math.random()*arr.length);//生成0-23之间的随机数
		oLi[arr[index]].style.backgroundImage = "url(images/"+ num +".jpg)"
		arr.splice(index,1);// 从index 数组删除 1 位
		if(arr.length == 0 ){
			clearInterval( Timer )//清除定时器	
		}
	},50);

}