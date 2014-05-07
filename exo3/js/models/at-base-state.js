/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // Recharge state model
    app.AtBaseState = Backbone.Model.extend({
        toString: function(){
            return 'at base';
        },
        onEnter: function(){
        },
        onExit: function(){
        },
        execute: function(creature){
            if (creature.isRecharged() === false) {
                creature.recharge();
            }
            if (creature.isEmpty() === false) {
                creature.unload();
            }

            if (creature.isRecharged() && creature.isEmpty()) {
                if (app.commonKnowledge.containsWorkableMines()) {
                    creature.changeState(new app.GotoMineState());
                } else {
                    creature.changeState(new app.ExploreState());
                }
            }
        }
    })
});
