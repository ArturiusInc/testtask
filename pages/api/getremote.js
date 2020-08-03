// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async (req, res) => {
	await axios
		.get(`http://test-task.shtrafovnet.com/fines/${req.body.id}`)
		.then((result) => {
			console.log("result.status:", result.status);
			res.statusCode = result.status;
			res.json(result.data);
		})
		.catch((rej) => {
			console.log("rej.status:", rej.response.status);
			res.statusCode = rej.response.status;
			res.json(null);
		});
};
