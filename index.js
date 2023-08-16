import * as sqlite from "sqlite";
import sqlite3 from "sqlite3";
import express from "express";


const app = express();

// Declaring the static middleware

app.use(express.static('public'))

// Makes req.body works (This is known as the middleware)
app.use(express.json());

const db = await sqlite.open({
  filename: "./data_plan.db",
  driver: sqlite3.Database,
});

await db.migrate();



// Creating a post route that will calculate the total starts here
// Post routes are somehow different and as such they take as parameters req.body which is where our data comes from

app.post("/api/phonebill/", async function (req, res) {
  // console.log(req.body);

  const price_plan_name = req.body.price_plan

  // get the price plan to use starts here

  const price_plan = await db.get(`SELECT id, plan_name, sms_price, call_price 
  FROM price_plan WHERE plan_name = ?`,price_plan_name);

  // console.log(price_plan);
  // get the price plan to use ends here

  // Use the price plan to calculate the total cost starts here

  if(!price_plan){

    res.json({

      error: `Invalid price plan name: ${price_plan_name}`
    })
  }else{

    const activity = req.body.actions;

    const activities = activity.split(",");
    let total = 0;
  
    activities.forEach((action) => {
      if (action.trim() == "sms") {
        total += price_plan.sms_price;
      } else if (action.trim() == "call") {
        total += price_plan.call_price;
      }
    });
  
    // Use the price plan to calculate the total cost ends here
  
    res.json({
      // status: "Success",
      total,
    });
    
  }
});
// Creating a post route that will calculate the total ends here

// Section that lists all the available price plan starts here

app.get("/api/price_plans", async function (req, res) {
  const price_plans = await db.all(`select * from price_plan`);

  res.json({
    price_plans,
  });
});

// Section that lists all the available price plan ends here

// creating a new price plan starts Here 

app.post("/api/price_plan/create", async function(req, res){

  console.log(req.body)

  const{
    name,
    sms_cost,
    call_cost
    } = req.body;

    await db.run(`insert into price_plan (plan_name, sms_price, call_price) VALUES (?,?,?)`,
    
    name,
    sms_cost,
    call_cost
    );

    res.json({
      status:'Success'
    })
});
// creating a new price plan ends here
// updating a price plan starts here 
app.post("/api/price_plan/update", async function(req, res){

  console.log(req.body)

  const {
    sms_price, 
    call_price, 
    plan_name } = req.body;

    await db.run(`update price_plan set sms_price=?, call_price = ? where plan_name = ?`,
    
    sms_price,
    call_price,
    plan_name);

    res.json({
      status: 'Success'
    })
});
// updating a price plan ends here 
// deleting a price plan starts here 


app.post("/api/price_plan/delete", async function(req, res){

  console.log(req.body)

  const {
    id
     } = req.body;

    await db.run(`delete from price_plan where plan_name = ?`,
    
    id);

    res.json({
      status: 'Success'
    })
});
// deleting a price plan ends here 

// Adding our port listener which is by defualt
let PORT = process.env.PORT || 3009;

app.listen(PORT, function () {
  console.log("Price Plan API with SQL starting on port", PORT);
});
