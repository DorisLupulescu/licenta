import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/assets/shared/authentication.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
  constructor(
    private router: Router,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  onLoadLogin() {
    this.router.navigate(["/login"]);
  }

  onLoadPage() {
    this.router.navigate(["/search-page"]);
  }
}
