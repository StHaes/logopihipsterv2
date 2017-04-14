import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';

import {Logopihipsterv2SharedModule} from '../shared';

import {HOME_ROUTE, HomeComponent} from './';


@NgModule({
    imports: [
        Logopihipsterv2SharedModule,
        RouterModule.forRoot([HOME_ROUTE], {useHash: true})
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Logopihipsterv2HomeModule {
}
