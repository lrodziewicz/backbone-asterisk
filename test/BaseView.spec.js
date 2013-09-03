define(['backbone', 'BaseView'], function (Backbone, BaseView) {

    describe('BaseView', function () {

        describe('(managing views)', function() {

            var view, childView, childView2, childView3, childView4;

            beforeEach(function(){
                view = new BaseView();

                childView1 = new (Backbone.View.extend({ name: 'child1'}))();
                childView2 = new (Backbone.View.extend({ name: 'child2'}))();
                childView3 = new (Backbone.View.extend({ name: 'child3'}))();
                childView4 = new (Backbone.View.extend({ name: 'child4'}))();
            });

            it('can have a view added anonymously', function() {
                expect(view.add(childView1)).toBe(1);

                function Abc() {}
                var a = new Abc();
                expect(function(){view.add(Abc);}).toThrow();
            });

            it('can add view at given position', function() {
                // TODO: moar tests
                expect(view.add(childView1, 2)).toBe(3);
            });

            it('can get view from given position', function() {
                view.add(childView1, 2);
                expect(typeof view.get(2)).toBe('object');
                expect(view.get(5)).toBeUndefined();
            });

            it('can have multiple views added anonymously with no possition given', function () {
                view.add([childView1, childView2]);
                expect(view.size()).toBe(2);

                view.add([childView3, childView4]);
                expect(view.size()).toBe(4);
                expect(view.get(3).name).toBe('child4');
                expect(view.get(1).name).toBe('child2');
            });

            it('can have multiple anonymous views added at given possition', function () {
                view.add([childView2, childView1]);
                view.add([childView4, childView3], 1);

                expect(view.size()).toBe(4);
                expect(view.get(2).name).toBe('child3');
                expect(view.get(3).name).toBe('child1');
            });


            it('can add view by name', function() {
                view.add({ "name": childView1 });
                expect(view.get("name").name).toBe('child1');
            });

            it('can have multiple named views added at given possition', function () {
                view.add([childView4, childView3, childView3]);
                view.add({"c2": childView2, "c1": childView1}, 2);

                expect(view.size()).toBe(5);
                expect(view.get(3).name).toBe('child1');
                expect(view.get(1).name).toBe('child3');
                expect(view.get(4).name).toBe('child3');
                expect(view.get("c2").name).toBe('child2');
            });

            it('can return a valid position of a view in a collection', function () {
                view.add([childView4, childView3]);
                view.add({"c2": childView2, "c1": childView1}, 1);

                expect(view.getPosition(childView4)).toEqual(0);
                expect(view.getPosition(childView2)).toEqual(1);
                expect(view.getPosition(childView1)).toEqual(2);

                expect(view.getPosition('c1')).toEqual(2);
                expect(view.getPosition('c2')).toEqual(1);
            });

        });

    });
});
