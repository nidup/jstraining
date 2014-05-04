/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // Common knowledge model
    app.CommonKnowledge = Backbone.Model.extend({
        defaults:{
            base: null,
            mines: []
        },
        addMine: function(mine) {
            this.get('mines').push(mine);
            return this;
        },
        knowAMine: function() {
            return this.get('mines').length > 0;
        },
        getClosestMine: function(x, y){
            
        }
    })
});
