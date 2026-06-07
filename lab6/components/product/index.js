export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
       const title = data?.title || '';
        const subtitle = data?.articleSubtitle || '';
        const src = data?.src || '';
        const fullText = data?.articleText || '';

        return `
            <div class="container py-5">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-md-10">
                        <!-- Кнопка возврата на главную страницу -->
                        <button id="back-btn" class="btn btn-link text-primary fw-bold text-decoration-none mb-4 p-0">
                            ← Назад
                        </button>

                        <h2 class="mb-4 text-dark">Просмотр / Редактирование карточки</h2>

                        <!-- Форма с полями ввода -->
                        <form id="product-form" class="bg-light p-4 rounded shadow-sm">

                            <div class="mb-3">
                                <label for="titleInput" class="form-label fw-bold">Название</label>
                                <input type="text" class="form-control" id="titleInput" value="${title}">
                            </div>

                            <div class="mb-3">
                                <label for="subtitleInput" class="form-label fw-bold">Подзаголовок</label>
                                <input type="text" class="form-control" id="subtitleInput" value="${subtitle}">
                            </div>

                            <div class="mb-3">
                                <label for="srcInput" class="form-label fw-bold">Ссылка на изображение</label>
                                <input type="text" class="form-control" id="srcInput" value="${src}">
                            </div>

                            <!-- Небольшой предпросмотр картинки, если ссылка существует -->
                            ${src ? `
                                <div class="mb-4">
                                    <img src="${src}" alt="Preview" class="img-thumbnail" style="max-height: 150px;">
                                </div>
                            ` : ''}

                            <div class="mb-3">
                                <label for="textInput" class="form-label fw-bold">Текст статьи</label>
                                <textarea class="form-control" id="textInput" rows="8">${fullText}</textarea>
                            </div>

                            <!-- Примечание: Кнопка "Сохранить" скрыта до 6-й лабораторной работы -->
                            <div class="alert alert-info mt-4" role="alert">
                                Режим просмотра формы. Сохранение данных будет доступно в следующей лабораторной.
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        `;
    }

     addListeners(clickListener) {
        document.getElementById(`back-btn`).onclick = clickListener;
    }

    render(data, clickListener) {
        const html = this.getHTML(data);
        this.parent.innerHTML = html;
        this.addListeners(clickListener);
    }
}
