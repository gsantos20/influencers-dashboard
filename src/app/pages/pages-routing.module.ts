import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { UserAuthGuard } from '../services/guards/user-auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InfluencersDetailComponent } from './influencers/influencers-detail/influencers-detail.component';
import { InfluencersListComponent } from './influencers/influencers-list/influencers-list.component';
import { InfluencersComponent } from './influencers/influencers.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [UserAuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [UserAuthGuard] },
      {
        path: 'influencers',
        component: InfluencersComponent,
        canActivate: [UserAuthGuard],
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: InfluencersListComponent },
          { path: 'detail', component: InfluencersDetailComponent },
          { path: 'detail/:id/', component: InfluencersDetailComponent },
        ],
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
