var express     = require("express"),
    router      = express.Router(),
    Customer     = require("../models/customer"),
    Product     = require("../models/product");

router.get("/", (req, res) => {
   var cusId = res.locals.current.customer._id;

   if(cusId)
   Customer.findById(cusId)
      .then(async cus => {
            const products = [];
            for (let i = 0; i < cus.products.length; i++) {
               var prod = await Product.findById(cus.products[i]);
               products.push(prod);
            }
            res.render("../views/myProducts/myProducts.ejs", {products})
      })
});

router.post('/add', (req, res) => {
   const {pid} = req.body;
   var cusId = res.locals.current.customer._id;

   if(cusId)
   Customer.findById(cusId)
      .then(cus => {
         let s = true;
         for (let i = 0; i < cus.products.length; i++) {
            if(cus.products[i] == pid)
               s = false;
         }
         if(s)
            cus.products.push(pid);
         cus.save()
            .then(res.redirect('/myProducts'));
      })
})

router.post('/delete', (req, res) => {
   const {pid} = req.body;
   var cusId = res.locals.current.customer._id;

   if(cusId)
   Customer.findById(cusId)
      .then(cus => {
         for (let i = 0; i < cus.products.length; i++) {
            if(cus.products[i] == pid)
               cus.products.splice(i,1)
         }
         cus.save()
            .then(res.redirect('/myProducts'));
      })
})

module.exports = router;