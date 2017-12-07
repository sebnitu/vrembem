// Sample Webpack Plugin

const fs = require('fs')

// Constructor based plugin

function SampleWebpackPlugin() {

}

SampleWebpackPlugin.prototype.apply = function(compiler) {

  compiler.plugin('emit', (compiler, callback) => {

    const manifest = JSON.stringify(compiler.getStats().toJson().assetsByChunkName)

    compiler.assets['manifest.js'] = {
      source: function() {
        return manifest
      },
      size: function() {
        return manifest.length
      }
    }
    callback()
  })

}

// Class based plugin
//
// class SampleWebpackPlugin {
//   appy(compiler) {
//     compiler.plugin('run', (compiler, callback) => {
//       console.log('This sample webpack plugin is running!')
//       callback()
//     })
//   }
// }

module.exports = SampleWebpackPlugin
