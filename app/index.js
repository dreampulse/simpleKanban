/// <reference path='../typings/tsd.d.ts'/>
angular.module('app', ['ui.sortable', 'ngStorage']);



var ColumnCtrl = (function () {
    function ColumnCtrl($scope) {
        var _this = this;
        this.column = $scope.column;

        $scope.$watch(function () {
            return _this.column;
        }, function () {
            _this.assureOneEmptyItem();
        }, true);
    }
    ColumnCtrl.prototype.assureOneEmptyItem = function () {
        var last = this.column.items[this.column.items.length - 1];
        if (last.content === undefined || last.content !== "") {
            this.add();
        }
    };

    ColumnCtrl.prototype.add = function () {
        this.column.items.push({ content: '' });
    };

    ColumnCtrl.prototype.remove = function (idx) {
        this.column.items.splice(idx, 1);
    };
    return ColumnCtrl;
})();
angular.module('app').controller('ColumnCtrl', ColumnCtrl);

///////////////////
// App Controller
var AppCtrl = (function () {
    function AppCtrl($scope, $localStorage) {
        var init = { columns: [
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
            ] };

        this.vm = $localStorage.$default(init);
    }
    return AppCtrl;
})();
angular.module('app').controller('AppCtrl', AppCtrl);
//# sourceMappingURL=index.js.map
