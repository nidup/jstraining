/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // This view turns a mine model into HTML
    app.MineInfoView = Backbone.View.extend({
        tagName: 'tr',

        initialize: function(){
            this.listenTo(this.model, 'change', this.render);
        },

        render: function(){
            this.$el.html(
                '<td>' + this.model.getQuantity() + '</td>'
                + '<td>' + this.model.getPosX() + '-' + this.model.getPosY() + '</td>'
            );
            return this;
        }
    });
});
