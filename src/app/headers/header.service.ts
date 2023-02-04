import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs'

export class HeaderService {

    pageSelectionEmitter = new Subject<String>();
    
    setPageSelector(page: string) {
        this.pageSelectionEmitter.next(page);
    }
}