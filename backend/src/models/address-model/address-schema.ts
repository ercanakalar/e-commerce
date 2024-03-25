import { buildSchema } from 'graphql';

const addressTypeDefs = buildSchema(`
    type Address {
        id: ID
        authId: Int 
        firstName: String
        lastName: String
        phoneNumber: String
        city: String
        state: String
        address: String
        addressTitle: String
    }

    type AddressResponse {
        message: String
        data: Address
    }
    type AddressListResponse {
        message: String
        data: [Address]
    }
    type AddressUpdateResponse {
        message: String
    }

    type Mutation {
        createAddress(firstName: String, lastName: String, phoneNumber: String, city: String, state: String, address: String, addressTitle: String): AddressResponse
        updateAddress(firstName: String, lastName: String, phoneNumber: String, city: String, state: String, address: String, addressTitle: String): AddressUpdateResponse
    }
    type Query {
        getAddresses: AddressListResponse
    }
`);

export default addressTypeDefs;
