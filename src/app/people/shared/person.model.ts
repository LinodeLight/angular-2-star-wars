import { CONFIG } from '../../shared/config';

export class Person {
  name: string;
	height: string;
  mass: string;
	hair_color: string;
	skin_color: string;
	eye_color: string;
	birth_year: string;
	gender: string;
	homeworld: string;
	films: Array<string>;
	species: Array<string>;
	vehicles: Array<string>;
	starships: Array<string>;
	created: string;
	edited: string;
	url: string;

  constructor(params: any) {
    this.name = params.name;
  	this.height = params.height;
    this.mass = params.mass;
  	this.hair_color = params.hair_color;
  	this.skin_color = params.skin_color;
  	this.eye_color = params.eye_color;
  	this.birth_year = params.birth_year;
  	this.gender = params.gender;
  	this.homeworld = params.homeworld;
  	this.films = params.films;
  	this.species = params.species;
  	this.vehicles = params.vehicles;
  	this.starships = params.starships;
  	this.created = params.created;
  	this.edited = params.edited;
  	this.url = params.url;
  }

  get id () : number {
    return parseInt(this.url.match(/\d+/)[0]);
  }

  get image () : string {
    let imgName = this.name.replace(/ /g, '_').toLowerCase();

    return CONFIG.charactersURL + imgName + '.png';
  }

  static parseIdFromURL(url: string) : number {
    return parseInt(url.match(/\d+/)[0]);
  }
}
