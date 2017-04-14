import {ThingInState} from '../thing-in-state';
export class Mode {
    constructor(public id?:number,
                public code?:string,
                public label?:string,
                public thingInState?:ThingInState,) {
    }
}
