let refs = {
	'Sprite.html': {
		0: [
			'x',
			'y',
			'w / width',
			'h / height',
			'd / diameter',
			'r / radius',
			'pos / position',
			'rotation',
			'color / fill',
			'stroke',
			'text',
			'textColor',
			'textSize',
			'visible'
		],
		1: ['collider'],
		2: ['image', 'scale', 'debug'],
		3: ['vel / velocity', 'speed', 'direction', 'move', 'moveTo', 'moveTowards', 'angleTo'],
		5: ['collides', 'colliding', 'collided'],
		6: ['overlaps', 'overlapping', 'overlapped', 'layer', 'remove'],
		7: ['rotate', 'rotateTo', 'rotateTowards', 'rotationSpeed'],
		9: ['bounciness', 'drag', 'friction', 'mass', 'rotationDrag', 'rotationLock'],
		10: ['applyForce', 'applyForceScaled', 'bearing', 'attractTo', 'applyTorque'],
		12: ['shape'],
		13: ['addCollider', 'addSensor'],
		14: ['draw', 'update'],
		15: ['angleTo'],
		'group.html?page=6': ['life'],
		'animation.html?page=2': ['mirror', 'ani', 'addAni'],
		'animation.html?page=4': ['anis', 'addAnis', 'pixelPerfect', 'spriteSheet'],
		'tiles.html?page=0': ['tile'],
		'tiles.html?page=1': ['tileSize'],
		'world.html?page=0': ['allowSleeping', 'sleeping'],
		'input.html?page=3': ['mouse']
	},
	'Group.html': {
		0: ['sprite properties', 'GroupSprite', 'move'],
		1: ['collides', 'amount', 'arrow setters'],
		2: ['overlaps'],
		3: ['allSprites'],
		5: ['remove', 'removeAll', 'SubGroup'],
		'group.html?page=6': ['autoCull', 'cull']
	},
	'Sprite_Animation.html': {
		0: ['animation', 'loadAni / loadAnimation', 'frameDelay'],
		1: ['play', 'stop', 'rewind', 'loop', 'noLoop', 'frame', 'nextFrame', 'previousFrame', 'scale'],
		4: ['offset']
	},
	'Input_Devices.html': {
		0: ['mouse', 'presses', 'pressing', 'released', 'kb / keyboard'],
		4: ['contros / controllers', 'contro'],
		5: ['touches']
	},
	'Joints.html': {
		0: ['GlueJoint'],
		1: ['DistanceJoint'],
		2: ['WheelJoint'],
		3: ['HingeJoint'],
		4: ['SliderJoint']
	},
	'Camera.html': {
		0: ['x', 'y', 'moveTo'],
		1: ['zoom', 'zoomTo'],
		2: ['on', 'off']
	},
	'Canvas.html': {
		0: ['w', 'h', '"w:h"', '"fullscreen"'],
		1: ['"pixelated"'],
		2: ['resize']
	},
	'Tiles.html': {
		0: ['Tiles'],
		1: ['tileSize']
	},
	'World.html': {
		0: ['gravity', 'allowSleeping'],
		1: ['timeScale', 'physicsTime', 'realTime', 'step'],
		2: ['velocityIterations', 'positionIterations']
	},
	'q5.js basics': {
		'https://p5js.org/reference/#/p5': [
			'let',
			'const',
			'===',
			'>=',
			'<',
			'<=',
			'if-else',
			'function',
			'return',
			'boolean',
			'string',
			'number',
			'object',
			'for',
			'while',
			'console',
			'random',
			'round',
			'sin',
			'cos',
			'max',
			'min',
			'dist'
		]
	},
	'q5.js environment': {
		'https://p5js.org/reference/#/p5': [
			'width',
			'height',
			'frameCount',
			'frameRate',
			'noCursor',
			'noLoop',
			'loadImage',
			'loadFont',
			'loadJSON',
			'storeItem',
			'getItem',
			'clearStorage',
			'fullscreen'
		]
	},
	'q5.js 2D': {
		'https://p5js.org/reference/#/p5': [
			'background',
			'clear',
			'color',
			'fill',
			'noFill',
			'stroke',
			'noStroke',
			'circle',
			'rect',
			'line',
			'image',
			'tint',
			'text',
			'textAlign',
			'textSize',
			'textFont'
		]
	},
	'q5.js sound': {
		'https://p5js.org/reference/#/p5': ['loadSound'],
		'https://p5js.org/reference/#/p5.SoundFile': ['play', 'stop', 'loop', 'setVolume', 'pan']
	}
};

let refsDiv = document.getElementById('refs');

for (let refPage in refs) {
	let ref = refs[refPage];
	let className = refPage;
	let p5playRef = true;
	if (className.slice(0, 2) != 'q5') {
		className = className.split('.')[0];
		if (className == 'Sprite_Animation') className = 'Animation';
		if (className == 'Input_Devices') className = 'Input';
		refPage = refPage.toLowerCase();
	} else {
		if (className == 'q5.js basics') className = 'JavaScript basics';
		refPage = 'https://p5js.org/reference';
		p5playRef = false;
	}

	let div = document.createElement('div');
	div.className = 'ref';
	if (className == 'Sprite') div.classList.add('full');
	let heading = document.createElement('h2');
	heading.innerHTML = `<a href="${refPage}">${className}</a>`;
	div.append(heading);
	refsDiv.children[refsDiv.children.length - 2].insertAdjacentElement('afterend', div);

	let links = [];
	for (let pageNum in ref) {
		let url;
		if (pageNum.length <= 2) {
			url = refPage + '?page=' + pageNum;
		} else {
			url = pageNum;
		}
		let topics = ref[pageNum];
		for (let topic of topics) {
			let a = document.createElement('a');
			if (p5playRef) {
				a.href = url;
			} else {
				a.href = url + '/' + topic;
				a.target = '_blank';
			}
			a.innerHTML = topic;
			links.push(a);
		}
	}

	// Step 1: Listen for Input Events
	const searchInput = document.getElementById('searchInput');
	const searchResults = document.getElementById('searchResults');

	searchInput.addEventListener('input', function(event) {
		const searchTerm = event.target.value.toLowerCase();
		
		// Step 2: Filter the References
		const filteredResults = filterReferences(searchTerm);

		// Step 3: Display Results
		displayResults(filteredResults);
	});

	// Function to filter references based on search term
	function filterReferences(searchTerm) {
		const filteredResults = {};
		for (let refPage in refs) {
			const pageResults = refs[refPage];
			for (let pageNum in pageResults) {
				const topics = pageResults[pageNum];
				for (let topic of topics) {
					if (topic.toLowerCase().includes(searchTerm)) {
						if (!filteredResults[refPage]) {
							filteredResults[refPage] = {};
						}
						filteredResults[refPage][pageNum] = [topic];
						break;
					}
				}
			}
		}
		return filteredResults;
	}

	// Function to display filtered results
	function displayResults(filteredResults) {
		searchResults.innerHTML = '';

		for (let refPage in filteredResults) {
			const pageResults = filteredResults[refPage];
			const heading = document.createElement('h3');
			heading.textContent = refPage;
			searchResults.appendChild(heading);

			for (let pageNum in pageResults) {
				const topics = pageResults[pageNum];
				for (let topic of topics) {
					const link = document.createElement('a');
					link.textContent = topic;
					link.href = generateUrl(refPage, pageNum);
					searchResults.appendChild(link);
				}
			}
		}
	}

	// Function to generate URL based on page and section number
	function generateUrl(refPage, pageNum) {
		let url;
		if (pageNum.length <= 2) {
			url = refPage + '?page=' + pageNum;
		} else {
			url = pageNum;
		}
		return url;
	}

	// if (className == 'Sprite') {
	// 	links = [
	// 		...links.slice(0, 4),
	// 		...links.slice(4).sort((a, b) => {
	// 			let aText = a.innerHTML;
	// 			let bText = b.innerHTML;
	// 			if (aText < bText) {
	// 				return -1;
	// 			} else if (aText > bText) {
	// 				return 1;
	// 			} else {
	// 				return 0;
	// 			}
	// 		})
	// 	];
	// }

	for (let link of links) {
		div.append(link);
	}
}

document.body.children[0].style.display = 'flex';
