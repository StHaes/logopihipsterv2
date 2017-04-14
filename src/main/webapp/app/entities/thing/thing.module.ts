import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';

import {Logopihipsterv2SharedModule} from '../../shared';

import {
    ThingService,
    ThingPopupService,
    ThingComponent,
    ThingDetailComponent,
    ThingDialogComponent,
    ThingPopupComponent,
    ThingDeletePopupComponent,
    ThingDeleteDialogComponent,
    thingRoute,
    thingPopupRoute,
} from './';

let ENTITY_STATES = [
    ...thingRoute,
    ...thingPopupRoute,
];

@NgModule({
    imports: [
        Logopihipsterv2SharedModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        ThingComponent,
        ThingDetailComponent,
        ThingDialogComponent,
        ThingDeleteDialogComponent,
        ThingPopupComponent,
        ThingDeletePopupComponent,
    ],
    entryComponents: [
        ThingComponent,
        ThingDialogComponent,
        ThingPopupComponent,
        ThingDeleteDialogComponent,
        ThingDeletePopupComponent,
    ],
    providers: [
        ThingService,
        ThingPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Logopihipsterv2ThingModule {
}
