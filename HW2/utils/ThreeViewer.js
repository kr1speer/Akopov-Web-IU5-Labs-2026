import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class ThreeViewer {
    constructor(container, modelPath, isInteractive = true) {
        this.container = container;
        this.modelPath = modelPath;
        this.isInteractive = isInteractive;
        this.init();
    }

    init() {
        const width  = this.container.clientWidth  || 800;
        const height = this.container.clientHeight || 500;

        // 1. Сцена, камера, рендерер
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf8f9fa);

        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        this.camera.position.set(0, 2, 5);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.container.appendChild(this.renderer.domElement);

        // 2. Свет
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        // 3. Управление камерой
        if (this.isInteractive) {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDamping = true;
        }

        // 4. Загрузка модели
        const loader = new GLTFLoader();
        loader.load(
            this.modelPath,
            (gltf) => {
                const model = gltf.scene;

                // Центрирование модели
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                model.position.x = -center.x;
                model.position.y = -box.min.y; // Ставим на "пол"
                model.position.z = -center.z;

                // Подгонка камеры
                const maxDim = Math.max(size.x, size.y, size.z);
                this.camera.position.z = maxDim * 2.5;
                this.camera.position.y = maxDim;
                this.camera.lookAt(0, maxDim / 2, 0);
                if (this.controls) this.controls.target.set(0, maxDim / 2, 0);

                this.scene.add(model);

                if (!this.isInteractive) {
                    this.renderer.render(this.scene, this.camera);
                }
            },
            undefined,
            (error) => console.error('Ошибка загрузки модели:', error)
        );

        // 5. Анимация
        if (this.isInteractive) {
            this.animate = this.animate.bind(this);
            this.animate();
        }

        // Обработка ресайза
        window.addEventListener('resize', () => {
            if (!this.container) return;
            this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
            if (!this.isInteractive) this.renderer.render(this.scene, this.camera);
        });
    }

    animate() {
        requestAnimationFrame(this.animate);
        if (this.controls) this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}
