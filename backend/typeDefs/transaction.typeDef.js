const tranactionTypeDef = `
    type Transaction {
        id : ID!
        userId : ID!
        description : String!
        paymentType : String!
        category : String!
        amount : Float!
        location : String
        date : String!   
    }

    type Query {
        transactions : [Transaction!]
        tansaction(transactionId : ID!) : Transaction
    }

    type Mutation {
        createTransaction(input) : Transaction
    }
`;

export default tranactionTypeDef;