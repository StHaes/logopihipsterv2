import {Injectable, Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Mode} from './mode.model';
import {ModeService} from './mode.service';
@Injectable()
export class ModePopupService {
    private isOpen = false;

    constructor(private modalService:NgbModal,
                private router:Router,
                private modeService:ModeService) {
    }

    open(component:Component, id?:number | any):NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.modeService.find(id).subscribe(mode => {
                this.modeModalRef(component, mode);
            });
        } else {
            return this.modeModalRef(component, new Mode());
        }
    }

    modeModalRef(component:Component, mode:Mode):NgbModalRef {
        let modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.mode = mode;
        modalRef.result.then(result => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true});
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true});
            this.isOpen = false;
        });
        return modalRef;
    }
}
