import { Component, OnInit, OnDestroy } from "@angular/core";
import noUiSlider from "nouislider";
import { CurrencyClientService, RootObject } from "src/app/services/currency-client.service";

@Component({
  selector: "app-index",
  templateUrl: "index.component.html"
})
export class IndexComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  messageForUser: string;
  rootObject: RootObject;
  result: string;

  constructor(private currencyClientService: CurrencyClientService) { }

  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
      this.currencyClientService.getCurrency().subscribe(value => {
      this.rootObject = value;

      var body = document.getElementsByTagName("body")[0];
      body.classList.add("index-page");

      var slider = document.getElementById("sliderRegular");

      noUiSlider.create(slider, {
        start: 40,
        connect: false,
        range: {
          min: 0,
          max: 100
        }
      });

      var slider2 = document.getElementById("sliderDouble");

      noUiSlider.create(slider2, {
        start: [20, 60],
        connect: true,
        range: {
          min: 0,
          max: 100
        }
      });
    });
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

  sayHello(value: string) {
    this.messageForUser = 'Cześć ' + value;
  }

  check(value: number){
    if(value > this.rootObject.rates.PLN){
      this.result = 'podałeś wartość za dużą';
    }else if(value < this.rootObject.rates.PLN){
      this.result = 'podałeś wartość za małą';
    }else{
      this.result = 'udało się gratulacje!!!';
    }
  }
}
