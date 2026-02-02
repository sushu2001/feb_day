import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('noBtn', { static: true, read: ElementRef }) noBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('noWrap', { static: true, read: ElementRef }) noWrap!: ElementRef<HTMLElement>;
  @ViewChild('containerRef', { static: true, read: ElementRef }) containerRef!: ElementRef<HTMLElement>;
  @ViewChild('cardRef', { static: true, read: ElementRef }) cardRef!: ElementRef<HTMLElement>;
  messages = [
    'Are you sure?',
    'Please think again ❤️',
    'I promise endless care 💕',
    'We could be the happiest together ✨',
    'Please say yes? 😊'
  ];
  msgIndex = 0;
  msg = '';
  showMsg = false;
  private mover: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // movement is hover-driven; message appears only on NO click
  }

  ngOnDestroy(): void {
    clearInterval(this.mover);
  }

  goSurprise() {
    console.log('goSurprise() invoked - navigating to /surprise');
    this.router.navigateByUrl('/surprise').catch(err => console.error('Navigation error', err));
  }

  onNoClick(event: Event) {
    event.stopPropagation();
    // show a message (below NO) and gently move the button
    this.msg = this.messages[this.msgIndex];
    this.msgIndex = (this.msgIndex + 1) % this.messages.length;
    this.showMsg = true;
    this.bump();
  }

  // hover-controlled mover start/stop
  startNoHover() {
    if (this.mover) return;
    this.mover = setInterval(() => this.randomMove(), 260);
  }

  stopNoHover() {
    if (this.mover) {
      clearInterval(this.mover);
      this.mover = null;
      // reset transform
      try { this.noWrap.nativeElement.style.transform = 'none'; } catch {}
    }
  }



  private bump() {
    this.randomMove();
  }

  private randomMove() {
    const wrap = this.noWrap?.nativeElement;
    const container = this.containerRef?.nativeElement;
    if (!wrap || !container) return;

    const contRect = container.getBoundingClientRect();

    // limit movement to a reasonable offset from original position
    const maxX = Math.min(160, Math.max(80, contRect.width / 5));
    const maxY = Math.min(120, Math.max(40, contRect.height / 8));

    const x = Math.floor((Math.random() - 0.5) * 2 * maxX);
    const y = Math.floor((Math.random() - 0.5) * 2 * maxY);

    wrap.style.transition = 'transform 180ms ease';
    wrap.style.transform = `translate(${x}px, ${y}px)`;
  }
}
