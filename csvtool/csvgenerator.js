//. csvgenerator.js
var axios = require( 'axios' );
var parser = require( 'fast-xml-parser' );
var fs = require( 'fs' );

if( process.argv.length < 3 ){
  console.log( 'Usage: node csvgenerator [csvfilename]' );
  process.exit( 1 );
}else{
  var csvfilename = process.argv[2];
  var rss = {
    //. category: url
    //. https://news.yahoo.co.jp/rss
    '経済': 'https://news.yahoo.co.jp/rss/topics/business.xml',
    'IT': 'https://news.yahoo.co.jp/rss/topics/it.xml',
    'エンタメ': 'https://news.yahoo.co.jp/rss/topics/entertainment.xml',
    '科学': 'https://news.yahoo.co.jp/rss/topics/science.xml',
    'スポーツ': 'https://news.yahoo.co.jp/rss/topics/sports.xml'
  };

  var cnt = 0;
  var lines = '';
  Object.keys( rss ).forEach( async function( category ){
    var url = rss[category];
    //console.log( 'category = ' + category + ', url = ' + url );

    axios.get( url ).then( async function( result ){
      var xml = result.data;
      var obj = parser.parse( xml );
      if( obj && obj.rss && obj.rss.channel && obj.rss.channel.item && obj.rss.channel.item.length ){
        for( var i = 0; i < obj.rss.channel.item.length; i ++ ){
          var item = obj.rss.channel.item[i];
          var title = item.title.split( ',' ).join( '' );
          var desc = item.description.split( ',' ).join( '' );
          var line = title + ' ' + desc + ',' + category + '\n';
          lines += line;
        }
      }
      cnt ++;
      if( cnt == 5 ){
        //. ファイルに同期的に追記
        fs.writeFileSync( csvfilename, lines.trim() );
      }
    });
  });
}
