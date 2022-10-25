let express = require("express");
let axios = require("axios");
let app = express();
let port = process.env.PORT || 3000;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";    //certificate을 받기 위해서 

app.use(express.static("public_html"));
app.listen(port, () => {
  console.log("HTML 연결");
});

app.get("/pharmach_list", (req, res) => {
  let api = async () => {
      let response = null;
      try {            
          response = await axios.get("https://apis.data.go.kr/3510500/veterinary_hospital/getList", {
              params: {
                  "serviceKey": "wDae1r0rzcfFkTIKY+GbEWyBmnEvfC16u8UDMbFl8rBgaSbmSjc/KQ3sI5omd0d/pB2Hh8bXMZkXEd+tKDM4gA==",
                  "pageNo": req.query.pageNo,
                  "numOfRows": req.query.numOfRows,
                  "type": req.query.type               
              }
          })
      }
      catch(e) {
          console.log(e);
      }

      
      return response;            
  }
  api().then((response) => {
      res.setHeader("Access-Control-Allow-Origin", "*"); 
      res.json(response.data.response.body);
  });
});




