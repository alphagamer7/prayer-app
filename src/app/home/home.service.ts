import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
const { LocalNotifications } = Plugins;

import { environment } from 'src/environments/environment';
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
    data.map(item => {
      const scheduledDate = moment(item.date.readable).toDate();
      // TODO: check for time in between
      if (
        !moment(moment().format('LL')).isSameOrBefore(moment(scheduledDate))
      ) {
        console.log('isSameOrBefore');
        return;
      } else {
        SharedConstants.prayerTimings.forEach(element => {
          console.log(
            'schedulinsg',
            moment(`${item.date.readable} ${item.timings[element]}`).toDate(),
            'timing',
            element
          );
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
      }
    });
  }
}
