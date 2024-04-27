import express from 'express';
import addressResolvers from '../models/address-model/address-resolvers';

const router = express.Router();

router.use('/get-addresses', addressResolvers.Query.getAddresses);
router.use('/create-address', addressResolvers.Mutation.createAddress);
router.use('/update-address', addressResolvers.Mutation.updateAddress);

export { router as addressRouter };
