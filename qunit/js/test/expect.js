module('Expect Test');

// ok
test('expect測試, 沒設定expect(), 則測試中所有assert通過, 該測試才通過', function() {

    equal(1, 1, '1 == 1');
    notEqual(2, 1, '1 != 2');
});

// ok
test('expect測試, expect()未輸入數字, 則測試中所有assert通過, 該測試才通過', function() {

    expect();

    equal(1, 1, '1 == 1');
    notEqual(2, 1, '1 != 2');
});

// ok
test('expect測試, 若assert有不通過, 即使其他assert通過並與expect指定數字一樣, 仍判定該測驗不通過', function() {

    expect(2);

    equal(1, 1, '1 == 1');
    notEqual(2, 1, '1 != 2');
    equal(1, 2, '1 == 2');
});

// ok
test('expect測試 expect == assert', function() {

    expect(2);

    equal(1, 1, '1 == 1');
    notEqual(2, 1, '1 != 2');
});

// failed, 預期只會有一個assert通過, 但是出現兩個通過, 故測試失敗
test('expect測試, expect < assert', function() {

    expect(1);

    equal(1, 1, '1 == 1');
    notEqual(2, 1, '1 != 2');
});

// failed, 預期會有三個assert通過, 但是只出現兩個通過, 故測試失敗
test('expect測試 expect > assert', function() {

    expect(3);

    equal(1, 1, '1 == 1');
    notEqual(2, 1, '1 != 2');
});

// failed
test('expect測試, 同時有兩個expect, 以下面的為主', function() {

    expect(2);
    expect(1);

    equal(1, 1, '1 == 1');
    notEqual(2, 1, '1 != 2');
});

// ok, 但建議寫在函式的最上方
test('expect測試, 寫在assert下面', function() {

    equal(1, 1, '1 == 1');
    notEqual(2, 1, '1 != 2');

    expect(2);
});