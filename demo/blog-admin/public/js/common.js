/*
* @Author: Ali
* @Date:   2017-03-29 19:15:10
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-29 20:18:40
*/

layui.define(['jquery'],function(exports){
  var $ = layui.jquery;
  var obj = {
		// 添加Cookie
		addCookie : function (name, value, options) {
			if (arguments.length > 1 && name != null) {
				if (options == null) {
					options = {};
				}
				if (value == null) {
					options.expires = -1;
				}
				if (typeof options.expires == "number") {
					var time = options.expires;
					var expires = options.expires = new Date();
					expires.setTime(expires.getTime() + time * 1000);
				}
				if (options.path == null) {
					options.path = "/";
				}
				if (options.domain == null) {
					options.domain = "";
				}
				document.cookie = encodeURIComponent(String(name)) + "=" + encodeURIComponent(String(value)) + (options.expires != null ? "; expires=" + options.expires.toUTCString() : "") + (options.path != "" ? "; path=" + options.path : "") + (options.domain != "" ? "; domain=" + options.domain : "") + (options.secure != null ? "; secure" : "");
			}
		},

		// 获取Cookie
		getCookie : function (name) {
			if (name != null) {
				var value = new RegExp("(?:^|; )" + encodeURIComponent(String(name)) + "=([^;]*)").exec(document.cookie);
				return value ? decodeURIComponent(value[1]) : null;
			}
		},

		// 移除Cookie
		removeCookie : function (name, options) {
			this.addCookie(name, null, options);
		},

		// Html转义
		escapeHtml : function (str) {
			return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
		},

		// 字符串缩略
		abbreviate : function (str, width, ellipsis) {
			if ($.trim(str) == "" || width == null) {
				return str;
			}
			var i = 0;
			for (var strWidth = 0; i < str.length; i++) {
				strWidth = /^[\u4e00-\u9fa5\ufe30-\uffa0]$/.test(str.charAt(i)) ? strWidth + 2 : strWidth + 1;
				if (strWidth >= width) {
					break;
				}
			}
			return ellipsis != null && i < str.length - 1 ? str.substring(0, i) + ellipsis : str.substring(0, i);
		}
  };
  
  exports('com', obj);
}); 

