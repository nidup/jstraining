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
        toggle: function(){
            this.set('checked', !this.get('checked'));
        },
        isHurted: function(){
            return this.get('energy') < this.get('maxEnergy') / 4;
        },
        isDead: function(){
            return this.get('energy') <= 0;
        },
        executeState: function(){
            this.get('state').execute(this);
        },
        getEnergy: function(){
            return this.get('energy');
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
                var x = this.get('posX') + directions[code]['left'];
                var y = this.get('posY') + directions[code]['top'];
                if (x >= 0 && y >= 0 && app.game.isAvailableTile(x, y) === true) {
                    availableDirections[code]= directions[code];
                }
            }
            return availableDirections;
        },
        chooseDirection: function(){
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
            this.set('posX', this.get('posX') + direction.left);
            this.set('posY', this.get('posY') + direction.top);
        },
        consumeEnergy: function(energy){
            this.set('energy', this.get('energy')-energy);
        },
        act: function(){
            this.executeState();
        }
    });
});
