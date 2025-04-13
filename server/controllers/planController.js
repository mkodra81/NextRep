import Plan from '../models/Plan.js';
import mongoose from 'mongoose';

const createPlan = async (req, res) => {
  const plan = req.body;

  try {
    const newPlan = new Plan({  
      ...plan,
      weekOf: new Date(),
    });

    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find({ user: req.user }).sort({ weekOf: -1 });
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getPlanById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid plan ID' });
  }

  try {
    const plan = await Plan.findById(id).populate('user', 'name email');
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.status(200).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const updatePlan = async (req, res) => {
  const { id } = req.params;
  const plan = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid plan ID' });
  }

  try {
    const updatedPlan = await Plan.findByIdAndUpdate(
      id,
      { ...plan },
      { new: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.status(200).json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deletePlan = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid plan ID' });
  }

  try {
    const deletedPlan = await Plan.findByIdAndDelete(id);
    if (!deletedPlan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { createPlan, getPlans, getPlanById, updatePlan, deletePlan };