import { Component,Pipe, PipeTransform} from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
@Pipe({
   name: 'keyValueFilter'
})
export class keyValueFilterPipe implements PipeTransform{
    transform(value: any, args: any[] = null): any {

        return Object.keys(value).map(function(key) {
            let pair = {};
            let k = 'key';
            let v = 'value'


            pair[k] = key;
            pair[v] = value[key];

            return pair;
        });
    }

}