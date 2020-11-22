describe('main.js', () => {
	describe('calculate()', () => {
		it('validates expression when the first number is invalid', function() {
			// spyon this method
			// and.stub() == don't return anything just track the calls on it
			spyOn(window, 'updateResult').and.stub();

			calculate('a+3');

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized');
			expect(window.updateResult).toHaveBeenCalledTimes(1);
		});

		it('validates expression when the second number is invalid', function() {
			spyOn(window, 'updateResult');

			calculate('3+a');

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized');
			expect(window.updateResult).toHaveBeenCalledTimes(1);
		});

		it('validates expression when operation is invalid', function() {
			spyOn(window, 'updateResult');

			calculate('3_4');

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized');
			expect(window.updateResult).toHaveBeenCalledTimes(1);
		});

		it('calls add', function() {
			const spy = spyOn(Calculator.prototype, 'add');

			calculate('3+4');

			// if not assigned to a variable
			// expect(Calculator.prototype.add).toHaveBeenCalledTimes(2);
			expect(spy).toHaveBeenCalledTimes(2);
			expect(spy).toHaveBeenCalledWith(3);
			expect(spy).toHaveBeenCalledWith(4);
		});


		it('calls subtract', function() {
			const spy = spyOn(Calculator.prototype, 'subtract');

			calculate('3-7');

			expect(spy).toHaveBeenCalled();
			expect(spy).toHaveBeenCalledWith(7);
		});

		it('calls multiply', function() {
			const spy = spyOn(Calculator.prototype, 'multiply');

			calculate('3*8');

			expect(spy).toHaveBeenCalled();
			expect(spy).toHaveBeenCalledWith(8);
		});

		it('calls divide', function() {
			const spy = spyOn(Calculator.prototype, 'divide');

			calculate('3/2');

			expect(spy).toHaveBeenCalled();
			expect(spy).not.toHaveBeenCalledWith(3);
			expect(spy).toHaveBeenCalledWith(2);
		});

		// usually you wouldn't do this
		it('calls updateResult ( example using and.callThrough() ) ', function() {
			spyOn(window, 'updateResult');
			// add a spy but calls the real function
			// true unit testing you never call the real function
			spyOn(Calculator.prototype, 'multiply').and.callThrough();

			calculate('5*5');

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith(25);
		});

		it('calls updateResult ( example using and.returnValue() ) ', function() {
			spyOn(window, 'updateResult');

			// you have a return value available and when you want a specific value you can use this
			spyOn(Calculator.prototype, 'multiply').and.returnValue('it works');

			calculate('5*5');

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('it works');
		});

		it('calls updateResult ( example using and.returnValues() ) ', function() {
			spyOn(window, 'updateResult');

			// you have a return value available and when you want a specific value you can use this
			spyOn(Calculator.prototype, 'add').and.returnValues(null, 'whatever [add] returns');

			calculate('5+5');

			expect(window.updateResult).toHaveBeenCalled();
			expect(window.updateResult).toHaveBeenCalledWith('whatever [add] returns');
		});

		it('does nt handle errors', function() {
			spyOn(Calculator.prototype, 'multiply').and.throwError('some error');

			expect(function() { calculate('5*5') }).toThrowError('some error');
		});

		// usually you don't use this 
		// it('calls updateResult ( example using and.callFake() ) ', function() {
		// 	spyOn(window, 'updateResult');
		// 	spyOn(Calculator.prototype, 'multiply').and.callFake(function(number) {
		// 		// you can replace the multiply implementation with custom implementation
		// 		return 'it works';
		// 	});

		// 	calculate('5*5');

		// 	expect(window.updateResult).toHaveBeenCalled();
		// 	expect(window.updateResult).toHaveBeenCalledWith(25);
		// });
	});

	describe('updateResult()', () => {
		beforeAll(() => {
			const element =  document.createElement('div');
			element.setAttribute('id', 'result');
			document.body.appendChild(element);

			this.element = element;
		});

		afterAll(() => {
			document.body.removeChild(this.element);
		});

		it('adds result to DOM element', () => {
			updateResult('5');

			expect(this.element.innerText).toBe('5');
		});
	});
});