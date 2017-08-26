window.onload = function(){
	var oBox = document.getElementById("box");
	var oUl = document.getElementById("ul");
	var oLi = document.getElementsByTagName("li");
	oUl.innerHTML+=oUl.innerHTML;
	oUl.style.width = oLi[0].offsetWidth*oLi.length+"px";
	//clearInterval停止定时器onmouseout	鼠标从某元素移开 onmouseover	鼠标被移到某元素之上
	fu(oUl);
	var speed = 3;//滚动速度
	var name;
	
	//速度版运动框架
	function fu(obj){
		name = setInterval(function(){
			if(obj.offsetLeft<=-oUl.offsetWidth/2){
				obj.style.left=0+"px";
			}
			
			obj.style.left = obj.offsetLeft-speed+"px"
		},30)
		return name;
	}
	oBox.onmouseover = function(){//鼠标移上时停止
		clearInterval(name);
	};
	oBox.onmouseout = function(){//鼠标移开时执行
		fu(oUl);
	};
}