import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-client-header",
  templateUrl: "./client-header.component.html",
  styleUrls: ["./client-header.component.css"]
})
export class ClientHeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onBackToSearch() {
    this.router.navigate(["/search-page"]);
  }

  onLogin() {
    this.router.navigate(["/login"]);
  }
}
