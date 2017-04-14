import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ThingInState} from './thing-in-state.model';
import {ThingInStateService} from './thing-in-state.service';

@Component({
    selector: 'jhi-thing-in-state-detail',
    templateUrl: './thing-in-state-detail.component.html'
})
export class ThingInStateDetailComponent implements OnInit, OnDestroy {

    thingInState:ThingInState;
    private subscription:any;

    constructor(private thingInStateService:ThingInStateService,
                private route:ActivatedRoute) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load(id) {
        this.thingInStateService.find(id).subscribe(thingInState => {
            this.thingInState = thingInState;
        });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
