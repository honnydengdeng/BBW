var gulp=require("gulp");
var sass=require("gulp-sass")
var sourcemaps=require("gulp-sourcemaps")
var connect=require("gulp-connect")
var concat=require("gulp-concat")
var uglify=require("gulp-uglify")
var rename=require("gulp-rename")
var babel=require("gulp-babel")
gulp.task("copy-index",function(){
	gulp.src("*.html").pipe(gulp.dest("dist"))
	.pipe(connect.reload());
});
gulp.task("sass",function(){
	gulp.src("sass/*.scss")
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle:'comprssed'}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
	
})
gulp.task("copyimg",function(){
	gulp.src("img/**")
	.pipe(gulp.dest("dist/imgs"))
	.pipe(connect.reload());
})
gulp.task("copyJs",function(){
	gulp.src("js/*.js")
	.pipe(babel({"presets":["es2015"]}))
	.pipe(uglify())
	.pipe(gulp.dest("dist/js"))
})
gulp.task("watch",function(){
	gulp.watch("*.html",["copy-index"])
	gulp.watch("img/**",["copyimg"])
	gulp.watch("js/*.js",["copyJs"])
	gulp.watch("sass/*.scss",["sass"])
})

gulp.task("server",function(){
	connect.server({
		"root":"dist",
		"livereload":true 
	})
})
gulp.task("default",["server","watch"])