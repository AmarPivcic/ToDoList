import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
var day = [];
var work = [];


app.get("/", (req, res) => {
  res.render("index.ejs", {
    elements: day,
    today: new Date().getDate(),
    month: new Date().toLocaleString('default', { month: 'long' })
  });
  });

app.get("/work", (req,res)=>{
  res.render("work.ejs", {
    elements: work
  });
  });

app.post("/", (req, res)=>{
  var newItem = req.body["newItem"];
  if(newItem!="")
  {
    day.push(newItem);
  }
  res.render("index.ejs", {
    elements: day,
    today: new Date().getDate(),
    month: new Date().toLocaleString('default', { month: 'long' })
  });
});

app.post("/submit", (req, res)=>{
  var newItem = req.body["newItem"];
  if(newItem!="")
  {
    work.push(newItem);
  }
  res.render("work.ejs", {
    elements: work
  });
});

app.post("/deleteday", (req, res) => {
  var index = req.body["checkbox"];
  var temp = [];
  for(var i = 0; i < day.length; i++)
  {
    if(i!=index)
    {
      temp.push(day[i]);
    }
  }
  day=temp;
  temp=[];
  res.render("index.ejs", {
    elements: day,
    today: new Date().getDate(),
    month: new Date().toLocaleString('default', { month: 'long' })
  })
});

app.post("/delete", (req, res) => {
  var index = req.body["checkbox"];
  var temp = [];
  for(var i = 0; i < work.length; i++)
  {
    if(i!=index)
    {
      temp.push(work[i]);
    }
  }
  work=temp;
  temp=[];
  res.render("work.ejs", {
    elements: work
  })
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });