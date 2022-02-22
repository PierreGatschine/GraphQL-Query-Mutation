
import { users } from "./db";


const messageHello = 'Hello Toto';


const resolvers = {
    Query: {
        hello: (parent, args, context, info) => messageHello,
        user: (parent, {id}) => users.find(user => user.id == id),
        users: () => users
    },
    Mutation: {
        createUser: (parent, {id, name, email, age}) => {
            let checkID = users.findIndex(user => user.id == id);
            if (checkID == -1) {
                
                let newUser = {id, name, email, age}
                users.push(newUser)
                return newUser
            } else {
                throw new Error('ID already taken');
            }
        },
        deleteUser: (parent, {id}) => {
            let checkID = users.findIndex(user => user.id == id);
            if (checkID != -1) {
                users.splice(checkID, 1);
                return true
            } else {
                throw new Error('ID not found');
            }
        }
    }
};

export default resolvers;