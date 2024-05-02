// Parse the URL to extract the id_token parameter
(async () => {
	const log = console.log;

	let user;
	let idToken = localStorage.getItem('idToken');

	if (idToken && idToken != 'null') user = jwt_decode(idToken);
	else idToken = null;

	// check if there's no token or if it's expired
	if (!idToken || user.exp < Date.now() / 1000) {
		// tries to get the AWS Cognito id_token from the URL
		let params = location.search;
		if (!params) params = '?' + location.hash.slice(1);
		const urlParams = new URLSearchParams(params);
		idToken = urlParams.get('id_token');
		// save to local storage
		localStorage.setItem('idToken', idToken);

		// if there's no token, display the unauthorized section of the page
		if (!idToken) {
			document.getElementById('noauth').style.display = 'block';
			return;
		}
		// else, decode the token
		user = jwt_decode(idToken);

		// hide the token from the URL
		window.history.pushState(null, '', location.href.split(/[?#]/)[0]);
	}

	window.idToken = idToken; // for debugging

	log(user);

	// show section of page that requires authentication
	document.getElementById('noauth').style.display = 'none';
	document.getElementById('auth').style.display = 'block';

	// Set the user's name in the page
	document.getElementById('username').innerHTML = user.email.split('@')[0];

	let apiUrl = 'https://ntaknarhb9.execute-api.us-west-2.amazonaws.com/prod';

	// let res = await (
	// 	await fetch(apiUrl + '/getUserData', {
	// 		method: 'GET',
	// 		headers: {
	// 			Authorization: idToken,
	// 			'Content-Type': 'application/json'
	// 		}
	// 	})
	// ).json();

	// log(res);
})();
