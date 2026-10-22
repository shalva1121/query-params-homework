import { Component, OnInit, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Hotel, HotelService } from '../hotel.service';

@Component({
  selector: 'app-hotels',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './hotels.html',
  styleUrl: './hotels.css',
})
export class HotelsComponent implements OnInit {
  private hotelService = inject(HotelService);

  hotels = signal<Hotel[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.hotelService.getHotels().subscribe({
      next: (data) => {
        this.hotels.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('სასტუმროების ჩატვირთვა ვერ მოხერხდა');
        this.loading.set(false);
      },
    });
  }

  imageOf(h: Hotel): string {
    return h.featuredImage || h.img || '';
  }
}
