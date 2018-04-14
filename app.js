var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var startersRouter = require('./routes/starters');
var maincoursesRouter = require('./routes/maincourses');
var dessertsRouter = require('./routes/desserts');
var aboutRouter = require('./routes/about');
var recapRouter = require('./routes/recap');
var plotRouter = require('./routes/plot');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var addUserNameRouter = require('./routes/addUserName');
var profileRouter = require('./routes/profile');
var historyRouter = require('./routes/history');

var loginValidateRouter = require('./routes/loginValidate');

//database communicatie bestanden
var loadProducts = require('./routes/loadProducts');
var checkLoginRouter = require('./routes/checkLogin');
var registerUserRouter = require('./routes/registerDatabase');
var editprofileRouter = require('./routes/profileDatabase');
var historyDatabaseRouter = require('./routes/historyDatabase');

var app = express();

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/starters', startersRouter);
app.use('/maincourses', maincoursesRouter);
app.use('/desserts', dessertsRouter);
app.use('/about', aboutRouter);
app.use('/recap', recapRouter);
app.use('/plot', plotRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/history', historyRouter);

app.use('/loginValidate', loginValidateRouter);

app.use('/api/addUserName', addUserNameRouter);
app.use('/api/checkLogin', checkLoginRouter);
app.use('/api/products', loadProducts);
app.use('/api/register', registerUserRouter);
app.use('/api/profile', editprofileRouter);
app.use('/api/history', historyDatabaseRouter);
app.use('/profile', profileRouter);

// /profile?user=Dentist

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
