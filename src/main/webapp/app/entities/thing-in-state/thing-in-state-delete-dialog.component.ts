import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {EventManager} from 'ng-jhipster';

import {ThingInState} from './thing-in-state.model';
import {ThingInStatePopupService} from './thing-in-state-popup.service';
import {ThingInStateService} from './thing-in-state.service';

@Component({
    selector: 'jhi-thing-in-state-delete-dialog',
    templateUrl: './thing-in-state-delete-dialog.component.html'
})
export class ThingInStateDeleteDialogComponent {

    thingInState:ThingInState;

    constructor(private thingInStateService:ThingInStateService,
                public activeModal:NgbActiveModal,
                private eventManager:EventManager) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id:number) {
        this.thingInStateService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'thingInStateListModification',
                content: 'Deleted an thingInState'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-thing-in-state-delete-popup',
    template: ''
})
export class ThingInStateDeletePopupComponent implements OnInit, OnDestroy {

    modalRef:NgbModalRef;
    routeSub:any;

    constructor(private route:ActivatedRoute,
                private thingInStatePopupService:ThingInStatePopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.thingInStatePopupService
                .open(ThingInStateDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
