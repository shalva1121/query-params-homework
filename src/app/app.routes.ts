import { Routes } from '@angular/router';
import { HotelsComponent } from './hotels/hotels';
import { RoomsComponent } from './rooms/rooms';

export const routes: Routes = [
  { path: '', component: HotelsComponent },
  // /rooms?hotelId=1&hotelName=...
  { path: 'rooms', component: RoomsComponent },
  { path: '**', redirectTo: '' },
];
