/// <reference path='../typings/tsd.d.ts'/>

angular.module('app', ['ui.sortable', 'ngStorage']);

//////////
// Model

interface Item {
    content:string;
}

interface Column {
    name:string;
    items:Item[];
}

interface Model {
    columns:Column[];
}


//////////////////////
// Column Controller

interface ColumnCtrlScope extends ng.IScope {
    column : Column;
}

class ColumnCtrl {
    public column : Column;

    constructor($scope:ColumnCtrlScope) {
        this.column = $scope.column;

        $scope.$watch(() => { return this.column}, () => {
            this.assureOneEmptyItem();
        }, true);
    }

    public assureOneEmptyItem() {
        var last = this.column.items[this.column.items.length-1];
        if (last.content === undefined || last.content !== "") {
            this.add();
        }
    }

    public add() {
        this.column.items.push({content: ''});
    }

    public remove(idx:number) {
        this.column.items.splice(idx, 1);
    }
}
angular.module('app').controller('ColumnCtrl', ColumnCtrl);



///////////////////
// App Controller

class AppCtrl {
    public vm:Model;

    constructor($scope:ng.IScope, $localStorage:any) {

        var init : Model = {
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

        this.vm = $localStorage.$default(init);
    }

}
angular.module('app').controller('AppCtrl', AppCtrl);