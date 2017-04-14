import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response} from '@angular/http';

import {NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {EventManager, AlertService} from 'ng-jhipster';

import {ThingInState} from './thing-in-state.model';
import {ThingInStatePopupService} from './thing-in-state-popup.service';
import {ThingInStateService} from './thing-in-state.service';
import {Thing, ThingService} from '../thing';
import {Mode, ModeService} from '../mode';

@Component({
    selector: 'jhi-thing-in-state-dialog',
    templateUrl: './thing-in-state-dialog.component.html'
})
export class ThingInStateDialogComponent implements OnInit {

    thingInState:ThingInState;
    authorities:any[];
    isSaving:boolean;

    things:Thing[];

    modes:Mode[];

    constructor(public activeModal:NgbActiveModal,
                private alertService:AlertService,
                private thingInStateService:ThingInStateService,
                private thingService:ThingService,
                private modeService:ModeService,
                private eventManager:EventManager) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.thingService.query().subscribe(
            (res:Response) => {
                this.things = res.json();
            }, (res:Response) => this.onError(res.json()));
        this.modeService.query().subscribe(
            (res:Response) => {
                this.modes = res.json();
            }, (res:Response) => this.onError(res.json()));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.thingInState.id !== undefined) {
            this.thingInStateService.update(this.thingInState)
                .subscribe((res:ThingInState) =>
                    this.onSaveSuccess(res), (res:Response) => this.onSaveError(res.json()));
        } else {
            this.thingInStateService.create(this.thingInState)
                .subscribe((res:ThingInState) =>
                    this.onSaveSuccess(res), (res:Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess(result:ThingInState) {
        this.eventManager.broadcast({name: 'thingInStateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackThingById(index:number, item:Thing) {
        return item.id;
    }

    trackModeById(index:number, item:Mode) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-thing-in-state-popup',
    template: ''
})
export class ThingInStatePopupComponent implements OnInit, OnDestroy {

    modalRef:NgbModalRef;
    routeSub:any;

    constructor(private route:ActivatedRoute,
                private thingInStatePopupService:ThingInStatePopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.modalRef = this.thingInStatePopupService
                    .open(ThingInStateDialogComponent, params['id']);
            } else {
                this.modalRef = this.thingInStatePopupService
                    .open(ThingInStateDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
