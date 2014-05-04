/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // Mine model
    app.Mine = Backbone.Model.extend({
        defaults:{
            posX: 1,
            posY: 1,
            width:2,
            heigth:3,
            quantity: 5000
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
        getQuantity: function(){
            return this.get('quantity');
        },
        retrieve: function(qty){
            var remaining = this.getQuantity() - qty;
            this.set('quantity', remaining);
        }
    });
});
