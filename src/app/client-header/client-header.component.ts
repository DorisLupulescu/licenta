import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/assets/shared/authentication.service";

@Component({
  selector: "app-client-header",
  templateUrl: "./client-header.component.html",
  styleUrls: ["./client-header.component.css"]
})
export class ClientHeaderComponent implements OnInit {
  constructor(
    private router: Router,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  onBackToSearch() {
    this.router.navigate(["/search-page"]);
  }

  onSignOut() {
    this.authenticationService.SignOut();
    this.router.navigate(["/login"]);
  }
}
