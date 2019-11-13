import {
  Directive,
  OnInit,
  ElementRef,
  HostListener,
  HostBinding
} from "@angular/core";

@Directive({
  selector: "[appDropdown]"
})
export class DropdownDirective implements OnInit {
  @HostBinding("class.open") classOpen = false;
  constructor(private elRef: ElementRef) {}

  ngOnInit() {}

  @HostListener("document:click", ["$event"]) selectClass(eventData: Event) {
    this.classOpen = this.elRef.nativeElement.contains(eventData.target)
      ? !this.classOpen
      : false;
  }
}
