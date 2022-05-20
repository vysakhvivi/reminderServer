const db = require('./db')

const register = (acno, pswd, accntname) => {

  return db.User.findOne({ acno })
    .then(user => {
      if (user) {
        return {
          statuscode: 401,
          status: false,
          message: "Account number already Exists.."
        }
      }
      else {
        const newUser = new db.User({
          acno,
          accntname,
          pswd,
          events: []
        })
        newUser.save()
        return {
          statuscode: 200,
          status: true,
          message: " Successfully registered.. Log in Please !!"
        }
      }
    })
}

const login = (acno, pswd) => {

  return db.User.findOne({ acno, pswd })
    .then(user => {
      if (user) {
        console.log(user);
        currentuser = user.accntname
        currentacno = acno
        return {
          statuscode: 200,
          status: true,
          message: " Successfully Logged in",
          currentacno,
          currentuser
        }
      }
      else {
        return {
          statuscode: 401,
          status: false,
          message: "Incorrect Credentials"
        }
      }
    })

}

const addevent = (acno,date,time, des,uid) => {

  return db.User.findOne({ acno })
    .then(user => {
      if (user) {
        
        user.events.push({
          date: date,
          time:time,
          description: des,
          uid:uid
        })

        user.save()
        return {
          statuscode: 200,
          status: true,
          message: "The reminder has been successfully saved"
        }

      }
      else {
        return {
          statuscode: 401,
          status: false,
          message: "Incorrect Data"
        }
      }

    })

}

const events = (acno) => {

  return db.User.findOne({ acno })
    .then(user => {
      if (user) {
        return {
          statuscode: 200,
          status: true,
          events: user.events
        }
      }
      else {
        return {
          statuscode: 401,
          status: false,
          message: "User doesnot Exists..Please Register..!!! "
        }
      }
    })
}

const deleteacc = (acno) => {
  return db.User.deleteOne({ acno })
    .then(user => {
      if (!user) {
        return {
          statuscode: 401,
          status: false,
          message: "Operation Failed !! "
        }
      }
      else {
        return {
          statuscode: 200,
          status: true,
          message: "Account number " + acno + " deleted Successfully.."
        }
      }
    })
}

//geet

const deleteEvent = (toDeleteEventId) => {
  return db.User.findOne({ uid: req.tokenUserId }).then((user) => {
    if (user) {
      //console.log(user.reminderevent.toDeleteEventId);
      const result = user.event.filter(
        (reminderObj) => reminderObj.id !== toDeleteEventId
      );

      user.reminderevent = result;
      user.save();
      console.log(user);

      return {
        statusCode: 200,
        status: true,
        message: 'Event deleted!!',
      };
    } else {
      return {
        statusCode: 401,
        status: false,
        message: 'operation failed!!',
      };
    }
  });
};


const updateevent=(date,time,des,uid)=>{
  console.log(db.user.findOne({uid:uid}));
  return db.user.findOne({uid:uid})
  .then(user => {
    if (user) {
      
      user.events.put({
        date: date,
        description: des,
        time:time
      })

      user.save()
      return {
        statuscode: 200,
        status: true,
        message: "The reminder has been successfully saved"
      }

    }
    else {
      return {
        statuscode: 401,
        status: false,
        message: "Incorrect Data"
      }
    }

  }) 

}








module.exports = {
  register, login, addevent, events, deleteacc, deleteEvent,updateevent
}