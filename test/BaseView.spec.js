define(['BaseView'], function (BaseView) {
    describe('BaseView', function () {
        it('can be extended', function() {
            expect(BaseView.extend({})).toBeDefined();
        });
    });
});
