const {createClient}=require('redis')

exports.connect = async () => {
    const redisClient = createClient({
      url: process.env.REDIS_URL,
    });
    redisClient.connect();
    exports.redisClient = redisClient;
  
  };