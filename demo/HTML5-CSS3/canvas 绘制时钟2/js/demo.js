	var can = document.getElementById("can").getContext("2d");
	auto();
	function auto(){
		can.clearRect( 0 , 0 , 500 , 500 );
		//获取本地时间
		var date = new Date();
		var sec = date.getSeconds();//秒
		var min = date.getMinutes();//分
		var hour = date.getHours();//时

		//将分针转化为小时
		hour = hour + min / 60;
		//将24小时制改为12小时制
		hour = hour>12 ? hour - 12 : hour;

		//表盘
		can.lineWidth = 4;
		for( var i = 0; i<75 ;i++ ){
			can.beginPath()
			can.moveTo( 255 , 255 );
			can.arc( 250 , 250 , 200 , i*5*Math.PI / 180 , ( i+1 )*5*Math.PI / 180 , false );
			can.closePath();
			can.stroke();
		}
		//分 刻度
		can.fillStyle = "#fff";
		can.beginPath();
		can.arc( 250 , 250 , 186 , 0 ,  360 , false );
		can.closePath();
		can.fill();
			
		//表盘
		can.lineWidth = 6;
		for( var i = 0; i<12 ;i++ ){
			can.beginPath()
			
			can.moveTo( 255 , 255 );
			can.arc( 250 , 250 , 200 , i*30*Math.PI / 180 , ( i+1 )*30*Math.PI / 180 , false );
			can.closePath(); 
			can.stroke();
		}
		//时 刻度
		can.fillStyle = "#fff";
		can.beginPath();
		can.arc( 250 , 250 , 180 , 0 ,  360 , false );
		can.closePath();
		can.fill();

		//时针
		can.lineWidth = 10;
		can.lineJoin   = "round";
		can.beginPath();
		can.moveTo( 255 , 255 );
		can.arc( 250 , 250 , 140 , ( +90+hour*30 )*Math.PI / 180 , ( +90+hour*30 )*Math.PI / 180 , false );
		can.closePath();
		can.stroke();
		
		//分针
		can.lineWidth = 8;
		can.beginPath();
		can.moveTo( 255 , 255 );
		can.arc( 250 , 250 , 170 , ( +90+min*6 )*Math.PI / 180 , ( +90+min*6 )*Math.PI / 180 , false );
		can.closePath();
		can.stroke();

		//秒针
		can.save();
		can.lineWidth = 4;
		can.beginPath();
		can.moveTo( 255 , 255 );
		can.arc( 250 , 250 , 180 , ( +90+sec*6 )*Math.PI / 180 , ( +90+sec*6 )*Math.PI / 180 , false );
		can.closePath();
		can.stroke();
		can.restore();
		
		//中心圆
		can.beginPath();
		can.fillStyle = "#000";
		can.fillStyle = "#fff";
		can.arc( 250 ,258 , 10 , 0 , 360 , false );
		can.closePath();
		can.stroke();
		can.fill();

		
	};

	setInterval(auto,1000);