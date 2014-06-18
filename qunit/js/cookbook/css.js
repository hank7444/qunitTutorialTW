$(function() {
	$('#colorBox').mouseover(function() {
		$(this).addClass('hover');
	});

	$('#colorBox').mouseleave(function() {
		$(this).removeClass('hover');
	});
});


module('CSS Test');
test('測試當滑鼠移到colorBox上方, colorBox是否會變綠色, 滑鼠移開又會還原', function() {
    
	expect(2);

	backgroundColor = $('#colorBox').mouseover().css('background-color');
    equal(backgroundColor, 'rgb(0, 255, 0)', '測試滑鼠移入時是否變為綠色');

    backgroundColor = $('#colorBox').mouseleave().css('background-color');
    equal(backgroundColor, 'transparent', '測試滑鼠出時是否變為透明');
});