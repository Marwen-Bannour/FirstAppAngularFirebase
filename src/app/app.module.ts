import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';



import {environment} from '../environments/environment'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { MaterialModule } from './material/material.module';
import { ButtonComponent } from './materialComponents/button/button.component';
import { TypographyComponent } from './materialComponents/typography/typography.component';
import { ButtonToggleComponent } from './materialComponents/button-toggle/button-toggle.component';
import { IconComponent } from './materialComponents/icon/icon.component';
import { BadgeComponent } from './materialComponents/badge/badge.component';
import { ProgressSpinnerComponent } from './materialComponents/progress-spinner/progress-spinner.component';
import { ToolBarComponent } from './materialComponents/tool-bar/tool-bar.component';
import { SideNavComponent } from './materialComponents/side-nav/side-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolAndSideBarComponent } from './materialComponents/tool-and-side-bar/tool-and-side-bar.component';
import { GridListComponent } from './materialComponents/grid-list/grid-list.component';
import { HomeComponent } from './materialComponents/home/home.component';
import { Home1Component } from './materialComponents/home/home1/home1.component';
import { ExpansionPanelComponent } from './materialComponents/expansion-panel/expansion-panel.component';
import { CardsComponent } from './materialComponents/cards/cards.component';
import { TabsComponent } from './materialComponents/tabs/tabs.component';
import { StepperComponent } from './materialComponents/stepper/stepper.component';
import { InputComponent } from './materialComponents/input/input.component';
import { LoginComponent } from './signup/login/login.component';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ContactsComponent } from './contacts/contacts.component';
import { AddContactComponent } from './contacts/add-contact/add-contact.component';
import { ListContactsComponent } from './contacts/list-contacts/list-contacts.component';


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    TypographyComponent,
    ButtonToggleComponent,
    IconComponent,
    BadgeComponent,
    ProgressSpinnerComponent,
    ToolBarComponent,
    SideNavComponent,
    ToolAndSideBarComponent,
    GridListComponent,
    HomeComponent,
    Home1Component,
    ExpansionPanelComponent,
    CardsComponent,
    TabsComponent,
    StepperComponent,
    InputComponent,
    LoginComponent,
    ContactsComponent,
    AddContactComponent,
    ListContactsComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
