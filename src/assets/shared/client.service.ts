import { Client } from "../../app/client/client.model";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Observable, from } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ClientService {
  private dbPath = "/Clients";

  clientsRef: AngularFireList<Client> = null;

  constructor(private db: AngularFireDatabase) {
    this.clientsRef = db.list(this.dbPath);
  }

  createClient(client: Client): void {
    this.clientsRef.push(client);
  }

  updateClient(key: string, value: any): Promise<void> {
    return this.clientsRef.update(key, value);
  }

  deleteClient(key: string): Promise<void> {
    return this.clientsRef.remove(key);
  }

  getClientsList(): AngularFireList<Client> {
    return this.clientsRef;
  }

  deleteAll(): Promise<void> {
    return this.clientsRef.remove();
  }
}
