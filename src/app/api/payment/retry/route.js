import Order from "@/models/Order";

export async function POST(req){

const body = await req.json();

const order = await Order.findOne({

merchantOrderId:body.id

});

return Response.json({

retry:true,
amount:order.amount

});

}
