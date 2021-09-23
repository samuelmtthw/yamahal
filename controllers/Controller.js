class Controller {
	static showHomepage(req, res) {
		let session = req.session;
		res.render('homepage', { session });
	}
}

module.exports = Controller;
