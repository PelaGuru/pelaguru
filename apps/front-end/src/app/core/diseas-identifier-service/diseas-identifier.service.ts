import { NumberSymbol } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DiseasIdentifierService {
  constructor(private http: HttpClient) {}

  async getPrediction(imageUrl: string) {
    try {
      const data = {
        url: imageUrl,
      };
      const response = await this.http
        .post<any>(environment.predictionURL, data)
        .toPromise();
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
