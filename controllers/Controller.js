class Controller {
	static showHomepage(req, res) {
		let data = req.session;
		console.log(data);
		res.render('homepage', { data });
	}
}

module.exports = Controller;
