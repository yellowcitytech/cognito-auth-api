const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

// phone / email address
function addAttribute(name, value) {

    var attribute = {
      Name: name,
      Value: value
    };

    return new AmazonCognitoIdentity.CognitoUserAttribute(attribute);

}

exports.addAttribute = addAttribute;