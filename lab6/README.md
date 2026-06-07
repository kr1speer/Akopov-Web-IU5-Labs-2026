# Отчет по лабораторной работе №6: «Использование Promises и Fetch API. Сборка и интеграция Fullstack-приложения через Vite и Express»

**Дисциплина:** Проектирование сетевых приложений  
**Студент:** Акопов А. А. (Группа ИУ5-42Б)  
**Предметная область:** Заказ на постройку самолета (Boeing), оптимизация полетных данных и техническое обслуживание авиационного флота. Услуги/карточки — инженерные задачи бортового компьютера (сборка позывных, очистка логов, группировка бортов).

---

## 1. Цель работы

Изучение и практическое освоение современных стандартов асинхронного взаимодействия в JavaScript с использованием `Fetch API` и `Promises` (`async/await`). Модернизация сетевого слоя приложения, интеграция фронтенд-части с бэкенд-сервером на `Express.js` в единый fullstack-проект, а также освоение инструментов автоматизации сборки клиентского кода с помощью `Vite`. Ликвидация проблем междоменных запросов (CORS) за счет раздачи статики сервером.

## 2. Содержание

1. [Цель работы](#1-цель-работы)
2. [Содержание](#2-содержание)
3. [Задание](#3-задание)  
4. [Теория и реализация (Примеры из кода)](#4-теория-и-реализация-примеры-из-кода)  
   4.1. [Модернизация сетевого слоя: Fetch API и async/await](#41-модернизация-сетевого-слоя-fetch-api-и-asyncawait)  
   4.2. [Конфигурация сборщика Vite](#42-конфигурация-сборщика-vite)  
   4.3. [Интеграция на сервере и раздача статики](#43-интеграция-на-сервере-и-раздача-статики)  
   4.4. [Централизованные эндпоинты в Fullstack-режиме](#44-централизованные-эндпоинты-в-fullstack-режиме)  
5. [Вывод](#5-вывод)

---

## 3. Задание

1. **Модернизация сетевого модуля:** Переписать созданный в ЛР №5 сетевой класс `Ajax` с технологии `XMLHttpRequest` на современный `Fetch API`. Полностью избавиться от колбэков, заменив их на промисы и синтаксический сахар `async/await`.
2. **Сборка проекта через Vite:** Настроить систему сборки `Vite` для компиляции, минификации и оптимизации клиентского кода (HTML, CSS, JS) фронтенда. Выходной директорией сборки назначить папку `public` внутри серверной части.
3. **Объединение фронтенда и бэкенда:** Интегрировать собранный клиентский код в серверную часть на `Express.js`. Настроить сервер для раздачи скомпилированных файлов как статического контента, решив тем самым проблему CORS-ограничений без сторонних браузерных расширений.

---

## 4. Теория и реализация (Примеры из кода)

### 4.1. Модернизация сетевого слоя: Fetch API и async/await

**Теория:** Использование `XMLHttpRequest` приводит к сильной вложенности кода (Callback Hell) при сложной логике запросов. `Fetch API` предоставляет более чистый интерфейс, основанный на механизме `Promises`. Внедрение ключевых слов `async/await` позволяет писать асинхронный код в синхронном (линейном) стиле, что существенно повышает его читаемость и упрощает отладку.

```javascript
// ajax.js
class Ajax {
    async get(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('Ошибка GET запроса:', error);
            return null;
        }
    }

    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('Ошибка POST запроса:', error);
            return null;
        }
    }

    async patch(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('Ошибка PATCH запроса:', error);
            return null;
        }
    }

    async delete(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE'
            });
            if (response.ok) {
                return true;
            }
            return false;
        } catch (error) {
            console.error('Ошибка DELETE запроса:', error);
            return false;
        }
    }
}

export const ajax = new Ajax();
```
### 4.2. Конфигурация сборщика Vite

**Теория:** Инструменты сборки (Bundlers) необходимы для подготовки кода к Production-режиму. `Vite` выполняет объединение модулей, минификацию кода и оптимизацию ресурсов. Для бесшовной интеграции с бэкендом в файле конфигурации был изменен стандартный путь вывода скомпилированных файлов.

```javascript
// vite.config.js
export default {
    build: {
        outDir: './public',
        emptyOutDir: true,
    },
};
```
### 4.3. Интеграция на сервере и раздача статики

**Теория:** Междоменные запросы блокируются браузером, если фронтенд и бэкенд запущены на разных портах (`Same-Origin Policy`). При объединении кодовой базы сервер `Express.js` берет на себя роль поставщика статических файлов. С помощью встроенного middleware `express.static` папка `public` (куда Vite складывает билд) объявляется корневой для статики, благодаря чему приложение работает на едином домене и порту, полностью аннулируя CORS-проблемы.

```javascript
// index2.js
const express = require('express');
const path = require('path');
const stocksRouter = require('./routes/stocks');
const stocksService = require('./services/stocksService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data/stocks.json');
stocksService.init(DATA_FILE_PATH);

// Встроенный middleware для парсинга JSON
app.use(express.json());

// Логирующий middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Раздача статического контента фронтенда из папки public
app.use(express.static(path.join(__dirname, '..', 'public')));

// Подключение API маршрутов
app.use('/stocks', stocksRouter);

// Глобальная обработка 404
app.use((req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

// Централизованный обработчик ошибок
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});
```
### 4.4. Централизованные эндпоинты в Fullstack-режиме

Поскольку клиентская часть теперь загружается непосредственно с самого сервера `Express`, отпадает необходимость жестко прописывать адрес хоста (`http://localhost:3000`) в сетевых путях. Значение `baseUrl` изменяется на относительный (пустой) путь `''`. Браузер автоматически подставляет текущий домен отправки.

```javascript
// stockUrls.js
class StockUrls {
    constructor() {
        this.baseUrl = '';
    }

    getStocks() {
        return `${this.baseUrl}/stocks`;
    }

    getStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/stocks`;
    }

    removeStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    updateStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }
}

export const stockUrls = new StockUrls();
```
## 5. Вывод

В ходе выполнения лабораторной работы №6 архитектура веб-приложения была успешно модернизирована и приведена к современным стандартам Fullstack-разработки:

* **Асинхронное взаимодействие** полностью переведено на рельсы `Fetch API` и `Promises`, что позволило избавиться от вложенных колбэков, сделав код сетевого слоя (`ajax.js`) линейным, безопасным и легко читаемым за счет конструкции `async/await`.
* **Освоена интеграция** профессиональной системы автоматизации сборки `Vite`, выполнена оптимизация и минификация исходных файлов фронтенда для Production-окружения.
* **Произведено слияние** фронтенд и бэкенд частей проекта в единую монолитную структуру. Сервер `Express.js` был успешно сконфигурирован на раздачу скомпилированных файлов в качестве статического контента (`express.static`).
* **Полностью ликвидирована проблема CORS-блокировок** на клиенте без использования проксирующих плагинов. Веб-страницы интерфейса и данные REST API запрашиваются из одного источника (`Same-Origin`: домен `localhost`, порт `3000`), отвечая всем политикам безопасности современных браузеров.
