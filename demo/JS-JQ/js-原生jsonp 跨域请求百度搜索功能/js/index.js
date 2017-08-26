var oText = document.getElementById("text");
var oList = document.getElementById("list");
var oBtn = document.getElementById("btn");
var oSE = document.getElementById("SE");

oSE.onclick = function(){
	var val = oText.value;
	this.href = "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=" + val;
};
oText.onfocus = function(){//获取焦点
	this.style.borderColor = "#3385ff";
}
oText.onblur = function(){//失去焦点
	oText.style.borderColor = "#b6b6b6";
	setTimeout(function(){
			oList.style.display = "none";
	},200)

}
oText.onkeyup = function(){
	var val = this.value;
	var os = document.createElement( "script" );
	//获取百度下拉列表数据
	os.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+ val +"&cb=fly&_="+ new Date().getTime();

	document.body.appendChild( os );
}

function fly( flyjson ){
	oList.style.display = "block";
	oList.innerHTML = "";
	for( var i = 0 ;i<flyjson.s.length;i++ ){
		var oLi = document.createElement("li");
		var oA = document.createElement("a");

		oA.innerHTML = flyjson.s[i];
		oA.href = "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd="+ flyjson.s[i];
		oList.appendChild( oLi );
		oLi.appendChild(oA);
	}
};