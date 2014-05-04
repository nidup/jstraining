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
        addMine: function(mine) {
            this.getMines().add(mine);
            return this;
        },
        containsMines: function() {
            return this.getMines().length > 0;
        },
        getClosestMineFrom: function(x, y){
            // TODO for now return the first one
            if (this.containsMines()) {
                return this.getMines().at(0);
            }
            return null;
        }
    })
});
