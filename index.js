const express=require('express');
const path =require('path');
const port=1100;
const db=require('./config/mongoose');

const Contact=require('./models/contact');



const app=express();

// to include ejs ,install ejs 'npm install ejs'
// to use ejs, tell app ejs will be view or templete engine

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());    //Middleware
app.use(express.static('assets'));   //to include static files assets


// app.use(function(req,res,next){
//     req.body.name="rahul";
//     next();
// })

var contactlist=[
    // {name:'Rahul',phone:'99349398493'},
    // {name:'rrrr',phone:'33553544'},
    // {name:'rrtr',phone:'353533'}
];


app.get('/',function(req,res){
    // return res.render('home',{title:"my contactlist",contact:contactlist});
    Contact.find({},function(err,contacts){
        if(err){
            console.log("error in fetching contacts from DB");
            return ;
        }
        return res.render('home',{title:"my contactlist",contact:contacts});
        })
    });

app.get('/practice',function(req,res){
    return res.render('practice',{title:"let us play with ejs"})
})

app.post('/create-contact',function(req,res){
    //    
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log("error in creating Contact");
        }
        console.log("********",newContact);
        return res.redirect('back');
    })
})
    // Contact.create(
    //     {
    //         name:req.body.name,
    //         phone:req.body.name
    //     },
    //     function(err,newContact){
    //         if(err){
    //             console.log('error in creating contact')
    //             return ;
    //         }
    //         console.log('********',newContact);
    //         return res.redirect('back');
    //     }
    // )


//     return res.redirect('/')
// })


app.get('/delete-contact',function(req,res){
    // let phone=req.query.phone;
    // let conactIndex=contactlist.findIndex(contact => contact.phone==phone)
    
    // if(conactIndex!=-1){
    //     contactlist.splice(conactIndex,1);
    // }

    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error in deleting contact ");
            return ;
        }
    })
    return res.redirect('/');

}); 

app.listen(port,function(err){
    if(err){
        console.log("error  : ",err)

    }
    console.log("server is running");
})