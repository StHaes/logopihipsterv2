import './vendor.ts';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Ng2Webstorage} from 'ng2-webstorage';

import {Logopihipsterv2SharedModule, UserRouteAccessService} from './shared';
import {Logopihipsterv2HomeModule} from './home/home.module';
import {Logopihipsterv2AdminModule} from './admin/admin.module';
import {Logopihipsterv2AccountModule} from './account/account.module';
import {Logopihipsterv2EntityModule} from './entities/entity.module';

import {LayoutRoutingModule} from './layouts';
import {customHttpProvider} from './blocks/interceptor/http.provider';
import {PaginationConfig} from './blocks/config/uib-pagination.config';

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';


@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({prefix: 'jhi', separator: '-'}),
        Logopihipsterv2SharedModule,
        Logopihipsterv2HomeModule,
        Logopihipsterv2AdminModule,
        Logopihipsterv2AccountModule,
        Logopihipsterv2EntityModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        {provide: Window, useValue: window},
        {provide: Document, useValue: document},
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [JhiMainComponent]
})
export class Logopihipsterv2AppModule {
}
