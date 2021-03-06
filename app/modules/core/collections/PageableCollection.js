define(function(require) {
    "use strict";

    var CoreCollection = require("../collection"),

    PageableCollection = CoreCollection.extend({

        api: "",
        resourse: "",
        perPage: 5,
        currentPage: 1,
        hrefPath: "",

        setCurrentPage: function(page) {
            if (page)
                this.currentPage = page;
        },

        pageOffset: function() {
            return (this.currentPage - 1)*this.perPage;
        },

        currUrl: function() {
            return this.api + this.resourse + '?_start=' + this.pageOffset() + '&_limit=' + this.perPage + this.addFilter;
        },

        url: function() {
            return this.currUrl();
        },

        pageUrl: function(page) {
            if (page)
                return this.hrefPath+page;
            
            return this.hrefPath+this.currentPage;
        },

        parse: function(data, options) {
            this.totalPages = Math.ceil(options.xhr.getResponseHeader('X-Total-Count')/this.perPage);
            
            return data;
        },

        getRange: function() {
            return Math.floor(this.paginationSize/2);
        },

        getPageSet: function() {
            var pages = [],
                totalPages = this.totalPages,
                min = 1,
                max = this.totalPages;

            min = this.currentPage - this.getRange();
            max = this.currentPage + this.getRange();

            if (min < 1) {
                max = max + (1 - min);
                min = 1;
            }

            if (max >= totalPages) {
                min = min - (max - totalPages);
                if (min < 1) min = 1;
                max = totalPages;
            }

            pages = _.range(min, max+1);

            return pages;
        },

        info: function() {
            return {
                pageUrl: $.proxy(this.pageUrl,this),
                currentPage: this.currentPage,
                totalPages: this.totalPages,
                lastPage: this.totalPages,
                pageSet: this.getPageSet()
            };
        },

        

    });

    return PageableCollection;
});