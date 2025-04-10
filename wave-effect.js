document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    
    document.body.appendChild(canvas);
    
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    
    const waves = [];
    
    class Wave {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.maxRadius = Math.random() * 100 + 50;
            this.speed = Math.random() * 2 + 1;
            this.opacity = 1;
            
            const colors = ['#ff50bc', '#3399ff', '#33cc33', '#ff9900'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.radius += this.speed;
            
            this.opacity = 1 - (this.radius / this.maxRadius);
            
            return this.radius < this.maxRadius;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.strokeStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
    }
    
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (Math.random() > 0.8) {
            waves.push(new Wave(mouseX, mouseY));
        }
    });
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < waves.length; i++) {
            if (!waves[i].update()) {
                waves.splice(i, 1);
                i--;
                continue;
            }
            waves[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
});
