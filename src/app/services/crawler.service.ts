import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrawlService {
  private url: String = environment.url;

  constructor(private http: HttpClient) { }

  public analyze(text: string){
    return this.http.get<Object>(this.url+"?url="+encodeURIComponent(text));
  }
}
