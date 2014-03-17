/**
 * AMD and CJS module.
 *
 * @module backbone.collection.tree
 * @submodule model
 */

/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */

define(function (require, exports, module) {
	'use strict';

	// external
	var Backbone = require('backbone'),
		Queryable = require('backbone.collection.queryable');



	var Branches = module.exports = Queryable.extend({
		initialize: function initializeBranchCollection(models, options) {
			Queryable.prototype.initialize.apply(this, arguments);
		},

	})



	var Branch = Backbone.Model.extend({

		initialize: function initializeBranch(attributes, options) {
			this.root = options.root;
			this.branches = new Branches([], options);
		},

		defineBranch: function defineBranch(attributes) {
			this.branches.add(attributes);
			return this;
		},

		isLeaf: function isLeaf() {
			return this.branches.length === 0;
		},

		selectBranch: function selectBranch(attributes) {
			return this.branches.find(attributes);
		},

		sibling: function selectSibling(attributes) {
			return this.root.selectBranch(attributes);
		},

		descendants: function selectDescendants(attributes) {

			if (this.isLeaf()) {
				// return simple array
				return this;
			} else {
				// returns Lazy object
				var immediate = this.selectBranch(attributes);

				// returns Array
				var distant = this.branches.map(function (branch) {
					return branch.descendants(attributes);
				});

				return immediate.concat(distant);
			}
		},

	});


	Branches.prototype.model = Branch;
});
