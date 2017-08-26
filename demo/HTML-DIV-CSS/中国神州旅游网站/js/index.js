	$(".Part1 .P_Info .sel_but span").hover(function(){
		$(".Part1 .P_Info .sel_but span").removeClass("s_hover");//移出按扭样式
		$(this).addClass("s_hover");//给鼠标滑上去的，添加对应的样式
		var div = {}//新建数组
		div = $(".Part1 .P_Info .s_con");//获取样式是.con的div
		for(var i=0;i<2;i++){
			if(i==$(this).index()){
				div.eq(i).show();//显示	
			}else{
				div.eq(i).hide();//隐藏
			}
		};
	});
			//banner 动画特效
			//获取ID
			var byid = function (id) {return typeof id === "string" ? document.getElementById(id) : id};
			//获取tagName
			var $$ = function (tagName, oParent) {return (oParent || document).getElementsByTagName(tagName)};
			//自动播放对象
			var AutoPlay = function (id) {this.initialize(id)};
			AutoPlay.prototype = {
				initialize: function (id)
				{
			var oThis = this;
			this.oBox = byid(id);
			this.oUl = $$("ul", this.oBox)[0];
			this.aImg = $$("img", this.oBox);
			this.timer = null;
			this.autoTimer = null;
			this.iNow = 0;
			this.creatBtn();
			this.aBtn = $$("li", this.oCount);
			this.toggle();
			this.autoTimer = setInterval(function ()
			{
				oThis.next()
			}, 3000);
			this.oBox.onmouseover = function ()
			{
				clearInterval(oThis.autoTimer)
			};
			this.oBox.onmouseout = function ()
			{
				oThis.autoTimer = setInterval(function ()
				{
					oThis.next()
				}, 3000)
			};
			for (var i = 0; i < this.aBtn.length; i++)
			{
				this.aBtn[i].index = i;
				this.aBtn[i].onmouseover = function ()
				{
					oThis.iNow = this.index;
					oThis.toggle()
				}
			}
		},
			creatBtn: function ()
			{
				this.oCount = document.createElement("ul");
				this.oFrag = document.createDocumentFragment();
				this.oCount.className = "count";
				for (var i = 0; i < this.aImg.length; i++)
				{
					var oLi = document.createElement("li");
					oLi.innerHTML = i + 1;
					this.oFrag.appendChild(oLi)
				}
				this.oCount.appendChild(this.oFrag);
				this.oBox.appendChild(this.oCount)
			},
			toggle: function ()
			{
				for (var i = 0; i < this.aBtn.length; i++) this.aBtn[i].className = "";
				this.aBtn[this.iNow].className = "current";
				this.doMove(-(this.iNow * this.aImg[0].offsetHeight))
			},
		next: function ()
		{
			this.iNow++;
			this.iNow == this.aBtn.length && (this.iNow = 0);
			this.toggle()
		},
		doMove: function (iTarget)
		{
			var oThis = this;
			clearInterval(oThis.timer);
			oThis.timer = setInterval(function ()
			{
				var iSpeed = (iTarget - oThis.oUl.offsetTop) / 5;
				iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				oThis.oUl.offsetTop == iTarget ? clearInterval(oThis.timer) : (oThis.oUl.style.top = oThis.oUl.offsetTop + iSpeed + "px")
			}, 30)
		}
	};
		window.onload = function ()
		{
			new AutoPlay("banner");//执行的外在的DIv
		};
	//图片滚动特效

	var tabTop=document.getElementById("demoTop");
	var tab3=document.getElementById("demo3");
	var tab4=document.getElementById("demo4");
	tab4.innerHTML=tab3.innerHTML;

	var speed=40;

	function Marquee2(){
	if(tabTop.scrollTop>=tab4.offsetHeight)
	tabTop.scrollTop-=tab3.offsetHeight
	else{
	tabTop.scrollTop++;
	}
	}
	//Download by http://www.codefans.net

	var MyMar2=setInterval(Marquee2,speed);



	tabTop.onmouseover=function() {clearInterval(MyMar2)};
	tabTop.onmouseout=function() {MyMar2=setInterval(Marquee2,speed)};
