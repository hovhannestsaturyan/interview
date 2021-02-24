import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public alertController: AlertController
  ) { }
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

