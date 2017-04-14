import {Component, OnInit, OnDestroy} from '@angular/core';
import {Response} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {EventManager, ParseLinks, PaginationUtil, AlertService} from 'ng-jhipster';

import {ThingInState} from './thing-in-state.model';
import {ThingInStateService} from './thing-in-state.service';
import {ITEMS_PER_PAGE, Principal} from '../../shared';
import {PaginationConfig} from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-thing-in-state',
    templateUrl: './thing-in-state.component.html'
})
export class ThingInStateComponent implements OnInit, OnDestroy {
    thingInStates:ThingInState[];
    currentAccount:any;
    eventSubscriber:Subscription;

    constructor(private thingInStateService:ThingInStateService,
                private alertService:AlertService,
                private eventManager:EventManager,
                private principal:Principal) {
    }

    loadAll() {
        this.thingInStateService.query().subscribe(
            (res:Response) => {
                this.thingInStates = res.json();
            },
            (res:Response) => this.onError(res.json())
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInThingInStates();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index:number, item:ThingInState) {
        return item.id;
    }


    registerChangeInThingInStates() {
        this.eventSubscriber = this.eventManager.subscribe('thingInStateListModification', (response) => this.loadAll());
    }


    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
