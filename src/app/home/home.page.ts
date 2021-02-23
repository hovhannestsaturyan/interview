import {Component, OnInit, ViewChild} from '@angular/core';
import { HttpService } from '../http/http.service';
import {map} from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import {Router} from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public serachValue: string;
  public allData: any = [];
  public allDataLength = 10;
  constructor(
    // tslint:disable-next-line:variable-name
    private _http: HttpService,
    private router: Router,
    private storage: Storage
  ) {}

  rearchResult(response){
    this.showAll(response);
  }

  ngOnInit() {
    this.storage.get('canFilter').then((storageSearchValue) => {
      this.serachValue = storageSearchValue ? storageSearchValue : '' ;
      this.showAll(this.serachValue);
    });
  }
 showAll(canFilter: string){
   this.storage.set('canFilter', canFilter);
   this._http.getAllData('../assets/data.json').pipe(
     map(data => data.filter( item => (item.model ? item.model : '')
     .toLowerCase().indexOf(canFilter.toLowerCase()) > -1) ))
     .subscribe((value) => {
     this.allData = value ;
   });
 }
  goToDetails(details: object){
    this.router.navigate(['/details', details], {replaceUrl: true}) ;
  }
  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      this.allDataLength += 10;
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}

