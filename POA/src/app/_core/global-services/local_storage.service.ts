import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class Storage{
    constructor(){};

    create_storage(name_data:string, content_data:string){
        localStorage.setItem(name_data,content_data);
    }
    update_storage(name_data:string, content_data:string){
        localStorage.setItem(name_data,content_data);
    }
    get_storage(name_data:string){
        return JSON.parse(localStorage.getItem(name_data) || '{}');
     }
    delete_storage(name_data:string){
        localStorage.removeItem(name_data)
    }
    
}

