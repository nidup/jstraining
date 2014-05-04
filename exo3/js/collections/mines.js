/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // Create a collection of mines
    app.Mines = Backbone.Collection.extend({
        model: app.Mine
    });
});
