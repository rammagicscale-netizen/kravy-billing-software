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

name:{
type:String,
required:true
},

phone:{
type:String,
required:true
},

email:{
type:String
},

gst:{
type:String
},

house:{
type:String,
required:true
},

addressLine:{
type:String,
required:true
},

district:{
type:String,
required:true
},

state:{
type:String,
required:true
},

country:{
type:String,
required:true
},

pincode:{
type:String,
required:true
}

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

clerkUserId:String, // For cross-domain subscription bridge

createdAt:{
type:Date,
default:Date.now
}

});

export default mongoose.models.Order ||
mongoose.model("Order",OrderSchema);