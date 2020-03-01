import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { HomeService } from './home.service';

const { LocalNotifications } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  constructor(private homeService: HomeService) {}
  prayerTimes = { fajr: '', dhuhr: '', asr: '', maghrib: '', isha: '' };

  ngOnInit() {
    // LocalNotifications.schedule({
    //   notifications: [
    //     {
    //       id: this.idCount++,
    //       title: 'Test prayer app',
    //       body: 'test body',
    //       schedule: { at: new Date(Date.now() + 1000 * 5) }
    //     }
    //   ]
    // });
    this.setNotifications();
  }

  setNotifications() {
    this.homeService.getPrayerTimes();
  }
}
