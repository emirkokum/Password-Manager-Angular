import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataResponseModel } from '../models/dataResponseModel';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = "https://localhost:44355/api/Category/"

  constructor(private httpClient:HttpClient) { }

  getCategories():Observable<DataResponseModel<Category>>{
    let newUrl = this.apiUrl + "getall"
    return this.httpClient.get<DataResponseModel<Category>>(newUrl)
  }

  add(category:Category):Observable<ResponseModel>{
    let newPath = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(newPath,category)
  }

  delete(category:Category){
    let newPath = this.apiUrl + "delete"
    return this.httpClient.post<ResponseModel>(newPath, category)
  }

}
