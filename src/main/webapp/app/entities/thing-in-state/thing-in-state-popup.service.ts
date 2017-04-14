import {Injectable, Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ThingInState} from './thing-in-state.model';
import {ThingInStateService} from './thing-in-state.service';
@Injectable()
export class ThingInStatePopupService {
    private isOpen = false;

    constructor(private modalService:NgbModal,
                private router:Router,
                private thingInStateService:ThingInStateService) {
    }

    open(component:Component, id?:number | any):NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.thingInStateService.find(id).subscribe(thingInState => {
                this.thingInStateModalRef(component, thingInState);
            });
        } else {
            return this.thingInStateModalRef(component, new ThingInState());
        }
    }

    thingInStateModalRef(component:Component, thingInState:ThingInState):NgbModalRef {
        let modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.thingInState = thingInState;
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
