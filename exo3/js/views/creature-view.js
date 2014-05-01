/*global $ */
var app = app || {};

$(function(){
	'use strict';

    var tileSize = 30;

    // This view turns a Creature model into HTML
    app.CreatureView = Backbone.View.extend({
        tagName: 'div',

        events:{
            'click': 'toggleCreature'
        },

        initialize: function(){
            this.listenTo(this.model, 'change', this.render);
        },

        render: function(){
            this.$el.html(
                '<div class="creature">'
                + '<span>' + this.model.get('name') + '</span>'
                + '<span>' + this.model.get('hp') + '</span>'
                + '</div>'
            );
            var posX = this.model.get('posX') * tileSize;
            var posY = this.model.get('posY') * tileSize;
            this.$el.offset({left: posX, top: posY});
            this.$el.css('width', tileSize);
            this.$el.css('height', tileSize);

            console.log(posX + ' ' + posY); 

            return this;
        },

        toggleCreature: function(){
            this.model.toggle();
        }
    });
});
