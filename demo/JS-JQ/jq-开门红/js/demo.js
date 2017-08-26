window.onload=function()
{
	
	var oL=document.getElementById("left");
	var oR=document.getElementById("right");
	var oM=document.getElementById("main");
	function hei()
	{
		var heig = document.documentElement.clientHeight;
		var wid = document.documentElement.clientWidth;
		oM.style.width = wid+"px";
		oM.style.height = heig+"px";
		oL.style.height = heig+"px";
		oR.style.height = heig+"px";
	}
	hei()
	window.onresize = function(){hei();}
}
