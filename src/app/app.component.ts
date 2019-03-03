import { Component } from '@angular/core';
import { CrawlService} from './services/crawler.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Web Crawler';
  loading = false;

  
  default_link = "https://en.wikipedia.org/wiki/Web_crawler";
  text = this.default_link+"";

  href = null
  download = null

  last_response = null;
  tokens = []
  error_text: string;
  button_crawl = "Crawl!"
  placeholder = "Wikipedia page or category url, e.g. https://en.wikipedia.org/wiki/Web_crawler"

  chart_data = [];
  chart_labels = [];
  chart_type = "pie";
  chart_colors = [{
    backgroundColor: ['#FF4136','#28B62C'],
    borderColor: '#fff',
  }];
  slight_difference: boolean = false;

  constructor(private crawlService: CrawlService, private sanitizer:DomSanitizer){}

  public clear(){
    this.last_response = null;
    this.error_text = null;
    this.chart_data = [];
    this.chart_labels = [];
    this.tokens = []
  }

  public again(){
    this.clear()
  }

  public sanitizedUrl(){
    return this.sanitizer.bypassSecurityTrustUrl(this.href);
  }

  public crawl(){
    if (this.text.trim() == ""){
      return;
    }

    this.clear();
    this.loading = true;

    this.crawlService.analyze(this.text).subscribe( (data: {}) => { 
        this.last_response = data
        var sJson = JSON.stringify(data);
        this.href = "data:text/json;charset=UTF-8," + encodeURIComponent(sJson);
        this.download =  this.text.split("/").pop().replace(" ","_").toLowerCase() + "_" + new Date().toISOString() + ".json";
      
    }, (error: any) => {
      this.error_text = error.message
      this.loading = false;

    }, () =>{
      this.loading = false;

    });
  }
}
