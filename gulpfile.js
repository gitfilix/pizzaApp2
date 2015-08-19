/**
 * Created by FLX on 12.08.2015.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var webserver = require('gulp-server-livereload');
//var webserver = require('gulp-webserver');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
//var angular = require('angular');
//var ngroute = require('angular-route');

// default livereload
//livereload({
//    start: true
//});

// gulp connect server
/*gulp.task('serve', function(){
    connect.server({
        root: 'app/index.html',
        port: 3001,
        host: '192.168.1.100',
        fallback: 'app/index.html',
        livereload: true
    });
});*/

gulp.task('serve', function(){
    gulp.src('app')
        .pipe(webserver({
            port: '777',
            livereload: true,
            directorylistening: true,
            fallback: 'index.html',
            open: true
        })
    );
    console.log('webserver reloaded - have a look');
});

/*gulp.task('watchhtml', function() {

    console.log('watch-html ');
    gulp.watch('app/templates/!*.html', ['serve'])
});*/


// sass processer and autoprefixer
gulp.task('sass-processor', function(){
    gulp.src('sass/*scss')
        //sass processer
        .pipe(sass())
        .on('error', function(error){
            console.error("Sass syntax Error may occured, - hey check your scss file again pal! ");
            this.emit('end');
        })
        // autoprefixer
        .pipe(autoprefixer({
            browsers: ['last 10 versions', 'IE 9', 'Safari 6.1'],
            cascade: false
            })
        )
        .pipe(gulp.dest('app/css/'));
    console.log('sass-processor: new css has been written');
});

// watcher function sass directory
gulp.task('watch', function (){
    console.log('webserver reloaded page');
    // watcher and execute sass processor task
    gulp.watch('sass/*.scss', ['sass-processor']);

    //gulp.watch('app/templates/*.html', ['serve'])
});





// default tasks: serve and watch for sass
gulp.task('default', ['serve','watch']);