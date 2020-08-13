export default {
    url: 'http://localhost:3000/products',
    productId: '',
    productArticle: '',
    name: '',
    article: '',
    count: '',
    img: '',
    fetchProducts() {
        return fetch(this.url)
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.log(error));
    },
    fetchProductsById() {
        return fetch(`${this.url}/${this.productId}`)
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.log(error));
    },
    fetchProductsByArticle() {
        return fetch(`${this.url}?article=${this.productArticle}`)
            .then(response => response.json())
            .then(data => data[0])
            .catch(error => console.log(error));
    },
    addProduct() {
        const img = this.img;
        const name = this.name;
        const count = this.count;
        const article = this.article;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ img, name, count, article }),
        };

        return fetch(this.url, options)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    },
    deleteProduct() {
        const options = {
            method: 'DELETE',
        };

        return fetch(`${this.url}/${this.productId}`, options)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    },
    updateProduct(update) {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(update),
        };

        return fetch(`${this.url}/${this.productId}`, options)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    },
};