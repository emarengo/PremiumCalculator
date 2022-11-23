const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = 50000;
let plans = JSON.parse(fs.readFileSync(__dirname + "/plans.json"));

app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  express.json({
    type: "*/*",
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

app.get("/getPlans", (req, res) => {
  return res.status(200).send(plans);
});

app.post("/deletePlan", (req, res) => {
  try {
    const body = req.body.data;
    if (!body) {
      throw new Error("Id is required");
    }

    let plansAfterDeleted = plans.filter(
      (plan) => plan.id !== parseInt(body.id)
    );

    fs.writeFileSync(
      __dirname + "/plans.json",
      JSON.stringify(plansAfterDeleted, null, 2),
      finished
    );
    return res.status(200).send(body);
  } catch (error) {
    return res.status(400).send(error.message);
  }
  function finished() {
    reply = {
      status: "success",
    };
  }
});

app.post("/addPlan", (req, res) => {
  try {
    const body = req.body.data;
    if (!body) {
      throw new Error("Plan is required");
    }
    plans.push(body);

    fs.writeFileSync(
      __dirname + "/plans.json",
      JSON.stringify(plans, null, 2),
      finished
    );
    return res.status(200).send("sucess");
  } catch (error) {
    return res.status(400).send(error.message);
  }

  function finished() {
    reply = {
      status: "success",
    };
  }
});

app.post("/calculatePlan", (req, res) => {
  try {
    const body = req.body.data;
    const {
      dateOfBirth: requestedDate,
      state: requestedState,
      plan: requestedPlan,
      age: requestedAge,
    } = body;

    if (!requestedDate) {
      throw new Error(`dateOfBirth is required`);
    }

    if (!requestedState) {
      throw new Error(`state is required`);
    }

    if (!requestedPlan) {
      throw new Error(`plan is required`);
    }

    if (!requestedAge) {
      throw new Error(`age is required`);
    }

    const filteredPlansByState = plans.filter((singlePlan) => {
      return singlePlan.state.toUpperCase() == requestedState.toUpperCase() || requestedState == "*" ||singlePlan.state == "*";
    });
    if (!filteredPlansByState.length) {
      throw new Error(`There aren't plans for the selected state.`);
    }

    const filteredPlansByPlan = filteredPlansByState.filter((singlePlan) => {
      return singlePlan.plan.toUpperCase() == requestedPlan.toUpperCase()  || requestedPlan == "*" || singlePlan.state == "*";
    });
    
    if (!filteredPlansByPlan.length) {
      throw new Error(`There aren't plans for the selected plan letter.`);
    }

    const filteredPlansByAge = filteredPlansByPlan.filter((singlePlan) => {
      return (
        requestedAge >= singlePlan.ageRangeMin &&
        requestedAge <= singlePlan.ageRangeMax
      );
    });
    if (!filteredPlansByAge.length) {
      throw new Error(`There aren't plans for the selected age.`);
    }

    res.status(200).send(filteredPlansByAge);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`On port ${port}`);
});
