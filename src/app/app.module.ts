import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/housework/home/home.component';
import { ProfileComponent } from './components/housework/profile/profile.component';
import { StatusPipe } from './pipes/status.pipe';
import { NavbarComponent } from './components/housework/navbar/navbar.component';
import { CardTiltDirective } from './directives/card-tilt.directive';
import { RoomComponent } from './components/housework/room/room.component';
import { NotFoundComponent } from './components/util/not-found/not-found.component';
import { AlertComponent } from './components/util/alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu'
import { OutsideClickDirective } from './directives/outside-click.directive';
import { ColorPickerComponent } from './components/housework/home/color-picker/color-picker.component';
import { CardComponent } from './components/housework/home/card/card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImageUploaderComponent } from './components/housework/home/image-uploader/image-uploader.component'
import { MatStepperModule } from '@angular/material/stepper'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    StatusPipe,
    NavbarComponent,
    CardTiltDirective,
    RoomComponent,
    NotFoundComponent,
    AlertComponent,
    OutsideClickDirective,
    ColorPickerComponent,
    CardComponent,
    ImageUploaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    CdkMenuModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
