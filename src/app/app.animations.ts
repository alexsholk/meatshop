import {transition, trigger, useAnimation} from '@angular/animations'
import {fadeIn} from 'ng-animate'

export const appAnimations = [
  trigger('fade', [
    transition('* <=> *', useAnimation(fadeIn), {params: {timing: 0.3}})
  ])
]
