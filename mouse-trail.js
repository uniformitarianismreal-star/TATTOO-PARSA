(function() {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.style.position = 'fixed';
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];

    function Particle(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 5 + 2;
        this.alpha = 1;
        this.color = color;
        this.dx = (Math.random() - 0.5) * 2;
        this.dy = (Math.random() - 0.5) * 2;
    }

    Particle.prototype.update = function() {
        this.x += this.dx;
        this.y += this.dy;
        this.alpha -= 0.02;
    }

    Particle.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
        ctx.fill();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p, i) => {
            p.update();
            if(p.alpha <= 0) particles.splice(i,1);
            else p.draw();
        });
        requestAnimationFrame(animate);
    }

    canvas.addEventListener('mousemove', (e) => {
        const colorChoice = Math.random() < 0.5 ? '57,255,20' : '255,105,180'; // سبز فسفری و صورتی
        particles.push(new Particle(e.clientX, e.clientY, colorChoice));
    });

    animate();

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
})();
