import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponseModel } from '../models/dataResponseModel';
import { RecordDetail } from '../models/recordDetail';

@Injectable({
  providedIn: 'root'
})
export class RecordDetailService {
  apiUrl = "https://localhost:44355/api/Records/getrecorddetails"

  constructor(private httpClient:HttpClient) { }

  getRecordDetails():Observable<DataResponseModel<RecordDetail>>{
    return this.httpClient.get<DataResponseModel<RecordDetail>>(this.apiUrl)
  }
}
