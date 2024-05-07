import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataResponseModel } from '../models/dataResponseModel';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = "https://localhost:44355/api/Category/getall"

  constructor(private httpClient:HttpClient) { }

  getCategories():Observable<DataResponseModel<Category>>{
    return this.httpClient.get<DataResponseModel<Category>>(this.apiUrl)
  }

}
