$(function(){
	var i = 0; 
		$("#web").hover(function(){
			$(".prev").fadeIn(300);
			$(".next").fadeIn(300);
		},function(){
			$(".prev").fadeOut(300);
			$(".next").fadeOut(300);
		})
		$(".nav ul li").hover(function(){
			i = $(this).index();
			banner();
		});
		$(".prev").click(function(){
			i--;
			if( i<0 ){
				i=5;
			};
			banner();
		})
		$(".next").click(function(){
			i++; 
			console.log(i)
			if( i>5 ){
				i=0;
			}
			banner()
		})

		function banner(){
			$(".con ul li").eq(i).fadeIn(100).siblings().fadeOut(100);
			$(".nav ul li").eq(i).addClass("bg").siblings().removeClass("bg");
		}
});