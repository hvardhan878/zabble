const express = require("express")
const app = express()

app.set('view engine','ejs')

app.use(express.static(__dirname + '/views/'))


app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/terms',(req,res)=>{
    res.render('landingpage/page-terms')
})

// app.get('/faq',(req,res)=>{
//     res.render('landingpage/helpcenter-faqs')
// })

app.get('/about',(req,res)=>{
    res.render('landingpage/page-about-us')
})

app.get('/privacy',(req,res)=>{
    res.render('landingpage/page-privacy')
})

app.get('/contact',(req,res)=>{
    res.render('landingpage/page-contact-one')
})

app.post('/contact',(req,res)=>{
    console.log(req.body)
    let mailOptions = {
        from: "hello@zabble.me",
        to:  "hello@zabble.me",
        subject: `Contact Form: ${req.body.name} ${req.body.email}  Subject: ${req.body.subject}`,
        text: req.body.comments,
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error)
        return res.sendStatus(404)   
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
    res.sendStatus(200)
})

app.post('/subscribe',async(req,res)=>{
    var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'https://us6.api.mailchimp.com/3.0/lists/8a72b99702/members',
        'headers': {
            'Authorization': process.env.MAILCHIMP_KEY,
            'Content-Type': 'application/json',
            'Cookie': 'ak_bmsc=5BB0F80A4CF3B1EC370C3900AAEF9B07~000000000000000000000000000000~YAAQJZZUaM0pWQp6AQAAelsHIAzPTakucuGMj11h/LwDFDFuFhVzu8qaTC3jLcBn6J9VaaWJZRegXb+mDjVWmik4rdgoYWPUXtzr3nFiecDK8xYYiPsnE31Bk+cbeaaJ11ORPXuWFw8vUYrnaqhiKHwM0zZP1Kppgs2S2nYeVqcTg4vcm+ZCe2B7QX4IKjqMQCtZOq1P9xcnrARsMAThHL30NFoou9IcwJpcwq1E00c2GjlEl6OQOwBSlBfVi82u96QSpBd961kKzBLov0sRtSUXjz85wW4hzP3ebxHIxcmDjBLKLmPLAAzop/werkuAnH3N77Srmcjln1Jz48GGw78VWc7OsXAE2i+ipS2j5bKadhEZsnpLVLB8//rzv42oCK5EOgI=; bm_sv=79E71444C7B6807074A1A5A61F6F1080~XC5PZa5nCrnUlMascV5Pk//yIgrggX/sT6zabry6zzdOtF/SzModcos5qGb6c0O9aUEoFwOgnHT6U5sixZgOsjYmK6rAT89GoMLexmEgcQ56w8+v8xpsa3mMJ/D8ZalMZ3IUa0PILutyVNHPRQcQ8cK8CBC0puQWpbluOIlXclk='
        },
        body: JSON.stringify({
            "email_address": req.body.email,
            "status": "subscribed"
        })
    };

    request(options, function (error, response) {
        if (error){
            return res.sendStatus(404)
        }
        res.sendStatus(200)
    });

})
  

app.listen(8080,()=>{
    console.log("Listening to 8080")
})