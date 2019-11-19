import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { LoginComponent } from "./login/login.component";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { ClientComponent } from "./client/client.component";
import { HeaderComponent } from "./header/header.component";
import { DropdownDirective } from "./shared/dropdown.directive";
import { SearchPageComponent } from "./search-page/search-page.component";
import { ClientHeaderComponent } from './client-header/client-header.component';

const appRoutes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "client", component: ClientComponent },
  { path: "search-page", component: SearchPageComponent },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    ClientComponent,
    HeaderComponent,
    DropdownDirective,
    SearchPageComponent,
    ClientHeaderComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
