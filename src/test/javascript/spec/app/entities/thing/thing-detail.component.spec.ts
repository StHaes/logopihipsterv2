import {ComponentFixture, TestBed, async, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {Http, BaseRequestOptions} from '@angular/http';
import {OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {DateUtils, DataUtils} from 'ng-jhipster';
import {MockActivatedRoute} from '../../../helpers/mock-route.service';
import {ThingDetailComponent} from '../../../../../../main/webapp/app/entities/thing/thing-detail.component';
import {ThingService} from '../../../../../../main/webapp/app/entities/thing/thing.service';
import {Thing} from '../../../../../../main/webapp/app/entities/thing/thing.model';

describe('Component Tests', () => {

    describe('Thing Management Detail Component', () => {
        let comp:ThingDetailComponent;
        let fixture:ComponentFixture<ThingDetailComponent>;
        let service:ThingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ThingDetailComponent],
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
                    ThingService
                ]
            }).overrideComponent(ThingDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThingService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Thing(10)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.thing).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
