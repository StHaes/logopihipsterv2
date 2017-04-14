import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {PaginationUtil} from 'ng-jhipster';

import {ThingComponent} from './thing.component';
import {ThingDetailComponent} from './thing-detail.component';
import {ThingPopupComponent} from './thing-dialog.component';
import {ThingDeletePopupComponent} from './thing-delete-dialog.component';

import {Principal} from '../../shared';


export const thingRoute:Routes = [
    {
        path: 'thing',
        component: ThingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Things'
        }
    }, {
        path: 'thing/:id',
        component: ThingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Things'
        }
    }
];

export const thingPopupRoute:Routes = [
    {
        path: 'thing-new',
        component: ThingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Things'
        },
        outlet: 'popup'
    },
    {
        path: 'thing/:id/edit',
        component: ThingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Things'
        },
        outlet: 'popup'
    },
    {
        path: 'thing/:id/delete',
        component: ThingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Things'
        },
        outlet: 'popup'
    }
];
