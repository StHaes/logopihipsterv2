import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {EventManager} from 'ng-jhipster';

import {Thing} from './thing.model';
import {ThingPopupService} from './thing-popup.service';
import {ThingService} from './thing.service';

@Component({
    selector: 'jhi-thing-delete-dialog',
    templateUrl: './thing-delete-dialog.component.html'
})
export class ThingDeleteDialogComponent {

    thing:Thing;

    constructor(private thingService:ThingService,
                public activeModal:NgbActiveModal,
                private eventManager:EventManager) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id:number) {
        this.thingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'thingListModification',
                content: 'Deleted an thing'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-thing-delete-popup',
    template: ''
})
export class ThingDeletePopupComponent implements OnInit, OnDestroy {

    modalRef:NgbModalRef;
    routeSub:any;

    constructor(private route:ActivatedRoute,
                private thingPopupService:ThingPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.thingPopupService
                .open(ThingDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
