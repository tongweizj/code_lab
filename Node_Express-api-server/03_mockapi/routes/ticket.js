const express = require('express')
const Json = require('../data/json.js');
const ticket = express.Router()



ticket.get('/api', (req, res) =>{
    
    res.json({ hello: 'world' })
})
ticket.post('/api/ticket', (req, res) =>{
    var action = req.body.action
    if(action == 'permission-check'){
        res.json(json.permissionCheck)
    }else if(action == 'create-ticket'){
        res.json(json.uuid)
    }else if(action == 'edit-ticket'){
        res.json(Json.json.uuid)
    }else if(action == 'customer-list'){
        res.json(Json.json.customerList)
    }else if(action == 'ticket-detail'){
        res.json(Json.json.ticketDetail)
    }else if(action == 'scheduler-list'){
        res.json(Json.json.schedulerList)
    }else if(action == 'staff-list'){
        res.json(Json.json.staffList)
    }else if(action == 'ticket-reply-create'){
        res.json(Json.json.uuid)
    }else if(action == 'ticket-reply-delete'){
        res.json(Json.json.uuid)
    }else{
        res.json({hello: 'world'})
    }
})

const json={
    permissionCheck: {
          "userid":"123456",
          "operator": ["scheduler",]
        },
    createTicket: {"uuid":"123456",}
  };
module.exports = ticket