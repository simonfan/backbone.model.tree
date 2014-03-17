(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'backbone.model.tree',
		// dependencies for the test
		deps = [mod, 'should'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(Tree, should) {
	'use strict';

	describe('Tree base', function () {
		beforeEach(function (done) {
			done();
		});

		it('is fine (:', function () {

			var tree = new Tree();

			tree.addBranch([
				{ id: 'b1', name: 'apple', colors: ['red', 'green'] },
				{ id: 'b2', name: 'orange', colors: ['orange'] },
				{ id: 'b3', name: 'grape', colors: ['purple', 'green'] },
			]);

			var b1 = tree.branches.get('b1'),
				b2 = tree.branches.get('b2'),
				b3 = tree.branches.get('b3');

			b1.addBranch([
				{ id: 'b11', name: 'banana', colors: ['yellow'] },
				{ id: 'b12', name: 'watermelon', colors: ['green', 'red'] }
			]);

			b2.addBranch([
				{ id: 'b21', name: 'pineapple', colors: ['yellow', 'brown'] },
				{ id: 'b22', name: 'lemon', colors: ['green', 'yellow'] },
				{ id: 'b23', name: 'cherry', colors: ['red'] }
			]);


			var b11 = b1.branches.get('b11'),
				b12 = b1.branches.get('b12'),
				b23 = b2.branches.get('b23');

			b11.addBranch([
				{ id: 'b111', name: 'strawberry', colors: ['red'] },
				{ id: 'b112', name: 'melon', colors: ['yellow', 'green'] }
			]);

			b12.addBranch([
				{ id: 'b121', name: 'kiwi', colors: ['green', 'brown'] },
				{ id: 'b122', name: 'pear', colors: ['yellow', 'red', 'green'] }
			]);

			b23.addBranch({ id: 'b231', name: 'cranberry', colors: ['red', 'purple'] });




			var redDescendants = tree.descendants({
				colors: 'red'
			});

			console.log(redDescendants.map(function (descendant) {
				return descendant.attributes;
			}).toArray());



			var b1GreenDescendants = b1.descendants({
				colors: 'green'
			});

			console.log(b1GreenDescendants.map(function (descendant) {
				return descendant.get('name') + ' ' + descendant.get('id')
			}).toArray());

		});
	});
});
