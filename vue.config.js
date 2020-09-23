module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === "production" ?
    "/vue_test_messange/" : "/"
};