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
            this.$el.html(
                '<span>' + this.model.get('name') + '</span>'
                + '<span>' + this.model.getEnergy() + '</span>'
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
