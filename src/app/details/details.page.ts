import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public alertController: AlertController
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
  fastWayAmount(amount: number){
    this.amount = amount ;
    this.calculateResult('amount', amount);
  }
  fastWayQty(qty: number){
    this.qty = qty ;
    this.calculateResult('qty', qty);
  }
  calculateResult(key: string , value: number){
    if (value <= 0){
      this.presentAlert(key);
      return false;
    }
    if (key === 'amount'){
      this.qty = Number((value / this.productPrice).toFixed(2));
    }else if (key === 'qty'){
      this.amount = Number((this.productPrice * value).toFixed(2));
    }
  }
  async presentAlert(value) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Message',
      message: value + ' should be greater than 0',
      buttons: ['OK']
    });

    await alert.present();
  }
}
