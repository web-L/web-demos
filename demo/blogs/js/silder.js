/*导航当前页高亮*/
var obj = null;
var oTop = document.getElementById('topnav');
var As = oTop.getElementsByTagName('a');
obj = As[0];
for(i=1;i<As.length;i++){
	if(window.location.href.indexOf(As[i].href)>=0)
	obj=As[i];
}
obj.id='topnav_current'

scrTop(oTop)

function scrTop(object){
	document.onscroll = function(){//当滚动条滚动时发生事件
	var scrllTop = document.documentElement.scrollTop || document.body.scrollTop;//获取滚动条当前离Top 高度
	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;//获取当前页面分辨率可用宽度
		if(scrllTop >= 100){//判断当前滚动条高度
			object.style.cssText = "position:fixed;top:0px;left:0px;z-index:999;width:100%;padding:0px 250px;";
			if(width < 858){
				object.style.cssText = ""
			}
		}else{
			object.style.cssText = ""
		}
	}

}


/*百度分享广告*/
window._bd_share_config={
	"common":{"bdSnsKey":{},
	"bdText":"",
	"bdMini":"1",
	"bdMiniList":false,
	"bdPic":"",
	"bdStyle":"1",
	"bdSize":"32"},
	"share":{}
	};
with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script'))
	.src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
