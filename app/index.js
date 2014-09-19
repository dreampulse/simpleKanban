/// <reference path='../typings/tsd.d.ts'/>
angular.module('app', ['ui.sortable', 'ngStorage']).run(function () {
});

var Item = (function () {
    function Item(item) {
        if (item) {
            this.content = item.content;
        }
    }
    return Item;
})();

var Column = (function () {
    function Column(column) {
        if (column) {
            this.name = column.name;
            this.items = column.items.map(function (item) {
                return new Item(item);
            });
        }
    }
    Column.prototype.add = function () {
        this.items.push({ content: '' });
    };

    Column.prototype.remove = function (idx) {
        this.items.splice(idx, 1);
    };

    Column.prototype.assureOneEmptyItem = function () {
        var last = this.items[this.items.length - 1];
        if (last.content === undefined || last.content !== "") {
            this.add();
        }
    };
    return Column;
})();

var Model = (function () {
    function Model(model) {
        if (model) {
            this.columns = model.columns.map(function (column) {
                return new Column(column);
            });
        }
    }
    Model.prototype.assureOneEmptyItem = function () {
        this.columns.forEach(function (colum) {
            return colum.assureOneEmptyItem();
        });
    };
    return Model;
})();

var AppCtrl = (function () {
    function AppCtrl($scope, $localStorage) {
        var _this = this;
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

        var storage = $localStorage.$default({ model: init });

        this.vm = new Model(storage.model);

        $scope.$watch(function () {
            return _this.vm;
        }, function (vm) {
            vm.assureOneEmptyItem();

            storage.model = vm; // store change in database
        }, true);
    }
    return AppCtrl;
})();
angular.module('app').controller('AppCtrl', AppCtrl);
//# sourceMappingURL=index.js.map
