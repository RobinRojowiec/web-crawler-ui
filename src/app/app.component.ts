import { Component } from '@angular/core';
import {SentimentService} from './services/sentiment.service';
import { SentimentResponse } from './services/sentiment-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sentiment Classification';
  loading = false;
  text = "I watched this bad movie last sunday.";
  last_response: SentimentResponse;
  error_text: string;

  chart_data = [];
  chart_labels = [];
  chart_type = "pie";
  chart_colors = [{
    backgroundColor: ['#FF4136','#28B62C'],
    borderColor: '#fff',
  }];
  slight_difference: boolean = false;

  constructor(private sentimentService: SentimentService ){}

  public clear(){
    this.last_response = null;
    this.error_text = null;
    this.chart_data = [];
    this.chart_labels = [];
  }

  public again(){
    this.clear()
  }

  public analyze(){
    if (this.text.trim() == ""){
      return;
    }

    this.clear();
    this.loading = true;

    this.sentimentService.analyze(this.text).subscribe( (data: SentimentResponse) => { 
      this.last_response = data;
      
      for(var key in this.last_response.detailed_probabilities){
        var pred = this.last_response.detailed_probabilities[key];
        this.chart_data.push( Math.round(pred*1000.0)/10);
        this.chart_labels.push(key);
      }
      
    }, (error: any) => {
      this.error_text = error.message
      this.loading = false;

    }, () =>{
      this.loading = false;

    });
  }
}
