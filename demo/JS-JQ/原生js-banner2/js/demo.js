window.onload = function(){
	var oTab = document.getElementById("tab");
	var oLi = oTab.getElementsByTagName("li");
	var oImg = document.getElementById("pic").getElementsByTagName("img");
	var index = 0 , timer = null;
	for(var i=0;i<oLi.length;i++){
		oLi[i].index = i;
		oLi[i].onmouseover = function(){
			index = this.index;
			for(var j=0;j<oLi.length;j++){
				oLi[j].style.background = "#000";
				oImg[j].style.display = "none";
			}
			this.style.background="#ec3200";
			oImg[this.index].style.display = "block";
		}
	}
	timer = setInterval(function(){
		index++;
		if(index>4){
			index=0;
		}
		for(var j=0;j<oLi.length;j++){
			oLi[j].style.background = "#000";
			oImg[j].style.display = "none";
		}
			oLi[index].style.background="#ec3200";
			oImg[index].style.display = "block";
	},2000);
};