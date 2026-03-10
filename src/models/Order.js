import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({

invoiceNumber:{
type:String,
unique:true,
sparse:true
},

merchantOrderId:{
type:String,
unique:true
},

customer:{
name:String,
phone:String,
email:String,
address:String
},

items:[
{
id:String,
name:String,
price:Number,
quantity:Number
}
],

amount:Number,

paymentStatus:{
type:String,
enum:["PENDING","SUCCESS","FAILED"],
default:"PENDING"
},

paymentId:String,

createdAt:{
type:Date,
default:Date.now
}

});

export default mongoose.models.Order ||
mongoose.model("Order",OrderSchema);