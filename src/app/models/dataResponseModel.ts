import { ResponseModel } from "./responsemodel";

export interface DataResponseModel<TData> extends ResponseModel {
    data:TData[]
}