'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        if (!canvasRef.current) {
            console.log('Canvas element not found');
            return;
        }

        // Set up the Three.js scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(110, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });

        renderer.setSize(window.innerWidth, window.innerHeight);

        const geometry = new THREE.BoxGeometry(2.5, 0.1, 1.5);
        const material = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
        const base = new THREE.Mesh(geometry, material);

        const backscreenGeometry = new THREE.BoxGeometry(2.5, 0.1, 1.5);
        const backscreenMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
        const backscreen = new THREE.Mesh(backscreenGeometry, backscreenMaterial);
        backscreen.position.set(0, 0.7, 0.5);
        backscreen.rotation.x = 1.2; 
        base.add(backscreen);

        const screenGeometry = new THREE.BoxGeometry(2.4, 0.01, 1.2);
        const screenMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.set(0, 0.7, 0.45); 
        screen.rotation.x = 1.2; 
        base.add(screen);

        const keyboardGeometry = new THREE.BoxGeometry(2.4, 0.1, 1.2);
        const keyboardMaterial = new THREE.MeshBasicMaterial({ color: 0xc9c9c9 });
        const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
        keyboard.position.set(0, 0.055, 0);
        base.add(keyboard);

        // keyboard keys
        const keyGeometry = new THREE.BoxGeometry(0.1, 0.01, 0.1);
        const keyMaterial = new THREE.MeshBasicMaterial({ color: 0x000001 });
        const key1 = new THREE.Mesh(keyGeometry, keyMaterial);
        key1.position.set(-0.9, 0.055, 0.5);
        base.add(key1);


        scene.add(base);
        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);

            base.rotation.x += 0.01;
            base.rotation.y += 0.01;
            // screen.rotation.x += 0.1;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            renderer.dispose();
            scene.remove(base);
        };
    }, []);

    return <canvas ref={canvasRef} />;
};
