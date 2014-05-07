/*global $ */
var app = app || {};

$(function(){
	'use strict';

    app.tileSize = 20;

    app.mines = new app.Mines([
        new app.Mine({posX: 40, posY: 5}),
        new app.Mine({posX: 25, posY: 15}),
        new app.Mine({posX: 6, posY: 23})
    ]);

    app.base = new app.Base({posX: 10, posY:10});

    app.commonKnowledge = new app.CommonKnowledge();
    app.commonKnowledge.addMine(app.mines.at(2));

    app.creatures = new app.Creatures([
        new app.Creature({ name: 'Foo', posX: 9, posY: 9}),
        new app.Creature({ name: 'Bar', posX: 9, posY: 11}),
        new app.Creature({ name: 'Baz', posX: 9, posY: 13}),
        new app.Creature({ name: 'Qze', posX: 13, posY:9}),
        new app.Creature({ name: 'Aze', posX: 13, posY:11}),
        new app.Creature({ name: 'Cac', posX: 13, posY:13}),
        new app.Creature({ name: 'Jan', posX: 11, posY:9}),
        new app.Creature({ name: 'Hav', posX: 11, posY:13}),
    ]);

    app.game = new app.Game();

    new app.AppView();
});
