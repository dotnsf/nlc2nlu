//. nlc.js
var fs = require( 'fs' );
var my = require( './my_nlc' );
var settings = require( './settings' );

if( process.argv.length < 3 ){
  console.log( 'Usage: node nlc [command] [option]' );
  console.log( '         node nlc create [csvfilename]' );
  console.log( '         node nlc status' );
  console.log( '         node nlc classify [text] [classifier_id]' );
  console.log( '         node nlc delete [classifier_id]' );
  process.exit( 0 );
}else{
  var command = process.argv[2];
  switch( command ){
  case 'create':
    if( process.argv.length < 4 ){
      console.log( 'Usage: node nlc create [csvfilename]' );
      process.exit( 0 );
    }else{
      var csvfilename = process.argv[3];
      var training_metadata = '{"language":"' + settings.nlc_language + '","name":"' + settings.nlc_name +  '"}';
      var params = {
        trainingMetadata: new Buffer( training_metadata, 'UTF-8' ),
        trainingData: fs.createReadStream( csvfilename ),
      };
      my.nlc.createClassifier( params ).then( function( result ){
        console.log( JSON.stringify( result, null, 2 ) );
        process.exit( 0 );
      }).catch( function( err ){
        console.log( { err } );
        process.exit( 1 );
      });
    }
    break;
  case 'status':
    my.nlc.listClassifiers().then( function( result ){
      //console.log( JSON.stringify( result, null, 2 ) );
      //process.exit( 0 );
      if( result && result.result && result.result.classifiers ){
        for( var i = 0; i < result.result.classifiers.length; i ++ ){
          var classifier_id = result.result.classifiers[i].classifier_id;
          my.nlc.getClassifier( { classifierId: classifier_id } ).then( function( result ){
            console.log( JSON.stringify( result, null, 2 ) );
            process.exit( 0 );
          }).catch( function( err ){
            console.log( { err } );
            process.exit( 1 );
          });
        }
      }else{
        process.exit( 0 );
      }
    }).catch( function( err ){
      console.log( { err } );
      process.exit( 1 );
    });
    break;
  case 'classify':
    if( process.argv.length < 5 ){
      console.log( 'Usage: node nlc classify [text] [classifier_id]' );
      process.exit( 0 );
    }else{
      var text = process.argv[3];
      var classifier_id = process.argv.length > 3 ? process.argv[4] : '';
      var params = {
        classifierId: classifier_id,
        text: text
      };
      my.nlc.classify( params ).then( function( result ){
        console.log( JSON.stringify( result, null, 2 ) );
        process.exit( 0 );
      }).catch( function( err ){
        console.log( { err } );
        process.exit( 1 );
      });
    }
    break;
  case 'delete':
    if( process.argv.length < 4 ){
      console.log( 'Usage: node nlc delete [classifier_id]' );
      process.exit( 0 );
    }else{
      var classifier_id = process.argv[3];
      my.nlc.deleteClassifier( { classifierId: classifier_id } ).then( function( result ){
        console.log( JSON.stringify( result, null, 2 ) );
        process.exit( 0 );
      }).catch( function( err ){
        console.log( { err } );
        process.exit( 1 );
      });
    }
    break;
  default:
    console.log( 'Usage: node nlc [command] [option]' );
    console.log( '         node nlc create [csvfilename]' );
    console.log( '         node nlc status' );
    console.log( '         node nlc classify [text] [classifier_id]' );
    console.log( '         node nlc delete [classifier_id]' );
    process.exit( 0 );
    break;
  }
}
