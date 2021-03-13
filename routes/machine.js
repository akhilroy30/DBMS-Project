var express     = require("express"),
    router      = express.Router(),
    Machine     = require("../models/machine");
    Warehouse     = require("../models/warehouse");
    Raw         = require("../models/raw");

router.get("/", (req, res) => {
   const adminId = res.locals.current.admin._id;
   if (adminId) {
      Machine.find({}, async function(err, machines){
         if(err){
            return console.log(err)
         }

         res.render('../views/machine/machine.ejs', {machines})
      })
   }else {
      res.redirect('/admin/login')
   }
});

router.get("/add", (req, res) => {
   Raw.find({}, function(err, raws){
      if(err){
         console.log(err)
      }
      else{
         res.render('../views/machine/add.ejs', {raws})
      }
   })
})

router.post("/", async (req, res) => {
   const admin = res.locals.current.admin
   const { mName, usage, raws } = req.body
   const rNames = []
   if(raws){
      if(typeof raws == 'string'){
         rNames.push(raws.split(' - ')[0])
      }else {
         for (let i = 0; i < raws.length; i++) {
            rNames.push(raws[i].split(' - ')[0])
         }
      }
   }

   Machine.findOne({mName})
      .then(machine =>{
         if(machine){
            return res.redirect('/machine')
         }
         const newMachine = new Machine ({
            mName, usage, raws: rNames
         })

         Warehouse.findById(admin.warehouse)
            .then(ware => {
               ware.machines.push(newMachine.mName);
               ware.save()
                  .then(ware => {
                     newMachine.warehouse = ware.wName;
                     newMachine.save()
                        .then(() => res.redirect('/machine'))
                  })
                  .catch(err => console.log(err))
            })
      })
})

module.exports = router;
