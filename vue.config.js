module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/AccessMTS/'
    : '/'
//   devServer: {
//     proxy: {
//         '/access/' : {
//             target: 'http://localhost:3000'
//         }
//     }
// }
}
