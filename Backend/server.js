require("dotenv").config();
const express = require("express");
//const mongoose = require('mongoose');
const axios = require("axios");
const cors = require("cors");
const app = express();
//const EmployeeModel = require('./models/Employee')


// CORS configuration
app.use(cors({
  origin: '*', // Be cautious with this in production
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

/*app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect("mongodb+srv://skalai:newsaggregator@cluster0.e52ea.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

app.listen(3001, ()=>{
  console.log("server is running");
})
//register
app.post("/signin", (req,res)=>{
  EmployeeModel.create(req.body)
  .then(employees => res.json(employees))
  .catch(err=> res.json(err))

})

//login
app.post("/login", (req,res)=>{
  const {email,password} =req.body;

  EmployeeModel.findOne({email: email})
  .then(user=> {
    if(user){
      if(user.password === password){
        res.json("Success")
      } else {
        res.json("The password is incorrect")
      }

    }else{
      res.json("No recode esists!")
    }
  }
  )
  .catch(err=> res.json(err))

})

*/

// Helper function for API requests
async function makeApiRequest(url) {
  try {
    const response = await axios.get(url);
    return {
      status: 200,
      success: true,
      message: "Successfully fetched the data",
      data: response.data,
    };
  } catch (error) {
    console.error("API request error:", error.response ? error.response.data : error);
    return {
      status: 500,
      success: false,
      message: "Failed to fetch data from the API",
      error: error.response ? error.response.data : error.message,
    };
  }
}

app.get("/all-news", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 80;
  let page = parseInt(req.query.page) || 1;
  let q = req.query.q || 'world'; // Default search query if none provided

  let url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;
  const result = await makeApiRequest(url);
  res.status(result.status).json(result);
});

app.get("/top-headlines", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 80;
  let page = parseInt(req.query.page) || 1;
  let category = req.query.category || "general";

  let url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${process.env.API_KEY}`;
  const result = await makeApiRequest(url);
  res.status(result.status).json(result);
});

app.get("/country/:iso", async (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 80;
  let page = parseInt(req.query.page) || 1;
  const country = req.params.iso;

  let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.API_KEY}&page=${page}&pageSize=${pageSize}`;
  const result = await makeApiRequest(url);
  res.status(result.status).json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server is running at port ${PORT}`);
});

//node server.js
