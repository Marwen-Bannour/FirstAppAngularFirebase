import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolAndSideBarComponent } from './materialComponents/tool-and-side-bar/tool-and-side-bar.component';
import { HomeComponent } from './materialComponents/home/home.component';
import { BadgeComponent } from './materialComponents/badge/badge.component';
import { ButtonComponent } from './materialComponents/button/button.component';
import { ButtonToggleComponent } from './materialComponents/button-toggle/button-toggle.component';
import { GridListComponent } from './materialComponents/grid-list/grid-list.component';
import { IconComponent } from './materialComponents/icon/icon.component';
import { ProgressSpinnerComponent } from './materialComponents/progress-spinner/progress-spinner.component';
import { TypographyComponent } from './materialComponents/typography/typography.component';
import { ExpansionPanelComponent } from './materialComponents/expansion-panel/expansion-panel.component';
import { CardsComponent } from './materialComponents/cards/cards.component';
import { TabsComponent } from './materialComponents/tabs/tabs.component';
import { StepperComponent } from './materialComponents/stepper/stepper.component';
import { InputComponent } from './materialComponents/input/input.component';
import { LoginComponent } from './signup/login/login.component';


const routes: Routes = [{
  path: '', component: LoginComponent},
  {
  path: 'home', component: ToolAndSideBarComponent,
  children: [{path: '', component: HomeComponent},
    {path: 'badge', component: BadgeComponent},
    {path: 'button', component: ButtonComponent},
    {path: 'button-toggle', component: ButtonToggleComponent},
    {path: 'grid-list', component: GridListComponent},
    {path: 'icon', component: IconComponent},
    {path: 'progress-spinner', component: ProgressSpinnerComponent},
    {path: 'typography', component: TypographyComponent},
    {path: 'expansion-Panel', component: ExpansionPanelComponent},
    {path: 'cards', component: CardsComponent},
    {path: 'tabs', component: TabsComponent},
    {path: 'stepper', component: StepperComponent},
    {path: 'input', component: InputComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
