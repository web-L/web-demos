$(function(){
	var $con = $(".nav .con");
	var $pic = $(".nav .nav_pic .ioc .pic");
	var $nav = $(".nav .nav_pic");
	var d=0;//当前
	var z=0;//之前
	var Time = null;
	$pic.click(function(){
		z = d;
		d = $(this).index();//获取下标
		tab();
	});
	
	$nav.hover(function(){
		clearInterval( Time );
	},function(){
		auto();
	});
	
	function auto(){
		Time = setInterval(function(){
			z =d;
			d++;
			if( d>3 ){
				d=0;
			}
			tab()
		},3000);
	};
	auto();

	function tab(){
		//点击左边
		if( d < z ){
			$con.eq( z ).animate({left:"100%"},500);
			$con.eq( d ).css({left:"-100%"});
			$con.eq( d ).animate({left:0},500);
		}
		//点击右边
		if( d > z ){
			$con.eq( z ).animate({left:"-100%"},500);
			$con.eq( d ).css({left:"100%"});
			$con.eq( d ).animate({left:0},500);
		}
		$pic.eq( d ).find("img").attr("src","images/"+ d +".png");
		if( d!=z ){
			$pic.eq( z ).find("img").attr("src","images/nav"+ z +".png");
		}
	}
});