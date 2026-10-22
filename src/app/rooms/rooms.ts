import { Component, OnInit, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { HotelService, Room } from '../hotel.service';

@Component({
  selector: 'app-rooms',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './rooms.html',
  styleUrl: './rooms.css',
})
export class RoomsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private hotelService = inject(HotelService);

  hotelName = signal('');
  rooms = signal<Room[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        switchMap((params) => {
          // query params-იდან ვკითხულობთ hotelId-ს და hotelName-ს
          this.hotelName.set(params.get('hotelName') ?? '');
          const hotelId = Number(params.get('hotelId'));

          this.loading.set(true);
          this.error.set('');

          if (!hotelId) {
            this.error.set('hotelId არ არის მითითებული');
            this.loading.set(false);
            return of([] as Room[]);
          }
          return this.hotelService.getRooms(hotelId);
        }),
      )
      .subscribe({
        next: (data) => {
          // API-მ შეიძლება დააბრუნოს მასივი ან ერთი ობიექტი
          this.rooms.set(Array.isArray(data) ? data : data ? [data] : []);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('ოთახების ჩატვირთვა ვერ მოხერხდა');
          this.loading.set(false);
        },
      });
  }

  imageOf(r: Room): string {
    return r.images?.[0]?.source ?? '';
  }
}
