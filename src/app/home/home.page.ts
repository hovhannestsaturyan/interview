import {Component, OnInit, ViewChild} from '@angular/core';
import { HttpService } from '../http/http.service';
import {map} from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import {Router} from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import {AlertService} from '../alerts/alert.service';

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
  ngOnInit() {
    this.storage.get('canFilter').then((storageSearchValue) => {
      this.serachValue = storageSearchValue ? storageSearchValue : '' ;
      this.showAll(this.serachValue);
    });
  }

  /*_____________________Get Searchbar Value________________________*/
  rearchResult(response){
    this.showAll(response);
  }
  constructor(
    // tslint:disable-next-line:variable-name
    private _http: HttpService,
    private alertCtrl: AlertService,
    private router: Router,
    private storage: Storage
  ) {}
  /*_____________________Get Searchbar Value End________________________*/

  /*_____________________Show Data________________________*/
 showAll(canFilter: string){
   this.storage.set('canFilter', canFilter);
   this._http.getAllData('../assets/data.json').pipe(
     map(data => data.filter( item => (item.model ? item.model : '')
     .toLowerCase().indexOf(canFilter.toLowerCase()) > -1) ))
     .subscribe((value) => {
     this.allData = value ;
   }, (err) => {
       this.alertCtrl.presentAlert('Sorry Something Goes Wrong , Please Try Later');
     });
 }
  /*_____________________End Show Data________________________*/
  /*_____________________Go To Details Page________________________*/
  goToDetails(details: object){
    this.router.navigate(['/details', details], {replaceUrl: true}) ;
  }
  /*_____________________Go To Details Page End________________________*/
  /*_____________________Infinite Functions________________________*/
  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      this.allDataLength += 10;
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  /*_____________________Infinite Functions End________________________*/

}

