window.onload = function(){
	
	var oBox = document.getElementById("box"),
	oUl = document.getElementById("list"),
	oTab = document.getElementById("Tab"),
	oTabLi = oTab.getElementsByTagName("li"),
	oLeft = document.getElementById("left"),
	oRight = document.getElementById("right"),
	oBanner = document.getElementById("banner");
	var oTabLilength = oTabLi.length;
	var index = 0;
	var Time;
	var Width = parseInt(getstyle( oBox ,"width" ));

	for(var i=0 ; i < oTabLilength ;i++ ){
		oTabLi[i].index = i
		oTabLi[i].onclick = function(){//横排小按钮
			index = this.index;
			play();
		}
	}

	
	oRight.onclick = function(){//右边按钮
		index++
		index %= oTabLilength
		move( oUl , "left" , -Width*index, 30 )
		play()
	}	

	oLeft.onclick = function(){//左边按钮
		index--
		if( index < 0 ){
			index = oTabLilength-1;
		}
		move( oUl , "left" , -Width*index, 30 )
		
		 play()
	}
	
	oBanner.onmouseover = function(){//当鼠标移上的时候停止定时器
		clearInterval( Time );
		oLeft.style.display = "block";
		oRight.style.display = "block";
	}
	oBanner.onmouseout = function(){//当鼠标移开的时候调用定时器
		auto();
		oLeft.style.display = "none";
		oRight.style.display = "none";
	}
	auto()
	function auto(){//定时轮播
		Time = setInterval(function(){
			index++
			index %= oTabLilength;
			play()
		},3000)	
	}
	
	function play(){
		for(var j=0;j<oTabLilength;j++){
				oTabLi[j].className = ""
			}
			oTabLi[index].className = "hover";
			
			move( oUl , "left" , -Width*index, 30 )
	};
		
	//速度版运动框架
	function move( obj , attr , target , speed ){

		var start = parseInt( getstyle(obj , attr) );
			// 初始值

		var end = parseInt( target );
			//结束值

		if ( start >= end ){//（如果开始值大于结束值就累减）
			speed = -speed;	
		}
		//判断开始和结束值大小决定累加还是累减

		var timer = setInterval(function(){
			start += speed;//速度
			
			//console.log(speed)
			if( speed < 0 ){
				attN =  start <= end
			}else{
				attN = start >= end;
			}
			//结束条件
			
			if ( attN  )
			{
				start = end;
				clearInterval( timer );
			}
			obj.style[attr] = start + 'px';
		},13);
	}
	function getstyle( obj , attr ){
		return obj.currentStyle ? currentStyle[attr] : getComputedStyle( obj )[attr];
	}
}