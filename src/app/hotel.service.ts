import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Hotel {
  id: number;
  name: string;
  city?: string;
  address?: string;
  description?: string;
  featuredImage?: string;
  img?: string;
}

export interface RoomImage {
  id?: number;
  source: string;
}

export interface Room {
  id: number;
  name: string;
  hotelId?: number;
  pricePerNight?: number;
  maximumGuests?: number;
  available?: boolean;
  images?: RoomImage[];
}

@Injectable({ providedIn: 'root' })
export class HotelService {
  private http = inject(HttpClient);
  private baseUrl = 'https://hotelbooking.stepprojects.ge/api';

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.baseUrl}/Hotels/GetAll`);
  }

  // hotelId მოდის query param-იდან
  getRooms(hotelId: number): Observable<Room[] | Room> {
    return this.http.get<Room[] | Room>(`${this.baseUrl}/Rooms/GetRoom/${hotelId}`);
  }
}
