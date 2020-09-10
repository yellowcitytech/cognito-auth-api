const express = require('express');
const router = express.Router();
const logger = require('../bin/Logger');
const utils = require('../bin/helperFunctions');
const config = require('config');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

//stub in a call to check API key here
router.use('',function(req, res, next) {
  logger.info("calling the function incoming");
  next();
});

// register a new user
router.post('/register-user', function(req, res, next) {

  logger.debug("post - register user");

  let poolData = {
    UserPoolId: process.env.USER_POOL_ID, 
    ClientId: process.env.USER_POOL_CLIENT_ID
  };

  let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  
  let attributeList = [];
  attributeList.push(utils.addAttribute('phone_number','+15555555555'));
  attributeList.push(utils.addAttribute('email','test@test.com'));
  
  userPool.signUp('newuser', 'NewPassword1', attributeList, null, 
    function(err,result) {

      if (err) {
          logger.debug("post - register user - error: " + JSON.stringify(err));
          // TODO - extract the errors out using a generic function
          res.status(400).json({ error: JSON.stringify(err) });
      } else {
        let cognitoUser = result.user;
        res.status(200).send({ message: `${cognitoUser.getUsername()} was created` });
      }

    }
  );
  
});

module.exports = router;
