//     backbone.model.tree
//     (c) simonfan
//     backbone.model.tree is licensed under the MIT terms.

define("backbone.model.tree",["require","exports","module","backbone","backbone.collection.queryable"],function(e,n,t){var c=e("backbone"),r=e("backbone.collection.queryable"),a=r.extend({}),i=t.exports=c.Model.extend({Branches:a,initialize:function(){this.branches=new this.Branches},defineBranch:function(){return this.branches.add.apply(this.branches,arguments),this},isLeaf:function(){return 0===this.branches.length},selectBranch:function(e){return this.branches.find(e)},descendants:function(e){if(!this.isLeaf()){var n=this.selectBranch(e),t=this.branches.map(function(n){return n.descendants(e)}).compact();return n.concat(t)}}});i.Branches=a,a.prototype.model=i});