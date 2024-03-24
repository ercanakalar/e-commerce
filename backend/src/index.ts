import App from './app';
import { Database } from './config/db';
import { createAuthTable } from './models/auth-model/auth-model';
import { createChildrenCategoryTable } from './models/category-model/category-children-model/category-children-model';
import { createGroupCategoryTable } from './models/category-model/category-group-model/category-group-model';
import { createCategoryTable } from './models/category-model/category-model';
import { createSubCategoryTable } from './models/category-model/sub-category-model/sub-category-model';
import { createProfileTable } from './models/profile-model/profile-model';

const start = async () => {
  try {
    new Database().connect()
    createAuthTable()
    createProfileTable()
    createCategoryTable()
    createSubCategoryTable()
    createGroupCategoryTable()
    createChildrenCategoryTable()
    const app = new App();
    app.run();
  } catch (error) {
    console.log(error, 'error connecting to db');
  }
};

start();
