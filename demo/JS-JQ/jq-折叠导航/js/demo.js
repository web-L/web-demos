$(function(){
	//执行
	//找到所有需要点击的菜单的对象
	var $menus = $('#menu ul.list li.item span');
	//绑定点击事件
	$menus.click(function(){
		var $ul = $(this).next('ul');
		$menus.next('ul').not($ul).slideUp('slow');
		$ul.slideDown('slow');
		
	});
	$menus.eq(0).trigger('click');
});