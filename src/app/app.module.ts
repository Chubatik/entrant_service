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

import { ToastrModule } from 'ngx-toastr';

const appRoutes: Routes = [
  {path: '', component: StartPageComponent},
  {path: 'add', component: AddEntrantComponent},
  {path: 'view', component: ViewEntrantComponent},
  {path: 'profile/:id', component: EntrantProfileComponent}
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
        })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
