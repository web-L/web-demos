window.onload = function(){
	var vid = document.getElementById("vid");
	var input = document.getElementsByTagName("input");
	var oBox = document.getElementById("box");
	var div = oBox.getElementsByTagName("div");
	var oBox2 = document.getElementById("box2");
	var cover = document.getElementById("cover");
	var play2 = document.getElementById("play2");
	var div2 = oBox2.getElementsByTagName("div");
	
	var time = null;
	var off = true;
	//点击暂停/播放
	play( play2 );
	play( input[0] );
	function play(obj){
		obj.onclick = function(){
			if( off ){
				this.style.background = "url('images/pause.jpg')";
				vid.play();//播放
				off = false;
				nweTime();
				time = setInterval(nweTime,1000);
				play2.style.display = "none"
				cover.style.display = "none"
			}else{
				this.style.background = "url('images/play.jpg')";
				play2.style.display = "block"
				vid.pause();//暂停
				off = true;
				clerarInterval( time );
				
			};
			input[2].value = cTime( vid.duration );//视频总时间
		};
	}
	//视频开始时间
	function nweTime(){
		input[1].value = cTime(vid.currentTime);
			
		var n = vid.currentTime/vid.duration;
		div[0].style.left = parseInt(n * (oBox.offsetWidth - div[0].offsetWidth)) +"px";
		div[1].style.width = parseInt((20+n * (oBox.offsetWidth - div[0].offsetWidth))) +"px";
	};
	
	function cTime( cTime ){
		cTime = parseInt(cTime);
		var h = zero(Math.floor( cTime / 3600 ));
		var m = zero(Math.floor( cTime % 3600 / 60 ));
		var s = zero(Math.floor( cTime % 60 ));
		return h + ":"+ m +":"+s;
	}

	function zero( num ){
		if( num<10 ){
			return "0"+num
		}else{
			return " "+num;
		}
	};
	//播放进度条
	div[0].onmousedown = function( ev ){
		var ev = ev || window.event;
		var x = ev.clientX - this.offsetLeft;
		document.onmousemove = function( ev ){
			var ev = ev || window.event;
			var _left = ev.clientX - x;
			if( _left < 0 ){
				_left = 0;
			}else if( _left > oBox.offsetWidth - div[0].offsetWidth  ){
				_left = oBox.offsetWidth - div[0].offsetWidth;
			}
			div[0].style.left = _left+"px";
			div[1].style.width = (_left+20)+"px";
			//拖拽改变视频进度
			var n = _left / (oBox.offsetWidth - div[0].offsetWidth);
			vid.currentTime = n * vid.duration;
			nweTime();
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		}
	};
	

	//音量控制条
	div2[0].onmousedown = function( ev ){
		var ev = ev || window.event;
		var x = ev.clientX - this.offsetLeft;
		document.onmousemove = function( ev ){
			var ev = ev || window.event;
			var _left = ev.clientX - x;
			if( _left < 0 ){
				_left = 0;
			}else if( _left > oBox2.offsetWidth - div2[0].offsetWidth  ){
				_left = oBox2.offsetWidth - div2[0].offsetWidth;
			}
			div2[0].style.left = _left+"px";
			div2[1].style.width = (_left+14)+"px";
			//拖拽改变视频进度
			vid.volume = _left/90;
			
			
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		}
	};

	//静声
	var off2 = true;
	input[3].onclick = function(){
		if( off2 ){
			vid.muted = true;
			this.style.background = "url(images/volume2.jpg)";
			off2 = false;
		}else{
			vid.muted = false;
			this.style.background = "url(images/volume.jpg) -4px -2px";
			off2 = true;
		}
	};

	var off3 = true;
	input[4].onclick = function(){			
		vid.webkitRequestFullScreen();
	};

	document.onselectstart = function(){//禁止文本复制（火狐不支持）
		return false;
	}	
};