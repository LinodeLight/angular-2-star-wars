export let DefaultResponse = {
  get_all_planets:{
    "count": 61,
    "next": "http://swapi.co/api/planets/?page=2",
    "previous": null,
    "results":[
      {
        "name": "Alderaan",
        "rotation_period": "24",
        "orbital_period": "364",
        "diameter": "12500",
        "climate": "temperate",
        "gravity": "1 standard",
        "terrain": "grasslands, mountains",
        "surface_water": "40",
        "population": "2000000000",
        "residents": [
          "http://swapi.co/api/people/5/",
          "http://swapi.co/api/people/68/",
          "http://swapi.co/api/people/81/"
        ],
        "films": [
          "http://swapi.co/api/films/6/",
          "http://swapi.co/api/films/1/"
        ],
        "created": "2014-12-10T11:35:48.479000Z",
        "edited": "2014-12-20T20:58:18.420000Z",
        "url": "http://swapi.co/api/planets/2/"
      },
      {
        "name": "Yavin IV",
        "rotation_period": "24",
        "orbital_period": "4818",
        "diameter": "10200",
        "climate": "temperate, tropical",
        "gravity": "1 standard",
        "terrain": "jungle, rainforests",
        "surface_water": "8",
        "population": "1000",
        "residents": [],
        "films": ["http://swapi.co/api/films/1/"],
        "created": "2014-12-10T11:37:19.144000Z",
        "edited": "2014-12-20T20:58:18.421000Z",
        "url": "http://swapi.co/api/planets/3/"
      }
    ]
  },
  load_next_page: {
    "count": 61,
    "next": "http://swapi.co/api/planets/?page=3",
    "previous": "http://swapi.co/api/planets/?page=1",
    "results": [
      {
        "name": "Utapau",
        "rotation_period": "27",
        "orbital_period": "351",
        "diameter": "12900",
        "climate": "temperate, arid, windy",
        "gravity": "1 standard",
        "terrain": "scrublands, savanna, canyons, sinkholes",
        "surface_water": "0.9",
        "population": "95000000",
        "residents": ["http://swapi.co/api/people/83/"],
        "films": ["http://swapi.co/api/films/6/"],
        "created": "2014-12-10T12:49:01.491000Z",
        "edited": "2014-12-20T20:58:18.439000Z",
        "url": "http://swapi.co/api/planets/12/"
      },
      {
        "name": "Mustafar",
        "rotation_period": "36",
        "orbital_period": "412",
        "diameter": "4200",
        "climate": "hot",
        "gravity": "1 standard",
        "terrain": "volcanoes, lava rivers, mountains, caves",
        "surface_water": "0",
        "population": "20000",
        "residents": [],
        "films": ["http://swapi.co/api/films/6/"],
        "created": "2014-12-10T12:50:16.526000Z",
        "edited": "2014-12-20T20:58:18.440000Z",
        "url": "http://swapi.co/api/planets/13/"
      },
    ]
  },
  planetID: 19,
  load_planet_by_id: {
    "name": "Saleucami",
    "rotation_period": "26",
    "orbital_period": "392",
    "diameter": "14920",
    "climate": "hot",
    "gravity": "unknown",
    "terrain": "caves, desert, mountains, volcanoes",
    "surface_water": "unknown",
    "population": "1400000000",
    "residents": [],
    "films": ["http://swapi.co/api/films/6/"],
    "created": "2014-12-10T13:47:46.874000Z",
    "edited": "2014-12-20T20:58:18.450000Z",
    "url": "http://swapi.co/api/planets/19/"
  },
  error:{_body:{detail:''},status: 500, statusText: 'error',message:'error'}
};
