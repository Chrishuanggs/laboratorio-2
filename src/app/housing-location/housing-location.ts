import { Component, input, signal } from '@angular/core';
import { HousinglocationInfo } from '../interfaces/housinglocation';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-housing-location',
  styleUrl: './housing-location.css',
  templateUrl: './housing-location.html',
})
export class HousingLocation {

  housingLocation = input.required<HousinglocationInfo>()

}
