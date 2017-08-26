window.onload = function(){
	//头部
	var header = document.getElementsByClassName("header")[0];
	
	//歌词
	var oCom = document.getElementsByClassName("Com")[0];
	var oText = document.getElementsByClassName("text")[0];
	var p = document.getElementsByTagName("p");
	//音乐文件
	var music = document.getElementById("aud");
	var lrc = document.getElementById("lrc");
	//控按钮
	var btn = document.getElementsByClassName("btn")[0];
	var pre = document.getElementsByClassName("pre")[0];
	var next = document.getElementsByClassName("next")[0];
	var next3 = document.getElementsByClassName("next3")[0];
	var next2 = document.getElementsByClassName("next2")[0];
	//音量
	var vom = document.getElementsByClassName("vom")[0];
	var vom1 = document.getElementsByClassName("jd")[0];
	var jd = vom1.getElementsByTagName("div")[1];
	var hk = vom1.getElementsByTagName("div")[0];
	//进度条
	var box = document.getElementById("box");
	var div1 = box.getElementsByTagName("div")[0];
	var div2 = box.getElementsByTagName("div")[1];
	var input = document.getElementsByTagName("input");
	var img = document.getElementById("img");
	var off = true;
	//点击开始
	btn.onclick = function(){
		if( off ){
			music.play();
			this.style.backgroundPosition = "-298px -82px";
			off = false;
			nowTime();
			timer = setInterval(nowTime,1000);
			header.style.cssText = "opacity : 1;";
					img.setAttribute("class" , "img"); 
				}else{
					music.pause();
					this.style.backgroundPosition = "-110px 6px";
					off = true;
					clearInterval(timer);
					img.setAttribute("class" , ""); 

				}
				input[1].value = time(music.duration);
			};

			//歌词同步
			var Com = lrc.value;//获取歌词
			var ComArr = Com.split("[");
			var html = "";
			for( var i = 0; i<ComArr.length ;i++ ){
				var arr = ComArr[i].split("]");//分离时间和歌词
				var timer = arr[0].split(".");//切割时间中的 .
				var times = timer[0].split(":");//切割时间中的 :
				
				var ms = times[0]*60+times[1]*1;//获取秒数
				var text = arr[1];//获取歌词
				if( text ){
					html += "<p id=p"+ ms +">"+ text +"</p>";
				};

				oText.innerHTML = html;
			}	
			
			//歌词联动
			
			music.addEventListener( "timeupdate" , function(){
				var curr = parseInt(this.currentTime);//获取到当前音乐播放进度时间
				
				if( document.getElementById("p"+curr) ){
					for( var i = 0 ;i<p.length ;i++ ){
						p[i].style.cssText = "color:#fff;opacity:.6;fontSize:16px;";
						
					}
					
					document.getElementById("p"+curr).style.cssText = "color:#0f0;opacity:1;font-size:18px;";

					for (var i=0;i<curr ; i++){
						oText.style.marginTop = -(20+curr)+"px";
					}
				}
				
			} );//timeupdate 时间改变时触发

			//获取当前时间 并在input里显示
			function nowTime(){
				
				input[0].value = time(music.currentTime);
				var n = music.currentTime/music.duration;
				div2.style.left = n*(+box.offsetWidth - div2.offsetWidth ) - 20 +"px";
				div1.style.width = ( 10+n*(box.offsetWidth - div2.offsetWidth ))+"px";
			}
			
			function time(cTime){
				cTime = parseInt(cTime);
				var h = zero(Math.floor(cTime/3600));
				var m = zero(Math.floor(cTime%3600/60));
				var s = zero(Math.floor(cTime%60));
				return m+":"+s;
			}
			function zero(num){
				
				if (num<10)
				{
					return "0"+num;
				}else{
					return " "+num;
				}
			}
			
			//播放进度条
			div2.onmousedown = function(ev){
				
				var ev = ev || window.event;
				var x = ev.clientX - div2.offsetLeft;
				document.onmousemove = function(ev){
					var ev = ev || window.event;
					var _left = ev.clientX - x;
					if (_left<0)
					{
						_left = 0;
					}else if (_left>box.offsetWidth - div2.offsetWidth )
					{
						_left = box.offsetWidth - div2.offsetWidth;
					}
					div2.style.left = _left+"px";
					div1.style.width = (_left+30) +"px";

					var n = _left/(box.offsetWidth - div2.offsetWidth);
				
					music.currentTime = n*music.duration;
					nowTime();
				}
				document.onmouseup = function(){
					document.onmousemove = null;
					document.onmouseup = null;
				}
			};

			//音量控制条
			hk.onmousedown = function( ev ){
				var ev = ev || window.event;
				var x = ev.clientX - this.offsetLeft;
				document.onmousemove = function( ev ){
					var ev = ev || window.event;
					var _left = ev.clientX - x;
					if( _left < 0 ){
						_left = 0;
					}else if( _left > vom1.offsetWidth - hk.offsetWidth  ){
						_left = vom1.offsetWidth - hk.offsetWidth;
					}
			
					hk.style.left = (_left-24)+"px";
					jd.style.width = (_left+10)+"px";
					//拖拽改变视频进度
					if( _left == 0 ){
						vom.style.backgroundPosition = "-192px -64px";
					}else{
						vom.style.backgroundPosition = "-192px -4px";
					}
					music.volume = _left/90;
					
					
				}
				document.onmouseup = function(){
					document.onmousemove = null;
					document.onmouseup = null;
				}
				
			};
			//点击收藏
			var mark = true;
			next3.onclick = function(){
				if( mark ){
					this.style.backgroundPosition = "-530px 8px"
					mark = false;
				}else{
					this.style.backgroundPosition = "-560px 8px"
					mark = true;
				}
			};
			//显示隐藏歌词
			var mark2 = true;
			next2.onclick = function(){
				if( mark2 ){
					oCom.style.cssText = "height:0px;";
					mark2 = false;
				}else{
					oCom.style.cssText = "heightt:276px;";
					mark2 = true;
				}
			};
		document.onselectstart = function(){//禁止文本复制（火狐不支持）
			return false;
		}
}