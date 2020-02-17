import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  constructor() {}

  ngOnInit() {
    LocalNotifications.schedule({
      notifications: [
        {
          title: 'Title',
          body: 'test',
          id: 1,
          schedule: { at: new Date(Date.now() + 1000 * 5) },
          sound: null,
          attachments: null,
          actionTypeId: '',
          extra: null
        }
      ]
    });
  }
}
