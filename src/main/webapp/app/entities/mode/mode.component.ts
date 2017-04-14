import {Component, OnInit, OnDestroy} from '@angular/core';
import {Response} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {EventManager, ParseLinks, PaginationUtil, AlertService} from 'ng-jhipster';

import {Mode} from './mode.model';
import {ModeService} from './mode.service';
import {ITEMS_PER_PAGE, Principal} from '../../shared';
import {PaginationConfig} from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-mode',
    templateUrl: './mode.component.html'
})
export class ModeComponent implements OnInit, OnDestroy {
    modes:Mode[];
    currentAccount:any;
    eventSubscriber:Subscription;

    constructor(private modeService:ModeService,
                private alertService:AlertService,
                private eventManager:EventManager,
                private principal:Principal) {
    }

    loadAll() {
        this.modeService.query().subscribe(
            (res:Response) => {
                this.modes = res.json();
            },
            (res:Response) => this.onError(res.json())
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInModes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index:number, item:Mode) {
        return item.id;
    }


    registerChangeInModes() {
        this.eventSubscriber = this.eventManager.subscribe('modeListModification', (response) => this.loadAll());
    }


    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
