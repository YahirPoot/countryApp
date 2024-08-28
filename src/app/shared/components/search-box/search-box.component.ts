import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shired-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debounce: Subject<string> = new Subject<string>();
  private debounceSubscription?: Subscription;



  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debounce
    .pipe( debounceTime(300) )
    .subscribe( value => {
      this.onDebounce.emit(value);
    } );
  }

  ngOnDestroy(): void {
    this.debounceSubscription?.unsubscribe();
  }

  emitValue(value: string): void {
    this.onValue.emit(value);
  }

  onKeyPress(value: string) {
    this.debounce.next(value);
  }
}
