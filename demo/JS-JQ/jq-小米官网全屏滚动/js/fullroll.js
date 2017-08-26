/*
	全屏滚动特效插件
*/

(function($){
	$.fn.fullroll = function(callback){
		this.callback = callback||{};
		init.call(this);//初始化函数 ，作用就是初始化htnl结构
		listener.call(this);//绑定滚轮事件 ， 实现翻页
	};
	function init(){
		this.index = 0;//
		this.addClass("UI_pageviewer");
		this.children("div").addClass("UI_pag")
		this.maxIndex = $("div.UI_pag",this).size()-1;//获取div 数量 	
		
	};
	function listener(){
		var $this = this;
		this.bind("mousewheel",function( event ){
			var dir	= event.originalEvent.wheelDelta;//获取滚动值
			dir = dir>0 ? 1 : 0; //判断滚动值
			var index = $this.index;
			
			if( dir ){
				if( --index < 0 ){
					
					index = $this.maxIndex
				}
			}else{
				
				if( ++index > $this.maxIndex ){
					index = 0;
					
				}
			};
			
			if( !$this.is(":animated") ){
				$this.animate({"top":"-"+index+"00%"} , 1000 ,function(){

				 $this.callback && $this.callback(index , $this.children("div").eq(index))
					
				});
				$this.index = index;
				
			}
		});
		 $this.callback && $this.callback(0 , $this.children("div").eq(0))
	};
})(jQuery)