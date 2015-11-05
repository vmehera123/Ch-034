define(function(require) {
    "use strict";

    var _ = require("lodash"),
        $ = require("jquery"),
        Backbone = require("backbone"),
        CMS = require("./modules/core/index"),
        Layout = require("backbone.layoutmanager");
        require("bootstrap");

    CMS.root = "/";
    //CMS.api = "http://192.168.101.107:8080/crsms/api/";
    CMS.api = "http://localhost:3000/";
    CMS.perPage = 3;
    CMS.paginationSize = 5;
    CMS.typeTest = {
       list   : 0,
       answer : 1,
       few    : 2
    };

    return CMS;
});
