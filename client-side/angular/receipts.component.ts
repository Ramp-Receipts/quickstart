import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.css']
})
export class ReceiptsComponent {
  currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });
  customer: any;
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  receipts: any[];
  rootUrl: '';
  title = 'Receipts';

  constructor(private http: HttpClient) {}

  loadCustomer() {
    this.http.get(this.rootUrl + '/receipts/customer')
      .subscribe(customer => {
        this.customer = customer;
      });
  }

  loadReceipts() {
    this.http.get<any[]>(this.rootUrl + '/receipts')
      .subscribe(receipts => {
        receipts.forEach(receipt => {
          receipt.monthName = this.months[receipt.month - 1];
          receipt.amount = this.currencyFormatter.format(receipt.totalAmount);
        });

        this.receipts = receipts;
      });
  }

  saveCustomer() {
    this.http.post(this.rootUrl + '/receipts/customer', this.customer)
      .subscribe(result => {
        this.loadReceipts();
      });
  }

  ngOnInit() : void {
    this.loadCustomer();
    this.loadReceipts();
  }
}
