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
        }
    });
});
