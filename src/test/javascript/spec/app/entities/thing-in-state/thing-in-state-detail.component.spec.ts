import {ComponentFixture, TestBed, async, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {Http, BaseRequestOptions} from '@angular/http';
import {OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {DateUtils, DataUtils} from 'ng-jhipster';
import {MockActivatedRoute} from '../../../helpers/mock-route.service';
import {ThingInStateDetailComponent} from '../../../../../../main/webapp/app/entities/thing-in-state/thing-in-state-detail.component';
import {ThingInStateService} from '../../../../../../main/webapp/app/entities/thing-in-state/thing-in-state.service';
import {ThingInState} from '../../../../../../main/webapp/app/entities/thing-in-state/thing-in-state.model';

describe('Component Tests', () => {

    describe('ThingInState Management Detail Component', () => {
        let comp:ThingInStateDetailComponent;
        let fixture:ComponentFixture<ThingInStateDetailComponent>;
        let service:ThingInStateService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ThingInStateDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance:MockBackend, defaultOptions:BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    ThingInStateService
                ]
            }).overrideComponent(ThingInStateDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThingInStateDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThingInStateService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new ThingInState(10)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.thingInState).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
