import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import {RouterModule, Routes} from '@angular/router';
import { NavbarComponent} from './shared/navbar/navbar.component';
import {FooterComponent} from './shared/footer/footer.component';
import {AddEntrantComponent} from './components/add-entrant/add-entrant.component';
import {ViewEntrantComponent} from './components/view-entrant/view-entrant.component';

const appRoutes: Routes = [
  {path: '', component: StartPageComponent},
  {path: 'add', component: AddEntrantComponent},
  {path: 'view', component: ViewEntrantComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    NavbarComponent,
    FooterComponent,
    AddEntrantComponent,
    ViewEntrantComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
