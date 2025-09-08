import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// inngest function to save user data to a database
export const syncUserCreation = inngest.createFunction(
    {
        id : 'sync-user-from-clerk' 
    },{
        event : 'clerk/user.created'
    }
  , async({ event })=>{
    const {id, first_name, last_name, email_addresses, profile_image_url} = event.data;
    const userData = {
        _id : id ,
        name : `${first_name} ${last_name}`,
        email : email_addresses[0].email_address,
        imageUrl : profile_image_url,
        
    }
    await connectDB()
    await User.create(userData)
    }
)

// inngest function to update user data in database

export const syncUserUpadtion = inngest.createFunction(
    {
        id : 'update-user-from-clerk'
    }, {
        event : 'clerk/user.updated'
    }, async ({event})=>{
        const {id, first_name, last_name, email_addresses, profile_image_url} = event.data;
        const userData = {
            _id : id ,
            name : `${first_name} ${last_name}`,
            email : email_addresses[0].email_address,
            imageUrl : profile_image_url,
        }
        await connectDB()
        await User.findByIdAndUpdate(id, userData)
    }
)

// .. inngest function to delete user from database

export const syncUserDelection = inngest.createFunction(
    {
        id : 'delete-user-from-clerk'
    }
    ,{
        enent : ' clerk/user.deleted'
    },
    async ({event })=>{
        const {id} = event.data;
        await connectDB()
        await User.findByIdAndDelete(id)
    }
)
