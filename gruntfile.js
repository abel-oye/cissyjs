module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*!<%= pkg.name %><%= grunt.template.today("yyyy-mm-dd") %>*/\n'
      },
      build: {
        src: 'src/js/<%= pkg.name %>.js',
        dest: 'build/js/<%= pkg.name %>.min.js'
      }
    },
    sass: { // Task
      dist: { // Target
        options: { // Target options
          style: 'expanded'
        },
         files: {
          'build/css/app.css': 'src/sass/app.scss'
         }
      }
    },
    watch: {
      //sass: {
        files: ['src/sass/*.scss','src/js/*.js'],
        tasks: ['sass','uglify']
      //}
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['sass','uglify']);

};