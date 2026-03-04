import Transaction from '../models/transaction.model.js';

const transcationResolver = {
    Query : {
        tranctions : async (_, args, context) => {
            try{
                if (!context.getUser()) {
                    throw new Error('Unauthorized');
                }
                const userId = await context.getUser()._id;
                const transactions = await Transaction.find({ userId });
                return transactions;
            }
            catch(err){
                console.log("Error fetching transactions:", err);
                throw new Error('Failed to fetch transactions'); 
        }
    },
    transaction : async (_, { transactionId }, context) => {
        try{

            const transaction = await Transaction.findById({ transactionId});
            if (!transaction) {
                throw new Error('Transaction not found');
            }
            return transaction;
        }
        catch(err){
            console.log("Error fetching transaction:", err);
            throw new Error('Failed to fetch transaction'); 
        }
    }
},
    Mutation : {
        createTransaction : async (_, { input }, context) => {
            try{
                const newTransaction = new Transaction({
                    ...input,userId : await context.getUser()._id
                })
                await newTransaction.save();
                return newTransaction;
            }
            catch(err){
                console.log("Error creating transaction:", err);
                throw new Error('Failed to create transaction'); 
        }   
    },
    updateTransaction : async (_, { input }) => {
        try{
            const { transactionId, ...updateData } = input;
            const updatedTransaction = await Transaction.findByIdAndUpdate(
                transactionId,
                updateData,
                { new: true }
            );
            if (!updatedTransaction) {
                throw new Error('Transaction not found');
            }
            return updatedTransaction;
        }
        catch(err){
            console.log("Error updating transaction:", err);
            throw new Error('Failed to update transaction'); 
        }   
    },
    deleteTransaction : async (_, { transactionId }) => {
        try{
            const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
            if (!deletedTransaction) {
                throw new Error('Transaction not found');
            }
            return deletedTransaction;
        }
        catch(err){
            console.log("Error deleting transaction:", err);
            throw new Error('Failed to delete transaction'); 
        }   
    }
}

}

export default transcationResolver;