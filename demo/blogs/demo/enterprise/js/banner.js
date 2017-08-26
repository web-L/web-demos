linkarr = new Array();
            picarr = new Array();
            textarr = new Array();
            var swf_width=269;
            var swf_height=210;
            var files = "images/pic.jpg|images/pic1.jpg|images/pic2.jpg|images/pic3.jpg";
            var links = "#|#|#|#";
            var texts = "";
            for(i=1;i<picarr.length;i++){
              if(files=="") files = picarr[i];
              else files += "|"+picarr[i];
            }
            for(i=1;i<linkarr.length;i++){
              if(links=="") links = linkarr[i];
              else links += "|"+linkarr[i];
            }
            for(i=1;i<textarr.length;i++){
              if(texts=="") texts = textarr[i];
              else texts += "|"+textarr[i];
            }
            document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="'+ swf_width +'" height="'+ swf_height +'">');
            document.write('<param name="movie" value="images/indexpic.swf"><param name="quality" value="high">');
            document.write('<param name="menu" value="false"><param name=wmode value="opaque">');
            document.write('<param name="FlashVars" value="bcastr_file='+files+'&bcastr_link='+links+'&bcastr_title='+texts+'">');
            document.write('<embed src="images/indexpic.swf" wmode="opaque" FlashVars="bcastr_file='+files+'&bcastr_link='+links+'&bcastr_title='+texts+'& menu="false" quality="high" width="'+ swf_width +'" height="'+ swf_height +'" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />'); document.write('</object>');
