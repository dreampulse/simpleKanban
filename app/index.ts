/// <reference path='../typings/tsd.d.ts'/>

angular.module('app', ['ui.sortable']).run(function() { });

class List {
    public name : string;
    public items : {
        content : string;
    }[];

    constructor(name : string, items : string[]) {
        this.name = name;
        this.items = items.map(e => { return {content:e} } );
    }

    public add() {
        this.items.push({
            content : ''
        })
    }
}

class AppCtrl {
    public lists : List[];

    constructor($scope : ng.IScope) {
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
}
angular.module('app').controller('AppCtrl', AppCtrl);