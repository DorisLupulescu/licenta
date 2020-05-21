import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs";
import { ClientService } from "./client.service";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  userData: Observable<firebase.User>;
  userId;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.userData = angularFireAuth.authState;
  }

  SignUp(email: string, password: string) {
    this.angularFireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("Successfully signed up!", res);
      })
      .catch((error) => {
        console.log("Something is wrong:", error.message);
      });
  }

  SignIn(email: string, password: string) {
    this.angularFireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("Signed in", res);
        this.router.navigate(["/search-page"]);
      })
      .catch((err) => {
        alert("Something went wrong: " + err.message);
        this.router.navigate(["/login"]);
      });
  }

  shomeuser(): any {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) this.userId = user.uid;
      console.log(this.userId);
      return this.userId;
    });
  }

  SignOut() {
    this.angularFireAuth.auth.signOut();
  }
}
