import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { startStandaloneServer } from '@apollo/server/standalone';

import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';

import { authRouter } from './routes/authRoutes';
import { NotFoundError } from './errors';
import { errorHandler } from './middlewares';
import { profileRouter } from './routes/profileRouter';

import authResolvers from './models/auth-model/auth-resolvers';
import profileResolvers from './models/profile-model/profile-resolvers';
import categoryResolvers from './models/category-model/category-resolvers';
import authTypeDefs from './models/auth-model/auth-schema';
import profileTypeDefs from './models/profile-model/profile-schema';
import categoryTypeDefs from './models/category-model/category-schema';
import categoryGroupResolvers from './models/category-model/category-group-model/category-group-resolvers';
import categoryGroupTypeDefs from './models/category-model/category-group-model/category-group-schema';
import categoryChildrenTypeDefs from './models/category-model/category-children-model/category-children-schema';
import categoryChildrenResolvers from './models/category-model/category-children-model/category-children-resolvers';
import subCategoryTypeDefs from './models/category-model/sub-category-model/sub-category-schema';
import subCategoryResolvers from './models/category-model/sub-category-model/sub-category-resolvers';
import productTypeDefs from './models/product-model/product-schema';
import productResolvers from './models/product-model/product-resolvers';
import { categoryRouter, childrenCategoryRouter, groupCategoryRouter, subCategoryRouter } from './routes/category';
import { productRouter } from './routes/product/productRouter';
import { productAttributesRouter } from './routes/product/productAttributesRouter';
import addressTypeDefs from './models/address-model/address-schema';
import addressResolvers from './models/address-model/address-resolvers';
import { addressRouter } from './routes/addressRoutes';
import basketTypeDefs from './models/basket-model/basket-schema';
import basketResolvers from './models/basket-model/basket-resolvers';
import { basketRouter } from './routes/basketRoutes';
import { reviewRoutes } from './routes/reviewRoutes';
import reviewResolvers from './models/review-model/review-resolvers';
import reviewTypeDefs from './models/review-model/review-schema';
import productAttributesTypeDefs from './models/product-model/product-attributes-model/product-attributes-schema';
import productAttributesResolvers from './models/product-model/product-attributes-model/product-attributes-resolvers';
import { favoriteRouter } from './routes/favoriteRoutes';
import favoriteTypeDefs from './models/favorite-model/favorite-schema';
import favoriteResolvers from './models/favorite-model/favorite-resolvers';
import { orderRouter } from './routes/orderRoutes';
import orderTypeDefs from './models/order-model/order-schema';
import orderResolvers from './models/order-model/order-resolvers';

class App {
  public app: express.Application;
  public httpServer: http.Server;
  public server: any;

  constructor() {
    this.app = express();
    this.httpServer = http.createServer(this.app);
  }

  public middleware(): void {
    this.app.set('trust proxy', true);
    this.app.use(json());
    this.app.use(cors());
    this.app.use('/v1/api/auth', authRouter);

    this.app.use('/v1/api/profiles', profileRouter)
    
    this.app.use('/v1/api/category', categoryRouter)
    this.app.use('/v1/api/category/sub', subCategoryRouter)
    this.app.use('/v1/api/category/children', childrenCategoryRouter)
    this.app.use('/v1/api/category/group', groupCategoryRouter)
    
    this.app.use('/v1/api/product', productRouter)
    this.app.use('/v1/api/product-attributes', productAttributesRouter)

    this.app.use('/v1/api/address', addressRouter)

    this.app.use('/v1/api/basket', basketRouter)

    this.app.use('/v1/api/reviews', reviewRoutes)

    this.app.use('/v1/api/favorite', favoriteRouter)

    this.app.use('v1/api/order', orderRouter)
    
    this.app.all('*', async () => {
      throw new NotFoundError('Route not found!');
    });
    this.app.use(errorHandler);
  }

  public async run(): Promise<void> {
    this.middleware();
    this.server = new ApolloServer({
      typeDefs: [authTypeDefs, profileTypeDefs, categoryTypeDefs, categoryGroupTypeDefs, categoryChildrenTypeDefs, subCategoryTypeDefs, productTypeDefs, productAttributesTypeDefs, addressTypeDefs, basketTypeDefs, reviewTypeDefs, favoriteTypeDefs, orderTypeDefs],
      resolvers: [authResolvers, profileResolvers, categoryResolvers, categoryGroupResolvers, categoryChildrenResolvers, subCategoryResolvers, productResolvers, productAttributesResolvers, addressResolvers, basketResolvers, reviewResolvers, favoriteResolvers, orderResolvers],
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer }),
      ],
      status400ForVariableCoercionErrors: true,
    });

    const { url } = await startStandaloneServer(this.server, {
      context: async ({ req, res }) => ({ req, res }),
      listen: { port: 4000 },
    });
    console.log(`🚀 Server ready at ${url}`);
  }
}

export default App;