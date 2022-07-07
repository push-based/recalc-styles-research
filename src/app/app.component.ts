import { Component, ViewEncapsulation } from '@angular/core';
import { getItems } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  items = getItems();
  nestings = 5;
  unAffectedItems: number[] = [];

  private dummyStyle?: HTMLStyleElement;
  private matchingStyle?: HTMLStyleElement;

  setItemVisibility(visible: boolean) {
    document
      .getElementById('item-wrapper')
      ?.classList.toggle('hide-items', visible);
  }

  setItemNesting(amount: string) {
    this.nestings = parseInt(amount);
  }

  setItemAmount(amount: string) {
    this.items = getItems(parseInt(amount));
  }

  setUnAffectedItemAmount(amount: string) {
    this.unAffectedItems = getItems(parseInt(amount));
  }

  toggleWrapper() {
    document.getElementById('item-wrapper')?.classList.toggle('active');
  }

  toggleWrapperNestedInner() {
    document.getElementById('item-wrapper')?.classList.toggle('active-inner');
  }

  toggleWrapperNestedOuter() {
    document.getElementById('item-wrapper')?.classList.toggle('active-outer');
  }

  toggleItems() {
    Array.from(document.getElementsByClassName('item')).forEach(item => {
      item.classList.toggle('active');
    });
  }

  toggleItemsNestedInner() {
    Array.from(document.getElementsByClassName('item')).forEach(item => {
      const nestedItems = item.querySelectorAll('.nesting');
      const nested = nestedItems.item(nestedItems.length - 1);
      nested!.classList.toggle('active');
    });
  }

  toggleItemsNestedOuter() {
    Array.from(document.getElementsByClassName('item')).forEach(item => {
      const nested = item.querySelector('.nesting');
      nested!.classList.toggle('active');
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
