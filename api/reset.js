export default async function handler(req, res) {
    await dbConnect();
    await Score.findOneAndUpdate({ player: 'default-player' }, { wins: 0, losses: 0, ties: 0 });
    res.json({ message: 'Score Reset' });
}
