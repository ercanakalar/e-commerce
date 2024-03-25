import express from 'express';
import addressResolvers from '../models/address-model/address-resolvers';

const router = express.Router();

router.use('/get-address', addressResolvers.Query.getAddresses);
router.use('/create-address', addressResolvers.Mutation.createAddress);

export { router as addressRouter };
