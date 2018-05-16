suite('关于页面', function(){
    test('页面应当包含一个联系我们的链接', function(){
        assert($('a[href="/contact"]').length);
    });
});