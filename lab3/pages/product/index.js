import { planesData } from "../../data.js";
import { MainPage } from "../main/index.js";
import { ProductComponent } from "../../components/product/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    clickCard(){
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const plane = planesData.find(item => item.id === this.id);

       if (plane) {
            const productComponent = new ProductComponent(this.parent);
            productComponent.render(plane, this.clickCard.bind(this));
    }

    }
}
