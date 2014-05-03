/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // Explore state model
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
            if (this.hasDirection() === false) {
                this.changeDirection(creature.chooseRandomDirection());
            }
            if (creature.canMove(this.getDirection()) === false) {
                this.changeDirection(creature.chooseRandomDirection());
            }
            creature.move(this.getDirection());

            if (creature.needRecharge()) {
               creature.changeState(new app.GotoBaseState());
            }
        }
    })
});
