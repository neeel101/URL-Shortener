const { User } = require("../model/user");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  const all = await User.find({})
  console.log(all);
  await User.create({
     name,  
     email,
     password,
  });
  res.redirect("/")
}
async function handleUserLogin(req, res) {
    const {email, password} = req.body;
    const user = await User.findOne({ email , password });
    if(!user) {
        res.render("login", {error : "invalid credentials"})
    }
    res.redirect("/")

}

module.exports = { handleUserSignUp, handleUserLogin };
