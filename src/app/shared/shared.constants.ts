import { Injectable } from '@angular/core';

@Injectable()
export class SharedConstants {
  public static prayerTimings = [
    'Fajr',
    'Sunrise',
    'Dhuhr',
    'Asr',
    'Sunset',
    'Maghrib',
    'Isha',
    'Imsak',
    'Midnight'
  ];
  constructor() {}
}
