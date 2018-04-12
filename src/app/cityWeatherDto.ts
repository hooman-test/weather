import {WeatherCondition} from './weatherCondition';

export class CityWeatherDto {
  id: number;
  name: string;
  main: WeatherCondition;
}
