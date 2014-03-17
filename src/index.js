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
		Queryable = require('backbone.collection.queryable'),
		_ = require('lodash');



	var Branches = Queryable.extend({});

	var Branch = module.exports = Backbone.Model.extend({

		/**
		 * The Branches Collection constructor. Refer to details
		 * at the extend method to see how stuff works here.
		 *
		 * @property Branches
		 */
		Branches: Branches,

		/**
		 * CAUTION!
		 * Extend method has a special behaviour.
		 * (pretty dirty, but makes things much, MUCH nicer)
		 *
		 * @method extend
		 */
		extend: function extend() {

			// [1] Do the nromal model extension
			//     by applying the Backbone.Model.extend method.
			var ExtendedBranchModel = Backbone.Model.extend.apply(this, arguments);

			// [2] As the model was changed,
			//     users expect the Branch collections
			//     to be using the new model instead of the original.
			//     Thus, we must redefine the Branches Collection,
			//     by setting its model constructor to the new one.
			var ExtendedBranchCollection = Branches.extend({
				model: ExtendedBranchModel
			});

			// [3] As the Branch Model uses its property 'Branches',
			//     to build instances of Branches Collections, we must
			//     set the new Collection Constructor to that property on the
			//     Model constructor itself.
			ExtendedBranchModel.prototype.Branches = ExtendedBranchCollection;

			// [4] Return the ExtendedBranchModel that has the ExtendedBranchCollection
			//     as Branches property.
			return ExtendedBranchModel;
		},

		/**
		 * Creates an instance of this.Branches Collection.
		 *
		 * @method initialize
		 */
		initialize: function initializeBranch(attributes) {
			this.branches = new this.Branches();
		},

		/**
		 * Creates a branch on this branch.
		 * Adds a model with the given attributes to this object branches collection.
		 *
		 * @method addBranch
		 * @params attributes {Object}
		 */
		addBranch: function addBranch(attributes) {
			var addedBranch = this.branches.add.apply(this.branches, arguments);

			// set ancestor property
			addedBranch.ancestor = this;

			return addedBranch;
		},

		/**
		 * Selects from this branch branches' collection
		 * all branches that are compatible with the query object given.
		 * See backbone.collection.queryable, for the query object possibilities.
		 *
		 * Returns a Lazy Object(See Queryable)
		 *
		 * @method selectBranches
		 * @param query {Object}
		 */
		selectBranches: function selectBranches(query) {
			return this.branches.find(query);
		},

		/**
		 * Retrieves sibling branches.
		 *
		 * @method selectSiblings
		 * @param query {Object}
		 */
		selectSiblings: function selectSiblings(query) {
			return this.isRoot() ? [] : this.root.selectBranches(query);
		},


		/**
		 * Retrieves all branch models that are descendant to this one.
		 *
		 * @method selectDescendants
		 * @param query {Object}
		 * @param [depth] {Number}
		 */
		selectDescendants: function selectDescendants(query, depth) {

			if (!this.isLeaf()) {
				// returns Lazy object
				var immediate = this.selectBranches(query);

				// branch-descendants
				var far = this.branches.map(function (branch) {
					return branch.selectDescendants(query);
				}).compact();

				return immediate.concat(far);
			} else {
				return false;
			}
		},

		/**
		 * Checks whether this branch's branches collection
		 * has any other branch models.
		 *
		 * @method isLeaf
		 */
		isLeaf: function isLeaf() {
			return this.branches.length === 0;
		},

		/**
		 * Checks if this branch model has any ancestor.
		 *
		 * @method isRoot
		 */
		isRoot: function isRoot() {
			return _.isObject(this.ancestor);
		}
	});

	// Set some fine aliases.
	Branch.prototype.siblings = Branch.prototype.selectSiblings;
	Branch.prototype.descendants = Branch.prototype.selectDescendants;

	Branch.Branches = Branches;
	// let the special extend method available as static property.
	Branch.extend = Branch.prototype.extend;

	Branches.prototype.model = Branch;
});
