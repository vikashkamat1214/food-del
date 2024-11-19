import mongoose from "mongoose";


export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://vikashkamat124:vikash12345@cluster0.e18ru.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}