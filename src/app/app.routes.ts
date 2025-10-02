import { Routes } from '@angular/router';
import { InvestmentListComponent } from './components/investment-list/investment-list.component';
import { PurchaseValue } from './pages/purchase-value/purchase-value.component';

export const routes: Routes = [
    { path: '', component: InvestmentListComponent }, 
    { path: 'purchase/:cryptoId', component: PurchaseValue }
];
