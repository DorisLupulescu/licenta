import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ClientService } from "../../assets/shared/client.service";
import { Client } from "../client/client.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  localClientData: Client;

  constructor(private router: Router, private clientservice: ClientService) {}

  ngOnInit() {}

  onLoadAccount() {
    this.router.navigate(["/client"]);
  }
}
