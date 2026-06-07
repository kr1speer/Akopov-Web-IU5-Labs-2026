import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    runTask1(id) {
        const flightData = ['Boeing', '737', 'Alpha', 'Echo'];
        const separator = '-';
        const result = flightData.join(separator);

        this.showResult(id, result, flightData);
    }

    runTask2(id) {
        const engineLogs = [1200, 0, 'OK', null, 850, undefined, 'ERROR', ''];
        const result = engineLogs.filter(val => !!val);

        this.showResult(id, result, engineLogs);
    }

    runTask3(id) {
        const partNumbers = [1, 2, 3, 5, 6, 7, 10, 11, 12, 14, 16, 17, 18];
        const toRange = (arr) => {
            let res = [], start = arr[0], end = arr[0], i = 1;
            while (i <= arr.length) {
                if (arr[i] === end + 1) { end = arr[i]; }
                else {
                    res.push(start === end ? start : `${start}-${end}`);
                    start = end = arr[i];
                }
                i++;
            }
            return res.join(',');
        };

        const result = toRange(partNumbers);
        this.showResult(id, result, partNumbers);
    }

    runTask4(id) {
        const runwayQueue = ['Plane A', 'Plane B', 'Plane C', 'Plane D', 'Plane E'];
        const offset = 2;
        const inverse = (arr, num) => {
            const startPart = arr.slice(0, num);
            const reversePart = arr.slice(num).reverse();
            return [...startPart, ...reversePart];
        };

        const result = inverse(runwayQueue, offset);
        this.showResult(id, result, runwayQueue);
    }

    showResult(id, value, inputData) {
        const resBlock = document.getElementById(`result-${id}`);
        if (resBlock) {
            resBlock.classList.remove('d-none');

            const displayInput = Array.isArray(inputData) ? JSON.stringify(inputData) : inputData;
            const displayResult = Array.isArray(value) ? JSON.stringify(value) : value;

            resBlock.querySelector('.data-value').innerText = displayInput;
            resBlock.querySelector('.res-value').innerText = displayResult;
        }
    }

    handleTask(e) {
        const id = parseInt(e.target.dataset.id);
        if (id === 1) this.runTask1(id);
        if (id === 2) this.runTask2(id);
        if (id === 3) this.runTask3(id);
        if (id === 4) this.runTask4(id);
    }

    clickCard(e) {
        const id = parseInt(e.target.dataset.id);
        const productPage = new ProductPage(this.parent, id);
        productPage.render();
    }

    async getData() {
        const data = await ajax.get(stockUrls.getStocks());
        if (data) {
            this.renderData(data);
        }
    }

    renderData(items) {
    const container = document.getElementById('cards-container');

    items.forEach((item) => {
        const wrapper = document.createElement('div');

        wrapper.style.minWidth = '500px';
        wrapper.style.width = '500px';
        wrapper.style.flex = '0 0 auto';

        container.appendChild(wrapper);

        const productCard = new ProductCardComponent(wrapper);


        productCard.render(
            item,
            this.clickCard.bind(this),
            this.handleTask.bind(this)
        );
    });
}
    getHTML() {
        return `
        <div class="container-fluid py-5">
            <div id="cards-container" class="d-flex flex-nowrap gap-4 overflow-x-auto pb-4"
                style="scroll-behavior: smooth; -webkit-overflow-scrolling: touch;">
                </div>
            </div>
        `;
    }
    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.getData();
    }
}
