import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ClientComponent } from "./client/client.component";
import { SearchPageComponent } from "./search-page/search-page.component";

const appRoutes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "client", component: ClientComponent },
  { path: "search-page", component: SearchPageComponent },
  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
