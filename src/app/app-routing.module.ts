import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/housework/home/home.component';
import { ProfileComponent } from './components/housework/profile/profile.component';
import { RoomComponent } from './components/housework/room/room.component';
import { authGuard } from './guards/auth.guard';
import { NotFoundComponent } from './components/util/not-found/not-found.component';
import { PlanComponent } from './components/housework/plan/plan.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'room/:name', component: RoomComponent, canActivate: [authGuard] },
  { path: 'plan', component: PlanComponent, canActivate: [authGuard] },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
