window.onload = function(){
	var oUl = document.getElementById("ul");
	var oLi = oUl.getElementsByTagName("li");
	var oBox = document.getElementById("box");
	var com = oBox.children;
	console.log(com);

	for(var  i = 0;i<oLi.length;i++){
		oLi[i].index = i;
		oLi[i].onmouseover = function(){
			for(var j = 0;j<com.length;j++){
				com[j].style.display = "none";
				
				document.getElementById("tips_"+j).style.display = "none";
			}
			com[this.index].style.display = "block";
			document.getElementById("tips_"+this.index).style.display = "block";
			
		}
	}
}