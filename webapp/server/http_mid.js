/**
 * Created by boebel on 26.09.2017.
 */



const fs = require('fs');
const path = require('path');
const url = require('url')

exports = module.exports = {}

/**
 * GetAll Files mentioned in HTML and CSS scripts
 * @type {{}}
 */
exports.getDependencies = async function() {
  let files = {};
  await fs.readdir('public', (error, data) => {
    data.forEach(name => {
      files[`${name}`] = fs
        .readFileSync(path.join(__dirname, 'public', `${name}`), {encoding: 'utf8'})
        .split('\n')
        .filter(line => line.match(/src *?= *?"(.*)"/) != null)
        .map(line => line.match(/src *?= *?"(.*)"/)[1])
    })
  });
  console.log(files);
  return files;
}

exports.pushFiles = function(request, response, next, files) {
  let urlName = url.parse(request.url).pathname.substr(1);
  if (urlName === '' || urlName === '/') urlName = 'index.html';
  console.log('Request for: ', urlName);
  if (files[urlName]) {
    let assets = files[urlName]
      .filter(name => (name.substr(0, 4) != 'http'))
      .map((fileToPush) => {
        let fileToPushPath = path.join(__dirname, 'public', fileToPush);
        return (cb) => {
          fs.readFile(fileToPushPath, (error, data) => {
            if (error) return cb(error);
            console.log('Will push: ', fileToPush, fileToPushPath);
            try {
              response.push(`/${fileToPush}`, {}).end(data);
              cb()
            } catch (e) {
              cb(e)
            }
          })
        }
      });

    // Uncomment to disable server push
    // assets = []
    console.log('Total number of assets to push: ', assets.length)
    assets.unshift((cb)=>{
      fs.readFile(path.join(__dirname, 'public', urlName), (error, data)=>{
        if (error) return cb(error)
        response.write(data)
        cb()
      })
    })

    require('neo-async').parallel(assets,(results)=>{
      response.end();
    });
  }else {
    return next();
  }
}