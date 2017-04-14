import {Injectable, Component} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Thing} from './thing.model';
import {ThingService} from './thing.service';
@Injectable()
export class ThingPopupService {
    private isOpen = false;

    constructor(private modalService:NgbModal,
                private router:Router,
                private thingService:ThingService) {
    }

    open(component:Component, id?:number | any):NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.thingService.find(id).subscribe(thing => {
                this.thingModalRef(component, thing);
            });
        } else {
            return this.thingModalRef(component, new Thing());
        }
    }

    thingModalRef(component:Component, thing:Thing):NgbModalRef {
        let modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.thing = thing;
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
