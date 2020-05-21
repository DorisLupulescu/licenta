import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  NgZone,
} from "@angular/core";
import { AuthenticationService } from "src/app/services/authentication.service";
import {} from "googlemaps";
import { MapsAPILoader, AgmCoreModule } from "@agm/core";
import { FormControl } from "@angular/forms";
import { ApiService } from "../services/api.service";
import { ModalModule, ModalComponent } from "angular-custom-modal";

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.css"],
})
export class SearchPageComponent implements OnInit, AfterViewInit {
  // @ViewChild("map", { static: true }) mapElement: ElementRef;
  @ViewChild("searchBar", { static: true }) public searchBar: ElementRef;
  @ViewChild("parkingDetails", { static: true })
  public parkingModal: ModalComponent;
  geocoder = new google.maps.Geocoder();
  destination = new google.maps.DirectionsRenderer();
  facilities;
  radius = 1000;
  searchParking = true;

  latitude = 45.7473215;
  longitude = 21.2266142;
  chosenLocation = true;

  address: string;
  zoom: number = 14;

  public searchControl: FormControl;

  constructor(
    public authenticationService: AuthenticationService,
    private mapsApiLoader: MapsAPILoader,
    private ngzone: NgZone,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getAddress(this.latitude, this.longitude);
    // this.searchControl = new FormControl();
  }

  ngAfterViewInit() {
    this.mapsApiLoader.load().then(() => {
      var autocomplete = new google.maps.places.Autocomplete(
        this.searchBar.nativeElement,
        {
          types: [],
          componentRestrictions: {
            country: "RO",
          },
          bounds: new google.maps.LatLngBounds(
            new google.maps.LatLng(45.741892, 21.15163),
            new google.maps.LatLng(45.75372, 21.226788)
          ),
          strictBounds: true,
        }
      );

      autocomplete.addListener("place_changed", () => {
        this.ngzone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (
            typeof place.geometry === "undefined" ||
            place.geometry === null
          ) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 18;
          this.getAddress(this.latitude, this.longitude);
        });
      });
    });
  }

  shomeuser() {
    this.authenticationService.shomeuser();
  }

  // mapInitialize() {
  //   this.map = new google.maps.Map(
  //     this.mapElement.nativeElement,
  //     this.mapOptions
  //   );
  //   this.marker.setMap(this.map);
  // }

  getAddress(latitude, longitude) {
    this.geocoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 18;
            this.address = results[0].formatted_address;
          } else {
            window.alert("No results found");
          }
        }
      }
    );
    this.apiService.getApiData(latitude, longitude).subscribe((data: any) => {
      this.facilities = data.facilities.facility;
      console.log(this.facilities);
    });
  }

  getModalLocation(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.chosenLocation = true;

    this.getAddress(this.latitude, this.longitude);
    this.parkingModal.close();
  }

  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;

    this.chosenLocation = true;
    this.getAddress(this.latitude, this.longitude);
    // this.geocoder.geocode(
    //   { location: { lat: this.latitude, lng: this.longitude } },
    //   (results, status) => {
    //     if (status == google.maps.GeocoderStatus.OK) {
    //       if (results[0]) {
    //         this.address = results[0].formatted_address;
    //       }
    //     }
    //   }
    // );
  }
}
