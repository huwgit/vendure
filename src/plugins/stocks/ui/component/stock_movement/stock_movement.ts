import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { notNullOrUndefined } from "@vendure/common/lib/shared-utils";
import { ResultOf } from "@graphql-typed-document-node/core";
import {
  SharedModule,
  DataService,
  CustomDetailComponent,
} from "@vendure/admin-ui/core";
import { Observable, filter, map } from "rxjs";
import { GetStockMovementsForVariantDocument } from "../../generated-types";

type StockMovementEntity = ResultOf<
  typeof GetStockMovementsForVariantDocument
>["variantStockMovements"];

@Component({
  standalone: true,
  templateUrl: "stock_movement.html",
  imports: [SharedModule],
})
export class StockMovementListComponent
  implements CustomDetailComponent, OnInit
{
  entity$: Observable<any>;
  detailForm: FormGroup;

  id: string;

  movements$: Observable<StockMovementEntity>;
  movementsPerPage = 10;
  movementsCount$: Observable<number>;
  currentMovementsPage = 1;

  setMovementItemsPerPage(itemsPerPage: number) {
    this.movementsPerPage = +itemsPerPage;
    this.fetchMovementList();
  }

  setMovementCurrentPage(page: number) {
    this.currentMovementsPage = +page;
    this.fetchMovementList();
  }

  log() {
    console.log(this.detailForm);
  }

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.entity$.subscribe((e) => {
      this.id = e.id;
    });

    this.fetchMovementList();

    this.movementsCount$ = this.movements$.pipe(map((m) => m.totalItems));
  }

  private fetchMovementList() {
    this.movements$ = this.dataService
      .query(GetStockMovementsForVariantDocument, {
        id: this.id,
        options: {
          take: this.movementsPerPage,
          skip: (this.currentMovementsPage - 1) * this.movementsPerPage,
        },
      })
      .single$.pipe(
        map((data) => data.variantStockMovements),
        filter(notNullOrUndefined),
      );
  }
}
