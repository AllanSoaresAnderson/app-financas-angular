import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinner, MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
    imports: [CommonModule, MatPaginatorModule, MatProgressSpinnerModule],
    declarations: [],
    exports: [MatPaginator, MatProgressSpinner]
  })
  export class MaterialsModule {}