import { Component, Inject, forwardRef } from '@angular/core';
import { BaseWidget, NgAisInstantSearch } from 'angular-instantsearch';

const connectSearchMetaData = (renderFn, unmountFn) => (widgetParams = {}) => ({
  init() {
    renderFn({ searchMetadata: {isSearchStalled: true} }, true);
  },
  render({ searchMetadata }) {
    renderFn({ searchMetadata }, false);
  },
  dispose() {
    unmountFn();
  },
});

@Component({
  selector: 'ais-loading-indicator',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingIndicator extends BaseWidget {
  state: {
    searchMetadata: any;
  };

  constructor(
      @Inject(forwardRef(() => NgAisInstantSearch))
      public instantSearchParent
  ) {
    super('LoadingIndicator');
  }

  public ngOnInit() {
    this.createWidget(connectSearchMetaData as any, {});
    super.ngOnInit();
  }
}
