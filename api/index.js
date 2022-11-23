const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = 50000;
const plans = JSON.parse(fs.readFileSync(__dirname + "/plans.json"));

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

app.use(cors());

app.get("/getPlans", (req, res) => {
  res.send(plans);
});

app.post("/addPlan", (req, res) => {
  try {
    const body = req.body.data;
    if (!body) {
      throw new Error("Plan is required");
    }
    plans.push(body);
    fs.writeFile("./plans.json", JSON.stringify(plans, null, 2), finished);
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
      return singlePlan.state == requestedState || singlePlan.state == "*";
    });
    if (!filteredPlansByState.length) {
      throw new Error(`There aren't plans for the selected state.`);
    }

    const filteredPlansByPlan = filteredPlansByState.filter((singlePlan) => {
        return singlePlan.plan == requestedPlan;
      });
      if (!filteredPlansByPlan.length) {
        throw new Error(`There aren't plans for the selected plan letter.`);
      }

      const filteredPlansByAge = filteredPlansByPlan.filter((singlePlan) => {
        return requestedAge >= singlePlan.ageRangeMin  && requestedAge <= singlePlan.ageRangeMax;
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
