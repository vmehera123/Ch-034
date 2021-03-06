require.config({
    baseUrl: '/',
    paths: {        
        'jquery': '../vendor/bower/jquery/dist/jquery.min',
        'lodash': '../vendor/bower/lodash/lodash.min',
        'backbone': '../vendor/bower/backbone/backbone-min',
        'bootstrap': '../vendor/bower/bootstrap/dist/js/bootstrap.min',
        'text': '../vendor/bower/requirejs-text/text',
        'CMS': './app',
        'backbone.layoutmanager': '../vendor/bower/layoutmanager/backbone.layoutmanager'
    },

    map: {
      "*": {
        "underscore": "lodash"
      }
    },

    shim: {
        'lodash': {
            exports: '_'
        },

        'bootstrap': {
            deps: ['jquery']
        }

    },
    
    deps: ['main']

});
