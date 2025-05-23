const { gql } = require('apollo-server');

const typeDefs = gql`
    type Poet {
        poet_code: ID!
        first_name: String!
        surname: String!
        address: String
        postcode: String
        telephone_number: String
    }

    type Poem {
        poem_code: ID!
        poem_title: String!
        poem_contents: String
        poet_code: Int!
    }

    type Customer {
        customer_code: ID!
        first_name: String!
        surname: String!
        address: String
        postcode: String
        telephone_number: String
    }

    type Publication {
        publication_code: ID!
        title: String!
        price: Float!
    }

    type Sale {
        sale_code: ID!
        date: String
        amount: Float!
        customer_code: Int!
    }

    type PoemPublication {
        poem_code: Int!
        publication_code: Int!
    }

    type SalePublication {
        sale_code: Int!
        publication_code: Int!
    }

    type PoetWithPoems {
        poet_code: ID
        first_name: String
        surname: String
        poem_code: Int
        poem_title: String
    }

    # ==== Consultas ====
    type Query {
        getPoets: [Poet]
        getPoems: [Poem]
        getCustomers: [Customer]
        getPublications: [Publication]
        getSales: [Sale]

        # Procedimiento almacenado
        getPoetsWithPoems: [PoetWithPoems]
    }

    # ==== Mutaciones ====
    type Mutation {
        addPoet(
            first_name: String!,
            surname: String!,
            address: String,
            postcode: String,
            telephone_number: String
        ): Poet!

        addPoem(
            poem_title: String!,
            poem_contents: String!,
            poet_code: Int!
        ): Poem!

        addCustomer(
            first_name: String!,
            surname: String!,
            address: String,
            postcode: String,
            telephone_number: String
        ): Customer!

        addPublication(
            title: String!,
            price: Float!
        ): Publication!

        addSale(
            date: String!,
            amount: Float!,
            customer_code: Int!
        ): Sale!

        updatePoet(
            poet_code: ID!,
            first_name: String,
            surname: String,
            address: String,
            postcode: String,
            telephone_number: String
        ): Poet!

        updatePoem(
            poem_code: ID!,
            poem_title: String,
            poem_contents: String,
            poet_code: Int
        ): Poem!

        updateCustomer(
            customer_code: ID!,
            first_name: String,
            surname: String,
            address: String,
            postcode: String,
            telephone_number: String
        ): Customer!

        updatePublication(
            publication_code: ID!,
            title: String,
            price: Float
        ): Publication!

        updateSale(
            sale_code: ID!,
            date: String,
            amount: Float,
            customer_code: Int
        ): Sale!

        deletePoet(poet_code: ID!): String!
        deletePoemPublication(poem_code: ID!, publication_code: ID!): String!
        deleteSalePublication(sale_code: ID!, publication_code: ID!): String!
    }
`;

module.exports = typeDefs;
