/*������ǰҳ����*/
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
	document.onscroll = function(){//������������ʱ�����¼�
	var scrllTop = document.documentElement.scrollTop || document.body.scrollTop;//��ȡ��������ǰ��Top �߶�
	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;//��ȡ��ǰҳ��ֱ��ʿ��ÿ��
		if(scrllTop >= 100){//�жϵ�ǰ�������߶�
			object.style.cssText = "position:fixed;top:0px;left:0px;z-index:999;width:100%;padding:0px 250px;";
			if(width < 858){
				object.style.cssText = ""
			}
		}else{
			object.style.cssText = ""
		}
	}

}


/*�ٶȷ�����*/
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
