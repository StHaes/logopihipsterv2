import {Thing} from '../thing';
import {Mode} from '../mode';
export class ThingInState {
    constructor(public id?:number,
                public state?:boolean,
                public thing?:Thing,
                public mode?:Mode,) {
        this.state = false;
    }
}
