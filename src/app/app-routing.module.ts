import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { UserAuthGuard } from './services/guards/user-auth.guard';
import { InfluencersComponent } from './pages/influencers/influencers.component';
import { InfluencersListComponent } from './pages/influencers/influencers-list/influencers-list.component';
import { InfluencersDetailComponent } from './pages/influencers/influencers-detail/influencers-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'pages',
    loadChildren: () => import('../app/pages/pages.module').then(m => m.PagesModule),
    canActivate: [UserAuthGuard],
  },

  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
