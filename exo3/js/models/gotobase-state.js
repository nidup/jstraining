/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // Goto base state model
    app.GotoBaseState = Backbone.Model.extend({
        defaults:{
            path: null
        },
        toString: function(){
            return 'goto base';
        },
        onEnter: function(){
        },
        onExit: function(){
        },
        hasPath: function(){
            return this.get('path') !== null;
        },
        getPath: function(){
            return this.get('path');
        },
        choosePath: function(creature, base){
            var path = app.game.getShortestPath(
                creature.getPosX(), creature.getPosY(),
                base.getPosX(), base.getPosY()
            );
            this.set('path', path);
        },
        getNextPosition: function(){
            return this.getPath().shift();
        },
        execute: function(creature){
            if (this.hasPath() === false) {
                this.choosePath(creature, app.base);
            }
            if (creature.isNearBase() && creature.needRecharge()) {
                creature.changeState(new app.RechargeState());
            } else {
                var position = this.getNextPosition();
                if (position != null && creature.canMoveToCoords(position.x, position.y)) {
                    creature.moveToCoords(position.x, position.y);
                }
            }
        }
    })
});
