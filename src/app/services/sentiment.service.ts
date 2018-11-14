import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SentimentResponse } from './sentiment-response';

@Injectable({
  providedIn: 'root'
})
export class SentimentService {
  private url: String = environment.url;

  constructor(private http: HttpClient) { }

  public analyze(text: string){
    return this.http.get<SentimentResponse>(this.url+"?text="+encodeURIComponent(text));
  }
}
