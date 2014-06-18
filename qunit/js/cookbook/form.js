$(function() {

    // 表單欄位驗證
    $('#form').validate({

        success: 'valid',
        errorElement: 'span',
        errorClass: 'Jog',
        rules: {
            'input': {
                required: true,
                minlength: 2,
                maxlength: 10
            }
        },
        messages: {
            'input': {
                required: '必填',
                minlength: '最少2個字',
                maxlength: '最多10個字'
            }
        }
    });

    // 設定當按鈕按下後, result的區塊會出現You enter: input value
    $('#btn').click(function() {
        var inText = $('input').val();
        $('#result').show().text('You enter: ' + inText);
        $('#form').valid();
    });
});


module('From Test');
test('測試result欄位的訊息是否正確', function() {
    expect(1);
    $('#input').val('HelloQunit'); // 模擬將HelloQunit輸入到input欄位
    $('#btn').trigger('click'); // 模擬將按鈕點下
    equal($('#result').text(), 'You enter: HelloQunit', 'result test'); // result應該要出現'You enter: HelloQunit'
});

test('測試欄位驗證機制是否有正常運作', function() {
    expect(3);

    $('#input').val('');
    $('#btn').trigger('click');

    var errorMsg = $('#input').next('span').html();
    equal(errorMsg, '必填', '必填驗證測試通過');


    $('#input').val('哈');
    $('#btn').trigger('click');

    var errorMsg = $('#input').next('span').html();
    equal(errorMsg, '最少2個字', '最少2個字測試');


    $('#input').val('測試超過10個字的驗證');
    $('#btn').trigger('click');

    var errorMsg = $('#input').next('span').html();
    equal(errorMsg, '最多10個字', '最多10個字測試');
});
