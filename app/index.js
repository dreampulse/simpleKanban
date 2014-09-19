/// <reference path='../typings/tsd.d.ts'/>
angular.module('app', ['ui.sortable', 'ngStorage']).run(function () {
});

var AppCtrl = (function () {
    function AppCtrl($scope, $localStorage) {
        var init = [
            {
                name: 'open',
                items: [
                    { content: 'drink beer' },
                    { content: 'make good presentation' }
                ] },
            {
                name: 'progress',
                items: [
                    { content: 'learn CSS' }
                ] },
            {
                name: 'done',
                items: [
                    { content: 'eat pizza' }
                ] }
        ];

        this.lists = $localStorage.$default({
            store: init
        }).store;
    }
    AppCtrl.prototype.add = function (idx) {
        this.lists[idx].items.push({ content: '' });
    };
    return AppCtrl;
})();
angular.module('app').controller('AppCtrl', AppCtrl);
//# sourceMappingURL=index.js.map
