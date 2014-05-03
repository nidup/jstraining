/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // Game model
    app.Game = Backbone.Model.extend({
        defaults:{
            tiles: [],
            tileSize: 20,
            maxTileX: 0,
            maxTileY: 0,
            treeChar: '#',
            rockChar: 'o',
            snowChar: ' ',
            fps: 3,
            intervalId: null
        },
        initialize: function(){
            this.set('tiles', [
                "####################################",
                "#      #    #      ##             ##",
                "#                       ##         #",
                "#          #####        ###        #",
                "##    o    #   #    ##             #",
                "###           ##     #             #",
                "#           ###      #             #",
                "#   ###                            #",
                "#    ###                     o     #",
                "#   ####       ##           oo     #",
                "#   ###         ####               #",
                "#                ###               #",
                "#   ####          ###              #",
                "#   ####                           #",
                "#   ##                             #",
                "#                     ooo          #",
                "#                    ooooo         #",
                "#                     ooo          #",
                "#                                  #",
                "#                                  #",
                "#          ######                  #",
                "#           ####           oo      #",
                "#            ##             o      #",
                "#o                 ##              #",
                "#                 ####             #",
                "#                  ####            #",
                "#                     ##           #",
                "#                      #           #",
                "#    #             #           ### #",
                "#    #            ##               #",
                "####################################"]);
            this.set('maxTileX', this.get('tiles')[0].length);
            this.set('maxTileY', this.get('tiles').length);
        },
        start: function(){
            this.set('intervalId', setInterval(this.run, 1000 / this.get('fps')));
            return this;
        },
        stop: function(){
            clearInterval(this.get('intervalId'));
            return this;
        },
        run: function(){
            var hasOneAlive = false;
            app.creatures.each(function(creature){
                if (!creature.isDead()) {
                    hasOneAlive = true;
                    creature.act();
                }
            });

            if (!hasOneAlive) {
                this.stop();
            }

            return this;
        },
        isAvailableTile: function(x, y){
            var tiles = this.get('tiles');
            var tile = tiles[y][x];
            if (tile === this.get('treeChar') || tile === this.get('rockChar')) {
                return false;
            }
            var isAvailable = true;
            app.creatures.each(function(creature){
                if (creature.getPosX() === x && creature.getPosY() === y) {
                    isAvailable = false;
                }
            });
            if (x >= app.base.getPosX() && x <= app.base.getMaxPosX()
                && y >= app.base.getPosY() && y <= app.base.getMaxPosY()) {
                isAvailable = false;
            }

            return isAvailable;
        }
    });
});
