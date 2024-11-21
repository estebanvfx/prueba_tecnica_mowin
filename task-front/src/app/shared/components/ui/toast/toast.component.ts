import { Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  template: `
  @if(show){
    <div
      class="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 min-h-[55%] flex items-center justify-center"
      role="alert"
      tabindex="-1"
      aria-labelledby="hs-toast-with-icons-label">
      <div class="flex flex-col items-center text-center p-4">
        <div class="shrink-0">
          <img src="https://cdn-icons-png.flaticon.com/512/7518/7518748.png" class="w-48">
        </div>
        <div class="mt-10">
          <h3 id="hs-toast-with-icons-label" class="text-gray-800 font-bold text-3xl">
            {{ title }}
          </h3>
          <div class="mt-2 text-base text-gray-600 font-semibold">
            {{ message }}
          </div>
        </div>
      </div>
    </div>

  }
  `,
})
export class ToastComponent {
  @Input() show: boolean = false;
  @Input() title: string = '';
  @Input() message: string = '';
  @Output() closed = new EventEmitter<void>();

  close(): void{
    this.show = false;
    this.closed.emit()
  }
}
