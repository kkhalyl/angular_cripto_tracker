import { Routes } from '@angular/router';
import { InvestmentListComponent } from './pages/investment-list/investment-list.component';
import { PurchaseValue } from './pages/purchase-value/purchase-value.component';
import { PurchaseDate } from './pages/purchase-date/purchase-date';
import { ResultsComponent } from './pages/results/results';

export const routes: Routes = [
    { path: '', component: InvestmentListComponent }, 
    { path: 'purchase/:cryptoId', component: PurchaseValue },
    { path: 'purchase-date/:selectedCryptoValue', component: PurchaseDate },
    { path: 'results', component: ResultsComponent }
];
