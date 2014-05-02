/**
 * Copyright 2014 Ryan Struhl under the terms of the MIT
 * license found at https://raw.githubusercontent.com/keisans/broken-promises/master/LICENSE
 */

 var P = function(){
 	// Just calling Promise() will create a new instance of the Promise Object
 	if(this instanceof P){
 		this.currentState = 'pending';
 		this.value = null;
 		this.queue = [];
 		return this;
 	} else {
 		return new P();
 	}
 }

 P.prototype = (function(window){
 	var _public = {};

 	_public.state = function(){
 		return this.currentState;
 	}

 	_public.then = function(onFulfilled, onRejected, context){
 		if(typeof onFulfilled !== 'function') throw 'The method when this promise is fulfilled must be a function';
 		if(typeof onRejected === 'object'){
 			context = onRejected;
 			onRejected = null;
 		}

 		if(this.isResolved()){
 			onFulfilled.call(context, this.value);
 		} else if (this.isRejected()){
 			onRejected.call(context);
 		}

 		this.queue.push({
 			onFulfilled: onFulfilled,
 			onRejected: onRejected,
 			context: context || window
 		});

 		return this;
 	};

 	_public.resolve = function(value){
 		this.currentState = 'resolved';
 		this.value = value;
 		for(var i = 0; i < this.queue.length; i+= 1){
 			this.queue[i].onFulfilled.call(this.queue[i].context, value);
 		}

 		return this;
 	};

 	_public.reject = function(error){
 		this.state = 'rejected';
 		this.value = error;
 		for(var i = 0; i < this.queue.length; i+= 1){
 			this.queue[i].onRejected.call(this.queue[i].context, error);
 		}

 		return this;
 	}

 	_public.isResolved = function(){
 		return this.state() === 'resolved';
 	};

 	_public.isRejected = function(){
 		return this.state() === 'rejected';
 	};

 	return _public;
 }(this));