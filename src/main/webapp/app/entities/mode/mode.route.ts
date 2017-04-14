import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate} from '@angular/router';

import {UserRouteAccessService} from '../../shared';
import {PaginationUtil} from 'ng-jhipster';

import {ModeComponent} from './mode.component';
import {ModeDetailComponent} from './mode-detail.component';
import {ModePopupComponent} from './mode-dialog.component';
import {ModeDeletePopupComponent} from './mode-delete-dialog.component';

import {Principal} from '../../shared';


export const modeRoute:Routes = [
    {
        path: 'mode',
        component: ModeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Modes'
        }
    }, {
        path: 'mode/:id',
        component: ModeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Modes'
        }
    }
];

export const modePopupRoute:Routes = [
    {
        path: 'mode-new',
        component: ModePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Modes'
        },
        outlet: 'popup'
    },
    {
        path: 'mode/:id/edit',
        component: ModePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Modes'
        },
        outlet: 'popup'
    },
    {
        path: 'mode/:id/delete',
        component: ModeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Modes'
        },
        outlet: 'popup'
    }
];
