/// <reference path='../typings/tsd.d.ts'/>

angular.module('app', ['ui.sortable', 'ngStorage']).run(function () {
});

class AppCtrl {
    public lists:{
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

        this.lists = $localStorage.$default({
            store: init
        }).store;
    }

    public add(idx) {
        this.lists[idx].items.push({content : ''});
    }
}
angular.module('app').controller('AppCtrl', AppCtrl);