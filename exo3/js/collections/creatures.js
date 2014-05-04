/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // Create a collection of creatures
    app.Creatures = Backbone.Collection.extend({
        model: app.Creature,
        getChecked: function(){
            return this.where({checked:true});
        }
    });
});
