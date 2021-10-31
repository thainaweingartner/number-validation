import { CountriesResponse } from "../models/country-response.model";

export function buildCountryList(): CountriesResponse[] {
  const countries: CountriesResponse[] = [];
  for (let i = 0; i < 249; i++) {
    countries.push({
      name: '',
      topLevelDomain: [''],
      alpha2Code: '',
      alpha3Code: '',
      callingCodes: [''],
      capital: '',
      altSpellings: [''],
      subregion: '',
      region: '',
      population: 0,
      latlng: [0, 0],
      demonym: '',
      area: 0,
      timezones: [''],
      borders: [''],
      nativeName: '',
      numericCode: '',
      flags: {
        svg: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg',
        png: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_the_Taliban.svg/320px-Flag_of_the_Taliban.svg.png',
      },
      currencies: [
        {
          code: "",
          name: "",
          symbol: ""
        }
      ],
      languages: [
        {
          iso639_1: "",
          iso639_2: "",
          name: "",
          nativeName: ""
        },
      ],
      "translations": {
        br: "",
        pt: "",
        nl: "",
        hr: "",
        fa: "",
        de: "",
        es: "",
        fr: "",
        ja: "",
        it: "",
        hu: ""
      },
      flag: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg",
      regionalBlocs: [
        {
          acronym: "",
          name: ""
        }
      ],
      cioc: "",
      independent: true
    });
  }
  return countries;
}
