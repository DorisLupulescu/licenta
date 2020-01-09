import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { ClientService } from "./client.service";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  userData: Observable<firebase.User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.userData = angularFireAuth.authState;
  }

  SignUp(email: string, password: string) {
    this.angularFireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log("Successfully signed up!", res);
      })
      .catch(error => {
        console.log("Something is wrong:", error.message);
      });
  }

  SignIn(email: string, password: string) {
    this.angularFireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log("Signed in", res);
        this.router.navigate(["/search-page"]);
      })
      .catch(err => {
        alert("Something went wrong: " + err.message);
        this.router.navigate(["/login"]);
      });
  }

  shomeuser() {
    return this.angularFireAuth.auth.currentUser.uid;
  }

  SignOut() {
    this.angularFireAuth.auth.signOut();
  }
}
