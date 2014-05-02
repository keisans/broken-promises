module('Sync Tests')
test('P will resolve after explicit resolution', function(){
	expect(2);
	
	var promise = new P();

	promise.then(function(resolution){
		ok(true, 'The promise was resolved');
		ok(resolution === 5, 'the promise passes its value correctly');
	});

	promise.resolve(5);
});

test('P will reject after explicit rejection', function(){
	expect(1);
	
	var promise = new P();

	promise.then(function(resolution){
		ok(false, 'The promise should not be resolved');
	}, function(){
		ok(true, 'The promise was rejected');
	});

	promise.reject();
});

test('P will fire callback after resolution', function(){
	expect(2);
	
	var promise = new P();

	promise.resolve(5);

	promise.then(function(resolution){
		ok(true, 'The promise will trigger callbacks after resolution');
		ok(resolution === 5, 'the promise will pass its state');
	});
});

test('P will accept multiple callbacks', function(){
	expect(4);
	
	var promise = new P();

	promise.then(function(resolution){
		ok(true, 'The promise was resolved');
		ok(resolution === 5, 'the promise passes its value correctly');
	});

	promise.then(function(resolution){
		ok(true, 'The promise was resolved');
		ok(resolution === 5, 'the promise passes its value correctly');
	});

	promise.resolve(5);
});

module('Async Tests')
asyncTest('P will resolve asynchronously after explicit resolution', function(){
	expect(2);
	
	var promise = new P();

	promise.then(function(resolution){
		ok(true, 'The promise was resolved');
		ok(resolution === 5, 'the promise passes its value correctly');
		start();
	});

	setTimeout(function(){
		promise.resolve(5);
	}, 1000);
});

asyncTest('P will pass its resolution to callbacks', function(){
	expect(2);
	
	var promise = new P();

	promise.resolve(5);

	setTimeout(function(){
		promise.then(function(resolution){
			ok(true, 'The promise was resolved');
			ok(resolution === 5, 'the promise passes its value correctly');
			start();
		});
	}, 1000);
});

asyncTest('callbacks will fire as promise is resolved multiple times', function(){
	expect(4);
	
	var promise = new P();

	promise.resolve(5);

	promise.then(function(resolution){
		ok(true, 'The promise was resolved');
		if(resolution === 5){
			ok(true, 'the promise resolved correctly once');
		}
		if(resolution === 10){
			ok(true, 'the promise revised its resolution');
			start();
		}
		
	});

	setTimeout(function(){
		promise.resolve(10);
	}, 1000);
});