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
        getMine: function(){
            return this.get('mine');
        },
        hasPath: function(){
            return this.get('path') !== null;
        },
        getPath: function(){
            return this.get('path');
        },
        selectPath: function(creature, mine){
            var slot = mine.getRandomSlot();
            var path = app.game.getShortestPath(
                creature.getPosX(), creature.getPosY(),
                slot.posX, slot.posY
            );
            this.set('path', path);
        },
        getNextPosition: function(){
            return this.getPath().shift();
        },
        execute: function(creature){
            if (this.hasMine() === false) {
                var mine = app.commonKnowledge.getClosestMineFrom(creature.getPosX(), creature.getPosY());
                this.selectMine(mine);
            }
            if (this.hasPath() === false) {
                this.selectPath(creature, mine);
            }

            var position = this.getNextPosition();
            if (position != null && creature.canMoveToCoords(position.x, position.y)) {
                creature.moveToCoords(position.x, position.y);
            } else {
                this.selectPath(creature, this.getMine());
                var position = this.getNextPosition();
                if (position != null && creature.canMoveToCoords(position.x, position.y)) {
                  creature.moveToCoords(position.x, position.y);
                } else {
                    this.selectPath(creature, this.getMine());
                }
            }
            if (creature.isNearMine()) {
                creature.changeState(new app.CollectState());
            }
        }
    })
});
