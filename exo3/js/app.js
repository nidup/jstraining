/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // Prefill the collection with a number of creatures.
    app.creatures = new app.CreatureList([
        new app.Creature({ name: 'Foo'}),
        new app.Creature({ name: 'Bar', posX: 3, posY: 3}),
        new app.Creature({ name: 'Baz', posX: 30, posY:3}),
        new app.Creature({ name: 'Qze', posX: 12, posY:12}),
        new app.Creature({ name: 'Aze', posX: 8, posY:8}),
        new app.Creature({ name: 'Kaz', posX: 28, posY:8}),
        new app.Creature({ name: 'Ras', posX: 10, posY:25}),
        new app.Creature({ name: 'Hav', posX: 25, posY:28}),
        new app.Creature({ name: 'Cac', posX: 21, posY:19}),
        new app.Creature({ name: 'Jan', posX: 2, posY:23}),
    ]);

    app.game = new app.Game();

    new app.AppView();
});
