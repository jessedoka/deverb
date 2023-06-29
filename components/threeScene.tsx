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
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });

        renderer.setSize(window.innerWidth, window.innerHeight);

        const geometry = new THREE.BoxGeometry(2.5, 0.1, 1.5);
        const material = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
        const base = new THREE.Mesh(geometry, material);

        const screenGeometry = new THREE.BoxGeometry(1.4, 0.08, 0.08);
        const screenMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.set(0, 0.08, 0.7);
        base.add(screen);

        const keyboardGeometry = new THREE.BoxGeometry(2.4, 0.01, 1.2);
        const keyboardMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
        keyboard.position.set(0, -0.055, 0);
        base.add(keyboard);

        scene.add(base);
        camera.position.z = 5;

        // Render the scene
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate the cube
            base.rotation.x += 0.01;
            base.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        animate();

        // Clean up Three.js resources on component unmount
        return () => {
            renderer.dispose();
            scene.remove(base);
        };
    }, []);

    return <canvas ref={canvasRef} />;
};
