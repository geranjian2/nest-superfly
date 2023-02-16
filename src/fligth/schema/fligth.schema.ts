import * as mongoose from 'mongoose';
export const FligthSchema = new mongoose.Schema(
  {
    pilot: { type: String, required: true },
    airplane: { type: String, required: true },
    destinationCity: { type: String, required: true },
    fligthDate: { type: Date, required: true },
    passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'passengers' }],
  },
  { timestamps: true },
);
