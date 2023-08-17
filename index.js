import express from "express";

import { getPlans, createPlan, deletePlan, planTotal } from "./db.js";

const app = express();

// Declaring the static middleware

app.use(express.static("public"));

// Makes req.body works (This is known as the middleware)
app.use(express.json());

// Creating a post route that will calculate the total starts here
// Post routes are somehow different and as such they take as parameters req.body which is where our data comes from

app.post("/api/phonebill/", async function (req, res) {
  // console.log(req.body);

  const price_plan = req.body.price_plan;
  const total = await planTotal(price_plan);
  res.json({
    response: "Successfully sumed the total",
    total
  });
});
// Creating a post route that will calculate the total ends here

// Section that lists all the available price plan starts here
app.get("/api/price_plans", async function (req, res) {
  const price_plans = await getPlans();

  console.log(price_plans);

  res.json({
    price_plans,
  });
});
// Section that lists all the available price plan ends here

// creating a new price plan starts Here

app.post("/api/price_plan/create", async function (req, res) {
  console.log("trying to hh");

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
  // console.log(req.body)
  // console.log(req.body);
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

  const { sms_price, call_price, plan_name } = req.body;

  await db.run(
    `update price_plan set sms_price=?, call_price = ? where plan_name = ?`,

    sms_price,
    call_price,
    plan_name
  );

  res.json({
    status: "Success",
  });
});
// updating a price plan ends here

// Adding our port listener which is by defualt
let PORT = process.env.PORT || 3008;

app.listen(PORT, function () {
  console.log("Price Plan API with SQL starting on port", PORT);
});
