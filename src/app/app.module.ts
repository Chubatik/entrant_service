import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import { AppComponent } from './app.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import {RouterModule, Routes} from '@angular/router';
import { NavbarComponent} from './shared/navbar/navbar.component';
import {FooterComponent} from './shared/footer/footer.component';
import {AddEntrantComponent} from './components/add-entrant/add-entrant.component';
import {ViewEntrantComponent} from './components/view-entrant/view-entrant.component';
import {FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {NgxPaginationModule} from 'ngx-pagination';
import { EntrantProfileComponent } from './components/entrant-profile/entrant-profile.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ChartsModule} from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import { StatisticComponent } from './components/statistic/statistic.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccessComponent } from './components/access/access.component';
import {AccessGuard} from './guards/access.guard';

const appRoutes: Routes = [
  {path: '', component: AccessComponent},
  {path: 'start-page', component: StartPageComponent},
  {path: 'add', component: AddEntrantComponent, canActivate: [AccessGuard]},
  {path: 'view', component: ViewEntrantComponent},
  {path: 'profile/:id', component: EntrantProfileComponent, canActivate: [AccessGuard]},
  {path: 'statistic', component: StatisticComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    NavbarComponent,
    FooterComponent,
    AddEntrantComponent,
    ViewEntrantComponent,
    EntrantProfileComponent,
    StatisticComponent,
    AccessComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        CommonModule,
        FormsModule,
        NgSelectModule,
        NgxPaginationModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-top-left'
        }),
        ChartsModule,
        ModalModule.forRoot()
    ],
  providers: [AccessGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
