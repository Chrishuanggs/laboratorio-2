import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousinglocationInfo } from '../interfaces/housinglocation';
import { HousingService } from '../services/housing';


@Component({
  imports: [HousingLocation],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {

  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common'

  housingService: HousingService = inject(HousingService);

  housingLocationList: HousinglocationInfo[] = [];

  filteredLocationList: HousinglocationInfo[] = [];

  private readonly changeDetectorReference = inject(ChangeDetectorRef);

  constructor(){
    this.housingService.getAllhousingLocations()
    .then((housingLocationList: HousinglocationInfo[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = this.housingLocationList;
      this.changeDetectorReference.markForCheck()
    });
  }

  filterResults(text: string){
    if(!text){
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter((housingLocation) => {
      return housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    });


  }


}
