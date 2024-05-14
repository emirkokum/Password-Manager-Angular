import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { RecordComponent } from './components/record/record.component';
import { AddRecordComponent } from './components/add-record/add-record.component';
import { RecordDetailComponent } from './components/record-detail/record-detail.component';

export const routes: Routes = [
    { path: "", pathMatch: 'full', component: MainComponent },
    { path: "recorddetail", component:RecordDetailComponent},
    { path: "recorddetail/:recordId", component:RecordDetailComponent},
    { path: "category", component:MainComponent},
    { path: "category/:categoryId", component:MainComponent},
    { path: "addcategory", component: AddCategoryComponent },
    { path: "addrecord", component: AddRecordComponent }
];
