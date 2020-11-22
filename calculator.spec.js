// 2 params - description/title for the suite (use target file name)
// anonymous function that runs as part of suite

describe('calculator.js', function() {
	// Create suite
	describe('Calculator', function() {
		let calculator;
		let calculator2;

		beforeEach(() => {
			// executes before each and every spec in the suite
			calculator = new Calculator();
			calculator2 = new Calculator();
		});

		afterEach(() => {
			// executes after each and every spec in the suite
			
		});

		it('has constructor', () => {
			// deep/strict equality comparison ===
			// equal keys & equal values
			expect(calculator).toEqual(calculator2);
		})
	
		it('can be instantiated', () => {
			// expects the actual value to be truthy
			expect(calculator).toBeTruthy();
			expect(calculator2).toBeTruthy();
	
			// expects the actual value to contain a specific value
			// use with arrays to find an item, or find a substring from a string
			expect(calculator.constructor.name).toContain('Calc');
		})

		it('instantiates unique object', () => {
			// 'not' placed before method that evaluates to a negative assertion
			// can be used with any matcher
			expect(calculator).not.toBe(calculator2);
		})
	
		it('should initialize the total', () => {
			// expect actual value to be the expected value
			expect(calculator.total).toBe(0);
			// expects actual value to be falsy
			expect(calculator.total).toBeFalsy();
		})

		it('has common operations', () => {
			// ecpects actual value to be undefined
			// we know that this exists
			expect(calculator.add).not.toBeUndefined();
			expect(calculator.subtract).not.toBeUndefined();
			expect(calculator.multiply).not.toBeUndefined();
			expect(calculator.divide).not.toBeUndefined();
	
			expect(calculator.add).toBeDefined();
			expect(calculator.subtract).toBeDefined();
			expect(calculator.multiply).toBeDefined();
			expect(calculator.divide).toBeDefined();
		})
	
		it('can overwrite total', () => {
			calculator.total = null;
	
			expect(calculator.total).toBeNull();
		})

		describe('add()', function() {
			it('should add numbers to total', () => {
				calculator.add(5);
		
				expect(calculator.total).toBe(5);
			})

			it('returns total', function() {
				calculator.total = 50;
		
				expect(calculator.add(20)).toBe(70);
				expect(calculator.total).toMatch(/-?\d+/);
				expect(typeof calculator.total).toMatch('number');
				// assymetric matchers - not equal on each side
				expect(calculator.total).toEqual(jasmine.anything());
				// doesnt work when value is null or undefined
				expect(function() {}).toEqual(jasmine.anything());
			})
		});

		describe('subtract()', function() {
			it('should subtract numbers from total', () => {
				calculator.total = 30;
				calculator.subtract(5);
		
				expect(calculator.total).toBe(25);
			})
		});

		describe('multiply()', function() {
			it('should multiply total by number', () => {
				calculator.total = 100;
				calculator.multiply(2);
		
				expect(calculator.total).toBe(200);
			})

			it('does not handle NaN', function() {
				calculator.total = 20;
				calculator.multiply('a');
				// expects the actual value to be NaN
				expect(calculator.total).toBeNaN();
			})	
		});

		describe('divide()', function() {
			it('should divide total by number', () => {
				calculator.total = 200;
				calculator.divide(2);
		
				expect(calculator.total).toBe(100);
			})

			it('handles divide by zero', function() {
				// tests whene a function throws something
				// need to pass a function
				expect(function() { calculator.divide(0) }).toThrow();
				expect(function() { calculator.divide(0) }).toThrowError(Error);
				expect(function() { calculator.divide(0) }).toThrowError(Error, 'Cannot divide by zero');
			})
		});	
	});
});

// Organizing You Specs

// - use describe -> to group specs into a suite
// - naming convention => create spec file with same name that matches the JS file you are unit testing
// - keep folder structure, keeo spec in the same folder as the js file
// - nest suites


// Set up & teardown - Lifecycle of suites

// Setup - where you place prerequs for your specs/ things that execute before specs are run
// beforeEach -> called before each spec in each suite in which it is called
// beforeAll -> just executed before all specs in the suite in which it is called

// Teardown - where you place clean up steps for specs/ things that excecute after specs are run
// afterEach - executed after each spec is executed
// afterAll - execued just one after all specs int he suite