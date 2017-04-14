import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {EventManager} from 'ng-jhipster';

import {Mode} from './mode.model';
import {ModePopupService} from './mode-popup.service';
import {ModeService} from './mode.service';

@Component({
    selector: 'jhi-mode-delete-dialog',
    templateUrl: './mode-delete-dialog.component.html'
})
export class ModeDeleteDialogComponent {

    mode:Mode;

    constructor(private modeService:ModeService,
                public activeModal:NgbActiveModal,
                private eventManager:EventManager) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id:number) {
        this.modeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'modeListModification',
                content: 'Deleted an mode'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mode-delete-popup',
    template: ''
})
export class ModeDeletePopupComponent implements OnInit, OnDestroy {

    modalRef:NgbModalRef;
    routeSub:any;

    constructor(private route:ActivatedRoute,
                private modePopupService:ModePopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.modePopupService
                .open(ModeDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
