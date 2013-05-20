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
        jquery: '../components/jquery/jquery',
        lodash: '../components/lodash/lodash',
        backbone: '../components/backbone/backbone',
        pubsub: '../components/pubsub.js/pubsub'
    },

    map: {
        '*': {
            'underscore': 'lodash'
        }
    },

    deps: tests,

    callback: window.__karma__.start
});