const winston=require('winston');
require('winston-mongodb')

const consoleFormat =winston.format.combine(
    winston.format.timestamp({format:"HH:mm:ss:SSS"}),
    winston.format.colorize({all:true}),
    winston.format.colorize({all:true}),
    winston.format.printf(
        (info)=>`${info.timestamp} ${info.level}: ${info.message}`
    )
);

const logger=winston.createLogger({
    transports:[
        new winston.transports.Console({
            format:consoleFormat,
        }),
        // new winston.transports.MongoDB({
        //     level:this.info,
        //     db:process.env.MONGO_URI,
        //     collection:'applicationLogs',
        //     options:{useUnifiedTopology:true}
        // })
    ]
})

module.exports=logger;