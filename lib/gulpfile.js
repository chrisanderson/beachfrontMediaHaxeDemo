var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');

gulp.task('js-debug', function()
{
    return gulp.src('../bin/debug/client/js/*js')
      //.pipe(browserify())
      //.pipe(uglify())
      .pipe(gulp.dest('../js'));
});

gulp.task('js-release', function()
{
    return gulp.src('../bin/release/client/js/*js')
      //.pipe(browserify())
      .pipe(uglify())
      .pipe(stripDebug())
      .pipe(gulp.dest('../js'));
});

gulp.task('php-debug', function()
{
    return gulp.src('../bin/debug/midtier/**/*php')
      //.pipe(browserify())
      //.pipe(uglify())
      .pipe(gulp.dest('../midtier'));
});

gulp.task('php-release', function()
{
    return gulp.src('../bin/release/midtier/**/*php')
      //.pipe(browserify())
      //.pipe(uglify())
      //.pipe(stripDebug())
      .pipe(gulp.dest('../midtier'));
});

gulp.task('serve', function()
{
    browserSync.init({
        proxy:'haxe.beachfrontmedia.demo',
        open:false
    });

    //watch haxe export files
    gulp.watch("../bin/debug/client/js/*.js", ['js-debug']);
    gulp.watch("../bin/release/client/js/*.js", ['js-release']);
    gulp.watch("../bin/debug/midtier/*.php", ['php-debug']);
    gulp.watch("../bin/release/midtier/*.php", ['php-release']);

    gulp.watch("../*.html").on('change', browserSync.reload)
    gulp.watch("../lib/app/*.html").on('change', browserSync.reload);
    gulp.watch("../js/*.js").on('change', browserSync.reload);
    //gulp.watch("../swf/*.swf").on('change', browserSync.reload);
    //gulp.watch("../**/*.{js, swf}").on('change', browserSync.reload);
    gulp.watch("../css/*.css").on('change', browserSync.reload);
    gulp.watch("../midtier/lib/midtier/**/*.php").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);