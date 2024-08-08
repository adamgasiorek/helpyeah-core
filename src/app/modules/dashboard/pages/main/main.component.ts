import { Component, OnInit } from '@angular/core';
import * as algoliasearch from 'algoliasearch/lite';

import { history as historyRouter } from 'instantsearch.js/es/lib/routers';
import {ActivatedRoute} from "@angular/router";

// Returns a slug from the category name.
// Spaces are replaced by "+" to make
// the URL easier to read and other
// characters are encoded.
function getCategorySlug(name) {
  return name
      .split(' ')
      .map(encodeURIComponent)
      .join('+');
}

// Returns a name from the category slug.
// The "+" are replaced by spaces and other
// characters are decoded.
function getCategoryName(slug) {
  return slug
      .split('+')
      .map(decodeURIComponent)
      .join(' ');
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  config = {
    indexName: 'demo_ecommerce',
    searchClient: algoliasearch(
        'B1G2GM9NG0',
        'aadef574be1f9252bb48d4ea09b5cfe5'
    ),
    routing: {
      router: historyRouter({
        windowTitle({ category, query }) {
          const queryTitle = query ? `Results for "${query}"` : "Search";

          if (category) {
            return `${category} – ${queryTitle}`;
          }

          return queryTitle;
        },

        createURL({ qsModule, routeState }) {
          const categoryPath = routeState.category
              ? `${getCategorySlug(routeState.category)}/`
              : "";
          const queryParameters = {} as any;

          if (routeState.query) {
            queryParameters.query = encodeURIComponent(routeState.query);
          }
          if (routeState.page !== 1) {
            queryParameters.page = routeState.page;
          }
          if (routeState.brands) {
            queryParameters.brands = routeState.brands.map(encodeURIComponent);
          }

          const queryString = qsModule.stringify(queryParameters, {
            addQueryPrefix: true,
            arrayFormat: "repeat"
          });

          return `/search/${categoryPath}${queryString}`;
        },

        parseURL: () => {
          const { params, queryParams } = this.route.snapshot;
          const category = getCategoryName(
              decodeURIComponent(params.category || "")
          );
          const { query = "", page, brands = [] } = queryParams;
          // brands is not an array when there's a single value.
          const allBrands = [].concat(brands);

          return {
            query: decodeURIComponent(query),
            page,
            brands: allBrands.map(decodeURIComponent),
            category
          };
        }
      }),

      stateMapping: {
        stateToRoute(uiState) {
          return {
            query: uiState.query,
            page: uiState.page,
            brands: uiState.refinementList && uiState.refinementList.brand,
            category: uiState.menu && uiState.menu.categories
          };
        },

        routeToState(routeState) {
          return {
            query: routeState.query,
            page: routeState.page,
            menu: {
              categories: routeState.category
            },
            refinementList: {
              brand: routeState.brands
            }
          };
        }
      }
    },
    search: {
      aroundLatLng: '40.71, -74.01',
      aroundLatLngViaIP: true
    }
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
