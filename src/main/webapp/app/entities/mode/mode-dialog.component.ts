import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response} from '@angular/http';

import {NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {EventManager, AlertService} from 'ng-jhipster';

import {Mode} from './mode.model';
import {ModePopupService} from './mode-popup.service';
import {ModeService} from './mode.service';
import {ThingInState, ThingInStateService} from '../thing-in-state';

@Component({
    selector: 'jhi-mode-dialog',
    templateUrl: './mode-dialog.component.html'
})
export class ModeDialogComponent implements OnInit {

    mode:Mode;
    authorities:any[];
    isSaving:boolean;

    thinginstates:ThingInState[];

    constructor(public activeModal:NgbActiveModal,
                private alertService:AlertService,
                private modeService:ModeService,
                private thingInStateService:ThingInStateService,
                private eventManager:EventManager) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.thingInStateService.query().subscribe(
            (res:Response) => {
                this.thinginstates = res.json();
            }, (res:Response) => this.onError(res.json()));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.mode.id !== undefined) {
            this.modeService.update(this.mode)
                .subscribe((res:Mode) =>
                    this.onSaveSuccess(res), (res:Response) => this.onSaveError(res.json()));
        } else {
            this.modeService.create(this.mode)
                .subscribe((res:Mode) =>
                    this.onSaveSuccess(res), (res:Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess(result:Mode) {
        this.eventManager.broadcast({name: 'modeListModification', content: 'OK'});
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

    trackThingInStateById(index:number, item:ThingInState) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-mode-popup',
    template: ''
})
export class ModePopupComponent implements OnInit, OnDestroy {

    modalRef:NgbModalRef;
    routeSub:any;

    constructor(private route:ActivatedRoute,
                private modePopupService:ModePopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.modalRef = this.modePopupService
                    .open(ModeDialogComponent, params['id']);
            } else {
                this.modalRef = this.modePopupService
                    .open(ModeDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
