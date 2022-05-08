import { Component, ElementRef, ViewChild } from '@angular/core';
import { getItems } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  items = getItems();
  unAffectedItems: number[] = [];

  private dummyStyle?: HTMLStyleElement;
  private matchingStyle?: HTMLStyleElement;

  setItemAmount(amount: string) {
    this.items = getItems(parseInt(amount));
  }

  setUnAffectedItemAmount(amount: string) {
    this.unAffectedItems = getItems(parseInt(amount));
  }

  toggleWrapper() {
    document.getElementById('item-wrapper')?.classList.toggle('active');
  }

  toggleItems() {
    Array.from(document.getElementsByClassName('item')).forEach(item => {
      item.classList.toggle('active');
    });
  }

  addMatchingRules(): void {
    this.matchingStyle = document.createElement('style');
    const styles = new Array(100)
      .fill(null)
      .map(() => `.item{color:red;display:block;border:1px solid blue;}`)
      .join(' ');
    this.matchingStyle.innerHTML = styles;
    document.head.appendChild(this.matchingStyle);
  }

  removeMatchingRules(): void {
    if (this.matchingStyle) {
      document.head.removeChild(this.matchingStyle);
    }
  }

  addDummyRules(): void {
    this.dummyStyle = document.createElement('style');
    const styles = new Array(10000)
      .fill(null)
      .map(
        (_, i) => `.dummy${i}{color:red;display:block;border:1px solid blue;}`
      )
      .join(' ');
    this.dummyStyle.innerHTML = styles;
    document.head.appendChild(this.dummyStyle);
  }

  removeDummyRules(): void {
    if (this.dummyStyle) {
      document.head.removeChild(this.dummyStyle);
    }
  }
}
