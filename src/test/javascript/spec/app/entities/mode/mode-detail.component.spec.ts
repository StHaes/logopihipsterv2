import {ComponentFixture, TestBed, async, inject} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {Http, BaseRequestOptions} from '@angular/http';
import {OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {DateUtils, DataUtils} from 'ng-jhipster';
import {MockActivatedRoute} from '../../../helpers/mock-route.service';
import {ModeDetailComponent} from '../../../../../../main/webapp/app/entities/mode/mode-detail.component';
import {ModeService} from '../../../../../../main/webapp/app/entities/mode/mode.service';
import {Mode} from '../../../../../../main/webapp/app/entities/mode/mode.model';

describe('Component Tests', () => {

    describe('Mode Management Detail Component', () => {
        let comp:ModeDetailComponent;
        let fixture:ComponentFixture<ModeDetailComponent>;
        let service:ModeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ModeDetailComponent],
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
                    ModeService
                ]
            }).overrideComponent(ModeDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ModeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModeService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Mode(10)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.mode).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
