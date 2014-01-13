var tests = [];
for (var file in window.__karma__.files) {
    if (/spec\.js$/.test(file)) {
        tests.push(file);
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/src',

    shim: {
        'jquery': {
            exports: '$'
        },

        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    },

    paths: {
        jquery: '../node_modules/jquery/jquery',
        lodash: '../node_modules/lodash/lodash',
        backbone: '../node_modules/backbone/backbone',
        pubsub: '../node_modules/pubsub.js/pubsub'
    },

    map: {
        '*': {
            'underscore': 'lodash'
        }
    },

    deps: tests,

    callback: window.__karma__.start
});
