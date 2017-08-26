$("#QQ").animate({right:"-100px"},1000);

$("#QQ").hover(function(){
	$(this).animate({right:"-187px"},1000);
	$(".QQ_chat").animate({right:"0px"},1000);
},function(){});


$(".QQ_chat").hover(function(){},function(){
	$(this).animate({right:"-217px"},1000);
	$("#QQ").animate({right:"-100px"},1000);
});