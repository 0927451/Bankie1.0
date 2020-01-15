import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { GoalsComponent } from './goals';
import { GamesComponent } from './games';
import { UsersettingsComponent } from './usersettings';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    { path: 'usersettings', component: UsersettingsComponent, canActivate: [AuthGuard] },
    { path: 'games', component: GamesComponent, canActivate: [AuthGuard] },
    { path: 'goals', component: GoalsComponent, canActivate: [AuthGuard] },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);