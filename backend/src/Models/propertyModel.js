import slugify from "slugify";
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    propertyName:{
        type: String,
        required: [true,"Please enter your property name"]
    },
    description:{
        type : String,
        required:[true,"Please enter your property description"]

    },
    extraInfo:{
        type : String,
        default:"Best property at this rate"
    },
    propertyType:{
        type: String,
        enum:["House","Guest House","Flat","Hotel"],
        deafult:"House"
    },
    roomType:{
        type: String,
        enum:["Anytype","Room","Flat","Entire House"],
        deafult:"Anytype"
    },
    maximumGuest:{
        type:Number,
        required:[true,"Please enter the maximum number of guests"]
    },
    amenities:[
        { 
            name:{
                type:String,
                required:true,
                enum:[
                    "Wifi",
                    "AC",
                    "Kitchen",
                    "Free Parking",
                    "Washing Machine",
                    "Tv"
                ]
            },
            icon:{
                type: String,
                required: true
            }

        }
    ],
    image:{
        type:[
            {
                public_id:{
                    type:String,
                },
                url:{
                    type:String,
                    required:true
                }
                
            }
        ],
        validate:{
            validator: function(arr){
                return arr.length >=6;
            },
            message:"images must be at least 6"
        }
    },
    price:{
        type:Number,
        required:[true,"Please mention the price per night value"],
        default:500

    },
    address:{
        area:String,
        city:String,
        state:String,
        pincode:Number
    },
    //
    currentBookings:[
        {
            bookingId:{
                type:mongoose.Schema.Types.ObjectId,
                ref: "Booking"
            },
            fromDate:{
                type:Date
            },
            toDate:{
                type:Date
            },
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref: "User"

            }
        }

    ],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    slug:String,
    checkInTime:{type:String,default:"11:00"},
    checkOutTime:{type:String,default:"13:00"}
})

propertySchema.pre("save",function(){
    this.slug = slugify(this.propertyName,{lower:true});
    
})

propertySchema.pre("save",function(){
    this.address.city = this.address.city.toLowerCase().replaceAll(" ","")
    
})

//const Property = mongoose.model("Property",propertySchema);
const Property = mongoose.models.Property || mongoose.model("Property",propertySchema);
export{Property};