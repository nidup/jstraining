/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // This view turns a Creature model into HTML
    app.CreatureView = Backbone.View.extend({
        tagName: 'div',
        className: 'creature',

        events:{
            'click': 'toggleCreature'
        },

        initialize: function(){
            this.listenTo(this.model, 'change', this.render);
        },

        render: function(){
            this.$el.removeClass('direction-n direction-ne direction-e direction-se direction-s direction-sw direction-w direction-nw')
            this.$el.addClass('direction-' + this.model.getDirection().toLowerCase());

            this.$el.html(
                '<span>' + this.model.getEnergy() + '</span>'
                +'<span>' + this.model.get('name') + '</span>'
            );
            var posX = this.model.get('posX') * app.tileSize;
            var posY = this.model.get('posY') * app.tileSize;
            this.$el.offset({left: posX, top: posY});
            this.$el.css('width', app.tileSize);
            this.$el.css('height', app.tileSize);

            return this;
        },

        toggleCreature: function(){
            this.model.toggle();
        }
    });
});
