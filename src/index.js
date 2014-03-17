//     backbone.model.tree
//     (c) simonfan
//     backbone.model.tree is licensed under the MIT terms.

/**
 * AMD and CJS module.
 *
 * @module backbone.model.tree
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



	var Branches = Queryable.extend({});

	var Branch = module.exports = Backbone.Model.extend({

		Branches: Branches,

		initialize: function initializeBranch(attributes) {
			this.branches = new this.Branches();
		},

		defineBranch: function defineBranch(attributes) {
			this.branches.add.apply(this.branches, arguments);
			return this;
		},

		isLeaf: function isLeaf() {
			return this.branches.length === 0;
		},

		selectBranch: function selectBranch(attributes) {
			return this.branches.find(attributes);
		},

		descendants: function selectDescendants(attributes, depth) {

			if (!this.isLeaf()) {
				// returns Lazy object
				var immediate = this.selectBranch(attributes);

				// branch-descendants
				var far = this.branches.map(function (branch) {
					return branch.descendants(attributes);
				}).compact();

				return immediate.concat(far);
			}
		},
	});

	Branch.Branches = Branches;


	Branches.prototype.model = Branch;
});
