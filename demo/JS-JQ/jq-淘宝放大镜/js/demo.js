var $tabLi = $('.tab ul li');
var $picImg = $('.pic img');
var $tabLiImg = $('.tab li img');
var $picCover = $('.pic_cover');
var $cover = $('.cover');
var $show = $('.show');
var imgArr = [];
var index = 0;
	
init();
//图片切换
$tabLi.hover(function(){
	index = $(this).index();
	//改变class名以改变边框
	$(this).addClass('on').siblings().removeClass('on');
	//获取小图src
	var src = $(this).find('img').prop('src');
	//改变大图src
	$show.css('backgroundImage' , 'url('+src+')');
	$picImg.prop({
		src : src,
		width : imgArr[index].width * 400,
		height : imgArr[index].height * 400
	});
	$picCover.css({
		top : (400 - imgArr[index].height * 400 ) / 2,
		left : (400 - imgArr[index].width * 400 ) / 2
	});
	var a = 400 * $picCover.width() / imgArr[index].imgW + 'px'
	$cover.css({
		width : a,
		height : a
	});
});

//放大效果
$picCover.mousemove(function(ev){
	$cover.show();
	$show.show();

	var pX = ev.pageX;
	var pY = ev.pageY;
	
	var picCoverX = $picCover.offset().left;
	var picCoverY = $picCover.offset().top;
	var minusX = pX - picCoverX - $cover.width() / 2;
	var minusY = pY - picCoverY - $cover.height() / 2;
	
	minusX = Math.max( minusX , 0 );
	minusX = Math.min( minusX , $picCover.width() - $cover.width() );
	minusY = Math.max( minusY , 0 );
	minusY = Math.min( minusY , $picCover.height() - $cover.height() );
	$cover.css({
		left : minusX + 'px',
		top : minusY + 'px'
	});

	$show.css('backgroundPosition' ,(-(minusX/$picCover.width())*imgArr[index].imgW) +'px '+ (-(minusY/$picCover.height())*imgArr[index].imgH) +'px');
}).mouseleave(function(){
	$cover.hide();
	$show.hide();
});
$show.mouseover(function(){
	$cover.hide();
	$(this).hide();
}).mousemove(function(){
	return false;
});

//图片等比例改变
function init(){
	$tabLiImg.each(function(i){
		var imgWidth = $(this).width();
		var imgHeight = $(this).height();
		if ( imgWidth >= imgHeight )
		{
			$(this).prop({
				width : 50,
				height : 50 / imgWidth * imgHeight
			});
			$(this).css({
				top : (50 - 50/imgWidth*imgHeight)/2 + 'px'
			});
			imgArr[i] = { width : 1 , height : imgHeight/imgWidth , imgW : imgWidth , imgH : imgHeight };
		}
		else
		{
			$(this).prop({
				width : 50 / imgHeight * imgWidth,
				height : 50
			});
			$(this).css({
				left : (50 - 50/imgHeight*imgWidth)/2 + 'px'
			});
			imgArr[i] = { width : imgWidth/imgHeight , height : 1, imgW : imgWidth , imgH : imgHeight };
		}
		$(this).show();
		
	});
};