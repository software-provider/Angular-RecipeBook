// animations.ts
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const RibbonToastrAnimation = [
  trigger('flyInOut', [
    state(
      'inactive',
      style({
        opacity: 0,
      })
    ),
    transition(
      'inactive => active',
      animate(
        '400ms ease-out',
        keyframes([
          style({
            transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
            opacity: 0,
          }),
          style({
            transform: 'skewX(20deg)',
            opacity: 1,
          }),
          style({
            transform: 'skewX(-5deg)',
            opacity: 1,
          }),
          style({
            transform: 'none',
            opacity: 1,
          }),
        ])
      )
    ),
    transition(
      'active => removed',
      animate(
        '400ms ease-out',
        keyframes([
          style({
            opacity: 1,
          }),
          style({
            transform: 'translate3d(100%, 0, 0) skewX(30deg)',
            opacity: 0,
          }),
        ])
      )
    ),
  ]),
];
