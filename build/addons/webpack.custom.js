
module.exports = {
  plugins: [
    function apply() {
      const compiler = this
      console.log('This is a custom plugin test...')
    }
  ]
}