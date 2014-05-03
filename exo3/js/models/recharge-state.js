/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // Recharge state model
    app.RechargeState = Backbone.Model.extend({
        toString: function(){
            return 'recharge energy';
        },
        onEnter: function(){
        },
        onExit: function(){
        },
        execute: function(creature){
            if (creature.isNearBase() === true) {
                creature.recharge();
            }
            if (creature.isRecharged()) {
               creature.changeState(new app.ExploreState());
            }
        }
    })
});
