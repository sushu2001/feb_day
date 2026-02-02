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
  msg = this.messages[0];
  private mover: any = null;
  private cycler: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startFloating();
    this.startCycling();
  }

  ngOnDestroy(): void {
    clearInterval(this.mover);
    clearInterval(this.cycler);
  }

  goSurprise() {
    this.router.navigate(['/surprise']);
  }

  onNoClick(event: Event) {
    event.stopPropagation();
    // show a message and gently move button away
    this.msg = this.messages[this.msgIndex];
    this.msgIndex = (this.msgIndex + 1) % this.messages.length;
    this.bump();
  }

  private startFloating() {
    this.mover = setInterval(() => this.randomMove(), 1200);
  }

  private startCycling() {
    this.cycler = setInterval(() => {
      this.msgIndex = (this.msgIndex + 1) % this.messages.length;
      this.msg = this.messages[this.msgIndex];
    }, 1800);
  }

  private bump() {
    this.randomMove();
  }

  private randomMove() {
    const btn = this.noBtn?.nativeElement;
    const card = this.cardRef?.nativeElement;
    if (!btn || !card) return;

    const btnRect = btn.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const maxLeft = Math.max(10, vw - btnRect.width - 10);
    const maxTop = Math.max(10, vh - btnRect.height - 10);

    let left = 10;
    let top = 10;
    for (let i = 0; i < 60; i++) {
      left = Math.floor(Math.random() * maxLeft);
      top = Math.floor(Math.random() * maxTop);

      const overlapX = left + btnRect.width > cardRect.left && left < cardRect.right;
      const overlapY = top + btnRect.height > cardRect.top && top < cardRect.bottom;
      if (!(overlapX && overlapY)) break;
    }

    btn.style.position = 'fixed';
    btn.style.left = left + 'px';
    btn.style.top = top + 'px';
  }
}
