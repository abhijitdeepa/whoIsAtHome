const express = require('express');
const find = require('local-devices');
const app = express();
const port = 3000;
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//add the macs of the devices you want to track and the names
const peopleAndIp=[
    {
        name:"😺",
        macs:[]
    },
    {
        name:"😘",
        macs:[]
    },
    {
        name:"👧",
        macs:[]
    }
    ,{
        name:"👦",
        macs:[]
    }
];

app.get('/check', (req, res) => {
    let nameIsHome =[];

find().then(devices => {
    for(let i=0;i<peopleAndIp.length;i++){
        for(let j=0;j<peopleAndIp[i].macs.length;j++){
            for(let k=0;k<devices.length;k++){
                if(peopleAndIp[i].macs[j] === devices[k].mac){
                    nameIsHome.push(peopleAndIp[i].name);
                }
            }
        }
    }
}).then(()=>{
    res.send(nameIsHome);

}
);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
