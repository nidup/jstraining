/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // Prefill the collection with a number of creatures.
    app.creatures = new app.CreatureList([
        new app.Creature({ name: 'Foo', hp: 80}),
        new app.Creature({ name: 'Bar', hp: 75, posX: 3, posY: 3}),
        new app.Creature({ name: 'Baz', hp: 100, posX: 4, posY:5}),
    ]);

    app.game = new app.Game();

    new app.AppView();
});
