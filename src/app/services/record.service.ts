import { Injectable } from '@angular/core';
import { Record } from '../models/record';
import { DataResponseModel } from '../models/dataResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  apiUrl = "https://localhost:44355/api/Records/"

  constructor(private httpClient:HttpClient) { }

  getRecords():Observable<DataResponseModel<Record>>{
    let newUrl = this.apiUrl + "getall"
    return this.httpClient.get<DataResponseModel<Record>>(newUrl)
  }

  add(record:Record):Observable<ResponseModel>{
    let newPath = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(newPath,record)
  }

}
