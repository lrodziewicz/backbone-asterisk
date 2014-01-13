define(['lodash', 'backbone'], function (_, Backbone) {

    'use strict';

    var BaseView = function (options) {
        this._views = [];

        Backbone.View.apply(this, [options]);
    };

    _.extend(BaseView.prototype, Backbone.View.prototype, {

        _prepareEntry: function (parameters) {
            var entry;

            // If given an instance of Backbone.View
            if (parameters instanceof Backbone.View) {
                entry = {
                    name: parameters.cid,
                    view: parameters
                };
            }
            // If given an array of view objects
            else if (_.isArray(parameters)) {
                entry = [];
                for (var i = 0; i < parameters.length; i++) {
                    this._checkIfValidView(parameters[i]);

                    entry.push(this._prepareEntry(parameters[i]));
                }
            }
            // If given a literal object where each view have have name like { "name": view }
            else if (_.isPlainObject(parameters)) {
                entry = [];
                for (var name in parameters) {
                    this._checkIfValidView(parameters[name]);

                    entry.push({
                        name: name,
                        view: parameters[name]
                    });
                }
            }
            else {
                throw "Parameter should have to either Backbone.View instance, array of Backbone.Views or object list of Backbone.Views";
            }

            return entry;
        },

        _checkIfValidView: function (view) {
            if(!view instanceof Backbone.View) throw "View have to be an instance of Backbone.View";
        },

        add: function (parameters, at) {
            var entry = this._prepareEntry(parameters);

            if(at) {
                // If array is not large enough expand it
                if(at > this._views.length - 1) {
                    if(_.isArray(entry)) {
                        this._views.push.apply(this._views, entry);
                    } else {
                        this._views[at] = entry;
                    }
                }
                // Move items around if point of insertion has to be into an existing space
                else {
                    if(_.isArray(entry)) {
                        //this._views.splice.apply(this._views, (function () { entry.splice(0, 0, at, 0); return entry;})());
                        this._views.splice.apply(this._views, [at, 0].concat(entry));
                    }
                    else {
                        this._views.splice(at, 0, entry);
                    }
                }

                return this._views.length;
            }

            // If place is not set
            if(_.isArray(entry)) {
                return this._views.push.apply(this._views, entry);
            }
            return this._views.push(entry);
        },

        get: function (arg) {
            var entry;
            // Get by position
            if (_.isNumber(arg)) {
                entry = this._views[arg];
            }
            // Get by name in other case
            else if (_.isString(arg)) {
                entry = _.find(this._views, function(element) {
                    return element.name === arg;
                });
            }
            else throw "Expecting either number or a string";

            return entry ? entry.view : void 0;
        },

        getPosition: function (arg) {
            var position;

            // Name given
            if(_.isString(arg)) {
                position = _.findKey(this._views, function(element) {
                    return element.name === arg;
                });
            }
            // Instance of Backbone.View given
            else if (arg instanceof Backbone.View) {
                position = _.findKey(this._views, function(element) {
                    return element.view.cid === arg.cid;
                });
            }
            else throw "Expecting either string or instance of Backbone.View";

            return position !== undefined ? parseInt(position, 10) : void 0;
        },

        size: function () {
            return this._views.length;
        },

        pullOut: function (arg) {
            var position = _.isNumber(arg) ? arg : this.getPosition(arg);

            this._views.splice(position, 1);
        },

        // Overwrite default remove method to trigger dispose automatically
        remove: function () {
            this.dispose();

            Backbone.View.prototype.remove.call(this);
        },

        dispose: function () {
            for (var i = this._views.length - 1; i >= 0; i--) {
                this._views[i].view.remove();

                this.pullOut(i);
            }

            // Call custom dispose function if defined
            if (_.isFunction(this.onDispose)) {
                this.onDispose();
            }
        }
    });

    BaseView.extend = Backbone.View.extend;

    return BaseView;
});