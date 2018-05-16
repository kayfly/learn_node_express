suite('Global Tests', function(){
    test('page has a valid title', function(){
        assert(document.title&&document.title.match(/\s/)&&document.title.toUpperCase() !== 'TODO');
    });
});//这里的suite被称为测试套件(test suite)，test被称为测试用例(test case)，它也是一个函数，第一个参数是测试用例的名称('page has a valid title')，第二个参数是一个实际执行的函数。