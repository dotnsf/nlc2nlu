//. my_nlc.js
var nlcv1 = require( 'ibm-watson/natural-language-classifier/v1' );
var { IamAuthenticator } = require( 'ibm-watson/auth' );

var settings = require( './settings' );

exports.nlc = new nlcv1({
  version: '2021-08-01',
  authenticator: new IamAuthenticator({
    apikey: settings.nlc_apiKey
  }),
  //serviceUrl: settings.nlc_url
  url: settings.nlc_url
});

