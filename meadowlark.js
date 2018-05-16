var express = require('express');
var app = express();

//设置handlebars视图引擎
var handlebars = require('express-handlebars').create({
    defaultLayout:'main',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
app.engine('handlebars', handlebars.engine);//应用引擎
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);


app.use(express.static(__dirname + '/public'));

//用来检测查询字符串中的text=1的中间件
app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production'&&req.query.test === '1';
    next();
})

var fortuneCookies = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple.",
];
//创建好模板之后的新的路由
app.get('/',function(rep, res){
res.render('home');
})
//var num = Math.floor(Math.random()*10 + 1) 选择一到十之间的数值
app.get('/about', function(req,res){
	//var randomFortune = 
		//fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)];
	res.render('about', { 
        fortune: fortune.getFortune(),
       //fortune: randomFortune ,
        pageTestScript: '/qa/tests-about.js'
    });
});

//胡德河之旅和洱海冈海岸退潮
app.get('/tours/hood-river', function(req, res){
	res.render('tours/hood-river');
});
app.get('/tours/oregon-coast', function(req, res){
	res.render('tours/oregon-coast');
});
app.get('/tours/request-group-rate', function(req, res){
	res.render('tours/request-group-rate');
});


//404 catch-all 中间件
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
})
//505错误处理器 中间件
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});


//添加路由
/*app.get('/', function(req, res){
    res.type('text/plain');
    res.send('Meadowlark Travel');
});

app.get('/about', function(req, res){
    res.type('text/plain');
    res.send('Abount Meadowlark Travel');
});


//定制404页面
app.use(function(rep, res){
    res.type('text/plain');
    res.status(404);
    res.send('404-Not Found');
});

//定制500页面
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500-Server Error');
});*/

//舰艇页面端口
app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press CTRL-C to terminate.')
});