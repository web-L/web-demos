
    var flag = true;/*延时加载标识*/
    var index = 0;/*banner图索引*/
    var timer;/*定时器引用变量*/
    var topFlag= true;/*回到顶部标识*/
    $(function(){
        /*初始化banner自动切换*/
        $("#ban-nav li").eq(0).css("backgroundPosition","-74px -116px");
        loop_banner_change();
        /*微信二维码显示*/
        $("#board-qr,.weixin").hover(function(){
            //$(this).find("img").stop();
            $(this).find("img").fadeTo("500",1);
        },function(){       
            $(this).find("img").animate({
            opacity: "hide"
            },"500");
        })
        /*课程导航右侧图标变换样式 */
        $(".big-banner-ul ul li").hover(function(){
            $(this).find("i").css("backgroundPosition","-157px -163px");
        },function(){
            $(this).find("i").css("backgroundPosition","-147px -163px")
        })
        /*课程导航右侧菜单显示 */
        $(".course-li").hover(function(){
            
            $(this).find(".course-list").fadeIn("slow").show();
        },function(){
            $(".course-list").stop();
            $(this).find(".course-list").fadeOut("slow").hide();
        })
        /*banner图滑动触发左右按钮显示 */
        $("#ban-ul li").hover(function(){
            $(".ban-pre,.ban-next").show();
            /*清除自动切换图片*/
            if(timer){
                clearInterval(timer);
            }
        },function(){
            $(".ban-pre,.ban-next").hide();
            /*启动自动切换图片*/
            loop_banner_change();
        })
        
        /*banner图左侧按钮滑动变换样式 */
        $(".ban-pre").hover(function(){
            $(".ban-pre,.ban-next").show();
            $(this).css("backgroundPosition","-172px 0");
            if(timer){
                clearInterval(timer);
            }
        },function(){
            $(this).css("backgroundPosition","-74px 0");
        })
        /*banner图右侧按钮滑动变换样式 */
        $(".ban-next").hover(function(){
            $(".ban-pre,.ban-next").show();
            $(this).css("backgroundPosition","0 -57px");
            if(timer){
                clearInterval(timer);
            }
        },function(){
            $(this).css("backgroundPosition","-123px 0");
        })
        
        /*banner图左侧按钮点击切换banner图*/
        $(".ban-pre").click(function(){
            if(flag){
                flag=false;
                if(index!=0){
                    index--;
                }else{
                    index = $("#ban-nav li").length-1
                }           
                banner_change(index);
                timeout();
            }               
        })
        /*banner图右侧按钮点击切换banner图*/
        $(".ban-next").click(function(){
            if(flag){
                flag=false;
                if(index<$("#ban-nav li").length-1){
                    index++;
                }else{
                    index = 0;
                }           
                banner_change(index);
                timeout();
            }               
        })
        /*banner图底部按钮触发保持左右侧按钮显示 */
        $("#ban-nav").hover(function(){
            $(".ban-pre,.ban-next").show();
            if(timer){
                clearInterval(timer);
            }
        })
        /*banner图底部按钮滑动触发切换效果 */
        $("#ban-nav li").mouseover(function(){
            $(this).css("backgroundPosition","-74px -116px").siblings().css("backgroundPosition","-87px -116px");
            var _index=$(this).index();
            var background=$(this).data("color");
            $("#ban-ul a").stop();
            $("#ban-ul a:visible").hide();
            $("#ban-ul li").eq(_index).find("a").fadeIn("slow").show();
            $(".big-bg").css("background",background);
            index = _index;
        })
        /*热门课程导航效果*/
        $(".course-hot-nav li").hover(function(){
            $(this).css("borderBottom","2px solid #188eee").siblings().css("borderBottom","0px");
            if($(this).is($("#video").parents("li"))){
                $(this).find("i").css("backgroundPosition","-49px -78px");
            }else{
                $("#video").css("backgroundPosition","-49px -99px");
            }
            $(".course-hot-nav ul a").css("color","#333");
            $(this).find("a").css("color","#188eee");

        })
        /*热门课程导航切换效果*/
        $("#course-type li").hover(function(){
            var _index = $(this).index();
            var $menu = $(".course-hot-menu ul").eq(_index);
            $menu.stop();
            $menu.find("li .course-img").stop();
            $menu.fadeIn("600").show().siblings().hide();
            /*兼容ie无缝浏览器*/
            $menu.find("li .course-img").fadeIn("600").show().parents("ul").siblings().find("li .course-img").hide();
        })
        /*职业技能课程选项卡切换*/
        $(".job-type li").each(function(index){
            $(this).hover(function(){
                var _index = $(this).index();
                var $menu = $(".catalog-menu .catalog-menu-div ul").eq(index);
                $menu.stop();
                $menu.find("li .course-img").stop();
                $menu.show().siblings("ul").hide();
                $(".course-rank").eq(index).show().siblings(".course-rank").hide();
            })
        })
        /*职业技能排行选项卡切换*/
        $(".rank-type li").each(function(index){
            $(this).hover(function(){
                $(this).addClass("rank-type-sel").siblings().removeClass("rank-type-sel");
                $(".rank-menu-ul").eq(index).show().siblings().hide();
            })
        })

        /*入驻机构切换next切换*/
        $(".agency-next").click(function(){
            //$(".agency-list ul").clone().appendTo($(".agency-list"));
            //$(".agency-list ul").animate({right:"890"},300);
        })
        /*回到顶部小飞机滑动移入特效*/
        $(".jump-container-div").mouseover(function(e){
            var $jumpTop = $(".jump-container").find(".jump-top");
            if($jumpTop.css("opacity")!=undefined&&$jumpTop.css("opacity")!=0){
                $(".jump-top").addClass("jump-top-hover");
                var $plane =$(this).find(".jump-plane");
                $plane.stop().show().animate({"top":25},"normal");
                topFlag = "";
            }
        })
        /*回到顶部小飞机滑动移出特效*/
        $(".jump-container-div").mouseout(function(e){
            //alert(e.currentTarget.outerHTML+"====="+e.target.outerHTML + "=====" + e.relatedTarget.outerHTML)
            if(!e.target.contains(e.relatedTarget)||e.relatedTarget.contains(e.target)){
                var $plane= $(this).find(".jump-plane");
                $(".jump-top").removeClass("jump-top-hover");
                if(!topFlag||topFlag == ""){
                    $plane.stop().hide().css({"top":82});
                    topFlag = true;
                }
            }
        })
        /*回到顶部问题反馈特效*/
        $(".jump-container").find(".support").hover(function(){
            $(".jump-container").find("span").show();
        })
        $(".jump-container").find("span").mouseout(function(){
            $(this).hide()
        })
        /*回到顶部隐藏显示特效*/
        $(window).scroll(function(){
            var $jumpTop = $(".jump-container-div").find(".jump-top");
            if($(this).scrollTop()>0){
               if($jumpTop.css("opacity")==undefined||$jumpTop.css("opacity")==0){
                   $jumpTop.css({"opacity":0}).fadeTo(500,1);
                   $(".jump-container-div").find("div").stop().fadeTo(500,1).css("top",0);
                   $(".jump-container-div").find(".jump-top").removeClass("jump-top-hover");
                   //$(".jump-container-div").find(".jump-plane").css({"top":82});
               }
            }else{
               $(".jump-container-div").find(".jump-top").fadeTo(500,0);
               $(".jump-container-div").stop().find("div").fadeTo(500,0);
            }
        })
        /*回到顶部点击事件*/
        $(".jump-container-div").find("div .jump-plane").click(function(){
            $('body,html').animate({scrollTop:0},"normal");
            $(".jump-container-div").find("div").animate({"top":-1300},"normal",function(){
                topFlag = false;
            });
            topFlag =true;
        })
    })
    /*自动定时切换banner图*/
    function loop_banner_change(){
        timer = setInterval(function(){
            $(".ban-next").trigger("click");
        },5000);
    }
    
    /*切换banner图特效*/
    function banner_change(index){
        $("#ban-nav li").eq(index).css("backgroundPosition","-74px -116px");
        $("#ban-nav li").eq(index).siblings().css("backgroundPosition","-87px -116px");
        var background=$("#ban-nav li").eq(index).data("color");
        $("#ban-ul a").stop();
        $("#ban-ul a:visible").hide();
        $("#ban-ul li").eq(index).find("a").fadeIn("slow").show();
        $(".big-bg").css("background",background);
    }
    /*延时加载*/
    function timeout(){
        var setTimer = setTimeout(function(){
            flag = true;
            clearTimeout(setTimer);
        },1000);
    }

	(function(){
		var $Right = $(".agency-div .agency-next");
		var $Left = $(".agency-div .agency-pre");
		var $Ul = $(".agency-list ul");
		var $list = $(".agency-list");
		$list.append( $Ul.clone());
		var $index = 0;
		console.log($Ul.length)
		$Right.click(function(){
			
			$index++;
			if( $index >= 2  ){
				$index = 1;
				return
			}
			$list.animate({
				left : -$index*1060+"px"
			},500);
			
		});

		$Left.click(function(){
			
			$index--;
			if( $index < 0  ){
				$index = 0;
				return;
			}
			$list.animate({
				left : $index*1100+"px"
			},500);
			
		});
	})();