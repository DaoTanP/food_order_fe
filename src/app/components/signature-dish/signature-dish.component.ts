import { Component } from '@angular/core';

@Component({
  selector: 'app-signature-dish',
  templateUrl: './signature-dish.component.html',
  styleUrl: './signature-dish.component.css'
})
export class SignatureDishComponent {
  items: Array<{ imageUrl: string, title: string, description: string }> = [
    // Danh sách các item bạn muốn hiển thị
    {
      imageUrl: 'https://food-cms.grab.com/compressed_webp/merchants/5-C3TYAU51EYM1JA/hero/398ef14332a84fa3b34034f753dea761_1691032150229147318.webp',
      title: 'Item 1',
      description: 'Mô tả item 1'
    },
    {
      imageUrl: 'https://food-cms.grab.com/compressed_webp/merchants/5-C3TYAU51EYM1JA/hero/398ef14332a84fa3b34034f753dea761_1691032150229147318.webp',
      title: 'Item 2',
      description: 'Mô tả item 2'
    },
    // Thêm các item khác vào đây...
  ];

  ngOnInit(): void {
    // Sắp xếp lại các item ngẫu nhiên
    this.items = this.shuffleArray(this.items);
  }

  shuffleArray(array: Array<any>): Array<any> {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Hoán đổi các item
    }
    return array;
  }
}
