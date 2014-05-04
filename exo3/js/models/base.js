/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // Base model
    app.Base = Backbone.Model.extend({
        defaults:{
            posX: 1,
            posY: 1,
            width:3,
            heigth:3,
            minerals: 0
        },
        getPosX: function(){
            return this.get('posX');
        },
        getPosY: function(){
            return this.get('posY');
        },
        getMaxPosX: function(){
            return this.getPosX() + this.getWidth();
        },
        getMaxPosY: function(){
            return this.getPosY() + this.getHeigth();
        },
        getWidth: function(){
            return this.get('width');
        },
        getHeigth: function(){
            return this.get('heigth');
        },
        getMinerals: function(){
            return this.get('minerals');
        },
        addMinerals: function(qty){
            this.set('minerals', this.getMinerals() + qty);
        }
    });
});
