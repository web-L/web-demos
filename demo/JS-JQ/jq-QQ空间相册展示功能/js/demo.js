var _index=0;//保存序列号
var bimg="";
var $Li = $("#Main ul li");

$("#Main ul li").click(function(){
	$(".gray").fadeIn();//显示
	$(".showImg").fadeIn(); //显示
	bimg = $(this).find("img").attr("bigsrc");
	$(".showImg img.bigImg").attr("src",bimg);
	_index=$(this).index(); //1

});


$(".gray").click(function(){
	$(".gray").fadeOut();//隐藏
	$(".showImg").fadeOut(); //隐藏
});

//当我们点击右边按扭时 
$("img.but2").click(function(){
	_index++;//序列号加1
	_index %= $Li.length;

	bimg=$("#Main ul li").eq(_index).find("img").attr("bigsrc");
	$(".showImg img.bigImg").attr("src",bimg);//换大图地址
});


//当我们点击左边按扭时 
$("img.but1").click(function(){
	_index--;//序列号加1
	if(_index<0){
		 _index = $Li.length-1
	}
	bimg=$("#Main ul li").eq(_index).find("img").attr("bigsrc");
	$(".showImg img.bigImg").attr("src",bimg);//换大图地址
});