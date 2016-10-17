var gulp = require('gulp'),
    connect = require('gulp-connect'),
    del = require('del'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace'),
    sass = require('gulp-sass')
    ;

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        livereload: true
    });
});

gulp.task('clean', function() {
    return del([
        'dist/**/*'
    ]);
});

gulp.task('copy-dev', function() {
    return gulp.src('./src/**/*')
        .pipe(gulp.dest('./dist'));
});

gulp.task('create-bundle', function() {
    return gulp.src('./src/**/*.js')
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('generate-prod-html', function() {
    return gulp.src('./src/index.html')
        .pipe(htmlreplace({
            'js': '<script src="app.min.js"></script>',
            'sass': '<link rel="stylesheet" href="main.css">'
        }))
        .pipe(gulp.dest('./dist'));
});

//WATCH
gulp.task('watch', function() {
    gulp.watch(['./src/**/*.html', './src/js/**/*.js', './src/content/sass/**/*.scss'], gulp.series('build'))
});

gulp.task('force-reload', function() {
    return gulp.src('./src/*.html')
        .pipe(connect.reload());
});

//SASS
gulp.task('sass', function() {
    return gulp.src('./src/content/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/content/css/'));
});

//FONT
gulp.task('fonts', function() {
    return gulp.src(['node_modules/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.*'])
            .pipe(gulp.dest('dist/content/fonts/bootstrap/'));
});


gulp.task('web', gulp.parallel('connect', 'watch'));
//Dev
gulp.task('build', gulp.series('clean', 'copy-dev', 'sass', 'fonts', 'force-reload'));
gulp.task('build-dev', gulp.series('clean', 'copy-dev', 'sass', 'fonts'));
//Production
gulp.task('build-prod', gulp.series('clean', gulp.parallel('generate-prod-html', 'create-bundle')));
gulp.task('default', gulp.parallel('web'));
