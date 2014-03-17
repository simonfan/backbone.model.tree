require.config({
	urlArgs: 'bust=0.3803535318002105',
	baseUrl: '/src',
	paths: {
		requirejs: '../bower_components/requirejs/require',
		text: '../bower_components/requirejs-text/text',
		mocha: '../node_modules/mocha/mocha',
		should: '../node_modules/should/should',
		'backbone.collection.tree': 'index',
		'backbone.collection.queryable': '../bower_components/backbone.collection.queryable/built/backbone.collection.queryable',
		'backbone.collection.lazy': '../bower_components/backbone.collection.lazy/built/backbone.collection.lazy',
		backbone: '../bower_components/backbone/backbone',
		containers: '../bower_components/containers/built/containers',
		itr: '../bower_components/itr/built/itr',
		deep: '../bower_components/deep/built/deep',
		jquery: '../bower_components/jquery/dist/jquery',
		'object-query': '../bower_components/object-query/built/object-query',
		lodash: '../bower_components/lodash/dist/lodash.compat',
		qunit: '../bower_components/qunit/qunit/qunit',
		'requirejs-text': '../bower_components/requirejs-text/text',
		subject: '../bower_components/subject/built/subject',
		underscore: '../bower_components/underscore/underscore',
		lazy: '../bower_components/lazy.js/lazy'
	},
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: [
				'jquery',
				'underscore'
			]
		},
		underscore: {
			exports: '_'
		},
		mocha: {
			exports: 'mocha'
		},
		should: {
			exports: 'should'
		},
		lazy: {
			exports: 'Lazy',
		}
	}
});
