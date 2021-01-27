const isProduction = process.env.NODE_ENV === "production"

module.exports = {
  publicPath: isProduction ? "./" : "/",
  devServer: {
    port: 8180,
    open: false
  },
  productionSourceMap: process.env.NODE_ENV !== "production"
}
