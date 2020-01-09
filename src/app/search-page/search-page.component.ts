import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  NgZone
} from "@angular/core";
import { AuthenticationService } from "src/assets/shared/authentication.service";
import {} from "googlemaps";
import { MapsAPILoader } from "@agm/core";

@Component({
  selector: "app-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.css"]
})
export class SearchPageComponent implements OnInit, AfterViewInit {
  @ViewChild("map", { static: true }) mapElement: ElementRef;
  @ViewChild("searchBar", { static: true }) searchBar: HTMLInputElement;
  map: google.maps.Map;
  coordinates = new google.maps.LatLng(45.7473215, 21.2266142);
  geocoder = new google.maps.Geocoder();
  //searchBox = new google.maps.places.SearchBox(this.searchBar);
  predictions = [];
  origin = this.coordinates;

  address: string;
  zoom: number;

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 13,
    clickableIcons: true,
    mapTypeControl: true
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
    optimized: false,
    draggable: true,
    crossOnDrag: true,
    clickable: true,
    label: "Facultatea de Automatica si Calculatoare"
  });

  constructor(
    public authenticationService: AuthenticationService,
    private mapsApiLoader: MapsAPILoader,
    private ngzone: NgZone
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    console.log(this.searchBar);
    // this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
    //   this.searchBar
    // );
    this.mapInitialize();
    this.map.addListener("click", event => {
      this.marker.setPosition(event.latLng);
      this.map.panTo(event.latLng);

      this.geocoder.geocode({ location: event.latLng }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          console.log(results[0]);
          if (results[0]) {
            this.marker.setTitle(results[0].formatted_address);
            this.marker.setLabel(results[0].formatted_address);
          }
        }
      });
    });

    // this.map.addListener("bounds_changed", () => {
    //   this.searchBox.setBounds(this.map.getBounds());
    // });
  }

  shomeuser() {
    this.authenticationService.shomeuser();
  }

  mapInitialize() {
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      this.mapOptions
    );
    this.marker.setMap(this.map);
  }

  getAddress(latitude, longitude) {
    this.geocoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          } else {
            window.alert("No results found");
          }
        }
      }
    );
  }
}
