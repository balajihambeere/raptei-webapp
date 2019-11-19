import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

    convertToSlug(text) {
        return text
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '')
            ;
    }

    convertToText(text) {
        return text
            .toLowerCase()
            .replace(/-/g, ' ');
    }
}
