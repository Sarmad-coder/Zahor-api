let Message = require("./models/message")
let Admin = require("./models/admin")
let User = require("./models/user")
const {notify}=require("./util/notifications")





function message(io) {
    let msg={}
    const ticketNsp = io.of("/ticket")
    ticketNsp.on("connection", (socket) => {
        console.log("socket connected");

        socket.on("newMessage", async (data) => {
            try {
                msg={}
                console.log("new Message came");
                const now = new Date();
                const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const dateString = now.toLocaleDateString([], { weekday: 'long' });

                const formattedDate = `${timeString} ${dateString}`;
                // console.log(formattedDate)
                data.createdAt=formattedDate
                let message = new Message(data)
                await message.save()
                let user=await User.findById(req.body.userId)
                let admin = await Admin.find()
                admin=admin[0]
                console.log(admin.fcm)
                if (data.sender=="user") {
                    
                    notify(user.fcmToken, "New Message", `You recive a new message from admin`)

                    if (user.status == "approve" && user.email) {
                        sendMail(user.email, "New Message", "You recive a new message from admin in Al Zahour App")
                      }
                
                }else{

                    notify(admin.fcmToken, "New Message", `You recive a new message from `+user.phoneNo)
                }
                ticketNsp.emit("getMessage", message)
            } catch (err) {
                console.log(err)
            }
        })
    })
}
module.exports = message