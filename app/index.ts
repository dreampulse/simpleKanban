/// <reference path='../typings/tsd.d.ts'/>

angular.module('app', ['ui.sortable', 'ngStorage']).run(function () {
});

class Item {
    content:string;

    constructor(item?:Item) {
        if (item) {
            this.content = item.content;
        }
    }
}

class Column {
    name:string;
    items:Item[];

    constructor(column?:Column) {
        if (column) {
            this.name = column.name;
            this.items = column.items.map(item => {
                return new Item(item);
            })
        }
    }

    public add() {
        this.items.push({content: ''});
    }

    public remove(idx:number) {
        this.items.splice(idx, 1);
    }

    public assureOneEmptyItem() {
        var last = this.items[this.items.length-1];
        if (last.content === undefined || last.content !== "") {
            this.add();
        }
    }
}

class Model {
    columns:Column[];

    constructor(model?:Model) {
        if (model) {
            this.columns = model.columns.map(column => {
                return new Column(column);
            })
        }
    }

    public assureOneEmptyItem() {
        this.columns.forEach(colum => colum.assureOneEmptyItem());
    }

}

class AppCtrl {
    public vm:Model;

    constructor($scope:ng.IScope, $localStorage:any) {

        var init = {
            columns: [
                { name: 'open',
                    items: [
                        {content: 'drink beer'},
                        {content: 'make good presentation'}
                    ]},
                { name: 'progress',
                    items: [
                        {content: 'learn CSS'}
                    ]},
                { name: 'done',
                    items: [
                        {content: 'eat pizza'}
                    ]}
            ]};

        var storage = $localStorage.$default({ model: init });

        this.vm = new Model(storage.model);

        $scope.$watch(() => {return this.vm}, (vm) => {

            vm.assureOneEmptyItem();

            storage.model = vm;  // store change in database
        }, true);
    }

}
angular.module('app').controller('AppCtrl', AppCtrl);