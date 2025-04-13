import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  stripeCustomerId: String,
  stripeSubscriptionId: String,
  status: { type: String, enum: ['active', 'canceled', 'past_due', 'trialing'], default: 'trialing' },
  currentPeriodEnd: Date,
});

export default mongoose.model('Subscription', subscriptionSchema);
