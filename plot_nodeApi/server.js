const app = require("./routes/index");
const port = process.env.PORT || "8085";
const DatabaseConn = require("./config/dbConfig");
DatabaseConn()
require("dotenv").config();
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
