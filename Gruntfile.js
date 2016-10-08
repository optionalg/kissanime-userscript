// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

	// ===========================================================================
	// CONFIGURE GRUNT ===========================================================
	// ===========================================================================
	grunt.initConfig({

		// get the configuration info from package.json ----------------------------
		// this way we can use things like name and version (pkg.name)
		pkg: grunt.file.readJSON('package.json'),

		// all of our configuration will go here
		 // configure jshint to validate js files -----------------------------------
		jshint: {
			options: {
				reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
			},

			// when this task is run, lint the Gruntfile and all js files in src
			build: ['Gruntfile.js', 'Userscript/AutoPlay.user.js']
		},
	compass: {
		 dist: {
				options: {
						sassDir: 'Userscript/materialize-src/sass',
						cssDir: 'Userscript',
						environment: 'production',
						outputStyle: 'compressed'
							}
				 }
		},
	copy: {
			main: {
			 files: [
			 // includes files within path
			 {expand: true, src: ['bower_components/jquery/dist/jquery.min.js'], flatten: true, dest: 'Chrome Extension/', filter: 'isFile'},
			 {expand: true, src: ['bower_components/jquery/dist/jquery.min.js'], flatten: true, dest: 'Opera Extension/', filter: 'isFile'},
			 {expand: true, src: ['bower_components/underscore/underscore-min.js'], flatten: true, dest: 'Chrome Extension/', filter: 'isFile'},
			 {expand: true, src: ['bower_components/underscore/underscore-min.js'], flatten: true, dest: 'Opera Extension/', filter: 'isFile'},
			 {expand: true, src: ['Userscript/materialize.css'], flatten: true, dest: 'Chrome Extension/', filter: 'isFile'},
			 {expand: true, src: ['Userscript/materialize.css'], flatten: true, dest: 'Opera Extension/', filter: 'isFile'},
			 {expand: true, src: ['bower_components/materialize/sass/components/**'], flatten: true, dest: 'Userscript/materialize-src/sass/components/'},
			],
	},
	},
	});

	// ===========================================================================
	// LOAD GRUNT PLUGINS ========================================================
	// ===========================================================================
	// we can only load these if they are in our package.json
	// make sure you have run npm install so our app can find these
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.registerTask('default', ['copy', 'compass', 'jshint']);
	grunt.registerTask('dev', ['jshint']);
	grunt.registerTask('build', ['copy', 'compass']);
};
