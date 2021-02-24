import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Keyboard } from '@ionic-native/keyboard/ngx';


import {AlertService} from '../alerts/alert.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
public productName: string;
public productImage: string;
public productModel: string;
public productDescription: string;
public productPrice: number;
public amount: number;
public qty: number;
  constructor(
    private alertCtrl: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private keyboard: Keyboard
  ) {
    this.productName = activatedRoute.snapshot.paramMap.get('name');
    this.productImage = activatedRoute.snapshot.paramMap.get('image');
    this.productModel = activatedRoute.snapshot.paramMap.get('model');
    this.productDescription = activatedRoute.snapshot.paramMap.get('description');
    this.productPrice = Number(activatedRoute.snapshot.paramMap.get('price'));
  }

  ngOnInit() {}
  home_page(){
    this.router.navigate(['/home'], {replaceUrl: true}) ;
  }
  /*_____________________Get Input Results________________________*/
  fastWayAmount(amount: number){
    this.amount = amount ;
    this.calculateResult('amount', amount);
  }
  fastWayQty(qty: number){
    this.qty = qty ;
    this.calculateResult('qty', qty);
  }
  enterValue(key: string , value: number , event: any){
    if (event.keyCode === 13) {
      this.keyboard.show();
      this.calculateResult(key, value);
    }
  }
  /*_____________________Get Input Results End________________________*/

  /*_____________________End Input values________________________*/

  /*_____________________Calcilation________________________*/
  calculateResult(key: string , value: number){
    if (value <= 0){
      this.alertCtrl.presentAlert(key);
      return false;
    }
    if (key === 'amount'){
      this.qty = Number((value / this.productPrice).toFixed(2));
    }else if (key === 'qty'){
      this.amount = Number((this.productPrice * value).toFixed(2));
    }
  }
  /*_____________________End Calcilation________________________*/

}
