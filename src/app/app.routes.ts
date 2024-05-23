import { Routes } from '@angular/router';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { RecordComponent } from './components/record/record.component';
import { AddRecordComponent } from './components/add-record/add-record.component';
import { RecordDetailComponent } from './components/record-detail/record-detail.component';

export const routes: Routes = [
    { path: "", pathMatch: 'full', component: RecordComponent },
    { path: "recorddetail", component:RecordDetailComponent},
    { path: "recorddetail/:recordId", component:RecordDetailComponent},
    { path: "category", component:RecordComponent},
    { path: "category/:categoryId", component:RecordComponent},
    { path: "addcategory", component: AddCategoryComponent },
    { path: "addrecord", component: AddRecordComponent }
];
