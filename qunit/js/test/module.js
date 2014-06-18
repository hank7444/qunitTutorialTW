module('group a');
test('group a test 1', function() {
    ok(true, 'this test is fine');
});
test('group a test 2', function() {
    ok(true, 'this test is fine');
});


module('group b');
test('group b test 1', function() {
    ok(true, 'this test is fine');
});
test('group b test 2', function() {
    ok(true, 'this test is fine');
});


var testTarget = 1;

module('group c', {
	setup: function() {
		console.log('group c before test');
		testTarget++; 
	},
	teardown: function() {
		console.log('group c after test');
		testTarget++;
	}
});
test('group c test 1', function() {
    equal(testTarget, 2, 'testTarget == 2');
});
test('group c test 2', function() {
    equal(testTarget, 4, 'testTarget == 4');
});