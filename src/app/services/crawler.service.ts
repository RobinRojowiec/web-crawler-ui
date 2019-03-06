import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrawlResponse } from './crawl-response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrawlService {
  
  constructor(private http: HttpClient) { }

  public analyze(text: string, crawlLinkedPages: boolean){
    var depth = crawlLinkedPages == true ? 1 : 0
    return this.http.get<CrawlResponse>( environment.url+"/crawl?url="+encodeURIComponent(text)+"&depth="+depth);
  }
}
