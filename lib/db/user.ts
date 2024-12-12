import { Schema, model, HydratedDocument, Model } from "mongoose";
import MongooseClient from ".";

interface UserInterface {
    username: string;
    password: string;
    role: string;
    reviews: {
        review: string;
        reviewer: string;
        rating: string;
        feedback: string | null;
    }[];
};

class UserDBClient extends MongooseClient {
    private schema = new Schema<UserInterface>({
        username: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
        reviews: [{
            review: { type: String, required: true },
            reviewer: { type: String, required: true },
            rating: { type: String, required: true },
            feedback: { type: String, required: false },
        }],
    });

    private model: Model<UserInterface>;

    constructor() {
        super()
        try {
            this.model = model<UserInterface>('User', this.schema);
        }catch (error) {
            this.model = model<UserInterface>('User');
        }
    }

    // private model = model<UserInterface>('User', this.schema);

    public async create(user: UserInterface): Promise<UserInterface> {
        try {
            const newUser: HydratedDocument<UserInterface> = new this.model(user);
            console.log(newUser);
            return await newUser.save();
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    public async read(username: string): Promise<UserInterface | null> {
        try {
            return await this.model.findOne().where('username').equals(username).exec();
        } catch (error) {
            console.error('Error reading user:', error);
            throw error;
        }
    }

    public async update(username: string, user: UserInterface): Promise<UserInterface | null> {
        try {
            return await this.model.findOneAndUpdate().where('username').equals(username).update(user).exec();
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

}

export default UserDBClient;