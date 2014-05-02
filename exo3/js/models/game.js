/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // Game model
    app.Game = Backbone.Model.extend({
        nextTurn: function(){
            app.creatures.each(function(creature){
                if (!creature.isDead()) {
                    creature.act();
                }
            });
            return this;
        }

    });
});
