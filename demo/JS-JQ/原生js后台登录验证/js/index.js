window.onload = function(){

	var oTxt = document.getElementById("txt");
	var oPass = document.getElementById("pass");
	var oYzm = document.getElementById("yzm");
	//邮箱手机号验证
	oTxt.onfocus = function(){//当鼠标获取焦点时发生事件
		onfo(oTxt);
	}
	oTxt.onblur = function(){//当鼠标失去焦点时发生事件
		var em = /^[1-9a-zA-Z]+@\w{1,5}\.(com|com\.cn|net|cn)$/;
		var nunber = /^[1-9]{4,9}\S\d$/g;
	
		var val = oTxt.value;
		if(em.test( val ) || nunber.test( val )){
			oTxt.style.border = "1px solid #ccc"
		}else{
			oTxt.style.border = "1px solid red"
		}	
	}
	//密码验证
	oPass.onfocus = function(){
		onfo(oPass);
	}
	oYzm.onfocus = function(){
		onfo(oYzm);
	}
	oPass.onblur = function(){
		txtisin(oPass);
	}
	oYzm.onblur = function(){
		txtisin(oYzm);
	}
	function onfo(obj){
		obj.style.border = "1px solid #ccc"
	}
	function txtisin(obj){
		var isin = obj.value;
		if(isin == ""){
			obj.style.border = "1px solid red"
		}else{
			obj.style.border = "1px solid #ccc"
		}
	}

};