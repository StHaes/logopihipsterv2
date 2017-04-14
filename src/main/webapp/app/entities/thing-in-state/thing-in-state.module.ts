import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';

import {Logopihipsterv2SharedModule} from '../../shared';

import {
    ThingInStateService,
    ThingInStatePopupService,
    ThingInStateComponent,
    ThingInStateDetailComponent,
    ThingInStateDialogComponent,
    ThingInStatePopupComponent,
    ThingInStateDeletePopupComponent,
    ThingInStateDeleteDialogComponent,
    thingInStateRoute,
    thingInStatePopupRoute,
} from './';

let ENTITY_STATES = [
    ...thingInStateRoute,
    ...thingInStatePopupRoute,
];

@NgModule({
    imports: [
        Logopihipsterv2SharedModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        ThingInStateComponent,
        ThingInStateDetailComponent,
        ThingInStateDialogComponent,
        ThingInStateDeleteDialogComponent,
        ThingInStatePopupComponent,
        ThingInStateDeletePopupComponent,
    ],
    entryComponents: [
        ThingInStateComponent,
        ThingInStateDialogComponent,
        ThingInStatePopupComponent,
        ThingInStateDeleteDialogComponent,
        ThingInStateDeletePopupComponent,
    ],
    providers: [
        ThingInStateService,
        ThingInStatePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Logopihipsterv2ThingInStateModule {
}
