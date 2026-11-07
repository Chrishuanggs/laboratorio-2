export interface HousinglocationInfo {
    id: number;
    name: string;
    city: string;
    state: string;
    photo: string; //aqui vamos a poner la URL de donde encontrar las fotos de las casas
    availableUnits: number;
    wifi: boolean;
    laundry: boolean;
}
