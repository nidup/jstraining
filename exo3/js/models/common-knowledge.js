/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // Common knowledge model
    app.CommonKnowledge = Backbone.Model.extend({
        defaults:{
            base: null,
            mines: null
        },
        initialize: function(){
            this.set('mines', new app.Mines());
        },
        getMines: function(){
            return this.get('mines');
        },
        // TODO : avoid to recompute on each call ?
        getWorkableMines: function(){
            var workableMines = new app.Mines();
            this.getMines().each(function(mine){
                if (mine.isEmpty() === false) {
                    workableMines.add(mine);
                }
            });
            return workableMines;
        },
        addMine: function(mine) {
            this.getMines().add(mine);
            return this;
        },
        containsMines: function() {
            return this.getMines().length > 0;
        },
        containsWorkableMines: function() {
            return this.getWorkableMines().length > 0;
        },
        getClosestMineFrom: function(x, y){
            // TODO for now return the first one
            if (this.containsWorkableMines()) {
                return this.getWorkableMines().at(0);
            }
            return null;
        }
    })
});
