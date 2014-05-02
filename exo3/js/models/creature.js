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
            checked: false,
            posX: 0,
            posY: 0
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
        act: function(){
            var limit = 12;
            if (this.get('posX') < limit) {
                this.set('posX', this.get('posX') + 1);
            } else {
                this.set('posX', this.get('posX') - 1);
            }
        }
    });
});
