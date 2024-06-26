import App from './app';
import { Database } from './config/db';
import { createAuthTable } from './models/auth-model/auth-model';
import { createChildrenCategoryTable } from './models/category-model/category-children-model/category-children-model';
import { createGroupCategoryTable } from './models/category-model/category-group-model/category-group-model';
import { createCategoryTable } from './models/category-model/category-model';
import { createSubCategoryTable } from './models/category-model/sub-category-model/sub-category-model';
import { createProfileTable } from './models/profile-model/profile-model';
import { createProductTable } from './models/product-model/product-model';
import { createAddressTable } from './models/address-model/address-model';
import { createBasketTable } from './models/basket-model/basket-model';
import { createReviewTable } from './models/review-model/review-model';
import { createProductAttributesTable } from './models/product-model/product-attributes-model/product-attributes-model';
import { createFavoriteTable } from './models/favorite-model/favorite-model';
import { createOrderTable } from './models/order-model/order-model';

const start = async () => {
  try {
    new Database().connect();
    createAuthTable();
    createProfileTable();
    createCategoryTable();
    createSubCategoryTable();
    createGroupCategoryTable();
    createChildrenCategoryTable();
    createProductTable();
    createProductAttributesTable();
    createAddressTable();
    createBasketTable();
    createReviewTable();
    createFavoriteTable()
    createOrderTable()
    const app = new App();
    app.run();
  } catch (error) {
    console.log(error, 'error connecting to db');
  }
};

start();
