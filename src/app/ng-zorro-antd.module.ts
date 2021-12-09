import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  exports: [
    NzButtonModule,
    NzDropDownModule,
    NzLayoutModule,
    NzGridModule,
    NzListModule,
    NzCardModule,
    NzRadioModule,
    NzInputNumberModule,
    NzCheckboxModule,
    FormsModule,
    NzSliderModule,
    NzTableModule,
    NzIconModule,
  ],
})
export class DemoNgZorroAntdModule {}
