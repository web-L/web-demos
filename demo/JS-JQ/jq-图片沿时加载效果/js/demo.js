
var container = $("#container ul");
for( var i = 1; i<100 ;i++ ){
	var $li = $("<li><img src='images/"+ ( i%21 ) +".jpg' alt='绿丛小花' width='288px' height='180px'></img><div>绿丛小花精美摄影</div></li>");
	container.append( $li );
}

var lazyload = $.noConflict();
lazyload(function(){
	//effect属性代表的是懒加载的效果
	lazyload('img').lazyload({placeholder:'images/to.gif',effect:'fadeIn'});
});