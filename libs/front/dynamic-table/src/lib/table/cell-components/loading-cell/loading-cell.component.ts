import { Component } from '@angular/core';
import { DefaultCellComponent } from '../default-cell';
import { LoadingCellDataModel } from './loading-cell-data.model';

@Component({
  selector: 'softbar-loading-cell',
  styles: [
    `
      .loading {
        min-height: 1em;
        border-radius: 0.4375rem;
        animation-duration: 0.8s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeHolderShimmer;
        animation-timing-function: linear;
        background-color: #f6f7f8;
        background: linear-gradient(
          to right,
          #eeeeee 8%,
          #bbbbbb 18%,
          #eeeeee 33%
        );
        background-size: 350% 350%;
        position: relative;
        overflow: hidden;
        color: transparent;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */

        &:before {
          content: '';
          display: block;
          position: absolute;
          left: -100%;
          top: 0;
          height: 100%;
          width: 100%;
          background: linear-gradient(
            to right,
            transparent 0%,
            #e8e8e8 50%,
            transparent 100%
          );
          animation: load 0.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        &-circle {
          border-radius: 50%;
        }
      }

      @keyframes load {
        from {
          left: -10%;
        }

        to {
          left: 10%;
        }
      }
    `,
  ],
  template: `<div class="loading w-4/5 h-full"></div>`,
})
export class LoadingCellComponent<
  T = any,
  K extends keyof T = keyof T,
  DModel extends LoadingCellDataModel<T, K> = LoadingCellDataModel<T, K>
> extends DefaultCellComponent<T, K, DModel> {}
