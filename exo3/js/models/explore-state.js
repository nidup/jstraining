/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // Ready state model
    app.ExploreState = Backbone.Model.extend({
        defaults:{
            direction: null
        },
        toString: function(){
            return 'explore ' + this.get('direction');
        },
        onEnter: function(){
        },
        onExit: function(){
        },
        hasDirection: function(){
            return this.get('direction') !== null;
        },
        getDirection: function(){
            return this.get('direction');
        },
        changeDirection: function(direction){
            this.set('direction', direction);
        },
        execute: function(creature){
            if (this.hasDirection() === false || creature.canMove(this.getDirection()) === false) {
                this.changeDirection(creature.chooseDirection());
            }
            creature.move(this.getDirection());
            creature.consumeEnergy(2);
        }
    })
});
