module.exports = function(grunt)
{
	//Project config
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),

	
	connect:
	{
		server:
		{
			options:
			{
				open:
				{
					target: 'localhost',
					appName: 'Google Chrome'
				}
			}
		}
	},
	sass:
	{
			options:
			{
				sourceMap: true
			}, //options

		build:
			{

			files:
			{
				'assets/build/styles/style.css': 'scss/style.scss'
			} //files
			} //build
	}, //sass
// 
	watch:
		 {
			html:
			{
				files: ['*.html']
			},

			css:
			{
				files: ['*.css']
				
			
			}, //css

			javascript:
			{
				files: ['*.js']
			},
				options:
			{
				livereload: true,
				spawn: false

			}
			
		} //watch
});

grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-open');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.registerTask('default', ['connect', 'watch', 'open' ]);

};