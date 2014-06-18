module('Throw Test');


test('throws', function() {

    function CustomError(message) {
        this.message = message;
    }

    function CustomErrorAnother(message) {
        this.message = message;
    }

    CustomError.prototype.toString = function() {
        return this.message;
    };

    // 測試函式是否有拋出錯誤
    throws(
        function() {
            throw 'error'
        },
        'throws with just a message, not using the "expected" argument'
    );

    throws(
        function() {
            return 'hello world';
        },
        'no throw any error'
    );

    // 測試錯誤物件是否為預期的錯誤物件類型
    throws(
        function() {
            throw new CustomError();
        },
        CustomError,
        'raised error is an instance of CustomError'
    );

    throws(
        function() {
            throw new CustomErrorAnother();
        },
        CustomError,
        'raised error is not an instance of CustomError'
    );

    // 測試錯誤訊息中是否有包含指定的字串
    throws(
        function() {
            throw new CustomError('some error description');
        },
        /description/,
        'raised error message contains "description"'
    );

    throws(
        function() {
            throw new CustomError('some error description');
        },
        /hello/,
        'raised error message do not contains "description"'
    );
});