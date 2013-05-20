define(['lodash', 'backbone'], function(_, Backbone) {

    'use strict';

    var BaseView = function(options) {
        this._childViews = {};

        Backbone.View.apply(this, [options]);
    };

    _.extend(BaseView.prototype, Backbone.View.prototype, {

    });

    BaseView.extend = Backbone.View.extend;

    return BaseView;
});