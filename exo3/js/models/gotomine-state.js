/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // Goto mine state model
    app.GotoMineState = Backbone.Model.extend({
        defaults:{
            mine: null,
            path: null
        },
        toString: function(){
            return 'goto mine';
        },
        onEnter: function(){
        },
        onExit: function(){
        },
        hasMine: function(){
            return this.get('mine') !== null;
        },
        selectMine: function(mine){
            this.set('mine', mine);
        },
        hasPath: function(){
            return this.get('path') !== null;
        },
        getPath: function(){
            return this.get('path');
        },
        selectPath: function(creature, mine){
            var path = app.game.getShortestPath(
                creature.getPosX(), creature.getPosY(),
                mine.getPosX(), mine.getPosY()
            );
            this.set('path', path);
        },
        getNextPosition: function(){
            return this.getPath()[0];
        },
        removePosition: function(){
            this.getPath().shift();
        },
        execute: function(creature){
            if (this.hasMine() === false) {
                var mine = app.commonKnowledge.getClosestMineFrom(creature.getPosX(), creature.getPosY());
                this.selectMine(mine);
            }
            if (this.hasPath() === false) {
                this.selectPath(creature, mine);
            }
            if (creature.isNearMine()) {
                creature.changeState(new app.CollectState());
            } else {
                var position = this.getNextPosition();
                if (position != null && creature.canMoveToCoords(position.x, position.y)) {
                    creature.moveToCoords(position.x, position.y);
                    this.removePosition();
                }
            }
        }
    })
});
