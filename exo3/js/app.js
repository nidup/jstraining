/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // Prefill the collection with a number of creatures.
    app.creatures = new app.CreatureList([
        new app.Creature({ name: 'Foo', hp: 80}),
        new app.Creature({ name: 'Bar', hp: 75, posX: 3, posY: 3}),
        new app.Creature({ name: 'Baz', hp: 100, posX: 30, posY:3}),
        new app.Creature({ name: 'Qze', hp: 100, posX: 12, posY:12}),
        new app.Creature({ name: 'Aze', hp: 100, posX: 8, posY:8}),
        new app.Creature({ name: 'Kaz', hp: 100, posX: 28, posY:8}),
        new app.Creature({ name: 'Ras', hp: 100, posX: 10, posY:25}),
        new app.Creature({ name: 'Hav', hp: 100, posX: 25, posY:28}),
        new app.Creature({ name: 'Cac', hp: 100, posX: 21, posY:19}),
        new app.Creature({ name: 'Jan', hp: 100, posX: 2, posY:23}),
    ]);

    app.game = new app.Game();

    new app.AppView();
});
