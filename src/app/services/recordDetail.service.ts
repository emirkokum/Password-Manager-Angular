import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/dataResponseModel';
import { RecordDetail } from '../models/recordDetail';
import { Record } from '../models/record';

@Injectable({
  providedIn: 'root'
})
export class RecordDetailService {
  apiUrl = "https://localhost:44355/api/Records/"
  constructor(private httpClient:HttpClient) { }

  getRecords():Observable<DataResponseModel<RecordDetail>>{
    let newUrl = this.apiUrl + "getall"
    return this.httpClient.get<DataResponseModel<RecordDetail>>(newUrl)
  }

  getRecordDetails():Observable<DataResponseModel<RecordDetail>>{
    let newUrl = this.apiUrl + "getrecorddetails"
    return this.httpClient.get<DataResponseModel<RecordDetail>>(newUrl)
  }

  getRecordDetailsByCategoryId(categoryId:number){
    let newUrl = this.apiUrl + "getrecorddetailsbycategoryid?categoryId=" + categoryId
    return this.httpClient.get<DataResponseModel<RecordDetail>>(newUrl)
  }
}
