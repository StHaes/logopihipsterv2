import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';

import {Logopihipsterv2SharedModule} from '../../shared';

import {
    ModeService,
    ModePopupService,
    ModeComponent,
    ModeDetailComponent,
    ModeDialogComponent,
    ModePopupComponent,
    ModeDeletePopupComponent,
    ModeDeleteDialogComponent,
    modeRoute,
    modePopupRoute,
} from './';

let ENTITY_STATES = [
    ...modeRoute,
    ...modePopupRoute,
];

@NgModule({
    imports: [
        Logopihipsterv2SharedModule,
        RouterModule.forRoot(ENTITY_STATES, {useHash: true})
    ],
    declarations: [
        ModeComponent,
        ModeDetailComponent,
        ModeDialogComponent,
        ModeDeleteDialogComponent,
        ModePopupComponent,
        ModeDeletePopupComponent,
    ],
    entryComponents: [
        ModeComponent,
        ModeDialogComponent,
        ModePopupComponent,
        ModeDeleteDialogComponent,
        ModeDeletePopupComponent,
    ],
    providers: [
        ModeService,
        ModePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Logopihipsterv2ModeModule {
}
