import ApiServiceInstance from "../../infrastructure/axios/apiServiceInstance";

class StoreService extends ApiServiceInstance {
  constructor() {
    super();

    this.url = `${this.baseUrl}/api/v1/stores/`;
    this.productCategoriesUrl = `${this.baseUrl}/api/v1/product-categories/`;
    this.productsUrl = `${this.baseUrl}/api/v1/products/`;
  }

  getProductCategories(storeId) {
    const endpoint = `${this.productCategoriesUrl}${storeId}/qr-menu`
    return this.get(endpoint);
  }

  getProducts(storeId) {
    const endpoint = `${this.productsUrl}${storeId}/qr-menu`
    return this.get(endpoint);
  }

  getProductsFilteredByImages(storeId) {
    const endpoint = `${this.productsUrl}${storeId}/qr-menu?filter=image`;
    return this.get(endpoint);
  }
}

export const storeService = new StoreService();
