window.onload = function(){
	Game.init();
	document.onselectstart = function(){//禁止文本复制（火狐不支持）
		return false;
	}

};
var Game = {
	"box" : document.getElementById("box"),

	//飞机
	"img" : function(){
		//图片预加载
		this.oPane = new Image();
		this.oPane.src = "images/plane.png";
		this.oPane.className = "play";
		
	},

	//场景初始化（初始界面）
	"init" : function(){
		
		//图片预加载
		this.img();

		var oTitle =  this.cte("h3");
			oTitle.innerHTML = "";
		this.box.appendChild(oTitle);//在一个元素下创建一个子元素
		var oDiv = this.cte("div");
		oDiv.innerHTML = "<p>简单</p><p>中等</p><p>困难</p>";
		this.box.appendChild(oDiv);//在一个元素下创建一个子元素
		
		var op = oDiv.children;//获一个元素下面所有子元素集合
		
		for(var i = 0;i<op.length;i++){
			op[i].index = i;
			op[i].onmouseover = function(){//当鼠标移上来时发生的事件
				this.className = "p1"
			};
			op[i].onmouseout = function(){//当鼠标离开时发生的事件
				this.className = ""
			}
			op[i].onclick = this.start;//当鼠标点击的时候清空box
		}
	},

	//游戏开始
	
	"start" : function(ev){
		ev = ev || event;
		Game.overNum = false;
		Game.deffnum = this.index;
		Game.box.innerHTML = "";//清空box(注：事件对象 this 拿不到当前的对象的某个功能)
		Game.plane( ev );//调用飞机功能
		//敌军生成速度****************
		Game.star = setInterval(function(){
			Game.enemy( );	
		},Game.diff[Game.deffnum][0]);
		Game.scoring();
		Game.Bg();
	},

	"diff" : [
		[ 1000 , 5 , 100 ],// [敌军生产速度
		[ 200 , 8 , 100 ],//敌军下落速度
		[ 250 , 15 , 100 ]//我军子弹生产速度
	],

	"Bg" : function(){
		var index = 0;
		var oBox = document.getElementById("box").style.backgroundPositionyY = "10px";
		
	},
	//我方 飞机
	"plane" : function( ev ){
		this.box.appendChild( this.oPane );
		//获取鼠标到(clientX窗口)(pageX文档)垂直方向位置
		//获取鼠标到(clientY窗口)(pageY文档)窗口水平方向位置
		
		//获取box 与窗口top的距离 加 飞机除以一半的y高度（oPane/2）+ box 总高度(+border) - 减去 box(设置的高度width除以 2)  = 鼠标(pageX文档)垂直方向位置减去飞机高度的一半 得到 top
		var bT =  this.box.offsetTop + this.oPane.clientHeight / 2 + (this.box.offsetHeight - this.getstyle( this.box , "height" ))/2;
		var top = ev.pageY - bT;
		//获取box 与窗口left的距离 加 飞机除以一半的宽度（oPane/2）+ box 总宽度(+border) - 减去 box(设置的宽度width除以 2) - 获取鼠标(pageY文档)水平方向位置
		var bL = this.box.offsetLeft + this.oPane.clientWidth / 2 + (this.box.offsetWidth - this.getstyle( this.box , "width" ))/2;
		var left = ev.pageX - bL;				

		this.oPane.style.cssText = 'top:'+top+'px;left:'+left+'px;';
		//box 总高度(+border) - (飞机)oPane 高度的一半 = 482
		var topmax = this.getstyle( this.box , "height" ) - this.oPane.clientHeight / 2;
		//飞机(oPane )宽度的一半 = -30
		var leftMin = - this.oPane.clientWidth / 2 ;
		// box(设置的宽度width) - 飞机(oPane )宽度的一半 = 270
		var leftMax = this.getstyle( this.box , "width" ) - this.oPane.clientWidth / 2;

		document.onmousemove = function( ev ){//鼠标指针移动时发生的事件
			ev = ev || event

			top = ev.pageY - bT;
			left = ev.pageX - bL;

			if( top < 0 ){//飞机 < box bottom 
				top  = 0;
			}else if( top > topmax ){
				top = topmax;
			}
			if( left < leftMin){
				left = leftMin;
			}else if( left > leftMax ){
				left = leftMax;
			}

			Game.oPane.style.cssText = 'top:'+top+'px;left:'+left+'px;';//(注：事件对象 this 拿不到当前的对象的某个功能)
		}

		//子弹生成的速度
		Game.bTimer = setInterval(function(){
			Game.bullet( top , left );
		},Game.diff[Game.deffnum][2]);

	},	


	//飞机子弹 **********************
	"bullet" : function( pTop , pLeft ){
		
		var oB = this.cte("img");
		oB.src = "images/bullet.png";//插入子弹图片
		this.box.appendChild( oB );//在box 创建
		oB.className = "bullet";
		
		var top = ( pTop - this.getstyle( oB , "height" ) + 5 );
		//飞机与box 高度（oPane）
		var left = ( pLeft + this.oPane.clientWidth /2 - this.getstyle(  oB , "width" ) / 2 );

		oB.style.cssText = "top:"+top+"px;left:"+left+"px";
		
		//子弹发射速度 ***********************
		oB.timer = setInterval(function(){
			if( !oB.parentNode ){
				clearInterval( oB.timer );
				return;
				
			}
			top -= 10;//速度
			oB.style.top = top + "px";
			if( top < -22 ){
				clearInterval( oB.timer );//清除定时器
				oB.parentNode.removeChild( oB )//找到父元素删除他下面的子节点
				
			}
		},30);
		

	},
	

	//敌军战机

	"enemy" : function(){
		var oEnemy = this.cte( "img" );
		oEnemy.src = "images/enemy.png";
		this.box.appendChild( oEnemy );//创建一个敌军战机
		oEnemy.className = "enemy";
		//随机数（Math.random()） * box的宽度（width）- 敌军战机的宽度（getstyle） = left
		var left = parseInt(Math.random() * ( this.box.clientWidth - this.getstyle( oEnemy , "width" )));
		var top = this.getstyle( oEnemy , "top" );//敌军战机top的距离
		
		oEnemy.style.left = left+"px";

		oEnemy.timer = setInterval(function(){
			if ( Game.overNum ){
				clearInterval( oEnemy.timer );
				oEnemy.parentNode.removeChild( oEnemy );
				return;
			}
			//敌军下落速度******
			top += Game.diff[Game.deffnum][1];
			oEnemy.style.top = top+"px";
			if( top > this.box.clientHeight ){
				clearInterval( oEnemy.timer );//清除定时器
				
				oEnemy.parentNode.removeChild( oEnemy );//找到父元素删除他下面的子节点
				
			}else{
				//敌军 挂
				var allB = Game.box.getElementsByClassName("bullet");//找到所有子弹
				for(var i = 0;i<allB.length;i++){
					if (Game.pz( oEnemy , allB[i] ) ){//当子弹与敌军战机碰撞的时候
						allB[i].parentNode.removeChild( allB[i] );//清除子弹
						oEnemy.src = "images/boom.png";//把敌军战机的图片改掉
						clearInterval( oEnemy.timer );//当清除定时器
						setTimeout( function(){//清除敌军战机
							oEnemy.parentNode.removeChild(oEnemy) 
						},500 );

						Game.num += 10;//加得分
						Game.oScore.innerHTML = " 得分 "+Game.num;
						
						
					}
					if( Game.pz( oEnemy , Game.oPane ) ){//当我方战机和敌军战机碰撞的时候
						Game.overNum = true;
						Game.oPane.src = 'images/boom2.png';//
						document.onmousemove = null;//把我方战机的图片改掉
						clearInterval(Game.bTimer);//停止子弹生成
						clearInterval(Game.star);//停止敌军战机生成
						
						setTimeout( Game.over , 3000 )//挂了之后

						
					}
				}
			}
		},30)
	},
	//挂了之后
	"over" : function(){
		
		this.box.innerHTML = "";
		var oOver = Game.cte( "div" );
		var op1 = Game.cte( "div" );
		var btu = Game.cte( "button" );
		var span = Game.cte( "span" );
		
		oOver.className = "over";
		span.className = "ospan"
		this.box.appendChild(oOver);
		oOver.appendChild(op1);
		op1.appendChild(btu);
		oOver.appendChild(span);
		
		op1.className = "restart";
		btu.id = "restart";
		document.getElementById('restart').onclick = function(){
			Game.box.innerHTML = '';
			Game.init();
		};
		span.innerHTML = Game.num;
	},
	
	//计分
	"scoring" : function(){
			Game.oScore = Game.cte('span');
			Game.oScore.className = 'scrting';
			Game.num = 0;
			Game.oScore.innerHTML = " 得分 "+Game.num;
			Game.box.appendChild(Game.oScore);
			

	},

	//飞机和子弹的碰撞
	"pz" : function( obj1 , obj2  ){
		var T1 = this.getstyle( obj1 , "top" );
		
		var B1 = T1 + this.getstyle( obj1 , "height" );
		var L1 = this.getstyle( obj1 , "left" );
		var R1 = L1 + this.getstyle( obj1 , "width" );

		var T2 = this.getstyle( obj2 , "top" );
		var B2 = T2 + this.getstyle( obj2 , "height" );
		var L2 = this.getstyle( obj2 , "left" );
		var R2 = L2 + this.getstyle( obj2 , "width" );

		if ( T1 > B2 || L1 > R2 || B1 < T2 || R1 < L2  ){
			return false;
			
		}else{
			return true;
		}
	},

	"cte" : function(  tagName ){
		return document.createElement( tagName );
	},

	"getstyle" : function( obj , attr ){
		return obj.currentStyle ? parseInt(currentStyle[attr]) : parseInt(getComputedStyle( obj )[attr]);
	}



};
