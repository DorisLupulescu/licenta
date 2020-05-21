import { Component, OnInit, Input } from "@angular/core";
import { Client } from "./client.model";
import { ClientService } from "../services/client.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { resolve } from "url";
import { AngularFireDatabase } from "angularfire2/database";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.css"],
})
export class ClientComponent implements OnInit {
  @Input() clientData: Client;
  key: any = this.clientservice.getCurrentUser();
  profilepic: any[];
  userDetails;
  loggedUser;

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
    public authenticationService: AuthenticationService,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.loggedUser = this.authenticationService.shomeuser();
    console.log(
      "asta e",
      this.clientservice.getCurrentUser(),
      "plus asta",
      this.authenticationService.shomeuser()
    );
    this.db.database
      .ref(`Clients/${this.loggedUser}`)
      .once("value")
      .then((userDetail) => {
        this.userDetails = userDetail.val() ? userDetail.val() : {};
        console.log(this.userDetails);
      })
      .catch((err) => {
        console.log("error ");
        console.log(err);
      });
  }

  updatePhoto(photo: any) {
    var reader = new FileReader();
    reader.onload = (photo: any) => {
      this.profilepic = photo.target.result;
    };
    // this.profilepic = photo.target.value;
    this.clientservice.updateClient(this.key, {
      imagePath: this.profilepic,
    });
  }
}
