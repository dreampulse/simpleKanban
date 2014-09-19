/// <reference path='../typings/tsd.d.ts'/>

angular.module('app', ['ui.sortable', 'ngStorage']).run(function () {
});

class AppCtrl {
    public columns:{
        name : string;
        items : {
            content : string
        }[]
    }[];

    constructor($scope:ng.IScope, $localStorage:any) {

        var init = [
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
        ];

        this.columns = $localStorage.$default({
            store: init
        }).store;
    }

    public add(idx) {
        this.columns[idx].items.push({content : ''});
    }

    public remove(idxColumn, idxItem) {
        this.columns[idxColumn].items.splice(idxItem, 1);
    }
}
angular.module('app').controller('AppCtrl', AppCtrl);