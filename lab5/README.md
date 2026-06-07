# Отчет по лабораторной работе №5: «Взаимодействие с внешним API через XMLHttpRequest (AJAX)»

**Дисциплина:** Проектирование сетевых приложений  
**Студент:** Акопов А. А. (Группа ИУ5-42Б)  
**Предметная область:** Заказ на постройку самолета (Boeing), оптимизация полетных данных и техническое обслуживание авиационного флота. Услуги/карточки — инженерные задачи бортового компьютера (сборка позывных, очистка логов, группировка бортов).

---

## 1. Цель работы

Изучение и практическое освоение механизмов асинхронного взаимодействия клиентской части веб-приложения с внешним REST API с использованием объекта `XMLHttpRequest` (технология AJAX). Формирование навыков построения архитектуры Single Page Application (SPA), изоляции сетевого слоя приложения, динамического обновления интерфейса на основе данных от бэкенда и синхронизации параллельных асинхронных запросов.

## 2. Содержание

1. [Цель работы](#1-цель-работы)
2. [Содержание](#2-содержание)
3. [Задание](#3-задание)
   
    3.1. [Основное задание ](#31-основное-задание)
   
4. [Теория и реализация (Примеры из кода)](#4-теория-и-реализация-примеры-из-кода)

    4.1. [Изоляция сетевого слоя: класс Ajax](#41-изоляция-сетевого-слоя-класс-ajax)
   
    4.2. [Централизованное управление эндпоинтами: класс StockUrls](#42-централизованное-управление-эндпоинтами-класс-stockurls)
   
    4.3. [Компонентный подход в UI: ProductCardComponent](#43-компонентный-подход-в-ui-productcardcomponent)
   
    4.4. [Политика CORS и её преодоление в Dev-режиме](#44-политика-cors-и-её-преодоление-в-dev-режиме)
   
5. [Вывод](#5-вывод)

---

## 3. Задание

### 3.1. Основное задание 

1. **Главная страница:** Перевести интерфейс интерактивного калькулятора комплектации и списка инженерных задач Boeing на динамическое получение данных. На этапе инициализации страницы отправлять асинхронный `GET` запрос к серверу Express (разработанному в ЛР №4), получать актуальный массив карточек задач и динамически рендерить их в интерфейсе.
2. **Вторая страница:** Реализовать детальный просмотр информации по выбранной карточке самолета/задачи по её уникальному идентификатору (ID). Разработать интерактивную форму редактирования параметров карточки (Название, Описание задачи, Тип уровня). Изменения должны отправляться на бэкенд посредством асинхронного `PATCH` запроса с последующим обновлением UI.

---

## 4. Теория и реализация (Примеры из кода)

### 4.1. Изоляция сетевого слоя: класс Ajax

**Теория:** Написание низкоуровневого кода управления `XMLHttpRequest` непосредственно внутри UI-компонентов или контроллеров страниц приводит к сильной связанности кода и нарушает принцип единственной ответственности (Single Responsibility Principle). Для isolation сетевых протоколов был разработан вспомогательный сервисный класс в файле `ajax.js`. Он инкапсулирует конфигурацию запросов, установку обязательных заголовков (например, `Content-Type: application/json` для отправки данных) и безопасную обработку ответов.

**Пример реализации методов в файле `ajax.js`:**

```javascript
class Ajax {
    get(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    patch(url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('PATCH', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    _handleResponse(xhr, callback) {
        let data = null;
        try {
            data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
        } catch (e) {
            console.error('Реальная ошибка парсинга JSON:', e);
            callback(null, xhr.status);
            return;
        }
        callback(data, xhr.status);
    }
}

export const ajax = new Ajax();
```

### 4.2. Централизованное управление эндпоинтами: класс StockUrls

Для исключения жестко прописанных путей (hardcode) по всему приложению, адреса эндпоинтов бэкенд-сервера вынесены в класс `StockUrls` в файле `stockUrls.js`.

```javascript
class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getStocks() { return `${this.baseUrl}/stocks`; }
    getStockById(id) { return `${this.baseUrl}/stocks/${id}`; }
    updateStockById(id) { return `${this.baseUrl}/stocks/${id}`; }
}

export const stockUrls = new StockUrls();
```
### 4.3. Компонентный подход в UI: ProductCardComponent

**Теория:** Интерфейс приложения строится по компонентному принципу. Страница выступает координатором жизненного цикла: инициирует очистку корневого элемента, вызывает сетевой метод `ajax.get()`, получает данные и делегирует их рендеринг специализированным UI-компонентам, таким как `ProductCardComponent` из файла `ProductCardComponent.js`.

```javascript
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
                    <div class="mt-auto d-flex flex-column gap-2">
                        <button class="btn btn-outline-light btn-sm flex-grow-1" id="task-btn-${data.id}" data-id="${data.id}">
                            Выполнить операцию
                        </button>
                        <button class="btn btn-outline-light btn-sm flex-grow-1" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                    </div>
                </div>
            </div>`;
    }

    addListeners(data, clickListener, taskListener) {
        document.getElementById(`click-card-${data.id}`).onclick = clickListener;
        document.getElementById(`task-btn-${data.id}`).onclick = taskListener;
    }
}
```
### 4.4. Политика CORS и её преодоление в Dev-режиме

**Теория:** Браузерная политика ограничения одинакового источника (Same-Origin Policy) по умолчанию блокирует скрипты, загруженные с локального сервера разработки фронтенда (например, Live Server на порту 5500), от выполнения запросов к бэкенду на другом порту (localhost:3000).

Для тестирования приложения в режиме разработки без переконфигурирования заголовков продакшн-сервера использовалось расширение браузера `CORS Unblock`. Оно динамически перехватывает запросы и добавляет в HTTP-ответы заголовки `Access-Control-Allow-Origin: *`. Также расширение берет на себя обработку сложных предзапросов метода `OPTIONS` (preflight requests), которые браузер отправляет автоматически перед отправкой `PATCH` или `POST` запросов с заголовком `Content-Type: application/json`.

## 5. Вывод

В ходе выполнения лабораторной работы №5 были успешно освоены технологии построения динамических клиент-серверных веб-приложений:

* **Статическая бизнес-логика** калькулятора комплектации Boeing была полностью переведена на динамические рельсы с получением данных из бэкенд-сервера Express.js.
* **Реализован чистый сетевой модуль** `ajax.js`, абстрагирующий UI-компоненты от деталей реализации транспортного протокола HTTP (`XMLHttpRequest`).
* **Применен компонентный подход** (`ProductCardComponent`) для декларативного рендеринга и связывания обработчиков событий DOM на основе динамических массивов JSON.
* **Изучены проблемы междоменных запросов (CORS)** и способы их отладки в режиме разработки.
