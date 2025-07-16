import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };
async function dbConnect() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then((mongoose) => mongoose);
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

const scoreSchema = new mongoose.Schema({
    player: String,
    wins: Number,
    losses: Number,
    ties: Number
});
const Score = mongoose.models.Score || mongoose.model('Score', scoreSchema);

export default async function handler(req, res) {
    await dbConnect();
    const player = 'default-player';

    if (req.method === 'GET') {
        let data = await Score.findOne({ player }) || await Score.create({ player, wins: 0, losses: 0, ties: 0 });
        return res.json(data);
    }

    if (req.method === 'POST') {
        const { wins, losses, ties } = req.body;
        let data = await Score.findOneAndUpdate({ player }, { wins, losses, ties }, { new: true, upsert: true });
        return res.json(data);
    }
    res.status(405).json({ message: 'Method Not Allowed' });
}
