'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const axios = require('axios')


Route.get('/', () => {
 
})
Route.resource('register', 'RegisterController')
Route.resource('login', 'LoginController')
Route.resource('adressList', 'AdressListController').middleware(['auth'])
Route.resource('userProfile', 'UserProfileController').middleware(['auth'])
Route.resource('product', 'ProductController')
Route.resource('cart', 'CartController')
Route.resource('voucher', 'VoucherController')
Route.resource('shipping', 'ShippingController')
Route.resource('payment', 'PaymentController')
Route.resource('invoice', 'InvoiceController')
Route.get('/logout', async ({ response, auth }) => {
  try {
    const User = await auth.logout()
    console.log(User)
    response.json({ message: "you have been logout" })
  } catch (e) {
    console.log(e)
    response.json({ error: e })
  }
})
