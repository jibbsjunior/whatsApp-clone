import mongoose from 'mongoose';

const whatsappSchema = mongoose.Schema({
    // name: {
    //     type: String,
    //     require: true
    // },
    // message: {
    //     type: String,
    //     require: true
    // },
    // timeStamp: {
    //     type: String,
    //     require: false,
    //     default: Date.now
    // },
    // received: {
    //     type: Boolean
    // }

    
    //  const whatsappSchema = mongoose.model({
         message: String,
         name: String,
         timeStamp: String,
         received: Boolean
    //  })
});

// exports = mongoose.model("Message", whatsappSchema)
export default mongoose.model("messageContent", whatsappSchema);