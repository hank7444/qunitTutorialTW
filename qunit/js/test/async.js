module('Async Test');

function getDataByAjax(success, error) {

    // 請將瀏覽器的cross-domain防護關掉才能測試喔..
    $.post('https://shinewedding-hank.rhcloud.com/api/getShowData.php', {type: 1}, function(data) {        
        success(data);
    }, 'json');
}


// 程式發生錯誤
/*
test('同步測試直接對異步的函式做測試...', function() {  
    
    // 當setTimeout還沒執行就結束, 導致ok還沒跑而發生no assert錯誤
    setTimeout(function() {  
        ok(true);  
    }, 1000);
})
*/

// 程式發生錯誤, stop()沒設還會影響到後面其他測試, 導致整體測試失敗, 切記要小心!
/*
test('用同步測試來實作異步測試-雙測試點,第二個測試點沒stop()時', function() {  
    
    // 在第一測試點前停下來 
    stop();  

    setTimeout(function() {  
        ok(true, '第一測試點');
        start(); // 程式繼續執行  
    }, 1000);

    // 還沒執行到第二測試點,函式執行就結束了, 只會測試到第一測試點
    setTimeout(function() {  
        ok(true, '第二測試點');  
        start(); // 程式繼續執行
    }, 2000) 
});
*/



test('用同步測試來實作異步測試-雙測試點,第二個測試點有stop()時', function() {  
    
    // 在第一測試點前停下來 
    stop();


    setTimeout(function() {  
       
        ok(true, '第一測試點');
        start(); // 程式繼續執行  
    }, 1000);

    // 在第二測試點前停下來
    stop();

    setTimeout(function() {  
        
        ok(true, '第二測試點'); 
        start(); // 程式繼續執行 
    }, 2000) 
});


test('用同步測試來實作異步測試-雙測試點,stop()都放在上方', function() {  
    
    // 兩個stop()都放在上方, 也可以正常執行
    stop();
    stop();

    setTimeout(function() {  
       
        ok(true, '第一測試點');
        start(); // 程式繼續執行  
    }, 1000);

    setTimeout(function() {  
        
        ok(true, '第二測試點'); 
        start(); // 程式繼續執行 
    }, 2000) 
});


test('用同步測試來實作異步測試-設定stop()與start()配對', function() {

    stop(10); // 編號10, 配對start(10)
    stop(5); // 編號5, 配對stop(5)

    setTimeout(function() {
       
        ok(true, '第一測試點');
        start(5); // 程式繼續執行
    }, 1000);

    setTimeout(function() {
       
        ok(true, '第二測試點');
        start(10); // 程式繼續執行
    }, 2000);
});


// 測試通過
asyncTest('start設在assert前面測試', function() {  
    
    setTimeout(function() {  
        start();
        ok(true);  
    }, 1000);
});


// 測試通過
asyncTest('start設在assert後面測試', function() {  
    
    setTimeout(function() {  
        ok(true);
        start();  
    }, 1000);
});



asyncTest('簡單的異步測試', function() {

    setTimeout(function() {
       
        ok(true, 'Passed and ready to resume!');
        start(); // 程式繼續執行
    }, 1000);
});




// 用了asyncTest(), 可以省去第一個stop設置, 但是第二測試點以後的程式碼仍需設定stop()
asyncTest('簡單的異步測試-雙測試點', function() {

    setTimeout(function() {
        start(); // 程式繼續執行
        ok(true, '第一測試點');
    });

    stop();

    setTimeout(function() {
        start(); // 程式繼續執行
        ok(true, '第二測試點');
        
    }, 2000);
});



asyncTest('ajax取資料異步測試', function() {

    var success = function(res) {
        equal(res.status, 'ok', '成功的status要回傳ok!');
        start(); // 程式繼續執行
    };
    var error = function(res) {

    };
    getDataByAjax(success, error);
});