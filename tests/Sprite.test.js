/**
 * @jest-environment jsdom
 */

const log = console.log;
global.p5 = require('p5');
global.planck = require('planck');
require('../v3/p5.play.js');

test('Sprite : constructors', () => {
	const sketch = (p) => {
		let s;

		p.setup = () => {
			new p.Canvas(400, 400);
			p.noLoop();

			s = new p.Sprite();
			expect(s).toBeInstanceOf(p.Sprite);
			expect(s.shape).toBe('box');
			expect(s.x).toBe(200);
			expect(s.y).toBe(200);
			expect(s.width).toBe(50);
			expect(s.w).toBe(50);
			expect(s.height).toBe(50);
			expect(s.h).toBe(50);
			s.remove();
			expect(s.removed).toBe(true);

			expect(() => new p.Sprite(10)).toThrow();

			s = new p.Sprite(0, 0);
			expect(s.shape).toBe('box');
			expect(s.x).toBe(0);
			expect(s.y).toBe(0);
			expect(s.w).toBe(50);
			expect(s.h).toBe(50);
			s.remove();

			s = new p.Sprite(0, 0, 40);
			expect(s.shape).toBe('circle');
			expect(s.x).toBe(0);
			expect(s.y).toBe(0);
			expect(s.diameter).toBe(40);
			expect(s.d).toBe(40);
			expect(s.w).toBe(40);
			expect(s.h).toBe(40);
			s.remove();

			s = new p.Sprite(0, 0, 40, 60);
			expect(s.shape).toBe('box');
			expect(s.x).toBe(0);
			expect(s.y).toBe(0);
			expect(s.w).toBe(40);
			expect(s.h).toBe(60);
			s.remove();
		};
	};
	new p5(sketch);
});

test('Sprite : properties', () => {
	const sketch = (p) => {
		let s;

		p.setup = () => {
			new p.Canvas(400, 400);
			p.noLoop();

			s = new p.Sprite();
			s.x = 5;
			expect(s.x).toBe(5);
			s.y = 10;
			expect(s.y).toBe(10);

			s.w = 15;
			expect(s.w).toBe(15);
			expect(s.hw).toBe(7.5);
			s.h = 20;
			expect(s.h).toBe(20);
			expect(s.hh).toBe(10);

			s.rotation = 25;
			expect(s.rotation).toBeCloseTo(25);
			s.rotationSpeed = 30;
			expect(s.rotationSpeed).toBeCloseTo(30);
			s.rotationSpeed = 0;
			expect(s.rotationSpeed).toBe(0);

			s.color = 'red';
			expect(s.color).toBeInstanceOf(p5.Color);
			expect(s.color.levels).toEqual([255, 0, 0, 255]);
			s.color = p.color('#00ff00');
			expect(s.color).toBeInstanceOf(p5.Color);
			expect(s.color.levels).toEqual([0, 255, 0, 255]);

			s.textColor = 'red';
			expect(s.textColor).toBeInstanceOf(p5.Color);
			expect(s.textColor.levels).toEqual([255, 0, 0, 255]);
			s.textColor = p.color('#0000ff');
			expect(s.textColor).toBeInstanceOf(p5.Color);
			expect(s.textColor.levels).toEqual([0, 0, 255, 255]);

			s.textSize = 35;
			expect(s.textSize).toBe(35);
			s.text = 'hello';
			expect(s.text).toBe('hello');

			s.d = 20;
			expect(s.shape).toBe('circle');
			expect(s.d).toBe(20);
			expect(s.w).toBe(20);
			expect(s.h).toBe(20);

			s.collider = 'static';
			expect(s.collider).toBe('static');
			s.collider = 'dynamic';
			expect(s.collider).toBe('dynamic');
			s.collider = 'kinematic';
			expect(s.collider).toBe('kinematic');
			s.collider = 'none';
			expect(s.collider).toBe('none');
		};
	};
	new p5(sketch);
});

test('Sprite : physics', () => {
	const sketch = (p) => {
		let s0, s1;

		p.setup = () => {
			new p.Canvas(400, 400);

			s0 = new p.Sprite(10, 0);

			s1 = new p.Sprite(100, 10, 50, 'static');
		};

		p.draw = () => {
			if (frame == 1) {
				expect(s0.x).toBe(10);
				expect(s0.y).toBe(0);
				expect(s1.x).toBe(100);
				expect(s1.y).toBe(0);
				p.world.gravity.y = 10;
			}
			if (frame == 2) {
				expect(s0.x).not.toBe(10);
				expect(s0.y).not.toBe(0);
				expect(s0.vel.x).toBe(0);
				expect(s0.vel.y).not.toBe(0);
				expect(s1.x).toBe(100);
				expect(s1.y).toBe(0);
				p.noLoop();
			}
		};
	};
	new p5(sketch);
});

test('Sprite : move, moveTo, moveAway, moveTowards', () => {
	const sketch = (p) => {
		let s;

		p.setup = async () => {
			new p.Canvas(400, 400);

			s = new p.Sprite();

			await expect(s.move(180, 10, 100)).resolves.toBe(undefined);
			expect(s.x).toBe(200);
			expect(s.y).toBe(100);

			await expect(s.move('up', 10, 100)).resolves.toBe(undefined);
			expect(s.x).toBe(100);
			expect(s.y).toBe(100);

			await expect(s.moveTo(10, 20)).resolves.toBe(undefined);
			expect(s.x).toBe(10);
			expect(s.y).toBe(20);
		};

		p.draw = () => {};
	};
	new p5(sketch);
});

test('Sprite : chain and polygon constructors', () => {
	const sketch = (p) => {
		let s;

		p.setup = () => {
			new p.Canvas(400, 400);
			p.noLoop();

			s = new p.Sprite([
				[0, 10],
				[20, 30]
			]);
			expect(s.shape).toBe('chain');
			expect(s.x).toBe(0);
			expect(s.y).toBe(10);
			log(s.w, s.h);
			// expect(s.w).toBe(50);
			// expect(s.h).toBe(50);
			s.remove();

			expect(() => new p.Sprite(10)).toThrow();
		};
	};
	new p5(sketch);
});
