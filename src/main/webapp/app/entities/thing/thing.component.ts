import {Component, OnInit, OnDestroy} from '@angular/core';
import {Response} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {EventManager, ParseLinks, PaginationUtil, AlertService} from 'ng-jhipster';

import {Thing} from './thing.model';
import {ThingService} from './thing.service';
import {ITEMS_PER_PAGE, Principal} from '../../shared';
import {PaginationConfig} from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-thing',
    templateUrl: './thing.component.html'
})
export class ThingComponent implements OnInit, OnDestroy {
    things:Thing[];
    currentAccount:any;
    eventSubscriber:Subscription;

    constructor(private thingService:ThingService,
                private alertService:AlertService,
                private eventManager:EventManager,
                private principal:Principal) {
    }

    loadAll() {
        this.thingService.query().subscribe(
            (res:Response) => {
                this.things = res.json();
            },
            (res:Response) => this.onError(res.json())
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInThings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index:number, item:Thing) {
        return item.id;
    }


    registerChangeInThings() {
        this.eventSubscriber = this.eventManager.subscribe('thingListModification', (response) => this.loadAll());
    }


    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
