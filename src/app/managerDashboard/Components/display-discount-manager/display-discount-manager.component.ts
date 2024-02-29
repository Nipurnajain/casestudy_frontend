import { Component, ViewChild } from '@angular/core';
import { ManagerService } from '../../manager.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Discount } from 'src/app/adminDashboard/Model/Discount';

@Component({
  selector: 'app-display-discount-manager',
  templateUrl: './display-discount-manager.component.html',
  styleUrls: ['./display-discount-manager.component.css']
})
export class DisplayDiscountManagerComponent {
  discountList: Discount[] = [];
  pagedDiscountList: Discount[] = [];
  pageSize: number = 5; // Number of items per page
  currentPage: number = 0; // Current page index
  totalItems: number = 0; // Total number of items

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private managerService: ManagerService) {}

  ngOnInit(): void {
    this.getAllDiscounts();
  }

  getAllDiscounts() {
    this.managerService.getDiscounts().subscribe((list) => {
      this.discountList = list;
      this.totalItems = this.discountList.length;
      this.onPageChange({
        pageIndex: this.currentPage, pageSize: this.pageSize,
        length: 0
      }); // Trigger pagination
    });
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedDiscountList = this.discountList.slice(startIndex, endIndex);
  }

  removeDiscount(discountId: number) {
    this.managerService.removeDiscount(discountId).subscribe((msg) => {
      console.log("Deleted " + msg);
      this.getAllDiscounts(); // Reload data after deletion
    });
  }


}
