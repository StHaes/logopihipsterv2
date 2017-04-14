import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {Logopihipsterv2ModeModule} from './mode/mode.module';
import {Logopihipsterv2ThingModule} from './thing/thing.module';
import {Logopihipsterv2ThingInStateModule} from './thing-in-state/thing-in-state.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        Logopihipsterv2ModeModule,
        Logopihipsterv2ThingModule,
        Logopihipsterv2ThingInStateModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Logopihipsterv2EntityModule {
}
