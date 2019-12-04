import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { Component } from "@angular/core";
import { AppComponent } from "./app.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { LoginComponent } from "./login/login.component";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { ClientComponent } from "./client/client.component";
import { HeaderComponent } from "./header/header.component";
import { DropdownDirective } from "../assets/shared/dropdown.directive";
import { SearchPageComponent } from "./search-page/search-page.component";
import { ClientHeaderComponent } from "./client-header/client-header.component";
import { ClientService } from "../assets/shared/client.service";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AuthenticationService } from "src/assets/shared/authentication.service";

const appRoutes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "client", component: ClientComponent },
  { path: "search-page", component: SearchPageComponent },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@Component({
  selector: "app-root",
  templateUrl: "./app.component.css"
})
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
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [ClientService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {
  // public clients: AngularFireList<Clients[]>;
  // constructor(db: AngularFireDatabase) {
  //   this.clients = db.list("/Clients");
  // }
}
