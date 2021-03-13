var express     = require("express"),
    router      = express.Router(),
    Warehouse   = require("../models/warehouse");

router.get("/", (req, res) => {
   const adminId = res.locals.current.admin._id;
   if (adminId) {
      Warehouse.find({}).populate('Raw')
         .then(warehouses => {
            res.render('../views/warehouse/warehouse.ejs', {warehouses})
         })
   }else {
      res.redirect('/admin/login')
   }
});

router.get("/add", (req, res) => {
   res.render('../views/warehouse/add.ejs')
})

router.post("/", (req, res) => {
   const { wName, wSize, address } = req.body

   Warehouse.findOne({wName})
      .then(warehouse =>{
         if(warehouse){
            return res.redirect('/warehouse')
         }
         const admin = res.locals.current.admin._id;
         const newWarehouse = new Warehouse ({
            wName, wSize, address, admin
         })
         
         newWarehouse.save()
            .then(() => res.redirect('/warehouse'))
      })
})

router.post('/delete', (req, res) => {
   const {wid} = req.body;
   Warehouse.findByIdAndRemove(wid, (err) => {
      if(err){
         console.log(err);
      }else{
         res.redirect('/warehouse')
      }
  });
})

module.exports = router;
