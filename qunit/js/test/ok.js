module('OK Test');


test('ok test', function() {
    ok(true, 'true succeeds');
    ok('non-empty', 'non-empty string succeeds');
    ok(1, 'integer succeeds');
    ok(1.11, 'float succeeds');
    ok({name: 'hank'}, 'object succeeds');
    ok(function() {return 1;}, 'function succeeds');

    ok(false, 'false fails');
    ok(0, '0 fails');
    ok(-0, '-0 fails');
    ok(NaN, 'NaN fails');
    ok('', 'empty string fails');
    ok(null, 'null fails');
    ok(undefined, 'undefined fails');
});
