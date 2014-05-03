/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // This view turns a base model into HTML
    app.BaseView = Backbone.View.extend({
        tagName: 'div',
        className: 'base',

        initialize: function(){
            this.listenTo(this.model, 'change', this.render);
        },

        render: function(){
            this.$el.html('');
            var posX = this.model.getPosX() * app.tileSize;
            var posY = this.model.getPosY() * app.tileSize;
            this.$el.offset({left: posX, top: posY});
            this.$el.css('width', app.tileSize * this.model.getWidth());
            this.$el.css('height', app.tileSize * this.model.getHeigth());

            return this;
        }
    });
});
