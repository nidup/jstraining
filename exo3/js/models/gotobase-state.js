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
        selectPath: function(creature, base){
            var baseX = base.getSlotX();
            var baseY = base.getSlotY();
            var path = app.game.getShortestPath(
                creature.getPosX(), creature.getPosY(),
                baseX, baseY
            );
            console.log(creature.get('name')+' -> base('+baseX+':'+baseY+')');
            this.set('path', path);
        },
        getNextPosition: function(){
            return this.getPath().shift();
        },
        execute: function(creature){
            if (this.hasPath() === false) {
                this.selectPath(creature, app.base);
            }
            var position = this.getNextPosition();
            if (position != null && creature.canMoveToCoords(position.x, position.y)) {
                creature.moveToCoords(position.x, position.y);
            } else {
                this.selectPath(creature, app.base);
                var position = this.getNextPosition();
                if (position != null && creature.canMoveToCoords(position.x, position.y)) {
                    creature.moveToCoords(position.x, position.y);
                } else {
                    this.selectPath(creature, app.base);
                }
            }
            if (creature.isNearBase()) {
                creature.changeState(new app.AtBaseState());
            }
        }
    })
});
