/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // Creature model
    app.Creature = Backbone.Model.extend({
        defaults:{
            name: 'A',
            energy: 100,
            maxEnergy: 100,
            posX: 1,
            posY: 1,
            checked: false,
            state: null
        },
        initialize: function() {
            this.set('state', new app.ExploreState());
        },
        getPosX: function(){
            return this.get('posX');
        },
        getPosY: function(){
            return this.get('posY');
        },
        toggle: function(){
            this.set('checked', !this.get('checked'));
        },
        getEnergy: function(){
            return this.get('energy');
        },
        getMaxEnergy: function(){
            return this.get('maxEnergy');
        },
        recharge: function(){
            var energy = this.getEnergy() + 20;
            energy = (energy > this.getMaxEnergy()) ? this.getMaxEnergy() : energy;
            this.set('energy', energy);
        },
        isRecharged: function(){
            return this.getEnergy() >= this.getMaxEnergy();
        },
        needRecharge: function(){
            return this.getEnergy() < this.getMaxEnergy() / 4;
        },
        isOutOfEnergy: function(){
            return this.getEnergy() <= 0;
        },
        isNearBase: function(){
            var minX = app.base.getPosX()-1;
            var maxX = app.base.getMaxPosX()+1;
            var minY = app.base.getPosY()-1;
            var maxY = app.base.getMaxPosY()+1;
            return this.getPosX() >= minX && this.getPosX() <= maxX
                && this.getPosY() >= minY && this.getPosY() <= maxY;
        },
        changeState: function(state){
            this.set('state', state);
        },
        executeState: function(){
            this.get('state').execute(this);
        },
        getCompass: function(){
            return {
                'N': {'top': -1, 'left':0},
                'NE': {'top': -1, 'left':+1},
                'E': {'top': 0, 'left':+1},
                'SE': {'top': +1, 'left':+1},
                'S': {'top': +1, 'left':0},
                'SW': {'top': +1, 'left':-1},
                'W': {'top': 0, 'left':-1},
                'NW': {'top': -1, 'left':-1}
            };
        },
        getAvailableDirections: function(){
            var directions = this.getCompass();
            var availableDirections = {};
            for (var code in directions) {
                var x = this.getPosX() + directions[code]['left'];
                var y = this.getPosY() + directions[code]['top'];
                if (x >= 0 && y >= 0 && app.game.isAvailableTile(x, y) === true) {
                    availableDirections[code]= directions[code];
                }
            }
            return availableDirections;
        },
        chooseRandomDirection: function(){
            var directions = this.getAvailableDirections();
            var nb = Object.keys(directions).length;
            if (nb > 0) {
                var idx = Math.floor((Math.random() * nb));
                return Object.keys(directions)[idx];
            }
            return null;
        },
        canMove: function(direction){
            var available = this.getAvailableDirections();
            return available.hasOwnProperty(direction);
        },
        move: function(direction){
            var direction = this.getCompass()[direction];
            var destX = this.getPosX() + direction.left;
            var destY = this.getPosY() + direction.top;
            this.moveToCoords(destX, destY);
        },
        canMoveToCoords: function(x, y){
            return app.game.isAvailableTile(x, y);
        },
        moveToCoords: function(x, y){
            this.set('posX', x);
            this.set('posY', y);
            this.consumeEnergy(2);
        },
        consumeEnergy: function(energy){
            this.set('energy', this.get('energy')-energy);
        },
        act: function(){
            this.executeState();
        }
    });
});
