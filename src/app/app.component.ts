import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sentiment-classification-ui';
  loading = false;
  text = "I watched this bad movie last sunday.";

  public analyze(){
    this.loading = true;
  }
}
