// // import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
// // import {MatTabsModule} from '@angular/material/tabs';

// // @Component({
// //   selector: 'app-answers',
// //   imports: [
// //     MatTabsModule
// //   ],
// //   templateUrl: './answers.component.html',
// //   styleUrl: './answers.component.scss'
// // })
// // export class AnswersComponent implements AfterViewInit {
// //   @Input() answersUrl!: string[];
// //   @Input() baseUrl!: string;
// //   @Input() imageUrl!: string | undefined;

// //   @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
// //   @ViewChild('image') imageRef!: ElementRef<HTMLImageElement>;

// //   private ctx!: CanvasRenderingContext2D;
// //   private isDrawing = false;
// //   private startX = 0;
// //   private startY = 0;
// //   private lines: { x1: number; y1: number; x2: number; y2: number }[] = []; // Хранилище линий

// //   ngAfterViewInit() {
// //     const canvas = this.canvasRef.nativeElement;

// //     canvas.addEventListener('mousedown', this.startDrawing.bind(this));
// //     canvas.addEventListener('mousemove', this.draw.bind(this));
// //     canvas.addEventListener('mouseup', this.stopDrawing.bind(this));

// //     // Загрузка сохраненных линий
// //     const savedLines = localStorage.getItem('savedLines');
// //     if (savedLines) {
// //       this.lines = JSON.parse(savedLines);
// //       this.redrawLines();
// //     }
// //   }

// //   onImageLoad() {
// //     const canvas = this.canvasRef.nativeElement;
// //     const image = this.imageRef.nativeElement;

// //     canvas.width = image.width;
// //     canvas.height = image.height;

// //     this.ctx = canvas.getContext('2d')!;
// //   }

// //   startDrawing(event: MouseEvent) {
// //     this.isDrawing = true;
// //     const rect = this.canvasRef.nativeElement.getBoundingClientRect();
// //     this.startX = event.clientX - rect.left;
// //     this.startY = event.clientY - rect.top;
// //   }

// //   draw(event: MouseEvent) {
// //     if (!this.isDrawing) return;

// //     const rect = this.canvasRef.nativeElement.getBoundingClientRect();
// //     const x = event.clientX - rect.left;
// //     const y = event.clientY - rect.top;

// //     this.ctx.beginPath();
// //     this.ctx.moveTo(this.startX, this.startY);
// //     this.ctx.lineTo(x, y);
// //     this.ctx.stroke();
// //     this.ctx.closePath();

// //     this.lines.push({ x1: this.startX, y1: this.startY, x2: x, y2: y });
// //     this.startX = x;
// //     this.startY = y;
// //   }

// //   stopDrawing() {
// //     this.isDrawing = false;
// //   }

// //   clearCanvas() {
// //     this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
// //     this.lines = [];
// //   }

// //   redrawLines() {
// //     this.lines.forEach(({ x1, y1, x2, y2 }) => {
// //       this.ctx.beginPath();
// //       this.ctx.moveTo(x1, y1);
// //       this.ctx.lineTo(x2, y2);
// //       this.ctx.stroke();
// //       this.ctx.closePath();
// //     });
// //   }

// //   saveLines() {
// //     const linesJSON = JSON.stringify(this.lines);
// //     localStorage.setItem('savedLines', linesJSON);
// //     console.log('Lines saved:', linesJSON);
// //   }
// // }

// import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
// import { MatTabsModule } from '@angular/material/tabs';

// @Component({
//   selector: 'app-answers',
//   imports: [MatTabsModule],
//   templateUrl: './answers.component.html',
//   styleUrls: ['./answers.component.scss']
// })
// export class AnswersComponent implements AfterViewInit {
//   @Input() answersUrl!: string[];
//   @Input() baseUrl!: string;
//   @Input() imageUrl!: string | undefined;

//   @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
//   @ViewChild('image') imageRef!: ElementRef<HTMLImageElement>;

//   private ctx!: CanvasRenderingContext2D;
//   private isDrawing = false;
//   private startX = 0;
//   private startY = 0;
//   private lines: { id: number; x1: number; y1: number; x2: number; y2: number }[] = [];
//   private selectedLineId: number | null = null;

//   ngAfterViewInit() {
//     const canvas = this.canvasRef?.nativeElement;

//     if (canvas) {
//       canvas.addEventListener('mousedown', this.startDrawing.bind(this));
//     canvas.addEventListener('mousemove', this.draw.bind(this));
//     canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
//     canvas.addEventListener('click', this.selectLine.bind(this));

//     // const savedLines = localStorage.getItem('savedLines');
//     // if (savedLines) {
//     //   this.lines = JSON.parse(savedLines);
//     //   this.redrawLines();
//     // }
//     }

    
//   }

//   onImageLoad() {
//     const canvas = this.canvasRef?.nativeElement;
//     const image = this.imageRef?.nativeElement;

//     if (canvas) {
//           canvas.width = image.width;
//     canvas.height = image.height;

//     this.ctx = canvas.getContext('2d')!;
//     }
//   }

//   startDrawing(event: MouseEvent) {
//     this.isDrawing = true;
//     const rect = this.canvasRef.nativeElement.getBoundingClientRect();
//     this.startX = event.clientX - rect.left;
//     this.startY = event.clientY - rect.top;
//   }

//   draw(event: MouseEvent) {
//     if (!this.isDrawing) return;

//     const rect = this.canvasRef.nativeElement.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     this.ctx.beginPath();
//     this.ctx.moveTo(this.startX, this.startY);
//     this.ctx.lineTo(x, y);
//     this.ctx.stroke();
//     this.ctx.closePath();

//     const id = this.lines.length > 0 ? this.lines[this.lines.length - 1].id + 1 : 1;
//     this.lines.push({ id, x1: this.startX, y1: this.startY, x2: x, y2: y });

//     this.startX = x;
//     this.startY = y;
//   }

//   stopDrawing() {
//     this.isDrawing = false;
//   }

//   clearCanvas() {
//     this.ctx?.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
//     this.lines = [];
//   }

//   redrawLines() {
//     this.ctx?.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
//     this.lines.forEach(({ id, x1, y1, x2, y2 }) => {
//       this.ctx.beginPath();
//       this.ctx.moveTo(x1, y1);
//       this.ctx.lineTo(x2, y2);
//       this.ctx.strokeStyle = id === this.selectedLineId ? 'red' : 'black';
//       this.ctx.lineWidth = id === this.selectedLineId ? 3 : 1;
//       this.ctx.stroke();
//       this.ctx.closePath();
//     });
//   }

//   selectLine(event: MouseEvent) {
//     const rect = this.canvasRef?.nativeElement.getBoundingClientRect();
//     const x = event.clientX - rect.left;
//     const y = event.clientY - rect.top;

//     this.selectedLineId = this.lines.find(line => this.isPointNearLine(x, y, line))?.id || null;
//     this.redrawLines();
//   }

//   isPointNearLine(x: number, y: number, line: { x1: number; y1: number; x2: number; y2: number }): boolean {
//     const tolerance = 5;
//     const dist = this.pointToLineDistance(x, y, line.x1, line.y1, line.x2, line.y2);
//     return dist <= tolerance;
//   }

//   pointToLineDistance(px: number, py: number, x1: number, y1: number, x2: number, y2: number): number {
//     const A = px - x1;
//     const B = py - y1;
//     const C = x2 - x1;
//     const D = y2 - y1;

//     const dot = A * C + B * D;
//     const lenSq = C * C + D * D;
//     const param = lenSq !== 0 ? dot / lenSq : -1;

//     let xx, yy;

//     if (param < 0) {
//       xx = x1;
//       yy = y1;
//     } else if (param > 1) {
//       xx = x2;
//       yy = y2;
//     } else {
//       xx = x1 + param * C;
//       yy = y1 + param * D;
//     }

//     const dx = px - xx;
//     const dy = py - yy;
//     return Math.sqrt(dx * dx + dy * dy);
//   }

//   deleteSelectedLine() {
//     console.log(this.selectedLineId, this.lines)
//     if (this.selectedLineId !== null) {
//       this.lines = this.lines.filter(line => line.id !== this.selectedLineId);
//       this.selectedLineId = null;
//       this.clearCanvas();
//       this.redrawLines();
//     }
//   }

//   saveLines() {
//     const linesJSON = JSON.stringify(this.lines);
//     // localStorage.setItem('savedLines', linesJSON);
//     // console.log('Lines saved:', linesJSON);
//   }
// }



import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-answers',
  imports: [MatTabsModule,MatButtonModule,MatIconModule],
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements AfterViewInit {
  @Input() imageUrl!: string | undefined;
  @Input() answersUrl!: string[];
  @Input() baseUrl!: string;

  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('image') imageRef!: ElementRef<HTMLImageElement>;

  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;
  private startX = 0;
  private startY = 0;
  private lines: { id: number; points: { x: number; y: number }[] }[] = [];
  private selectedLineId: number | null = null;
  private tolerance = 10; // Порог для выделения линии

  ngAfterViewInit() {
    const canvas = this.canvasRef?.nativeElement;

    if (canvas) {
      canvas.addEventListener('mousedown', this.startDrawing.bind(this));
      canvas.addEventListener('mousemove', this.draw.bind(this));
      canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
      canvas.addEventListener('click', this.selectLine.bind(this));
    }
  }

  onImageLoad() {
    const canvas = this.canvasRef?.nativeElement;
    const image = this.imageRef?.nativeElement;

    if (canvas) {
      canvas.width = image.width;
      canvas.height = image.height;

      this.ctx = canvas.getContext('2d')!;
      this.loadLines();
    }
  }

  startDrawing(event: MouseEvent) {
    this.isDrawing = true;
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const id = this.lines.length > 0 ? this.lines[this.lines.length - 1].id + 1 : 1;
    this.lines.push({ id, points: [{ x, y }] });

    this.startX = x;
    this.startY = y;
  }

  draw(event: MouseEvent) {
    if (!this.isDrawing) return;

    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const currentLine = this.lines[this.lines.length - 1];
    currentLine.points.push({ x, y });

    this.redrawLines();
  }

  stopDrawing() {
    this.isDrawing = false;

    // Скругляем текущую линию после окончания рисования
    const currentLine = this.lines[this.lines.length - 1];
    currentLine.points = this.smoothLine(currentLine.points);
    this.saveLines();
    this.redrawLines();
  }

  smoothLine(points: { x: number; y: number }[]): { x: number; y: number }[] {
    // Используем сглаживание кривой Эрмита
    const smoothed: { x: number; y: number }[] = [];
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];

      smoothed.push(p0);
      // Добавляем промежуточные точки между p0 и p1
      smoothed.push({
        x: (p0.x + p1.x) / 2,
        y: (p0.y + p1.y) / 2,
      });
    }
    smoothed.push(points[points.length - 1]);
    return smoothed;
  }

  clearCanvas() {
    this.ctx?.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
  }

  redrawLines() {
    // Очищаем холст
    this.clearCanvas();
  
    // Перерисовываем только актуальные линии
    this.lines.forEach(({ id, points }) => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = id === this.selectedLineId ? 'red' : 'black';
      this.ctx.lineWidth = id === this.selectedLineId ? 3 : 1;
  
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        this.ctx.moveTo(p0.x, p0.y);
        this.ctx.lineTo(p1.x, p1.y);
      }
  
      this.ctx.stroke();
      this.ctx.closePath();
    });
  }
   

  selectLine(event: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.selectedLineId = this.lines.find(line =>
      line.points.some(point => this.isPointNearPoint(x, y, point))
    )?.id || null;

    this.redrawLines();
  }

  isPointNearPoint(x: number, y: number, point: { x: number; y: number }): boolean {
    return Math.abs(x - point.x) <= this.tolerance && Math.abs(y - point.y) <= this.tolerance;
  }

  deleteSelectedLine() {
    if (this.selectedLineId !== null) {
      // Удаляем выделенную линию из массива
      this.lines = this.lines.filter(line => line.id !== this.selectedLineId);
  
      // Сбрасываем идентификатор выделенной линии
      this.selectedLineId = null;
  
      // Сохраняем актуальное состояние линий
      this.saveLines();
  
      // Перерисовываем холст
      this.redrawLines();
    }
  }
  
  saveLines() {
    if (this.imageUrl) {
      const allData = JSON.parse(localStorage.getItem('savedLines') || '{}');
      allData[this.imageUrl] = this.lines; // Обновляем данные для текущего изображения
      localStorage.setItem('savedLines', JSON.stringify(allData));
    }
  }
  
  loadLines() {
    if (this.imageUrl) {
      const allData = JSON.parse(localStorage.getItem('savedLines') || '{}');
      this.lines = allData[this.imageUrl] || []; // Загружаем линии для текущего изображения
      this.redrawLines(); // Перерисовываем линии после загрузки
    }
  }
}
