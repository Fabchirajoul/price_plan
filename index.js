import express from "express";

import { getPlans, createPlan, deletePlan, updatePlan, planTotal} from "./db.js";

const app = express();

// Declaring the static middleware

app.use(express.static("public"));

// Makes req.body works (This is known as the middleware)
app.use(express.json());

// Section that lists all the available price plan starts here
app.get("/api/price_plans", async function (req, res) {
  const price_plans = await getPlans();
  res.json({
    price_plans,
  });
});
// Section that lists all the available price plan ends here

// creating a new price plan starts Here

app.post("/api/price_plan/create", async function (req, res) {
  const name = String(req.body.plan_name);
  const sms_cost = Number(req.body.sms_price);
  const call_cost = Number(req.body.call_price);

  await createPlan(name, sms_cost, call_cost);

  res.json({
    reponse: "successfully added",
  });
});
// creating a new price plan ends here

// deleting a price plan starts here

app.post("/api/price_plan/delete", async function (req, res) {
  const name = String(req.body.plan_name);
  await deletePlan(name);

  res.json({
    response: "Successfully deleted",
  });
});
// deleting a price plan ends here

// Calculating the total starts here

// calculating the total ends here
// updating a price plan starts here
app.post("/api/price_plan/update", async function (req, res) {
  // console.log(req.body)

  const name = String(req.body.plan_name);
  const sms_cost = Number(req.body.sms_price);
  const call_cost = Number(req.body.call_price);

  if(!name && !sms_cost && !call_cost){


    res.json({
      error: "No parameters found for"
    })
  }

  await updatePlan(name, sms_cost, call_cost);

  res.json({
    status: "Success",
  });  
});
// updating a price plan ends here

// action plan for total starts here 

app.post("/api/phonebill/", async function(req, res){

  const price_plan_Name = String(req.body.price_plan);
  const activity = String(req.body.actions);

  if(!price_plan_Name){
    res.json({
      error: `Invalid price plan name ${price_plan_Name}`
    })

  }

  res.json({
    total: await planTotal(price_plan_Name, activity)
  });
});
// action plan for total ends here 

// Adding our port listener which is by defualt
let PORT = process.env.PORT || 3008;

app.listen(PORT, function () {
  console.log("Price Plan API with SQL starting on port", PORT);
});