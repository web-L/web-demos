window.onload = function(){
var oTop = document.getElementById("top");

returntop(oTop,3)
//返回top特效封装
function returntop(obj,i){
	var timer;//申明一个变量看是否为系统还是用户滚动
	var sBys=true;
	var scrollTop;
	obj.style.display="none";

	function st(){		
		var sh = document.documentElement.scrollTop||document.body.scrollTop;
		if(sh>600){//判断当前滚动条高度
			obj.style.display="block";
		}else{
			obj.style.display="none";
		}
	}
		
	window.onscroll= function(){//onscroll 当滚动条滚动时发生的事件
		if(!sBys){
		  clearInterval(timer);//停止定时器
		 
		}
		st()
	};
	sBys=false;
	obj.onclick=function(){
		timer = setInterval(function(){
			scrollTop = document.documentElement.scrollTop||document.body.scrollTop; //获取滚动条当前的离top高度
			var ispeed=Math.floor(-scrollTop/i);//当点击按钮回到顶部时计算缓冲速度
			if(scrollTop==0){
				clearInterval(timer)//停止定时器
			}
			sBys=true;
			scrollTop = document.body.scrollTop = scrollTop+ispeed;
			
		},10)
	};
};

};	