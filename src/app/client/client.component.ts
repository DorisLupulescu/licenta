import { Component, OnInit, Input, Output } from "@angular/core";
import { Client } from "./client.model";
import { ClientService } from "../../assets/shared/client.service";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.css"]
})
export class ClientComponent implements OnInit {
  @Input() clientData: Client;

  constructor(private clientservice: ClientService) {}

  ngOnInit() {}
}
