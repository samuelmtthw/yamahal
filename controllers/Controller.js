class Controller {
	static showHomepage(req, res) {
		let data = req.session;
		res.render('homepage', { data });
	}
}

module.exports = Controller;
