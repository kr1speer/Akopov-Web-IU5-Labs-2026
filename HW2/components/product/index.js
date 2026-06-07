import { ThreeViewer } from '../../utils/ThreeViewer.js'; // Проверьте путь до файла ThreeViewer.js

export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const subtitle = data.articleSubtitle || data.type;
        const fullText = data.articleText || `<p>${data.text}</p>`;

        return `
            <div class="container py-5">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-md-10">
                        <button id="back-btn" class="btn btn-link text-primary fw-bold text-decoration-none mb-4 p-0">
                            ← Назад
                        </button>
                        <h1 class="display-4 fw-bolder mb-3 text-dark">${data.title}</h1>
                        <p class="lead text-secondary mb-5 fs-4">${subtitle}</p>
                    </div>
                </div>

                <div class="row justify-content-center mb-5">
                    <div class="col-lg-10">
                        <img src="${data.src}" alt="${data.title}" class="img-fluid w-100 rounded-1 shadow-sm" style="max-height: 650px; object-fit: cover;">
                    </div>
                </div>

                ${data.model ? `
                <div class="row justify-content-center mb-5">
                    <div class="col-lg-10">
                        <h4 class="fw-bold mb-3 text-secondary">Интерактивная 3D-модель:</h4>
                        <div id="model-3d-container" class="rounded-1 shadow-sm border"
                             style="height: 500px; width: 100%; background-color: #f8f9fa;">
                        </div>
                    </div>
                </div>
                ` : ''}

                <div class="row justify-content-center pb-5">
                    <div class="col-lg-8 col-md-10">
                        <div class="article-content fs-5 text-dark lh-lg">
                            ${fullText}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(clickListener) {
        document.getElementById(`back-btn`).onclick = clickListener;
    }

    render(data, clickListener) {
        this.parent.innerHTML = this.getHTML(data);
        this.addListeners(clickListener);

        if (data.model) {
            requestAnimationFrame(() => {
                const container = document.getElementById('model-3d-container');
                if (container) {
                    new ThreeViewer(container, data.model, true);
                }
            });
        }
    }
}
