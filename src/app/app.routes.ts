import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';

export const routes: Routes = [
    { path: "", pathMatch: 'full', component: MainComponent },
];
