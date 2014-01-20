# Backbone.js Asterisk

[![Build Status](https://travis-ci.org/lrodziewicz/backbone-asterisk.png?branch=master)](https://travis-ci.org/lrodziewicz/backbone-asterisk)
[![Dependency Status](https://gemnasium.com/lrodziewicz/backbone-asterisk.png)](https://gemnasium.com/lrodziewicz/backbone-asterisk)

Backbone Asterisk is an a set of extensions for standard Backbone components adding new features that make developing more complex applications easier.
Right now this repository contains a BaseView that add functionality for managing neasted views and automatically dispose all in a way that ensure no ghost views been left.

At the moment library base on using AMD modules. In near future other distribution versions will be included (no modular JS, ES6 Modules).

**Use on your own risk. API may change, all features are under development.**

### Roadmap
* Functionality to define rendering regions for sub modules
* Rendering optimisations such as lazy-rendering, rendering on requestAnimationFrame
* Add BaseModelView.
* Add BaseCollectionView.

## Usage

###Adding views

```javascript
var main = new BaseView();

// View can be either ordinary Backbone.View instances or other BaseView's
child1 = new (Backbone.View.extend({}))();
child2 = new BaseView();

// Anonymously 
main.add(child1);

// Anonymously at given position
main.add(child1, 1);

// As an array of views
main.add([child1, child2]);

// As an array at given position
main.add([child1, child2], 2);

// By name
main.add({'foo': child1});

// Multiple by name
main.add({'foo': child1, 'bar': child2});

// By name at given position
main.add({'foo': child1, 'bar': child2}, 3);
```

### Getting views

You can retrieve view by it's name or position
```javascript
// Get view by it's name
main.get('foo');

//Get view by it's position
main.get(1);
```

To check how many child views are currently added, simply
```javascript
main.size();
```

You can also get a position of a view by it's name or instance
```javascript
// Get position by name
main.getPosition('foo');

// Get position by view instance
main.getPosition(child1);
```

### Removing child views

You can remove view by name or position
```javascript
// By position
main.pullOut(1);

// By name
main.pullOut('foo');
```

### Disposing views

Child views are automatically disposed on parents view remove. To define custom dispose behaviour you can simply add `onDispose` method. It will be automatically called on remove.

```javascript
var view = BaseView.extend({
	onDispose: function () {
		// Clean up jQuery UI behaviour before removing the view
		this.$el.find('.foo').draggable('destroy');
	}
});
```

### Rendering views
Child views are automatically rendered into parents container. Some sophisticated strategies coming very soon.

## License

This library is under the MIT License (MIT), see the file
`license.md` for details. 

