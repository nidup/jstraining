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
            mapGraph: null,
            treeChar: '#',
            rockChar: 'o',
            snowChar: ' ',
            fps: 3,
            intervalId: null,
            round: 0
        },
        initialize: function(){
            this.initializeRendering();
            this.initializePathFinding();
        },
        initializeRendering: function(){
            var tiles = [
                "###############################################",
                "#      #    #      ##                        ##",
                "#                       ##                    #",
                "#          #####        ###                   #",
                "##    o    #   #    ##                        #",
                "###           ##     #                        #",
                "#           ###      #                        #",
                "#   ###                                       #",
                "#    ###                    #o                #",
                "#   ####       ##           oo                #",
                "#   ###         ####                          #",
                "#                ###         ##               #",
                "#   ####          ###       ####              #",
                "#   ####                  ##oo#               #",
                "#   ##                  oooooo                #",
                "#                     ooo                     #",
                "#                    ooooo                    #",
                "#                     ooo                     #",
                "#                      o#                     #",
                "#                      ##                     #",
                "#          ######      ##                     #",
                "#           ####       o#oooo                 #",
                "#            ##           ooo o               #",
                "#o                 ##      o                  #",
                "#                 ####                        #",
                "#                  ####                       #",
                "#                     ##                      #",
                "#                      #                      #",
                "#    #             #                      ### #",
                "#    #            ##                          #",
                "###############################################"];
            this.set('tiles', tiles);
            var maxTileX = tiles[0].length;
            var maxTileY = tiles.length;
            this.set('maxTileX', maxTileX);
            this.set('maxTileY', maxTileY);
        },
        initializePathFinding: function(){
            var maxTileX = this.get('maxTileX');
            var maxTileY = this.get('maxTileY');
            var tiles = this.get('tiles');
            var initGraph = [];
            // setup with ground properties
            for (var indX = 0; indX < maxTileX; indX++) {
                initGraph[indX]= [];
                for (var indY = 0; indY < maxTileY; indY++) {
                    if (tiles[indY].charAt(indX) === ' ') {
                        initGraph[indX][indY]= 1;
                    } else {
                        initGraph[indX][indY]= 0;
                    }
                }
            }
            app.mines.each(function(mine){
                for (var indX=mine.getPosX(); indX <= mine.getMaxPosX(); indX++) {
                    for (var indY=mine.getPosY(); indY <= mine.getMaxPosY(); indY++) {
                        initGraph[indX][indY] = 0;
                    }
                }
            });
            for (var indX=app.base.getPosX(); indX <= app.base.getMaxPosX(); indX++) {
                for (var indY=app.base.getPosY(); indY <= app.base.getMaxPosY(); indY++) {
                    initGraph[indX][indY] = 0;
                }
            }

            this.set('mapGraph', initGraph);
        },
        getRound: function(){
            return this.get('round');
        },
        incrementRound: function(){
            this.set('round', this.get('round') +1);
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
            app.game.incrementRound();

            var hasOneAlive = false;
            app.creatures.each(function(creature){
                if (!creature.isOutOfEnergy()) {
                    hasOneAlive = true;
                    creature.act();
                }
            });

            if (!hasOneAlive) {
                app.game.stop();
            }

            var availableMineral = 0;
            app.mines.each(function(mine){
                availableMineral += mine.getQuantity();
            });
            if (availableMineral === 0) {
                app.game.stop();
            }

            return this;
        },
        isAvailableTile: function(x, y){
            // TODO : update graph  with mines, bases and other creatures, then use it to know traversable nodes
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
            app.mines.each(function(mine){
                if (x >= mine.getPosX() && x <= mine.getMaxPosX()
                    && y >= mine.getPosY() && y <= mine.getMaxPosY()) {
                    isAvailable = false;
                }
            });

            return isAvailable;
        },
        getMapGraph: function(){
            return new Graph(this.get('mapGraph'));
        },
        getCurrentGraph: function(){
            var mapGraph = this.get('mapGraph');
            // add temporary weight on this tile
            app.creatures.each(function(creature){
                var weight = 5;
                if (creature.isOutOfEnergy()) {
                    weight = 0;
                }
                mapGraph[creature.getPosX()][creature.getPosY()]= weight;
            });

            return new Graph(mapGraph);
        },
        getShortestPath: function(startX, startY, endX, endY) {
            var graph = this.getCurrentGraph();
            var start = graph.nodes[startX][startY];
            var end = graph.nodes[endX][endY];
            var nodes = astar.search(graph.nodes, start, end, true);
            var debug = true;
            if (debug === true) {
                $('.highlight').each(function(){
                    $(this).removeClass('highlight');
                });
                for (var ind = 0; ind < nodes.length; ind++) {
                    var id = '#x'+nodes[ind].x+'y'+nodes[ind].y;
                    $(id).addClass('highlight');
                }
            }

            return nodes;
        }
    });
});
