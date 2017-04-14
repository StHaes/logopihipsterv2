import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {PaginationUtil} from 'ng-jhipster';

import {ThingInStateComponent} from './thing-in-state.component';
import {ThingInStateDetailComponent} from './thing-in-state-detail.component';
import {ThingInStatePopupComponent} from './thing-in-state-dialog.component';
import {ThingInStateDeletePopupComponent} from './thing-in-state-delete-dialog.component';

import {Principal} from '../../shared';


export const thingInStateRoute:Routes = [
    {
        path: 'thing-in-state',
        component: ThingInStateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ThingInStates'
        }
    }, {
        path: 'thing-in-state/:id',
        component: ThingInStateDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ThingInStates'
        }
    }
];

export const thingInStatePopupRoute:Routes = [
    {
        path: 'thing-in-state-new',
        component: ThingInStatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ThingInStates'
        },
        outlet: 'popup'
    },
    {
        path: 'thing-in-state/:id/edit',
        component: ThingInStatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ThingInStates'
        },
        outlet: 'popup'
    },
    {
        path: 'thing-in-state/:id/delete',
        component: ThingInStateDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ThingInStates'
        },
        outlet: 'popup'
    }
];
