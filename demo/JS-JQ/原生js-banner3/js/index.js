window.onload = function(){
				
	var oLeft = document.getElementById("left");
	var oRight = document.getElementById("right");
	var oImg = document.getElementById("img");
	var oSpam = document.getElementById("span1");
	var oList = document.getElementById("list");
	var oLi = oList.getElementsByTagName("li");//获取 oList 下面的子元素
	//console.log(oImg);
	var umn = 1;
	oRight.onclick = function(){
		if(umn==5){
			umn = 0;
		};
		umn++;
		age();
	};
	oLeft.onclick = function(){
		umn--;
		if(umn<1){
			umn = 5;
		};
		age();
	};

	for(var i=0;i<oLi.length;i++){
		oLi[i].index = i;
		oLi[i].onclick = function(){
			umn = this.index + 1;
			age();
		};
	};

	function age(){
		oImg.src ="img/"+umn+".jpg"
		oSpam.innerHTML = umn;
		for(var j = 0;j<oLi.length;j++){
			if(umn -1 == j){
				oLi[j].style.backgroundColor = "#F40";
			}else{
				oLi[j].style.backgroundColor = "rgba(0,0,0,0.6)";
			};
		};
	};
};