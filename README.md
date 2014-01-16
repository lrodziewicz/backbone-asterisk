# Backbone.js Asterisk

[![Build Status](https://travis-ci.org/lrodziewicz/backbone-asterisk.png?branch=master)](https://travis-ci.org/lrodziewicz/backbone-asterisk)
[![Dependency Status](https://gemnasium.com/lrodziewicz/backbone-asterisk.png)](https://gemnasium.com/lrodziewicz/backbone-asterisk)

Backbone Asterisk is an a set of extensions for standard Backbone components adding new features that make developing more complex applications easier.
Right now this repository contains a BaseView that add functionality for managing neasted views and automatically dispose all in a way that ensure no ghost views been left.

**Use on your own risk. API may change, all features are under development.**

## Usage

Adding views

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

## License

This library is under the MIT License (MIT), see the file
`license.md` for details. 

