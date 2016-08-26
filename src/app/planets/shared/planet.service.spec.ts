import { provide } from '@angular/core'
import { Headers, Http, HTTP_PROVIDERS, BaseRequestOptions, XHRBackend, Response, ResponseOptions } from '@angular/http';;
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
    describe,
    expect,
    beforeEach,
    it,
    inject,
    injectAsync,
    beforeEachProviders
} from '@angular/core/testing';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/Rx';

import { PlanetService } from './planet.service';
import { DefaultResponse } from './mock-planet';
import { Planet } from './planet.model';


describe('Planet Service', () => {

    beforeEachProviders(() => {
      return [
        HTTP_PROVIDERS,
        provide(XHRBackend, {useClass: MockBackend}),
        PlanetService
      ];
    });

    it('should POSITIVE response (get all planets)',
      injectAsync([XHRBackend, PlanetService], (mockBackend, planetService) => {

        return new Promise((pass, fail) => {
          mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                  body: DefaultResponse.get_all_planets
                })
              ));
            });

        planetService
          .getPlanets()
          .then(response => {
            expect(response.results.length).toBe(2);
            expect(response.count).toBe(61);
            expect(response.next).toBe('http://swapi.co/api/planets/?page=2');
          });
        });
      }));

    it('should get NEGATIVE response',
      injectAsync([XHRBackend, PlanetService], (mockBackend, planetService) => {

        return new Promise((resolve, reject) => {
            mockBackend.connections.subscribe((connection: MockConnection) => {
              connection.mockError(<any>new Response(new ResponseOptions(DefaultResponse.error)))
            });

            planetService
              .getPlanets()
              .catch(error => expect(error.statusText).toBe('error'));
            }
          );
        })
      );

    it('should load next page (POSITIVE)',
        injectAsync([XHRBackend, PlanetService], (mockBackend, planetService) => {
          return new Promise((pass, fail) => {
            mockBackend.connections.subscribe((connection: MockConnection) => {
              connection.mockRespond(new Response(
                new ResponseOptions({
                  body: DefaultResponse.load_next_page
                })
              ));
            });

            planetService
              .paging(2)
              .then(response => {
                expect(response.results.length).toBe(2);
                expect(response.count).toBe(61);
                expect(response.next).toBe('http://swapi.co/api/planets/?page=3');
                expect(response.previous).toBe('http://swapi.co/api/planets/?page=1');
              });
          });
        })
      );

    it('should load next page (NEGATIVE)',
      injectAsync([XHRBackend, PlanetService], (mockBackend, planetService) => {
        return new Promise((pass, fail) => {
          mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockError(<any>new Response(new ResponseOptions(DefaultResponse.error)))
          });

          planetService
            .paging(2)
            .catch(error => expect(error.statusText).toBe('error'));
        });
      })
    );

    it('should load planet by id (POSITIVE)',
      injectAsync([XHRBackend, PlanetService], (mockBackend, planetService) => {
        return new Promise((pass, fail) => {
          mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                body: DefaultResponse.load_planet_by_id
              })
            ));
          });

          planetService
            .getPlanet(DefaultResponse.planetID)
            .then(response => {
              expect(response.name).toBe('Saleucami');
              expect(response.url).toBe('http://swapi.co/api/planets/'+DefaultResponse.planetID+'/');
            });
        });
      })
    );

    it('should load planet by id (NEGATIVE)',
        injectAsync([XHRBackend, PlanetService], (mockBackend, planetService) => {
          return new Promise((pass, fail) => {
            mockBackend.connections.subscribe((connection: MockConnection) => {
              connection.mockError(<any>new Response(new ResponseOptions(DefaultResponse.error)))
            });

            planetService
              .getPlanet(DefaultResponse.planetID)
              .catch(error => expect(error.statusText).toBe('error'));
          });
      })
    );
});
