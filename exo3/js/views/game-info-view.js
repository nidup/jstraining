/*global $ */
var app = app || {};

$(function(){
	'use strict';

    // This view turns a game model into HTML
    app.GameInfoView = Backbone.View.extend({
        tagName: 'tr',

        initialize: function(){
            this.listenTo(this.model, 'change', this.render);
        },

        render: function(){
            this.$el.html(
                '<td>' + this.model.getRound() + '</td>'
            );
            return this;
        }
    });
});
