var express     = require("express"),
    router      = express.Router(),
    validator   = require("validator")
    Admin       = require("../models/admin");
    Customer    = require("../models/customer");

//LOGIN FORM
router.get("/customer/register", function(req, res) {
   res.render('../views/auth/cregister.ejs');
});

router.post("/customer/register", function(req, res) {
   const { fName, mName, lName, dob, address, phone, email, password } = req.body
   if(phone.length != 10){
      res.locals.current.error = 'Invalid Phone Number'      
      return res.redirect('/customer/register')
   }
   if(!validator.isEmail(email)){
      res.locals.current.error = 'Invalid Email'
      return res.redirect('/customer/register')
   }
   Customer.findOne({email})
      .then( user => {
         if(user){
            return res.redirect('/customer/login')
         }
         const newCus = new Customer ({
            fName, mName, lName, dob, address, phone, email, password
         })
         newCus.save()
            .then(user => res.redirect('/'))
            .catch(err => console.log(err))
      })
});

router.get("/customer/login", function(req, res) {
   res.render('../views/auth/clogin.ejs');
});

router.post("/customer/login", function(req, res) {
   const { email, password } = req.body;
   Customer.findOne({email})
      .then( customer => {
         if(customer){            
            if( customer.password == password){
               res.locals.current.customer = customer
               res.redirect('/')
            }else{
               res.locals.current.error = 'Incorrect Password'
               res.redirect('/customer/login')
            }
         }else{
            res.locals.current.error = 'Customer not Found'
            res.redirect('/customer/register')
         }
      })
});

router.get("/customer/logout", function(req, res) {
   res.locals.current.customer = {}
   res.redirect('/')
})

router.get("/admin/login", function(req, res) {
   res.render('../views/auth/alogin.ejs');
});

router.post("/admin/login", function(req, res) {
   const { username, password } = req.body
   Admin.findOne({username})
   .then( admin => {
      if(admin){
         if( admin.password == password){
            res.locals.current.admin = admin
            res.redirect('/')
         }else{
            res.locals.current.error = 'Incorrect Password'
            res.redirect('/admin/login')
         }
      }else{
         res.locals.current.error = 'Admin not Found'
         res.redirect('/admin/login')
      }
   })
});

router.get("/admin/logout", function(req, res) {
   res.locals.current.admin = {}
   res.redirect('/')
});

module.exports = router;