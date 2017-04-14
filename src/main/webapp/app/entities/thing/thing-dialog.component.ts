import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Response} from '@angular/http';

import {NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {EventManager, AlertService} from 'ng-jhipster';

import {Thing} from './thing.model';
import {ThingPopupService} from './thing-popup.service';
import {ThingService} from './thing.service';

@Component({
    selector: 'jhi-thing-dialog',
    templateUrl: './thing-dialog.component.html'
})
export class ThingDialogComponent implements OnInit {

    thing:Thing;
    authorities:any[];
    isSaving:boolean;

    constructor(public activeModal:NgbActiveModal,
                private alertService:AlertService,
                private thingService:ThingService,
                private eventManager:EventManager) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.thing.id !== undefined) {
            this.thingService.update(this.thing)
                .subscribe((res:Thing) =>
                    this.onSaveSuccess(res), (res:Response) => this.onSaveError(res.json()));
        } else {
            this.thingService.create(this.thing)
                .subscribe((res:Thing) =>
                    this.onSaveSuccess(res), (res:Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess(result:Thing) {
        this.eventManager.broadcast({name: 'thingListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-thing-popup',
    template: ''
})
export class ThingPopupComponent implements OnInit, OnDestroy {

    modalRef:NgbModalRef;
    routeSub:any;

    constructor(private route:ActivatedRoute,
                private thingPopupService:ThingPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.modalRef = this.thingPopupService
                    .open(ThingDialogComponent, params['id']);
            } else {
                this.modalRef = this.thingPopupService
                    .open(ThingDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
