import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDirectiveHolder]'
})
export class DirectiveHolderDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
