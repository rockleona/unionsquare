import { connect, disconnect } from 'mongoose';
import process from 'process';

class MongooseClient {
    private uri: string;

    constructor() {
        this.uri = process.env.MONGO_URI || '';
    }

    public async connect(): Promise<void> {
        console.log(this.uri);
        try {
            await connect(this.uri);
            console.log('Successfully connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }

    public async disconnect(): Promise<void> {
        try {
            await disconnect();
            console.log('Successfully disconnected from MongoDB');
        } catch (error) {
            console.error('Error disconnecting from MongoDB:', error);
            throw error;
        }
    }
}

export default MongooseClient;