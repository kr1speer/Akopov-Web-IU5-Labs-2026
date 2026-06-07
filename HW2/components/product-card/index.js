export class ProductCardComponent {
    constructor(parent) { this.parent = parent; }

    getHTML(data) {
        return `
            <div class="card h-100 border-0 shadow rounded-3 text-white" style="background-color: #001D4A;">
                <div class="ratio ratio-16x9 rounded-top-3 overflow-hidden">
                    <img src="${data.src}" class="card-img-top object-fit-cover">
                </div>
                <div class="card-body d-flex flex-column p-4">
                    <h5 class="card-title fw-bold mb-1">${data.title}</h5>
                    <p class="text-white-50 small mb-2">${data.type}</p>
                    <p class="card-text small mb-3" style="min-height: 60px;">${data.text}</p>

                    <div id="result-${data.id}" class="p-2 mb-3 rounded bg-white bg-opacity-10 small text-white border-info d-none">
                        <p> Данные: <span class="data-value"></span></p>
                        <p> Результат: <span class="res-value"></span></p>
                    </div>

                    <div class="mt-auto d-flex flex-column gap-2">
                        <button class="btn btn-outline-light btn-sm flex-grow-1" id="task-btn-${data.id}" data-id="${data.id}">
                            Выполнить операцию
                        </button>
                        <div class="d-flex gap-2">
                            <button class="btn btn-outline-light btn-sm flex-grow-1" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    addListeners(data, clickListener, taskListener) {
        document.getElementById(`click-card-${data.id}`).onclick = clickListener;
        document.getElementById(`task-btn-${data.id}`).onclick = taskListener;
    }

    render(data, clickListener, taskListener) {
        this.parent.innerHTML = this.getHTML(data);
        this.addListeners(data, clickListener, taskListener);

        if (data.model) {
        console.log("Пытаюсь загрузить модель по пути:", data.model); // ПРОВЕРКА В КОНСОЛИ
        const container = document.getElementById('model-3d-container');
        if (container) {
            try {
                // Создаем вьювер
                const viewer = new ThreeViewer(container, data.model, true);
            } catch (e) {
                console.error("Ошибка при запуске Three.js:", e);
            }
        }
    }
    }
}
