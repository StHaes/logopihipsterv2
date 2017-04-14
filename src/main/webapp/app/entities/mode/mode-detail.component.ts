import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Mode} from './mode.model';
import {ModeService} from './mode.service';

@Component({
    selector: 'jhi-mode-detail',
    templateUrl: './mode-detail.component.html'
})
export class ModeDetailComponent implements OnInit, OnDestroy {

    mode:Mode;
    private subscription:any;

    constructor(private modeService:ModeService,
                private route:ActivatedRoute) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load(id) {
        this.modeService.find(id).subscribe(mode => {
            this.mode = mode;
        });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
