import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Thing} from './thing.model';
import {ThingService} from './thing.service';

@Component({
    selector: 'jhi-thing-detail',
    templateUrl: './thing-detail.component.html'
})
export class ThingDetailComponent implements OnInit, OnDestroy {

    thing:Thing;
    private subscription:any;

    constructor(private thingService:ThingService,
                private route:ActivatedRoute) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load(id) {
        this.thingService.find(id).subscribe(thing => {
            this.thing = thing;
        });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
