import { trigger, transition, style, keyframes, animate, query, animateChild } from '@angular/animations'

//fader
export const fader = 
trigger('routeAnimations', [
    transition('* => home', [
        query (':enter, :leave',[
            style({
                position: 'absolute', 
                width: '100%',
                opacity: 0,
            })
        ], {optional: true}), 
        query(':enter', [
            animate('800ms ease',
            style({
                opacity: 1, 
            })
            )
        ], {optional: true})
    ]), 
    transition('* => login', [
        query (':enter, :leave',[
            style({
                position: 'absolute', 
                width: '100%',
                opacity: 0,
            })
        ], {optional: true}), 
        query(':enter', [
            animate('800ms 200ms ease',
            style({
                opacity: 1, 
            })
            )
        ], {optional: true})
    ]),
    transition('* => register', [
        query (':enter, :leave',[
            style({
                position: 'absolute', 
                width: '100%',
                opacity: 0,
            })
        ], {optional: true}), 
        query(':enter', [
            animate('800ms 200ms ease',
            style({
                opacity: 1, 
            })
            )
        ], {optional: true})
    ])
])