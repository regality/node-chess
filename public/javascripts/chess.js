(function() {
   "use strict";

   Backbone.sync = function(method, model, success, error) {
      success();
   };

   var Piece = Backbone.Model.extend({
      defaults: {
         piece: "",
         color: "",
         bg: ""
      }
   });

   var Board = Backbone.Collection.extend({
      model: Piece
   });

   var PieceView = Backbone.View.extend({
      tagName: "div",

      events: {
         "click" : "highlight"
      },

      initialize: function() {
         _.bindAll(this, 'render');
      },

      render: function() {
         $(this.el).addClass("square");
         if (this.model.get("piece") !== "") {
            var image = "/images/pieces/" + this.model.get("color") + this.model.get("piece") + ".gif";
            $(this.el).html('<img src="' + image + '" />');
         }
         return this;
      },

      "highlight" : function() {
         $(this.el).toggleClass("highlight");
      }

   });

   var BoardView = Backbone.View.extend({
      el: $(".board"),

      events: {
      },

      initialize: function() {
         _.bindAll(this, 'render');
         this.collection = new Board();
         var start = [
            {"piece" : "rook", "color" : "b"},
            {"piece" : "knight", "color" : "b"},
            {"piece" : "bishop", "color" : "b"},
            {"piece" : "king", "color" : "b"},
            {"piece" : "queen", "color" : "b"},
            {"piece" : "bishop", "color" : "b"},
            {"piece" : "knight", "color" : "b"},
            {"piece" : "rook", "color" : "b"},
            {"piece" : "pawn", "color" : "b"},
            {"piece" : "pawn", "color" : "b"},
            {"piece" : "pawn", "color" : "b"},
            {"piece" : "pawn", "color" : "b"},
            {"piece" : "pawn", "color" : "b"},
            {"piece" : "pawn", "color" : "b"},
            {"piece" : "pawn", "color" : "b"},
            {"piece" : "pawn", "color" : "b"},
            {}, {}, {}, {}, {}, {}, {}, {},
            {}, {}, {}, {}, {}, {}, {}, {},
            {}, {}, {}, {}, {}, {}, {}, {},
            {}, {}, {}, {}, {}, {}, {}, {},
            {"piece" : "pawn", "color" : "w"},
            {"piece" : "pawn", "color" : "w"},
            {"piece" : "pawn", "color" : "w"},
            {"piece" : "pawn", "color" : "w"},
            {"piece" : "pawn", "color" : "w"},
            {"piece" : "pawn", "color" : "w"},
            {"piece" : "pawn", "color" : "w"},
            {"piece" : "pawn", "color" : "w"},
            {"piece" : "rook", "color" : "w"},
            {"piece" : "knight", "color" : "w"},
            {"piece" : "bishop", "color" : "w"},
            {"piece" : "king", "color" : "w"},
            {"piece" : "queen", "color" : "w"},
            {"piece" : "bishop", "color" : "w"},
            {"piece" : "knight", "color" : "w"},
            {"piece" : "rook", "color" : "w"}
         ];
         var item;
         for (var i = 0, l = start.length; i < l; ++i) {
            item = new Piece();
            item.set(start[i]);
            this.collection.add(item);
         }
         this.render();
      },

      render: function() {
         var self = this;

         _(this.collection.models).each(function(item) {
            self.appendPiece(item);
         }, this);
      },

      appendPiece: function(item) {
         var pieceView = new PieceView({
            model: item
         });
         $(this.el).append(pieceView.render().el);
      }
   });

   var board = new BoardView();
   window.board = board;

})();
