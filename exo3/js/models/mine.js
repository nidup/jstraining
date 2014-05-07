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
            slots: [],
            minerals: 5000
        },
        initialize: function()
        {
            var slots = [];
            var leftX = this.getPosX()-1;
            var rightX = this.getMaxPosX()+1;
            var topY = this.getPosY()-1;
            var bottomY = this.getMaxPosY()+1;
            for (var indX=leftX; indX <= rightX; indX++) {
                slots.push({posX: indX, posY: topY});
                slots.push({posX: indX, posY: bottomY});
            }
            for (var indY=topY+1; indY < bottomY; indY++) {
                slots.push({posX: leftX, posY: indY});
                slots.push({posX: rightX, posY: indY});
            }
            this.set('slots', slots);
        },
        getPosX: function(){
            return this.get('posX');
        },
        getPosY: function(){
            return this.get('posY');
        },
        getMaxPosX: function(){
            return this.getPosX() + this.getWidth() - 1;
        },
        getMaxPosY: function(){
            return this.getPosY() + this.getHeigth() - 1;
        },
        getWidth: function(){
            return this.get('width');
        },
        getHeigth: function(){
            return this.get('heigth');
        },
        getSlots: function(){
            return this.get('slots');
        },
        getRandomSlot: function(){
            return this.getSlots()[Math.floor((Math.random() * this.getSlots().length))];
        },
        getMinerals: function(){
            return this.get('minerals');
        },
        retrieve: function(qty){
            var remaining = this.getMinerals() - qty;
            this.set('minerals', remaining);
        },
        isEmpty: function(){
            return this.getMinerals() === 0;
        }
    });
});
