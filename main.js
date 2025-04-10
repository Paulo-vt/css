document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });
    
    elements.forEach(el => observer.observe(el));
});

const container = document.getElementById('distortion-container');
const width = window.innerWidth;
const height = window.innerHeight;
    
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 50;
    
const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true 
});
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);
    
const planeGeometry = new THREE.PlaneGeometry(width, height, 32, 32);
    
const material = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(width, height) },
        mousePos: { value: new THREE.Vector2(0.5, 0.5) },
        intensity: { value: 0.01 }
    },
    vertexShader: `
        varying vec2 vUv;
        uniform float time;
        uniform vec2 mousePos;
        uniform float intensity;
            
        void main() {
            vUv = uv;
                
            vec2 point = position.xy / vec2(${width.toFixed(1)}, ${height.toFixed(1)});
            float distance = length(point - mousePos);
                
            float wave = sin(distance * 10.0 - time) * intensity;
            wave *= smoothstep(0.5, 0.0, distance); // Limite l'effet aux points proches
                
            vec3 newPosition = position;
            newPosition.z += wave * 100.0;
                
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
    `,
    fragmentShader: `
        varying vec2 vUv;
            
        void main() {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
    `,
    transparent: true
});
    
const plane = new THREE.Mesh(planeGeometry, material);
scene.add(plane);
    
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
    
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / width;
    mouseY = 1 - (event.clientY / height);
});
    
const animate = () => {
    requestAnimationFrame(animate);
        
    targetX = mouseX;
    targetY = mouseY;
        
    material.uniforms.mousePos.value.x += (targetX - material.uniforms.mousePos.value.x) * 0.1;
    material.uniforms.mousePos.value.y += (targetY - material.uniforms.mousePos.value.y) * 0.1;
    material.uniforms.time.value += 0.01;
        
    renderer.render(scene, camera);
};
    
animate();
    
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
        
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
        
    renderer.setSize(newWidth, newHeight);
    material.uniforms.resolution.value.set(newWidth, newHeight);
});
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    elements.forEach(el => observer.observe(el));
});

const container = document.getElementById('distortion-container');
const width = window.innerWidth;
const height = window.innerHeight;
    
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 50;
    
const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true 
});
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);
    
const planeGeometry = new THREE.PlaneGeometry(width, height, 32, 32);
    
const material = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(width, height) },
        mousePos: { value: new THREE.Vector2(0.5, 0.5) },
        intensity: { value: 0.01 }
    },
    vertexShader: `
        varying vec2 vUv;
        uniform float time;
        uniform vec2 mousePos;
        uniform float intensity;
            
        void main() {
            vUv = uv;
                
            vec2 point = position.xy / vec2(${width.toFixed(1)}, ${height.toFixed(1)});
            float distance = length(point - mousePos);
                
            float wave = sin(distance * 10.0 - time) * intensity;
            wave *= smoothstep(0.5, 0.0, distance); // Limite l'effet aux points proches
                
            vec3 newPosition = position;
            newPosition.z += wave * 100.0;
                
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
    `,
    fragmentShader: `
        varying vec2 vUv;
            
        void main() {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
    `,
    transparent: true
});
    
const plane = new THREE.Mesh(planeGeometry, material);
scene.add(plane);
    
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
    
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / width;
    mouseY = 1 - (event.clientY / height);
});
    
const animate = () => {
    requestAnimationFrame(animate);
        
    targetX = mouseX;
    targetY = mouseY;
        
    material.uniforms.mousePos.value.x += (targetX - material.uniforms.mousePos.value.x) * 0.1;
    material.uniforms.mousePos.value.y += (targetY - material.uniforms.mousePos.value.y) * 0.1;
    material.uniforms.time.value += 0.01;
        
    renderer.render(scene, camera);
};
    
animate();
    
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
        
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
        
    renderer.setSize(newWidth, newHeight);
    material.uniforms.resolution.value.set(newWidth, newHeight);
});
