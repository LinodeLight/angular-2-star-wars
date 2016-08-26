import { CONFIG } from '../../shared/config';

export class Planet {
  name: string;
  rotation_period: string;
	orbital_period: string;
	diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  murky: string;
  surface_water: string;
  population: string;
  residents: Array<string>;
  films: Array<string>;
  created: string;
  edited: string;
  url: string;

  constructor(params: any) {
    this.name = params.name;
  	this.rotation_period = params.rotation_period;
    this.orbital_period = params.orbital_period;
  	this.diameter = params.diameter;
  	this.climate = params.climate;
  	this.gravity = params.gravity;
  	this.terrain = params.terrain;
  	this.murky = params.murky;
  	this.surface_water = params.surface_water;
  	this.population = params.population;
  	this.residents = params.residents;
  	this.films = params.films;
  	this.created = params.created;
  	this.edited = params.edited;
  	this.url = params.url;
  }

  get id () : number {
    return parseInt(this.url.match(/\d+/)[0]);
  }

  get image () : string {
    let imgName = this.name.replace(/ /g, '_').toLowerCase();

    return CONFIG.locationsURL + imgName + '.png';
  }

  static parseIdFromURL(url: string) : number {
    return parseInt(url.match(/\d+/)[0]);
  }
}
