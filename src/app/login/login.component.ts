import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/assets/shared/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    private router: Router,
    public authenticationServer: AuthenticationService
  ) {}

  ngOnInit() {}

  onLogin() {
    this.authenticationServer.SignIn(this.email, this.password);
    this.email = "";
    this.password = "";
  }

  onRegister() {
    this.router.navigate(["/register"]);
  }
}
