class Controller {
	static showHomepage(req, res) {
		let data = req.session.isLogin;
		console.log(data);
		res.render('homepage', { data });
	}
}

module.exports = Controller;
