let project_folder = "assets/style";
let sourse_folder = "assets";

let path = {
    build:{
        css: project_folder + "/css/",
    },
    src:{

        css: sourse_folder + "/#SRC/style.scss",

    },
    watch:{

        css: sourse_folder + "/#SRC/**/*.scss",

    },
    clean: "./" + project_folder + "/.style.css"

}

let {src, dest } = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),

    del = require("del"),
    scss = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    group_media = require("gulp-group-css-media-queries"),
    clean_css = require("gulp-clean-css"),
    rename = require("gulp-rename");


function browserSync(params) {
    browsersync.init({
        server:{
            baseDir: "./" + project_folder + "/"
        },
        port:3000,
        notyfy: false
    })
}


function css() {
    return src(path.src.css)
        .pipe(scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            group_media()
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"],
                cascade: true
            })
        )
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}




function watchFiles(params){

    gulp.watch([path.watch.css], css);

}

function clean(params){
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(css));
let watch = gulp.parallel(build, watchFiles, browserSync);


exports.css = css;
exports.build = build;
exports.watch = watch;
exports.default = watch;