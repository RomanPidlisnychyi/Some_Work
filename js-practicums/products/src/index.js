import './styles.css';
import apiServices from './apiServices';
import markup from './templates/markup.hbs';
import addProduct from './templates/addProduct.hbs';
import allProducts from './templates/allProducts.hbs';
import allProductsBasic from './templates/allProductsBasic.hbs';
import name from './templates/name.hbs';
import article from './templates/article.hbs';
import count from './templates/count.hbs';
import services from './templates/services.hbs';

const refs = {
    body: document.querySelector('body'),
    queryIdInput: document.querySelector('.queryId'),
    getAllProductsBtn: document.querySelector('.getAllProducts'),
    productsList: document.querySelector('.products'),
    addBtn: document.querySelector('.addBtn'),
    addNewProduct: document.querySelector('.add_new_product'),
    wrapper: document.querySelector('.wrapper'),
    closeBtn: '',
    img: '',
    inputFile: '',
    inputName: '',
    inputArticle: '',
    inputCount: '',
    saveBtn: '',
    createBtn: '',
};

class Product {
    constructor(product) {
        this.product = product;
        this.inputName = '';
        this.inputArticle = '';
        this.inputCount = '';
        this.saveBtn = '';
        this.deleteBtn = '';
        this.id = '';
        this.liName = '';
        this.liArticle = '';
        this.liCount = '';
        this.liServices = '';
    }
    getAll() {
        this.id = this.product.id;
        this.liName = document.querySelector('.products-name');
        this.liArticle = document.querySelector('.products-article');
        this.liCount = document.querySelector('.products-count');
        this.liServices = document.querySelector('.products-services');
        const markupName = name(this.product);
        this.liName.insertAdjacentHTML('beforeend', markupName);
        const markupArticle = article(this.product);
        this.liArticle.insertAdjacentHTML('beforeend', markupArticle);
        const markupCount = count(this.product);
        this.liCount.insertAdjacentHTML('beforeend', markupCount);
        this.inputCount = document.querySelector(
            `[name="count-${this.product.name}"]`,
        );
        this.inputCount.value = this.product.count;
        const markupServices = services(this.product);
        this.liServices.insertAdjacentHTML('beforeend', markupServices);
        this.saveBtn = document.querySelector(
            `[title="save-${this.product.name}"]`,
        );
        this.deleteBtn = document.querySelector(
            `[title="delete-${this.product.name}"]`,
        );
    }
    basic() {
        const murkup = allProductsBasic();
        refs.productsList.insertAdjacentHTML('beforeend', murkup);
    }
}

const example = async() => {
    const products = await apiServices.fetchProducts();
    sortByArticle(products);
    return products;
};

const getProducts = async() => {
    const products = await example();
    products.forEach((e, i) => {
        const product = new Product(e);
        if (i < 1) {
            product.basic();
        }
        product.getAll();
    });
};

function onInputFileChange(event) {
    refs.img.src = window.URL.createObjectURL(event.target.files[0]);
    apiServices.img = event.target.files[0].name;
}

refs.body.addEventListener('click', onBodyClick);
refs.body.addEventListener('input', onBodyInput);
refs.body.addEventListener('keydown', onBodyKeydown);

async function onBodyClick(event) {
    const products = await example();
    if (event.target === refs.addBtn) {
        refs.addNewProduct.classList.add('off');
        const product = [];
        refs.productsList.innerHTML = addProduct(product);
        refs.inputName = document.querySelector('#productName');
        refs.inputArticle = document.querySelector('#article');
        refs.inputCount = document.querySelector('#count');
        refs.createBtn = document.querySelector('button[name="create"]');
        refs.closeBtn = document.querySelector('.close');
        refs.img = document.querySelector('img');
        refs.inputFile = document.querySelector('#file');

        refs.inputFile.addEventListener('change', onInputFileChange);
    }
    if (
        event.target ===
        document.querySelector(`.close[data-close="${event.target.dataset.close}"]`)
    ) {
        const idToRemove = event.target.dataset.close;
        const removeElement = document.querySelector(
            `li[data-name="${idToRemove}"]`,
        );
        refs.productsList.removeChild(removeElement);
        refs.addNewProduct.classList.remove('off');
        resetValue();
    }
    if (event.target === refs.createBtn) {
        const validatorName = products.filter(e => e.name === apiServices.name);
        const validatorArticle = products.filter(
            e => e.article === apiServices.article,
        );

        if (validatorName.length === 0 && validatorArticle.length === 0) {
            apiServices.addProduct();
            refs.img = '';
            refs.inputName.value = '';
            refs.inputArticle.value = '';
            refs.inputCount.value = '';
            resetValue();
            refs.createBtn.disabled = true;
        }
        if (validatorName.length !== 0) {
            refs.inputName.classList.add('unSccess');
        } else {
            refs.inputName.classList.remove('unSccess');
        }
        if (validatorArticle.length !== 0) {
            refs.inputArticle.classList.add('unSccess');
        } else {
            refs.inputArticle.classList.remove('unSccess');
        }
    }
    if (
        event.target ===
        document.querySelector(`.save[title="${event.target.title}"]`)
    ) {
        updateProductCount(event);
        event.target.disabled = true;
    }
    if (
        event.target ===
        document.querySelector(`.delete[title="${event.target.title}"]`)
    ) {
        console.log(event.target);
        apiServices.productId = event.target.dataset.id;
        apiServices.deleteProduct();
        apiServices.productId = '';
        refs.productsList.innerHTML = '';
        getProducts();
        refs.addNewProduct.classList.remove('off');
    }
    if (event.target === refs.getAllProductsBtn) {
        refs.productsList.innerHTML = '';
        getProducts();
    }
}

const updateProductCount = event => {
    const update = {};
    update.count = event.target.dataset.count;
    apiServices.productId = event.target.dataset.id;
    console.log(update);
    apiServices.updateProduct(update);
    apiServices.productId = '';
};

async function onBodyInput(event) {
    const products = await example();
    products.forEach(e => {
        if (`count-${e.name}` === event.target.name) {
            const saveBtn = document.querySelector(`[title="save-${e.name}"]`);
            saveBtn.dataset.count = event.target.value;
            if (e.count !== event.target.value && event.target.value !== '') {
                saveBtn.disabled = false;
            } else {
                saveBtn.disabled = true;
            }
        }
    });
    if (event.target === refs.queryIdInput) {
        apiServices.productArticle = event.target.value;
    }

    if (event.target === refs.inputName) {
        apiServices.name = event.target.value;
    }

    if (event.target === refs.inputArticle) {
        apiServices.article = event.target.value;
    }

    if (event.target === refs.inputCount) {
        apiServices.count = event.target.value;
    }

    if (
        refs.inputName.value !== '' &&
        refs.inputArticle.value !== '' &&
        refs.inputCount.value !== ''
    ) {
        if (refs.saveBtn !== '') {
            refs.saveBtn.disabled = false;
        }
        if (refs.createBtn !== '') {
            refs.createBtn.disabled = false;
        }
    } else {
        if (refs.saveBtn !== '') {
            refs.saveBtn.disabled = true;
        }
        if (refs.createBtn !== '') {
            refs.createBtn.disabled = true;
        }
    }
}

function onBodyKeydown(event) {
    if (event.key === 'Enter') {
        refs.productsList.innerHTML = '';
        createProductCard();
    }
}

const createProductCard = async() => {
    const products = await apiServices.fetchProducts();
    const product = products.filter(
        product => product.article === apiServices.productArticle,
    );

    if (product.length === 0) {
        refs.addNewProduct.classList.remove('off');
        resetValue();
        return;
    }

    refs.addNewProduct.classList.add('off');

    refs.productsList.innerHTML = markup(product[0]);

    refs.inputCount = document.querySelector(`[name="count-${product[0].name}"]`);
    refs.inputCount.value = product[0].count;

    resetValue();
};

function sortByArticle(arr) {
    arr.sort((a, b) => a.article - b.article);
}

function resetValue() {
    apiServices.img = '';
    apiServices.name = '';
    apiServices.article = '';
    apiServices.count = '';
    refs.queryIdInput.value = '';
    apiServices.productArticle = '';
    apiServices.productId = '';
}