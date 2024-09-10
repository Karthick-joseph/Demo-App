import { Component, HostListener, OnInit, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent implements OnInit, AfterViewInit {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  particlesArray: any[] = [];
  mouse = {
    x: undefined,
    y: undefined,
  };

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    // Canvas and context setup
    this.canvas = this.elRef.nativeElement.querySelector('#bgCanvas');
    this.ctx = this.canvas.getContext('2d')!;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Populate the particles array
    this.initParticles();
  }

  ngAfterViewInit(): void {
    this.animateParticles();
  }

  // Handle mouse movement
  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouse.x = event.x;
    this.mouse.y = event.y;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  // Particle class
  createParticle() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      size: Math.random() * 5 + 1,
      speedX: Math.random() * 3 - 1.5,
      speedY: Math.random() * 3 - 1.5,
      color: 'rgba(255, 255, 255, 0.7)',
    };
  }

  // Initialize particles
  initParticles() {
    for (let i = 0; i < 100; i++) {
      this.particlesArray.push(this.createParticle());
    }
  }

  // Handle particles movement and drawing
  handleParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particlesArray.length; i++) {
      let particle = this.particlesArray[i];

      // Draw the particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color;
      this.ctx.fill();

      // Move the particle
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Reposition particles if they move out of bounds
      if (particle.x < 0 || particle.x > this.canvas.width) {
        particle.x = Math.random() * this.canvas.width;
      }
      if (particle.y < 0 || particle.y > this.canvas.height) {
        particle.y = Math.random() * this.canvas.height;
      }

      // Mouse interaction - attract particles
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        particle.x += dx / 10;
        particle.y += dy / 10;
      }
    }
  }

  // Animation loop
  animateParticles() {
    this.handleParticles();
    requestAnimationFrame(this.animateParticles.bind(this));
  }
}
