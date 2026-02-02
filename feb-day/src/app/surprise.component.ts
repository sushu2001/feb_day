import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-surprise',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './surprise.component.html',
  styleUrls: ['./surprise.component.css']
})
export class SurpriseComponent {
  showMessageList = false;
  
  whatsappMessages = [
    "I can't wait to see you! 💌",
    "You make me smile every day ❤️",
    "Thank you for being my Valentine 💝",
    "Let's make beautiful memories together 🌹",
    "You're the best thing that happened to me 😘",
  ];

  toggleMessageList() {
    this.showMessageList = !this.showMessageList;
  }

  sendWhatsAppMessage(message: string) {
    const encodedMsg = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMsg}`;
    window.open(whatsappUrl, '_blank');
    this.showMessageList = false;
  }
}
