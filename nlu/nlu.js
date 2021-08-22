//. nlu.js
var fs = require( 'fs' );
var my = require( './my_nlu' );
var settings = require( './settings' );

if( process.argv.length < 3 ){
  console.log( 'Usage: node nlu [command] [option]' );
  console.log( '         node nlu create [csvfilename]' );
  console.log( '         node nlu status' );
  console.log( '         node nlu analyze [text] [model_id]' );
  console.log( '         node nlu delete [model_id]' );
  process.exit( 0 );
}else{
  var command = process.argv[2];
  switch( command ){
  case 'create':
    if( process.argv.length < 4 ){
      console.log( 'Usage: node nlu create [csvfilename]' );
      process.exit( 0 );
    }else{
      var csvfilename = process.argv[3];
      var params = {
        language: settings.nlu_language,
        trainingData: fs.createReadStream( csvfilename ),
        trainingDataContentType: 'text/csv',
        name: settings.nlu_name,
        modelVersion: '1.0.0'
      };
      my.nlu.createClassificationsModel( params ).then( function( result ){
        console.log( JSON.stringify( result, null, 2 ) );
        process.exit( 0 );
      }).catch( function( err ){
        console.log( { err } );
        process.exit( 1 );
      });
    }
    break;
  case 'status':
    my.nlu.listClassificationsModels().then( async function( result ){
      console.log( JSON.stringify( result, null, 2 ) );
      process.exit( 0 );
    }).catch( function( err ){
      console.log( { err } );
      process.exit( 1 );
    })
    break;
  case 'analyze':
    if( process.argv.length < 5 ){
      console.log( 'Usage: node nlu analyze [text] [model_id]' );
      process.exit( 0 );
    }else{
      var text = process.argv[3];
      var model_id = process.argv.length > 3 ? process.argv[4] : '';
      var params = {
        text: text,
        language: settings.nlu_language,
        features: { classifications: { model: '' } }
      };
      if( model_id ){
        var classifications = { model: model_id };
        var features = { classifications: classifications };
        params.features = features;
      }
      my.nlu.analyze( params ).then( function( result ){
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
      console.log( 'Usage: node nlu delete [model_id]' );
      process.exit( 0 );
    }else{
      var model_id = process.argv[3];
      my.nlu.deleteClassificationsModel( { modelId: model_id } ).then( function( result ){
        console.log( JSON.stringify( result, null, 2 ) );
        process.exit( 0 );
      }).catch( function( err ){
        console.log( { err } );
        process.exit( 1 );
      });
    }
    break;
  default:
    console.log( 'Usage: node nlu [command] [option]' );
    console.log( '         node nlu create [csvfilename]' );
    console.log( '         node nlu status' );
    console.log( '         node nlu analyze [text] [model_id]' );
    console.log( '         node nlu delete [model_id]' );
    process.exit( 0 );
    break;
  }
}
