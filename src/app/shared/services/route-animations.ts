import {
  trigger,
  transition,
  style,
  animate,
  query,
} from '@angular/animations';

// fader
export const fader = trigger('routeAnimations', [
  transition('* => home', [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          width: '100%',
          opacity: 0,
        }),
      ],
      { optional: true }
    ),
    query(
      ':enter',
      [
        animate(
          '800ms linear',
          style({
            opacity: 1,
          })
        ),
      ],
      { optional: true }
    ),
  ]),
]);
