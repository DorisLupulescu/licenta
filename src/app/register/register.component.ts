import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ClientService } from "../services/client.service";
import { Client } from "../client/client.model";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  client: Client = new Client();
  submitted = false;

  constructor(
    private router: Router,
    private clientservice: ClientService,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  onRegistered() {
    this.router.navigate(["/login"]);
  }

  save() {
    this.clientservice.createClient(this.client);
    this.client = new Client();
  }

  onSubmit() {
    this.submitted = true;
    this.authenticationService.SignUp(this.client.email, this.client.password);
    this.save();
    this.router.navigate(["/login"]);
  }
}
