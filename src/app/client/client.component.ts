import { Component, OnInit, Input } from "@angular/core";
import { Client } from "./client.model";
import { ClientService } from "../../assets/shared/client.service";
import { AuthenticationService } from "src/assets/shared/authentication.service";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.css"]
})
export class ClientComponent implements OnInit {
  @Input() clientData: Client;
  key: any = this.clientservice.getCurrentUser();
  profilepic: any[];

  localUrl: any[];
  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  constructor(
    private clientservice: ClientService,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit() {}

  updatePhoto(photo: any) {
    var reader = new FileReader();
    reader.onload = (photo: any) => {
      this.profilepic = photo.target.result;
    };
    // this.profilepic = photo.target.value;
    this.clientservice.updateClient(this.key, {
      imagePath: this.profilepic
    });
  }
}
