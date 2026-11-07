import { Service } from '@angular/core';
import { HousinglocationInfo } from '../interfaces/housinglocation';

@Service()
export class HousingService {

    readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common'

    protected housingLocationList: HousinglocationInfo[] = [];

    url = 'http://localhost:3000/locations'

  async getAllhousingLocations(): Promise<HousinglocationInfo[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousinglocationInfo | undefined>{
    const data = await fetch(`${this.url}/${id}`);
    const locationJson = await data.json();
    return locationJson ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string){
    console.log(`Se ha recibido una aplicación: nombre: ${firstName}, apellido: ${lastName}, email: ${email}`);
  }



}
