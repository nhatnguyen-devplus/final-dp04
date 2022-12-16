import express from 'express'
import { ResponseBase } from '../generals'
const { WebClient } = require('@slack/web-api')

const token = process.env.SLACK_TOKEN
const web = new WebClient(token)

const sendCreatedUser = async (req, res) => {
    try{
        const result = await web.chat.postMessage({
          scopes: ['chat:write'],
          text: `Created a new ${req.role} with name: ${req.name}`,
          channel: 'C04EQRRTNH5',
        })
    }
    catch(err){
        console.log(err);
    }
}

const getChannels = async (req,res)=> {
    try{
        const result = await web.conversations.list()
        console.log(result);
        return ResponseBase.responseJsonHandler(result, res, 'Get list users')
    }
    catch(err){
        console.log(err);
    }
}

export const slackController = {
  sendCreatedUser,
  getChannels,
}
