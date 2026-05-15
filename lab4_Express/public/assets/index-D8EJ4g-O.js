var e=(e,t)=>()=>(e&&(t=e(e=0)),t),t=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n,r=e((()=>{n=[{id:1,title:`Задание 1.1: Сборка позывного`,src:`./assets/plane1.jpeg`,text:`Функция concatenate: склейка массива данных о рейсе (номер, пункт, статус) через разделитель для формирования полетной ведомости.`,type:`Уровень 1`,articleSubtitle:`Инновации в сборке полетных данных и оптимизация процессов навигации для флота 737 MAX.`,articleText:`
            <p>В современной авиации скорость и точность передачи телеметрических данных имеют критическое значение. Наша новая система формирования позывных позволяет сократить время отклика бортового компьютера на 15%, обеспечивая пилотов актуальной информацией в режиме реального времени.</p>

            <h4 class="fw-bold mt-5 mb-3">Инженерный подход к проблеме</h4>
            <p>Инженеры Boeing разработали алгоритм склейки массивов данных, который работает без сбоев даже в условиях пиковых нагрузок. Это первый шаг к полной автоматизации обмена сообщениями между диспетчерской вышкой и бортом.</p>

            <p>Использование передовых методов обработки строк (функция <code>concatenate</code>) открывает новые горизонты для масштабирования систем безопасности. Внедрение этого алгоритма запланировано на следующий квартал.</p>
        `},{id:2,title:`Задание 1.10: Очистка логов`,src:`./assets/plane2.jpeg`,text:`Функция erase: удаление пустых записей и ошибок (null, undefined, 0) из диагностической системы бортового компьютера.`,type:`Уровень 1`,articleSubtitle:`Повышение надежности анализа данных двигателя GEnx-1B за счет интеллектуальной фильтрации шумов.`,articleText:`
            <p>Система мониторинга здоровья самолета (AHM) на борту 787 Dreamliner генерирует тысячи записей в секунду. Однако при передаче данных через спутник могут возникать пустые пакеты или ошибки инициализации сенсоров.</p>

            <h4 class="fw-bold mt-5 mb-3">Чистота данных — залог безопасности</h4>
            <p>Наша инженерная группа внедрила алгоритм <code>erase</code>, который в реальном времени очищает поток данных от значений <code>null</code>, <code>undefined</code> и некорректных нулевых показателей. Это позволяет наземным службам получать только валидную информацию, исключая ложные срабатывания тревоги.</p>

            <p>Оптимизация позволила снизить объем передаваемого трафика на 12%, что критически важно для трансатлантических перелетов, где пропускная способность связи ограничена.</p>
        `},{id:3,title:`Задание 2.2: Группировка бортов`,src:`./assets/plane3.jpeg`,text:`Сворачивание серийных номеров двигателей в диапазоны для краткого отчета технической службы.`,type:`Уровень 2`,articleSubtitle:`Цифровая трансформация логистических цепочек при сборке самого длинного композитного крыла в мире.`,articleText:`
            <p>При производстве Boeing 777X используются тысячи уникальных крепежных элементов и панелей. Традиционные методы ведения списков серийных номеров приводили к созданию документов на сотни страниц, что замедляло проверку качества.</p>

            <h4 class="fw-bold mt-5 mb-3">Алгоритм сжатия отчетности</h4>
            <p>Разработанная функция преобразования числовых массивов в диапазоны позволяет представить список из ста последовательных деталей (например, [101, 102, 103...]) в виде краткой записи "101-200".</p>

            <p>Это нововведение внедрило стандарт "Zero-Paper" на заводе в Эверетте. Теперь инспекторы тратят на сверку узлов на 40% меньше времени, что ускоряет финальную сборку каждого борта.</p>
        `},{id:4,title:`Задание 3.2: Инверсия очереди`,src:`./assets/plane4.png`,text:`Функция inverse: изменение приоритета вылета самолетов в очереди на ВПП с учетом задержки первых бортов.`,type:`Уровень 3`,articleSubtitle:`Адаптивные алгоритмы распределения слотов для обеспечения бесперебойной работы грузового флота 747-8F.`,articleText:`
            <p>Управление очередью на взлет — это сложная математическая задача, особенно когда речь идет о тяжелых грузовых самолетах, требующих больших дистанций разделения. Внезапное изменение погодных условий часто требует полной реорганизации полетного плана.</p>

            <h4 class="fw-bold mt-5 mb-3">Гибкость в каждой секунде</h4>
            <p>Алгоритм <code>inverse</code> с поддержкой смещения (offset) позволяет диспетчерам мгновенно менять порядок вылета хвоста очереди, оставляя приоритетные борта (например, с медицинскими грузами) на своих местах.</p>

            <p>Такая математическая модель обеспечивает максимальную пропускную способность ВПП даже в условиях плотного трафика. Система уже проходит тестирование в крупнейших логистических хабах мира.</p>
        `}]})),i,a=e((()=>{i=class{constructor(e){this.parent=e}getHTML(e){return`
            <div class="card h-100 border-0 shadow rounded-3 text-white" style="background-color: #001D4A;">
                <div class="ratio ratio-16x9 rounded-top-3 overflow-hidden">
                    <img src="${e.src}" class="card-img-top object-fit-cover">
                </div>
                <div class="card-body d-flex flex-column p-4">
                    <h5 class="card-title fw-bold mb-1">${e.title}</h5>
                    <p class="text-white-50 small mb-2">${e.type}</p>
                    <p class="card-text small mb-3" style="min-height: 60px;">${e.text}</p>

                    <div id="result-${e.id}" class="p-2 mb-3 rounded bg-white bg-opacity-10 small text-white border-info d-none">
                        <p> Данные: <span class="data-value"></span></p>
                        <p> Результат: <span class="res-value"></span></p>
                    </div>

                    <div class="mt-auto d-flex flex-column gap-2">
                        <button class="btn btn-outline-light btn-sm flex-grow-1" id="task-btn-${e.id}" data-id="${e.id}">
                            Выполнить операцию
                        </button>
                        <div class="d-flex gap-2">
                            <button class="btn btn-outline-light btn-sm flex-grow-1" id="click-card-${e.id}" data-id="${e.id}">Подробнее</button>
                        </div>
                    </div>
                </div>
            </div>`}addListeners(e,t,n){document.getElementById(`click-card-${e.id}`).onclick=t,document.getElementById(`task-btn-${e.id}`).onclick=n}render(e,t,n){this.parent.innerHTML=this.getHTML(e),this.addListeners(e,t,n)}}})),o,s=e((()=>{o=class{constructor(e){this.parent=e}getHTML(e){let t=e.articleSubtitle||e.type,n=e.articleText||`<p>${e.text}</p>`;return`
            <div class="container py-5">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-md-10">
                        <button id="back-btn" class="btn btn-link text-primary fw-bold text-decoration-none mb-4 p-0">
                            ← Назад
                        </button>

                        <h1 class="display-4 fw-bolder mb-3 text-dark" style="letter-spacing: -1px;">
                            ${e.title}
                        </h1>

                        <p class="lead text-secondary mb-5 fs-4 lh-sm">
                            ${t}
                        </p>
                    </div>
                </div>

                <div class="row justify-content-center mb-5">
                    <div class="col-lg-10">
                        <img src="${e.src}" alt="${e.title}" class="img-fluid w-100 rounded-1 shadow-sm" style="max-height: 650px; object-fit: cover;">
                    </div>
                </div>

                <div class="row justify-content-center pb-5">
                    <div class="col-lg-8 col-md-10">
                        <div class="article-content fs-5 text-dark lh-lg">
                            ${n}
                        </div>
                    </div>
                </div>
            </div>
        `}addListeners(e){document.getElementById(`back-btn`).onclick=e}render(e,t){let n=this.getHTML(e);this.parent.innerHTML=n,this.addListeners(t)}}})),c,l=e((()=>{r(),d(),s(),c=class{constructor(e,t){this.parent=e,this.id=t}clickCard(){new u(this.parent).render()}render(){this.parent.innerHTML=``;let e=n.find(e=>e.id===this.id);e&&new o(this.parent).render(e,this.clickCard.bind(this))}}})),u,d=e((()=>{r(),a(),l(),u=class{constructor(e){this.parent=e,this.data=[...n]}runTask1(e){let t=[`Boeing`,`737`,`Alpha`,`Echo`],n=t.join(`-`);this.showResult(e,n,t)}runTask2(e){let t=[1200,0,`OK`,null,850,void 0,`ERROR`,``],n=t.filter(e=>!!e);this.showResult(e,n,t)}runTask3(e){let t=[1,2,3,5,6,7,10,11,12,14,16,17,18],n=(e=>{let t=[],n=e[0],r=e[0],i=1;for(;i<=e.length;)e[i]===r+1?r=e[i]:(t.push(n===r?n:`${n}-${r}`),n=r=e[i]),i++;return t.join(`,`)})(t);this.showResult(e,n,t)}runTask4(e){let t=[`Plane A`,`Plane B`,`Plane C`,`Plane D`,`Plane E`],n=((e,t)=>{let n=e.slice(0,t),r=e.slice(t).reverse();return[...n,...r]})(t,2);this.showResult(e,n,t)}showResult(e,t,n){let r=document.getElementById(`result-${e}`);if(r){r.classList.remove(`d-none`);let e=Array.isArray(n)?JSON.stringify(n):n,i=Array.isArray(t)?JSON.stringify(t):t;r.querySelector(`.data-value`).innerText=e,r.querySelector(`.res-value`).innerText=i}}handleTask(e){let t=parseInt(e.target.dataset.id);t===1&&this.runTask1(t),t===2&&this.runTask2(t),t===3&&this.runTask3(t),t===4&&this.runTask4(t)}clickCard(e){let t=parseInt(e.target.dataset.id);new c(this.parent,t).render()}render(){this.parent.innerHTML=`
        <div class="container-fluid py-5">
            <div id="cards-container" class="d-flex flex-nowrap gap-4 overflow-x-auto pb-4"
                 style="scroll-behavior: smooth; -webkit-overflow-scrolling: touch;">
            </div>
        </div>`;let e=document.getElementById(`cards-container`);this.data.forEach(t=>{let n=document.createElement(`div`);n.style.minWidth=`500px`,n.style.width=`500px`,n.style.flex=`0 0 auto`,e.appendChild(n),new i(n).render(t,this.clickCard.bind(this),this.handleTask.bind(this))})}}}));t((()=>{d();var e=document.getElementById(`root`),t=document.getElementById(`home-link`),n=t=>{t&&t.preventDefault(),new u(e).render()};t.onclick=n,n()}))();