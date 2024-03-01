const Redis = require('redis');
const hash = require('object-hash');

let redisClient = Redis.createClient();
const redisConnect = async () => {
  await redisClient.connect();
  console.log('Connected to Redis')
};

const reqToKey = (req) => {
  const reqData = {
    query: req.query,
    body: req.body,
  };
  let key = `${req.get('host') + req.originalUrl}@${hash.sha1(reqData)}`;

  let i;
  for (i = 0; i < key.length; i++) {
    if (key[i] == '/') break;
  }
  return key.slice(i + 1);
};


const cacheMiddleware = async (req, res, next) => {
  try {
    let key = reqToKey(req);
    const obj = await redisClient.get(key);

    if (obj) {
      return res.send(JSON.parse(obj));
    } else {
      let json = res.json;
      res.json = async (data) => {
        res.json = json;
        await redisClient.set(key, JSON.stringify(data), {
          Ex: 21600,
        });
        return res.send(data);
      };
      next();
    }
  } catch (error) {
    console.log(error);
  }
};


module.exports = { redisConnect, cacheMiddleware};
