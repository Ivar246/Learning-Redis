import redis from 'redis'

let client = redis.createClient()

client.on('connect', () => {
    console.log("connected")
});


// check key exists 
const isKey = (key) => {
    client.exists(key, (err, reply) => {
        if (reply === 1) {
            console.log('exist');
        } else {
            console.log("doesn't exist");
        }
        console.log(err)
    })
}

await client.connect();
(async () => {
    try {
        // string
        await client.set("username", "raivshrestha");
        await client.expire('username', 0.2)
        const username = await client.get("username");

        console.log('Username:', username);
        await client.del(['frameworks'])
        // storing hash
        // await client.HSET('frameworks', { 'javascript': 'react', 'python': 'django' });
        const framework = await client.HGETALL('frameworks');

        // storing lists
        // await client.rPush('library', ['pandas', 'matplotlib']);
        // const library = await client.lRange('library', 0, -1)
        // console.log(library)

        // storing sets
        await client.sAdd("tags", ['angularjs', 'backbonejs', 'embrjs']);
        const sets = await client.sMembers('tags')
        console.log(sets)

        // check keys exists
        const reply = await client.exists(["tags"])
        console.log(reply)
        console.log()

    } catch (error) {
        console.error("Error:", error);
    }
})();