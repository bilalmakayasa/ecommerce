'use strict'

const Mail = use('Mail')
const User = use('App/Models/User')
const Hash = use('Hash')
const View = use('View')
const validator = use('validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with registers
 */
class RegisterController {
  /**
   * Show a list of all registers.
   * GET registers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new register.
   * GET registers/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new register.
   * POST registers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, view }) {
    try {
      const { email, password } = await request.body
      const randomstring = require("randomstring");
      const random = randomstring.generate();
      const link = 'http://127.0.0.1:3333/Login/';
      const message = link+random;
      const user = await User.create({
        email: email,
        password,
        token:random,
        verifiedAt:null
      })
      const isEmail = validator.isEmail(email)
      const isPassword = validator.isAlphanumeric(password) && password.length > 6
      
      if(isEmail){
        if(isPassword){
          await Mail.send('emails.welcome', {user:message}, (message) => {
            message
              .to(user.email)
              // .from('<from-email>')
              .subject('welcome to ayamperawan '+ user.email)
          })
          response.status(200).json({ email, password })
        }else{
          response.json({error:"your password format is invalid"})
        }
      }else{
        response.json({error:"your email format is invalid"})
      }
    } catch (e) {
      console.error(e)
      return response.status(500).json({})
    }
  }

  /**
   * Display a single register.
   * GET registers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing register.
   * GET registers/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update register details.
   * PUT or PATCH registers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a register with id.
   * DELETE registers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = RegisterController
