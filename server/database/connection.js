import mongoose from 'mongoose';
import process from 'process';


const databaseUrl =
  process.env.DATABASE_URL || 'mongodb://localhost/argentBankDB';

export default async function dbConnection() {
  try {
    await mongoose.connect(databaseUrl, { useNewUrlParser: true });
    console.log('Database successfully connected');
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`);
    throw error; // No need for a new Error object, just re-throw
  }
}
