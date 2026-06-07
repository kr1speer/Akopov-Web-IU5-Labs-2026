import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

import { MainPage } from "../main/index.js";
import { ProductComponent } from "../../components/product/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

     async getData() {
        const url = stockUrls.getStockById(this.id);
        const data = await ajax.get(url);
        if (data) {
            this.renderData(data);
        }
    }

    renderData(item) {
        const productComponent = new ProductComponent(this.parent);
        productComponent.render(item, this.clickCard.bind(this));
    }

    clickCard(){
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';

        this.getData();


    }
}
