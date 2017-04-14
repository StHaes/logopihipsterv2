export class Thing {
    constructor(public id?:number,
                public name?:string,
                public logoId?:string,
                public currentState?:boolean,
                public desiredState?:boolean,) {
        this.currentState = false;
        this.desiredState = false;
    }
}
