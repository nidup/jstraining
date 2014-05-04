/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // Collect state model
    app.CollectState = Backbone.Model.extend({
        defaults:{
            mine: null
        },
        toString: function(){
            var desc = (this.hasMine()) ? this.getMine().getPosX() + ':' + this.getMine().getPosY() : null;
            return 'collect ' + desc;
        },
        onEnter: function(){
        },
        onExit: function(){
        },
        hasMine: function(){
            return this.get('mine') !== null;
        },
        getMine: function(){
            return this.get('mine');
        },
        selectMine: function(mine){
            this.set('mine', mine);
        },
        execute: function(creature){
            if (this.hasMine() === false) {
                var mine = creature.isNearMine();
                if (mine !== null) {
                    this.selectMine(mine);
                }
            }
            if (this.hasMine() === false) {
               creature.changeState(new app.ExploreState());
            }
            if (creature.isFullLoaded()) {
                creature.changeState(new app.GotoBaseState());
            } else {
                creature.collectFrom(this.getMine());
            }
        }
    })
});
