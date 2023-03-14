import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'caas-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  @Input() placeHolder: string = "";
  @Output() searchEvent: EventEmitter<string> = new EventEmitter();

  keyup = new EventEmitter<string>();

  ngOnInit(): void {
    this.keyup.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(res => {
      this.searchEvent.emit(res);
    })
  }
}
