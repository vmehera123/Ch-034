define(function(require) {
    "use strict";
    
    var CMS = require("CMS");

    var View = CMS.PaginationView.extend({

        el: ".pagination",

        render: function() {
            this.$el.html(this.template(this.collection.info()));
            return this;
        }

    });

    return View;
});