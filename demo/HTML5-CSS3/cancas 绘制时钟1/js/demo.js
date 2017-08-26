var can = document.getElementById("can").getContext("2d");
auto();
function auto(){
		
	//清空画布
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

	//1、绘制表盘
	can.lineWidth = 16;//线条宽度
	can.strokeStyle = "rgba(255,255,255,0.5)";//线条颜色
	can.beginPath();//开始路劲
	can.arc( 250 , 250 , 200 , 0 , 360 , false );//绘制圆(水平 ，垂直 , 半径 ，开始位置 , 结束位置,逆时针绘图 )
	can.stroke();//调用触笔方法绘制
	can.closePath();//结束路劲

	//2、绘制时刻度
	for( var i = 0 ; i<12 ;i++ ){
		can.save()//保存路径
		can.translate( 250 , 250 );//改变中心点( 垂直 ，水平 )
		can.lineWidth = 5;
		can.fillStyle = "#fff";
		can.rotate( 30*i*Math.PI/180 );//旋转角度
		can.beginPath();
		can.arc( 5 , 174 , 5 , 0 , 360 , false );
		can.fill();
		can.stroke();
		
		can.restore();//恢复路径
	};
	//3、绘制分刻度
	for( var i = 0 ; i<75 ;i++ ){
		can.save()//保存路径
		can.translate( 250 , 250 );//改变中心点( 垂直 ，水平 )
		can.lineWidth = 2;
		can.fillStyle = "rgba(255,255,255,0.8)";
		can.rotate( 5*i*Math.PI/180 );//旋转角度
		can.beginPath();//开始路径
		can.moveTo( 5 , 170 );//将触笔移动到x,y点
		can.lineTo( 5 , 180 );//绘制到x,y点
		can.stroke();
		can.closePath();//结束路径
		can.restore();//恢复路径
	};
	//4、绘制时针
	can.save();
	can.translate( 255 , 255 );
	can.strokeStyle = "#fff";
	can.lineWidth = 6;
	can.lineCap  = "round";
	can.rotate( hour*30*Math.PI/180 );//旋转角度
	can.beginPath();
	can.moveTo( 0 , 114 );
	can.lineTo( 0 , 0 );
	can.stroke();
	can.closePath();
	can.restore();
	//5、绘制分针
	can.save();
	can.translate( 255 , 255 );
	can.strokeStyle = "#fff";
	can.lineWidth = 6;
	can.lineCap  = "round";
	can.rotate( min*6*Math.PI/180 );//旋转角度
	can.beginPath();
	can.moveTo( 0 , 138 );
	can.lineTo( 0 , 0 );
	can.stroke();
	can.closePath();
	can.restore();
	//6、绘制秒针
	can.save();
	can.translate( 255 , 257 );
	can.strokeStyle = "#fff";
	can.lineWidth = 3;
	can.lineCap  = "round";
	can.rotate( sec*6*Math.PI/180 );//旋转角度
	can.beginPath();
	can.moveTo( 0 , 153 );
	can.lineTo( 0 , -28 );
	can.stroke();
	can.closePath();
	//7、钟表的装饰
	can.beginPath();
	can.fillStyle = "#fff";
	can.arc( 0 , 0 , 10 , 0 , 360 , false );
	can.stroke();
	can.fill();
	can.closePath();

	can.beginPath();
	can.fillStyle = "#fff";
	can.arc( 0 , -30 , 5 , 0 , 300 , false );
	can.stroke();
	can.fill();
	can.closePath();

	can.restore();
	

}
//8、让时钟动起来
setInterval(auto,1000);