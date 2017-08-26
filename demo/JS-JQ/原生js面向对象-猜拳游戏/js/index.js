	//当DOM加载完成之后回调事件
		window.onload = function(){
			//面向对象继承 实现
			Function.prototype.extends = function(base,extend){//传入（构造器，对象）
				for(var prop in base.prototype){//遍历构造器的prototype
					this.prototype[prop] = base.prototype[prop];//把 base 的 prototype 所有的功能全部付给当前对象prototype
				}
				for(var prop in extend){//遍历extend 对象
					this.prototype[prop] = extend[prop];//把 extend 对象的功能付给 当前对象prototype
				}
			}
			
			function Play(name){
				this.name = name;
				this.point = 0;
			}
			Play.prototype.guess = function(){//所有玩家都有出拳的功能
				
			}
			//玩家构造器
			function User(name){
				Play.call(this,name);
			}
			//User 继承于Play 在些之上还添加{ 功能 } 
			User.extends(Play,{
				guess : function(point){
					return this.point = point;
				}
			});
			//电脑构造器
			function Comp(name){
				Play.call(this,name);
			}
			Comp.extends(Play,{
				guess : function(){
					return this.point = (Math.random()*10<<2)%3;//生成 0 1 2 之间的随机数
				}
			});
			
			//赌局构造器
			function Game( u , c ){
				this.user = u;
				this.comp = c;
				this.init();
			}
			Game.prototype = {
				init : function(){
					var Name1 = document.getElementById("name1");//获取name1 元素
					var Name2 = document.getElementById("name2");//获取name2 元素
					Name1.innerHTML = "我："+this.user.name;
					Name2.innerHTML = "电脑："+this.comp.name;

				},
				//按钮功能
				disbelButton : function(){
					var oBtu = document.getElementById("op");
					if(oBtu.disabled){
						oBtu.disabled = false;//让按钮可以点击
						oBtu.style.cssText = "";
						oBtu.value = " 再来一局！"
					}else{
						oBtu.disabled = true;//禁止按钮点击
						oBtu.style.cssText = "border-color:#bbb;color:#666;background:#ccc;font-size:28px;cursor:default;";
						oBtu.value = "游戏中.."
					}
				},
				//猜拳的动画
				starAninmate : function(){
					//让猜拳面板显示
					var oGuess = document.getElementById("guess");//获取 guess(面板)
					oGuess.style.display = "block"
					
					var anims = document.getElementsByClassName("anim");
					var i = 0;
					this.time1 = window.setInterval(function(){//定时器
						i++
						anims[0].className = "anim user g_guess"+i%3;//图片滚动
					},200);
					this.time2 = window.setInterval(function(){//定时器
						i++
						anims[1].className = "anim user g_guess"+i%3;//图片滚动
					},120);
				},
				//提示文本
				hinttext : function(text){
					var oTxt = document.getElementById("txt");
					oTxt.innerHTML = text;//改变提示文本
				},
				play : function(btu){
					this.disbelButton();//调用让按钮失去功能，改变样式
					this.starAninmate();//调用开始猜拳的动画
					this.hinttext("请您出拳。。");//调用提示文本功能
					
				},
				///裁决
				verdic : function(point){
					window.clearInterval(this.time1);//停止定时器
					window.clearInterval(this.time2)//停止定时器
					
					var Ucount = this.user.guess(point);//玩家点数
					var Ccount =  this.comp.guess();//电脑点数

					var anims = document.getElementsByClassName("anim");
					
					anims[0].className = "anim user g_guess" + Ucount;
					anims[1].className = "anim user g_guess" + Ccount;
					var res = Ucount - Ccount;
					switch(res){
						case 0:
							this.hinttext("┑(￣Д ￣)┍v好吧～平局！");
						break;
						case -1:
						case 2:
							this.hinttext("O(∩_∩)O哈哈～我赢了");
						break;
						case 1:
						case -2:
							this.hinttext("我靠( ‵o′)凸～输了");
						break;
					}
	
					this.disbelButton();
					var oGuess = document.getElementById("guess");
					oGuess.style.display = "none"
				}
			}
			var user = new User("赌侠");
			var comp = new Comp("赌圣");
			game = new Game( user , comp );
			
			document.onselectstart = function(){//禁止文本复制（火狐不支持）
				return false;
			}
		};
	var game;