module('Equals Test');


test('boolean test', function() {

	var testBoolean = true;
	deepEqual(testBoolean, true, 'deepEqual test'); // ok
	equal(testBoolean, true, 'equal test'); // ok
	propEqual(testBoolean, true, 'propEqual test'); // ok
	strictEqual(testBoolean, true, 'strictEqual test'); // ok
});


test('boolean test, 布林值true與整數1測試', function() {

	var testBoolean = true;
	deepEqual(testBoolean, 1, 'deepEqual test'); // failed
	equal(testBoolean, 1, 'equal test'); // ok
	propEqual(testBoolean, 1, 'propEqual test'); // ok
	strictEqual(testBoolean, 1, 'strictEqual test'); // failed
});


test('int test', function() {

	var testInt = 1;
	deepEqual(testInt, 1, 'deepEqual test'); // failed
	equal(testInt, 1, 'equal test'); // ok
	propEqual(testInt, 1, 'propEqual test'); // ok
	strictEqual(testInt, 1, 'strictEqual test'); // ok
});


test('int test, 整數1與字串1測試', function() {

	var testInt = 1;
	deepEqual(testInt, '1', 'deepEqual test'); // failed
	equal(testInt, '1', 'equal test'); // ok
	propEqual(testInt, '1', 'propEqual test'); // failed, 貌似propEqual把整數當物件來測, 導致測試不通過
	strictEqual(testInt, '1', 'strictEqual test'); // failed
});


test('float test', function() {

	var testFloat = 10.55;
	deepEqual(testFloat, 10.55, 'deepEqual test'); // ok
	equal(testFloat, 10.55, 'equal test'); // ok
	propEqual(testFloat, 10.55, 'propEqual test'); // ok
	strictEqual(testFloat, 10.55, 'strictEqual test'); // ok
});


test('string test', function() {

	var testString = 'test string';
	deepEqual(testString, 'test string', 'deepEqual test'); // ok
	equal(testString, 'test string', 'equal test'); // ok
	propEqual(testString, 'test string', 'propEqual test'); // ok
	strictEqual(testString, 'test string', 'strictEqual test'); // ok
});


test('array test 一維陣列', function() {

	var testArray = [1, 2, 'hello', 'world'];
	deepEqual(testArray, [1, 2, 'hello', 'world'], 'deepEqual test'); // ok
	equal(testArray, [1, 2, 'hello', 'world'], 'equal test'); // failed, 不支援陣列比較
	propEqual(testArray, [1, 2, 'hello', 'world'], 'propEqual test'); // ok
	strictEqual(testArray, [1, 2, 'hello', 'world'], 'strictEqual test'); // failed, 不支援陣列比較
});


test('array test, 巢狀陣列', function() {

	var testArray = [1, 2, 'hello', 'world', [1, 2, 3]];
	deepEqual(testArray, [1, 2, 'hello', 'world', [1, 2, 3]], 'deepEqual test'); // ok
	equal(testArray, [1, 2, 'hello', 'world', [1, 2, 3]], 'equal test'); // failed, 不支援陣列比較
	propEqual(testArray, [1, 2, 'hello', 'world', [1, 2, 3]], 'propEqual test'); // ok
	strictEqual(testArray, [1, 2, 'hello', 'world', [1, 2, 3]], 'strictEqual test'); // failed, 不支援陣列比較
});


test('array test, 陣列(有兩個記憶體位置不同函式)', function() {

	var testArray = [1, 2, 'hello', 'world', function() { return 1;}];
	deepEqual(testArray, [1, 2, 'hello', 'world', function() { return 1;}], 'deepEqual test'); // failed
	equal(testArray, [1, 2, 'hello', 'world', function() { return 1;}], 'equal test'); // failed, 不支援陣列比較
	propEqual(testArray, [1, 2, 'hello', 'world', function() { return 1;}], 'propEqual test'); // ok
	strictEqual(testArray, [1, 2, 'hello', 'world', function() { return 1;}], 'strictEqual test'); // failed, 不支援陣列比較
});


test('array test, 陣列(有兩個記憶體位置相同的函式)', function() {

	var func = function() { 
		return 1;
	};
	var testArray = [1, 2, 'hello', 'world', func];
	deepEqual(testArray, [1, 2, 'hello', 'world', func], 'deepEqual test'); // ok
	equal(testArray, [1, 2, 'hello', 'world', func], 'equal test'); // failed
	propEqual(testArray, [1, 2, 'hello', 'world', func], 'propEqual test');  // ok
	strictEqual(testArray, [1, 2, 'hello', 'world', func], 'strictEqual test'); // failed
});


test('object test, 兩個內容一樣, 但記憶體位置不一樣的物件(無函式)', function() {

	var testObject = {
		name: 'mark',
		age: 18,
		profile: {
			job: 'IT Geek'
		}
	};
	var expectObject = {
		name: 'mark',
		age: 18,
		profile: {
			job: 'IT Geek'
		}
	};
	deepEqual(testObject, expectObject, 'deepEqual test'); // ok
	equal(testObject, expectObject, 'equal test'); // failed, 不支援物件比較
	propEqual(testObject, expectObject, 'propEqual test'); // ok
	strictEqual(testObject, expectObject, 'strictEqual test'); // failed, 不支援物件比較
});


test('object test, 兩個內容一樣, 但記憶體位置不一樣的物件(有函式)', function() {

	var testObject = {
		name: 'mark',
		getName: function() {
			return this.name;
		}
	};
	var expectObject = {
		name: 'mark',
		getName: function() {
			return this.name;
		}
	};
	deepEqual(testObject, expectObject, 'deepEqual test'); // failed
	equal(testObject, expectObject, 'equal test'); // failed, 不支援物件比較
	propEqual(testObject, expectObject, 'propEqual test'); // ok
	strictEqual(testObject, expectObject, 'strictEqual test'); // failed, 不支援物件比較
});


test('object has function test, 預期結果物件的getName()爲測試物件的getName()的參考', function() {

	var testObject = {
		name: 'mark',
		age: 18,
		profile: {
			job: 'IT Geek'
		},
		getName: function() {
			return this.name;
		}
	};
	var expectObject = {
		name: 'mark',
		age: 18,
		profile: {
			job: 'IT Geek'
		},
		getName: testObject.getName
	};
	deepEqual(testObject, expectObject, 'deepEqual test'); // ok
	equal(testObject, expectObject, 'equal test'); // failed, 不支援物件比較
	propEqual(testObject, expectObject, 'propEqual test'); // ok
	strictEqual(testObject, expectObject, 'strictEqual test'); // failed, 不支援物件比較
});


test('function test, 兩個內容一樣, 但是記憶體位置不一樣的函式', function() {

	var testFunction = function(a, b) {
		return a + b;
	};
	var expectFunction = function(a, b) {
		return a + b;
	};
	deepEqual(testFunction, expectFunction, 'deepEqual test'); // failed
	equal(testFunction, expectFunction, 'equal test'); // failed
	propEqual(testFunction, expectFunction, 'propEqual test'); // ok
	strictEqual(testFunction, expectFunction, 'strictEqual test'); // failed
});


test('function test, 預期結果函式爲測試函式的參考', function() {

	var testFunction = function(a, b) {
		return a + b;
	};
	var expectFunction = testFunction;

	deepEqual(testFunction, expectFunction, 'deepEqual test'); // ok
	equal(testFunction, expectFunction, 'equal test'); // ok, 建議還是用deepEqual來進行函式的比較
	propEqual(testFunction, expectFunction, 'propEqual test'); // ok
	strictEqual(testFunction, expectFunction, 'strictEqual test'); // ok, 建議還是用deepEqual來進行函式的比較
});


test('regular expression test, 正規表示式物件測試', function() {

	var regTest = new RegExp("(([a-zA-Z0-9]+)=([a-zA-Z0-9]+))","ig");
	var regExpect = new RegExp("(([a-zA-Z0-9]+)=([a-zA-Z0-9]+))","ig");

	deepEqual(regTest, regExpect, 'deepEqual test'); // ok
	equal(regTest, regExpect, 'equal test'); // failed, 不支緣正規表示式比較
	propEqual(regTest, regExpect, 'propEqual test'); // ok
	strictEqual(regTest, regExpect, 'strictEqual test'); // failed, 不支緣正規表示式比較
});


test('date test, 日期物件測試', function() {

	var dateTest = new Date(79, 5, 24, 11, 33, 0);
	var dateExpect = new Date(79, 5, 24, 11, 33, 0);

	deepEqual(dateTest, dateExpect, 'deepEqual test'); // ok
	equal(dateTest, dateExpect, 'equal test'); // failed, 不支援日期比較
	propEqual(dateTest, dateExpect, 'propEqual test'); // ok
	strictEqual(dateTest, dateExpect, 'strictEqual test'); // failed, 不支援日期比較
});