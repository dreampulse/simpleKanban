/// <reference path='../typings/tsd.d.ts'/>
angular.module('app', ['ui.sortable']).run(function () {
});

var List = (function () {
    function List(name, items) {
        this.name = name;
        this.items = items.map(function (e) {
            return { content: e };
        });
    }
    List.prototype.add = function () {
        this.items.push({
            content: ''
        });
    };
    return List;
})();

var AppCtrl = (function () {
    function AppCtrl($scope) {
        this.lists = [
            new List('open', [
                'drink beer',
                'make good presentation'
            ]),
            new List('progress', [
                'learn CSS'
            ]),
            new List('done', [
                'eat pizza'
            ])
        ];
    }
    return AppCtrl;
})();
angular.module('app').controller('AppCtrl', AppCtrl);
//# sourceMappingURL=index.js.map
