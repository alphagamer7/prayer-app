import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const { LocalNotifications } = Plugins;

import * as moment from 'moment';
import { SharedConstants } from '../shared/shared.constants';

@Injectable()
export class HomeService {
  constructor(private httpClient: HttpClient) {}

  idCount: number = 0;
  getPrayerTimes() {
    return this.httpClient
      .get(
        `${environment.baseApi}calendarByCity?city=Colombo&country=Sri%20Lanka&method=13&month=03&year=2020`
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          this.setScheduling(response.data);

          //   LocalNotifications.schedule({
          //     notifications: [
          //       {
          //         id: this.idCount++,
          //         title: 'Test prayer app',
          //         body: 'test body',
          //         schedule: { at: new Date(Date.now() + 1000 * 5) }
          //       }
          //     ]
          //   });
        },
        err => {
          console.error(err);
        }
      );
  }

  async cancelNotifiaction() {
    const pengingList = await LocalNotifications.getPending();
    const data = await LocalNotifications.cancel(pengingList);
  }

  setScheduling(data: any) {
    let timings = SharedConstants.prayerTimings;
    data.map(item => {
      const scheduledDate = moment(item.date.readable);
      if (!moment(scheduledDate).isSameOrAfter(moment.now())) return;
      SharedConstants.prayerTimings.forEach(element => {
        LocalNotifications.schedule({
          notifications: [
            {
              id: this.idCount++,
              title: 'Prayer app',
              body: `Azan for ${element}`,
              schedule: {
                at: moment(
                  `${item.date.readable} ${item.timings[element]}`
                ).toDate()
              }
            }
          ]
        });
      });
    });
  }
}
