import { Document } from 'mongoose';

export interface MyModel extends Document {
  name: string;
  age: number;
}
