const epxress=require("express");
const app=epxress();
const cors=require("cors");
const mongoose=require("mongoose");

const corsOptions = {
  origin: 'https://64cf492c74696f322a4b9d49--papaya-halva-7de1ec.netlify.app',
  
};
app.use(cors(corsOptions));
app.use(epxress.json());
const port=process.env.PORT||8000;
console.log(port);

app.listen(port,()=>{
    console.log("live at port ${port}");
});





//mongodb+srv://siddakrajpal14:AlVngwMGWw5znV53@cluster0.bru4m1z.mongodb.net/?retryWrites=true&w=majority
const url="mongodb+srv://siddakrajpal14:AlVngwMGWw5znV53@cluster0.bru4m1z.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url,{useNewUrlParser:true});
mongoose.connection.on('connected',()=>{
    console.log("connected");
});

const userschema=mongoose.Schema({
    username:String,
    password:String,
    transctions:[]
});
const model=mongoose.model("User",userschema);

app.get("/",async(req,res)=>{
    const user=model.findOne({username:req.body.username});
    res.json({name:"sidda"});
});
app.post("/",async(req,res)=>{
    console.log(req.body);
    const check=await model.findOne({username:req.body.username});
    if(!check){
    try{
    const user=await model.create({
        username:req.body.username,
        password:req.body.password,
        transctions:[]
    });
    await user.save();
    res.status(200).send("created");
}
    catch(err){
        console.log(err.message);
        res.status(401).send("fail");
    }}else{
        res.status(201).send("alredy");
    }
});

app.post("/signup",async(req,res)=>{
    try{
        const check=await model.findOne({username:req.body.username});
        if(!check){
            res.send("notthere");
        }else{
            if(req.body.password===check.password){
                res.json(check._id);
            }else{
                res.send("notmatch");
            }
        }
    }catch(err){
        console.log(err.message);
    }
});

app.post("/home/:id", async (req, res) => {
    try {
      const user = await model.findOne({ username: req.params.id });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Assuming req.body contains the new transaction data
      const newTransaction = req.body;
  
      // Update the transactions array directly
      user.transctions.push(newTransaction);
  
      // Save the updated user document back to the database
      await user.save();
  
      console.log(user);
  
      res.status(200).json(newTransaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

  app.get("/user/:name",async(req,res)=>{
    try{
    const user=await model.findOne({username:req.params.name});
    console.log(user);
    if(user){
   res.json(user.transctions);
    }else{
        res.send("user not found");
    }}catch(err){
        console.log(err.message);
    };
  });


  app.delete("/:id/:name",async(req,res)=>{
    try {
        const user=await model.findOne({username:req.params.name});
        if(user){
            const demo=user.transctions;
            const upd=[];
            demo.map((item,idx)=>{
                if(item.id!=req.params.id){
                    upd.push(item);
                }
            });
        user.transctions=upd;
        await user.save();

        res.json(upd);
        }else{
            throw new Error('user not found');
        }
    } catch (error) {
        console.log(error.message);
    }
  })
