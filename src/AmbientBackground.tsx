import React, { useEffect, useRef } from 'react';

const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Constants
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
    const getParticleCount = () => clamp(Math.round((window.innerWidth * window.innerHeight) / 1_000_000 * 145), 50, 300);
    const particlePropCount = 9;
    let particleCount = getParticleCount();
    let particlePropsLength = particleCount * particlePropCount;
    const baseTTL = 100;
    const rangeTTL = 500;
    const baseSpeed = 0.1;
    const rangeSpeed = 1;
    const baseSize = 2;
    const rangeSize = 15;
    const baseHue = 20;
    const rangeHue = 30;
    const lightBackgroundColor = 'hsla(0,0%,100%,1)';
    const darkBackgroundColor = 'hsla(60,50%,3%,1)';
    // Variables
    let canvas: { a: HTMLCanvasElement; b: HTMLCanvasElement };
    let ctx: { a: CanvasRenderingContext2D; b: CanvasRenderingContext2D };
    let particleProps: Float32Array;
    let animationId: number;

    // Function to get current background color based on theme
    const getCurrentBackgroundColor = () => {
      return document.body.classList.contains('dark-mode') ? darkBackgroundColor : lightBackgroundColor;
    };

    // Utility functions
    const rand = (n: number) => Math.random() * n;
    const cos = (n: number) => Math.cos(n);
    const sin = (n: number) => Math.sin(n);
    const TAU = 2 * Math.PI;
    const fadeInOut = (life: number, ttl: number) => {
      const half = ttl * 0.5;
      return life < half ? life / half : 1 - (life - half) / half;
    };

    function createCanvas() {
      canvas = {
        a: document.createElement('canvas'),
        b: canvasRef.current!
      };
      canvas.b.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
      `;
      ctx = {
        a: canvas.a.getContext('2d')!,
        b: canvas.b.getContext('2d')!
      };
    }

    function resize() {
      const { innerWidth, innerHeight } = window;
      
      canvas.a.width = innerWidth;
      canvas.a.height = innerHeight;

      ctx.a.drawImage(canvas.b, 0, 0);

      canvas.b.width = innerWidth;
      canvas.b.height = innerHeight;
      
      ctx.b.drawImage(canvas.a, 0, 0);

    }

    function initParticles() {
      particleProps = new Float32Array(particlePropsLength);

      let i;
      
      for (i = 0; i < particlePropsLength; i += particlePropCount) {
        initParticle(i);
      }
    }

    function initParticle(i: number) {
      let x: number, y: number, vx: number, vy: number, life: number, ttl: number, speed: number, size: number, hue: number;

      x = rand(canvas.a.width);
      y = rand(canvas.a.height);
      const theta = rand(TAU);
      vx = cos(theta);
      vy = sin(theta);
      life = 0;
      ttl = baseTTL + rand(rangeTTL);
      speed = baseSpeed + rand(rangeSpeed);
      size = baseSize + rand(rangeSize);
      hue = baseHue + rand(rangeHue);

      particleProps.set([x, y, vx, vy, life, ttl, speed, size, hue], i);
    }

    function drawParticle(x: number, y: number, theta: number, life: number, ttl: number, size: number, hue: number) {
      let xRel = x - (0.5 * size), yRel = y - (0.5 * size);
      
      ctx.a.save();
      ctx.a.lineCap = 'round';
      ctx.a.lineWidth = 1;
      ctx.a.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
      ctx.a.beginPath();
      ctx.a.translate(xRel, yRel);
      ctx.a.rotate(theta);
      ctx.a.translate(-xRel, -yRel);
      ctx.a.strokeRect(xRel, yRel, size, size);
      ctx.a.closePath();
      ctx.a.restore();
    }

    function updateParticle(i: number) {
      let i2=1+i, i3=2+i, i4=3+i, i5=4+i, i6=5+i, i7=6+i, i8=7+i, i9=8+i;
      let x: number, y: number, vx: number, vy: number, life: number, ttl: number, speed: number, x2: number, y2: number, size: number, hue: number;

      x = particleProps[i];
      y = particleProps[i2];
      vx = particleProps[i3];
      vy = particleProps[i4];
      life = particleProps[i5];
      ttl = particleProps[i6];
      speed = particleProps[i7];
      size = particleProps[i8];
      hue = particleProps[i9];

      const drift = (Math.random() - 0.5) * 0.08;
      const currentAngle = Math.atan2(vy, vx) + drift;
      vx = cos(currentAngle);
      vy = sin(currentAngle);

      x2 = x + vx * speed;
      y2 = y + vy * speed;

      const theta = currentAngle;
      drawParticle(x, y, theta, life, ttl, size, hue);

      life++;

      particleProps[i] = x2;
      particleProps[i2] = y2;
      particleProps[i3] = vx;
      particleProps[i4] = vy;
      particleProps[i5] = life;

      const margin = size;
      if (x2 < -margin) particleProps[i] = canvas.a.width + margin;
      if (x2 > canvas.a.width + margin) particleProps[i] = -margin;
      if (y2 < -margin) particleProps[i2] = canvas.a.height + margin;
      if (y2 > canvas.a.height + margin) particleProps[i2] = -margin;

      if (life > ttl) {
        initParticle(i);
      }
    }

    function drawParticles() {
      let i;

      for (i = 0; i < particlePropsLength; i += particlePropCount) {
        updateParticle(i);
      }
    }

    function renderGlow() {
      ctx.b.save();
      ctx.b.filter = 'blur(8px) brightness(200%)';
      ctx.b.globalCompositeOperation = 'source-over';
      ctx.b.drawImage(canvas.a, 0, 0);
      ctx.b.restore();

      ctx.b.save();
      ctx.b.filter = 'blur(4px) brightness(200%)';
      ctx.b.globalCompositeOperation = 'source-over';
      ctx.b.drawImage(canvas.a, 0, 0);
      ctx.b.restore();
    }

    function render() {
      ctx.b.save();
      ctx.b.globalCompositeOperation = 'source-over';
      ctx.b.drawImage(canvas.a, 0, 0);
      ctx.b.restore();
    }

    function draw() {

      ctx.a.clearRect(0, 0, canvas.a.width, canvas.a.height);

      ctx.b.fillStyle = getCurrentBackgroundColor();
      ctx.b.fillRect(0, 0, canvas.a.width, canvas.a.height);

      drawParticles();
      renderGlow();
      render();

      animationId = window.requestAnimationFrame(draw);
    }

    createCanvas();
    resize();
    initParticles();
    draw();

    let resizeTimeout: number;
    const handleResize = () => {
      resize();
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        const newCount = getParticleCount();
        if (newCount !== particleCount) {
          particleCount = newCount;
          particlePropsLength = particleCount * particlePropCount;
          initParticles();
        }
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        window.cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default AmbientBackground; 