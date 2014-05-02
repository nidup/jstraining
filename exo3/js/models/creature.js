/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // Creature model
    app.Creature = Backbone.Model.extend({
        defaults:{
            name: 'My creature',
            hp: 100,
            maxHp: 100,
            posX: 1,
            posY: 1,
            direction: null,
            checked: false
        },
        toggle: function(){
            this.set('checked', !this.get('checked'));
        },
        isHurted: function(){
            return this.get('hp') < this.get('maxHp') / 4;
        },
        isDead: function(){
            return this.get('hp') <= 0;
        },
        hasDirection: function(){
            return this.get('direction') !== null;
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
                this.set('direction', Object.keys(directions)[idx]);
            } else {
                this.set('direction', null);
            }
        },
        canMove: function(){
            var direction = this.get('direction');
            var available = this.getAvailableDirections();
            return available.hasOwnProperty(direction);
        },
        move: function(){
            if (this.hasDirection() === false || this.canMove() === false) {
                this.chooseDirection();
            }
            if (this.canMove() === true) {
                var direction = this.getCompass()[this.get('direction')];
                this.set('posX', this.get('posX') + direction.left);
                this.set('posY', this.get('posY') + direction.top);
            }
        },
        act: function(){
            this.move();
            this.set('hp', this.get('hp')-5);
        }
    });
});
