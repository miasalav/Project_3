/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}

/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}

/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}


/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}

/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "1415890aff8624da4c66"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars

/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}

/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}

/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],

/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},

/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},

/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}

/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";

/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}

/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;

/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;

/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}

/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}

/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;

/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}

/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}

/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}

/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}

/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}

/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};

/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}

/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}

/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}

/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}

/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;

/******/ 			var data = {};

/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;

/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;

/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];

/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");

/******/ 		hotCurrentHash = hotUpdateNewHash;

/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}

/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}

/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}

/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}

/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Project_03/";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nvar _App = __webpack_require__(1);\n\nvar _App2 = _interopRequireDefault(_App);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar app = new _App2.default();\n\n/* let edward = new Person(\"Edward\");\r\nlet eds_car = new Car(\"Bugatti\");\r\nlet someShoppingCart = new ShoppingCart();\r\nlet app = new App();\r\n\r\n\r\n/*\r\nconsole.log('hello');\r\nsomeShoppingCart.addItemToCart('tv');\r\nsomeShoppingCart.addItemToCart('phone');\r\nsomeShoppingCart.addItemToCart('apple tv');\r\nsomeShoppingCart.deleteItemFromCart('hamburger');\r\nsomeShoppingCart.updateItemsInCart('tv','b'); \r\n\r\nconsole.log('do i have a button? answer is ' + addItemBtn);\r\nlet addItemToCart = function(){\r\n    console.log('you clicked on the add Item to storage button');\r\n    let dummyProduct ={\r\n      \"image\": \"http://img.bbystatic.com/BestBuy_US/images/products/4959/4959312_sa.jpg\",\r\n      \"name\": \"Acer - Aspire 21.5\\\" Touch-Screen All-In-One - Intel Core i3 - 8GB Memory - 1TB Hard Drive - Black\",\r\n      \"regularPrice\": 609.99,\r\n      \"salePrice\": 609.99\r\n    };\r\n    someShoppingCart.addItemToCart(dummyProduct);\r\n};\r\n\r\nlet deleteItemFromCart = function(){\r\n    someShoppingCart.deleteItemfromCart(dummyProduct);\r\n};\r\n\r\naddItemBtn.addEventListener(\"click\", addItemToCart);\r\ndeleteItemBtn.addEventListener('click', deleteItemFromCart);\r\n\r\n\r\nedward.car = eds_car;\r\nedward.car.drive(edward);\r\n\r\n\r\n*/\n/**\r\n * Created by Edward_J_Apostol on 2016-08-29.\r\n */\n// this is where the \"main\" section of your app begins.\n// its like a launch pad, where you bring all your other classes\n// together for use.\n\n//import Person from './Person';\n//import Car from './Car';\n//import ShoppingCart from './ShoppingCart';//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/OTU1MiJdLCJuYW1lcyI6WyJhcHAiXSwibWFwcGluZ3MiOiI7O0FBVUE7Ozs7OztBQUVBLElBQUlBLE1BQU0sbUJBQVY7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWRBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBFZHdhcmRfSl9BcG9zdG9sIG9uIDIwMTYtMDgtMjkuXHJcbiAqL1xyXG4vLyB0aGlzIGlzIHdoZXJlIHRoZSBcIm1haW5cIiBzZWN0aW9uIG9mIHlvdXIgYXBwIGJlZ2lucy5cclxuLy8gaXRzIGxpa2UgYSBsYXVuY2ggcGFkLCB3aGVyZSB5b3UgYnJpbmcgYWxsIHlvdXIgb3RoZXIgY2xhc3Nlc1xyXG4vLyB0b2dldGhlciBmb3IgdXNlLlxyXG5cclxuLy9pbXBvcnQgUGVyc29uIGZyb20gJy4vUGVyc29uJztcclxuLy9pbXBvcnQgQ2FyIGZyb20gJy4vQ2FyJztcclxuLy9pbXBvcnQgU2hvcHBpbmdDYXJ0IGZyb20gJy4vU2hvcHBpbmdDYXJ0JztcclxuaW1wb3J0IEFwcCBmcm9tICcuL0FwcCc7XHJcblxyXG5sZXQgYXBwID0gbmV3IEFwcCgpO1xyXG5cclxuLyogbGV0IGVkd2FyZCA9IG5ldyBQZXJzb24oXCJFZHdhcmRcIik7XHJcbmxldCBlZHNfY2FyID0gbmV3IENhcihcIkJ1Z2F0dGlcIik7XHJcbmxldCBzb21lU2hvcHBpbmdDYXJ0ID0gbmV3IFNob3BwaW5nQ2FydCgpO1xyXG5sZXQgYXBwID0gbmV3IEFwcCgpO1xyXG5cclxuXHJcbi8qXHJcbmNvbnNvbGUubG9nKCdoZWxsbycpO1xyXG5zb21lU2hvcHBpbmdDYXJ0LmFkZEl0ZW1Ub0NhcnQoJ3R2Jyk7XHJcbnNvbWVTaG9wcGluZ0NhcnQuYWRkSXRlbVRvQ2FydCgncGhvbmUnKTtcclxuc29tZVNob3BwaW5nQ2FydC5hZGRJdGVtVG9DYXJ0KCdhcHBsZSB0dicpO1xyXG5zb21lU2hvcHBpbmdDYXJ0LmRlbGV0ZUl0ZW1Gcm9tQ2FydCgnaGFtYnVyZ2VyJyk7XHJcbnNvbWVTaG9wcGluZ0NhcnQudXBkYXRlSXRlbXNJbkNhcnQoJ3R2JywnYicpOyBcclxuXHJcbmNvbnNvbGUubG9nKCdkbyBpIGhhdmUgYSBidXR0b24/IGFuc3dlciBpcyAnICsgYWRkSXRlbUJ0bik7XHJcbmxldCBhZGRJdGVtVG9DYXJ0ID0gZnVuY3Rpb24oKXtcclxuICAgIGNvbnNvbGUubG9nKCd5b3UgY2xpY2tlZCBvbiB0aGUgYWRkIEl0ZW0gdG8gc3RvcmFnZSBidXR0b24nKTtcclxuICAgIGxldCBkdW1teVByb2R1Y3QgPXtcclxuICAgICAgXCJpbWFnZVwiOiBcImh0dHA6Ly9pbWcuYmJ5c3RhdGljLmNvbS9CZXN0QnV5X1VTL2ltYWdlcy9wcm9kdWN0cy80OTU5LzQ5NTkzMTJfc2EuanBnXCIsXHJcbiAgICAgIFwibmFtZVwiOiBcIkFjZXIgLSBBc3BpcmUgMjEuNVxcXCIgVG91Y2gtU2NyZWVuIEFsbC1Jbi1PbmUgLSBJbnRlbCBDb3JlIGkzIC0gOEdCIE1lbW9yeSAtIDFUQiBIYXJkIERyaXZlIC0gQmxhY2tcIixcclxuICAgICAgXCJyZWd1bGFyUHJpY2VcIjogNjA5Ljk5LFxyXG4gICAgICBcInNhbGVQcmljZVwiOiA2MDkuOTlcclxuICAgIH07XHJcbiAgICBzb21lU2hvcHBpbmdDYXJ0LmFkZEl0ZW1Ub0NhcnQoZHVtbXlQcm9kdWN0KTtcclxufTtcclxuXHJcbmxldCBkZWxldGVJdGVtRnJvbUNhcnQgPSBmdW5jdGlvbigpe1xyXG4gICAgc29tZVNob3BwaW5nQ2FydC5kZWxldGVJdGVtZnJvbUNhcnQoZHVtbXlQcm9kdWN0KTtcclxufTtcclxuXHJcbmFkZEl0ZW1CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFkZEl0ZW1Ub0NhcnQpO1xyXG5kZWxldGVJdGVtQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVsZXRlSXRlbUZyb21DYXJ0KTtcclxuXHJcblxyXG5lZHdhcmQuY2FyID0gZWRzX2NhcjtcclxuZWR3YXJkLmNhci5kcml2ZShlZHdhcmQpO1xyXG5cclxuXHJcbiovXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _ShoppingCart = __webpack_require__(2);\n\nvar _ShoppingCart2 = _interopRequireDefault(_ShoppingCart);\n\nvar _BBProductAPIService = __webpack_require__(3);\n\nvar _BBProductAPIService2 = _interopRequireDefault(_BBProductAPIService);\n\nvar _BBProductData = __webpack_require__(4);\n\nvar _BBProductData2 = _interopRequireDefault(_BBProductData);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n//import Catalog from './Catalog'\n\nvar App = function () {\n    function App() {\n        _classCallCheck(this, App);\n\n        console.log('creating app');\n        this.data = [];\n        this.getTheData();\n        this.shoppingCart = new _ShoppingCart2.default();\n        this.initModal();\n    }\n\n    _createClass(App, [{\n        key: 'getTheData',\n        value: function getTheData() {\n            console.log('getting the data...');\n            //load the data\n            this.bbAPIService = new _BBProductAPIService2.default();\n            var context = this;\n            this.successCallback = function (response) {\n                //     console.log('response = \\n' + response);\n                context.data = JSON.parse(response);\n                context.processResultsIntoUsableData(context.data);\n            };\n\n            this.failCallback = function (error) {\n                console.error('failed! \\n', error);\n            };\n            this.bbAPIService.loadDataUsingJS(context).then(this.successCallback, this.failCallback);\n        }\n    }, {\n        key: 'processResultsIntoUsableData',\n        value: function processResultsIntoUsableData(result) {\n            //from here, extract only the product info\n            this.rawData = new _BBProductData2.default(result);\n            this.products = this.rawData.products;\n            //      console.log('PRODUCTS ONLY = ' + this.products); \n            this.createTableOfItems(this.products);\n        }\n    }, {\n        key: 'initModal',\n        value: function initModal() {\n            // Get the modal\n\n            this.modal = document.getElementById('viewModal');\n            console.log(this.modal);\n            this.span = document.getElementsByClassName(\"close\")[0];\n            this.span.addEventListener('click', function (event) {\n                $('#viewModal').css('display', 'none');\n            });\n        }\n    }, {\n        key: 'createTableOfItems',\n        value: function createTableOfItems(products) {\n            var _this = this;\n\n            for (var i = 0; i < products.length; i++) {\n                var currentItem = products[i];\n                var currentSku = currentItem['sku'];\n                var currentName = currentItem['name'];\n                var currentImage = currentItem['image'];\n                var currentSalePrice = currentItem['salePrice'];\n\n                console.log('this is' + products.length);\n\n                var clone = $('.product-wrapper').eq(0).clone();\n                /*\r\n                    let productName = (result.products[i].name);\r\n                    let productImg = (result.products[i].image);\r\n                    let regPrice = (result.products[i].regularPrice);\r\n                    let salePrice = (result.products[i].salePrice);\r\n                */\n                $(clone).css('margin-left', i * 300);\n                $(clone).children('img').attr({ \"src\": currentImage, 'alt': currentName });\n                // $('article').children('img').attr(\"src\", final_image);\n                $(clone).children('h3').html(currentName);\n                $(clone).children('p').html(currentSalePrice);\n                $(clone).children('.button-view').attr({ \"id\": \"quick-view\" + currentSku, \"data-sku\": currentSku });\n                $(clone).children('.button-add').attr({ \"id\": currentSku, \"data-sku\": currentSku });\n\n                $('.flickity-slider').append(clone);\n            }\n\n            var _loop = function _loop(btnCount) {\n                var currentItem = products[btnCount];\n                //   console.log(currentItem);\n                var context = _this;\n                $('#' + currentItem['sku']).on('click', null, { context: context }, function (event) {\n                    context.modal.style.display = \"block\";\n                    context.prepareItemToAddToCart(event, context);\n                    context.displayAddToCart(event, context);\n                });\n\n                $('#quick-view' + currentItem['sku']).on('click', null, { context: context }, function (event) {\n                    context.modal.style.display = 'block';\n                    context.displayQuickView(event, context);\n                });\n\n                document.getElementById(currentItem['sku']).addEventListener('click', _this);\n                document.getElementById('quick-view' + currentItem['sku']).addEventListener('click', _this);\n                //  document.getElementById(currentItem['sku']).addEventListener('click', this.prepareItemToAddToCart);\n            };\n\n            for (var btnCount = 0; btnCount < products.length; btnCount++) {\n                _loop(btnCount);\n            }\n            //add event listeners to all the delete buttons to make them respond\n            for (var delBtnCount = 0; delBtnCount < products.length; delBtnCount++) {\n                var _currentItem = products[delBtnCount];\n                var _currentSku = _currentItem['sku'];\n                //     console.log('creating click events for delete button');\n                var deleteSku = 'delete-' + _currentSku;\n                //   console.log('currentSKu is' + deleteSku);\n                var prepToDeleteItemFromCart = function prepToDeleteItemFromCart(evt, context) {\n                    var delSkuNum = $(evt.target).attr('id');\n                    console.log('hello from prepToDelete');\n                    context.shoppingCart.deleteItemFromCart(skuNum, 1);\n                };\n                var currentObject = \"#\" + deleteSku;\n                var _context = this;\n                $(currentObject).on('click', null, { context: _context }, function (event) {\n                    console.log(event);\n                    console.log(event.data);\n                    console.log(event.target);\n                    console.log(event.data.context);\n                    event.data.context.prepItemToDeleteFromCart(event, event.data.context);\n                });\n            }\n        }\n    }, {\n        key: 'prepareItemToAddToCart',\n        value: function prepareItemToAddToCart(evt, context) {\n            if (evt == null || typeof evt === 'undefined') {\n                return;\n            }\n            var skuNum = $(evt.target).attr('data-sku');\n            //    console.log(skuNum);\n            //  console.log(this.parentNode);      \n            context.shoppingCart.addItemToCart(skuNum, 1);\n            //context.displayAddToCart(event, context);\n        }\n    }, {\n        key: 'prepItemToDeleteFromCart',\n        value: function prepItemToDeleteFromCart(evt, context) {\n            if (evt == null || typeof evt === 'undefined') {\n                return;\n            }\n            var skuNum = $(evt.target).attr('data-sku');\n            context.shoppingCart.deleteItemFromCart(skuNum, 1);\n        }\n    }, {\n        key: 'displayQuickView',\n        value: function displayQuickView(event, context) {\n            //    console.log('here are the ' + products.length);\n\n            //  for (var i = 0; i < this.products.length; i++){\n            var currentID = $(event.target).attr('data-sku');\n            console.log('this is the id' + currentID);\n            var itemInView = this.getProductBySku(currentID);\n\n            // let currentPrice = currentItem['salePrice'];\n            $('#modalContent').last().html(\"<div>\" + '<img src=\"' + itemInView['thumbnailImage'] + '\"/>' + '<h3>' + itemInView['name'] + '</h3>' + '<p>' + itemInView['shortDescription'] + '</p>' + '<button id=\"' + itemInView['sku'] + '\">Add to Cart</button>' + \"</div>\");\n\n            //  }\n        }\n    }, {\n        key: 'displayAddToCart',\n        value: function displayAddToCart(event, context) {\n            console.log('hiaddtocart');\n            var currentID = $(event.target).attr('data-sku');\n            var itemToAdd = this.getProductBySku(currentID);\n            $('#modalContent').last().html(\"<img src='\" + itemToAdd['thumbnailImage'] + \"'/>\" + \"<p>The item \" + itemToAdd['name'] + \" has been added to your cart!</p>\");\n            // $(\"#viewModal\").append(addedToCartMessage); \n        }\n    }, {\n        key: 'getProductBySku',\n        value: function getProductBySku() {\n            var sku = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n\n            if (sku == 0) {\n                return;\n            };\n            //console.log(this.products);\n            var criteriaFn = function criteriaFn(product) {\n                return product['sku'] == sku;\n            };\n            var result = this.products.filter(criteriaFn);\n            // result is an array of potential products.\n            // but one product should be returned only.\n            // so return the first element;\n            return result[0];\n        }\n    }]);\n\n    return App;\n}();\n\nexports.default = App;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQXBwLmpzP2E2NzMiXSwibmFtZXMiOlsiQXBwIiwiY29uc29sZSIsImxvZyIsImRhdGEiLCJnZXRUaGVEYXRhIiwic2hvcHBpbmdDYXJ0IiwiaW5pdE1vZGFsIiwiYmJBUElTZXJ2aWNlIiwiY29udGV4dCIsInN1Y2Nlc3NDYWxsYmFjayIsInJlc3BvbnNlIiwiSlNPTiIsInBhcnNlIiwicHJvY2Vzc1Jlc3VsdHNJbnRvVXNhYmxlRGF0YSIsImZhaWxDYWxsYmFjayIsImVycm9yIiwibG9hZERhdGFVc2luZ0pTIiwidGhlbiIsInJlc3VsdCIsInJhd0RhdGEiLCJwcm9kdWN0cyIsImNyZWF0ZVRhYmxlT2ZJdGVtcyIsIm1vZGFsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInNwYW4iLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiJCIsImNzcyIsImkiLCJsZW5ndGgiLCJjdXJyZW50SXRlbSIsImN1cnJlbnRTa3UiLCJjdXJyZW50TmFtZSIsImN1cnJlbnRJbWFnZSIsImN1cnJlbnRTYWxlUHJpY2UiLCJjbG9uZSIsImVxIiwiY2hpbGRyZW4iLCJhdHRyIiwiaHRtbCIsImFwcGVuZCIsImJ0bkNvdW50Iiwib24iLCJzdHlsZSIsImRpc3BsYXkiLCJwcmVwYXJlSXRlbVRvQWRkVG9DYXJ0IiwiZGlzcGxheUFkZFRvQ2FydCIsImRpc3BsYXlRdWlja1ZpZXciLCJkZWxCdG5Db3VudCIsImRlbGV0ZVNrdSIsInByZXBUb0RlbGV0ZUl0ZW1Gcm9tQ2FydCIsImV2dCIsImRlbFNrdU51bSIsInRhcmdldCIsImRlbGV0ZUl0ZW1Gcm9tQ2FydCIsInNrdU51bSIsImN1cnJlbnRPYmplY3QiLCJwcmVwSXRlbVRvRGVsZXRlRnJvbUNhcnQiLCJhZGRJdGVtVG9DYXJ0IiwiY3VycmVudElEIiwiaXRlbUluVmlldyIsImdldFByb2R1Y3RCeVNrdSIsImxhc3QiLCJpdGVtVG9BZGQi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b20gJy4vU2hvcHBpbmdDYXJ0JztcclxuaW1wb3J0IEJCUHJvZHVjdEFQSVNlcnZpY2UgZnJvbSAnLi9CQlByb2R1Y3RBUElTZXJ2aWNlJztcclxuaW1wb3J0IEJCUHJvZHVjdERhdGEgZnJvbSAnLi9tb2RlbC9CQlByb2R1Y3REYXRhJztcclxuXHJcbi8vaW1wb3J0IENhdGFsb2cgZnJvbSAnLi9DYXRhbG9nJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIHtcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NyZWF0aW5nIGFwcCcpO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZ2V0VGhlRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuc2hvcHBpbmdDYXJ0ID0gbmV3IFNob3BwaW5nQ2FydCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdE1vZGFsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VGhlRGF0YSgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdnZXR0aW5nIHRoZSBkYXRhLi4uJyk7XHJcbiAgICAgICAgLy9sb2FkIHRoZSBkYXRhXHJcbiAgICAgICAgdGhpcy5iYkFQSVNlcnZpY2UgPSBuZXcgQkJQcm9kdWN0QVBJU2VydmljZSgpO1xyXG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcztcclxuICAgICAgICB0aGlzLnN1Y2Nlc3NDYWxsYmFjayA9IGZ1bmN0aW9uIChyZXNwb25zZSl7XHJcbiAgICAgIC8vICAgICBjb25zb2xlLmxvZygncmVzcG9uc2UgPSBcXG4nICsgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBjb250ZXh0LmRhdGEgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgY29udGV4dC5wcm9jZXNzUmVzdWx0c0ludG9Vc2FibGVEYXRhKGNvbnRleHQuZGF0YSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5mYWlsQ2FsbGJhY2sgPSBmdW5jdGlvbihlcnJvcil7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2ZhaWxlZCEgXFxuJywgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmJiQVBJU2VydmljZS5sb2FkRGF0YVVzaW5nSlMoY29udGV4dCkudGhlbih0aGlzLnN1Y2Nlc3NDYWxsYmFjaywgdGhpcy5mYWlsQ2FsbGJhY2spXHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc1Jlc3VsdHNJbnRvVXNhYmxlRGF0YShyZXN1bHQpe1xyXG4gICAgICAgIC8vZnJvbSBoZXJlLCBleHRyYWN0IG9ubHkgdGhlIHByb2R1Y3QgaW5mb1xyXG4gICAgICAgIHRoaXMucmF3RGF0YSA9IG5ldyBCQlByb2R1Y3REYXRhKHJlc3VsdCk7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0cyA9IHRoaXMucmF3RGF0YS5wcm9kdWN0cztcclxuICAgLy8gICAgICBjb25zb2xlLmxvZygnUFJPRFVDVFMgT05MWSA9ICcgKyB0aGlzLnByb2R1Y3RzKTsgXHJcbiAgICAgICAgdGhpcy5jcmVhdGVUYWJsZU9mSXRlbXModGhpcy5wcm9kdWN0cyk7XHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgXHJcbiAgICBpbml0TW9kYWwoKXtcclxuICAgICAgICAvLyBHZXQgdGhlIG1vZGFsXHJcbiAgICAgICAgXHJcbiAgICB0aGlzLm1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXdNb2RhbCcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubW9kYWwpO1xyXG4gICAgdGhpcy5zcGFuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNsb3NlXCIpWzBdOyAgIFxyXG4gICAgdGhpcy5zcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgJCgnI3ZpZXdNb2RhbCcpLmNzcygnZGlzcGxheScsJ25vbmUnKVxyXG4gICAgIH0pOyAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgICBjcmVhdGVUYWJsZU9mSXRlbXMocHJvZHVjdHMpe1xyXG5cclxuICAgICBmb3IoIHZhciBpPTA7IGkgPCBwcm9kdWN0cy5sZW5ndGg7IGkrKyl7XHJcbiAgICBsZXQgY3VycmVudEl0ZW0gPSBwcm9kdWN0c1tpXTtcclxuICAgIGxldCBjdXJyZW50U2t1ID0gY3VycmVudEl0ZW1bJ3NrdSddO1xyXG4gICAgbGV0IGN1cnJlbnROYW1lID0gY3VycmVudEl0ZW1bJ25hbWUnXTtcclxuICAgIGxldCBjdXJyZW50SW1hZ2UgPSBjdXJyZW50SXRlbVsnaW1hZ2UnXTtcclxuICAgIGxldCBjdXJyZW50U2FsZVByaWNlID0gY3VycmVudEl0ZW1bJ3NhbGVQcmljZSddO1xyXG5cclxuICAgICBjb25zb2xlLmxvZygndGhpcyBpcycgKyBwcm9kdWN0cy5sZW5ndGgpO1xyXG4gICAgXHJcbiAgICBsZXQgY2xvbmUgPSAkKCcucHJvZHVjdC13cmFwcGVyJykuZXEoMCkuY2xvbmUoKTtcclxuLypcclxuICAgIGxldCBwcm9kdWN0TmFtZSA9IChyZXN1bHQucHJvZHVjdHNbaV0ubmFtZSk7XHJcbiAgICBsZXQgcHJvZHVjdEltZyA9IChyZXN1bHQucHJvZHVjdHNbaV0uaW1hZ2UpO1xyXG4gICAgbGV0IHJlZ1ByaWNlID0gKHJlc3VsdC5wcm9kdWN0c1tpXS5yZWd1bGFyUHJpY2UpO1xyXG4gICAgbGV0IHNhbGVQcmljZSA9IChyZXN1bHQucHJvZHVjdHNbaV0uc2FsZVByaWNlKTtcclxuKi9cclxuICAgICQoY2xvbmUpLmNzcygnbWFyZ2luLWxlZnQnLCBpKjMwMCk7XHJcbiAgICAkKGNsb25lKS5jaGlsZHJlbignaW1nJykuYXR0cih7XCJzcmNcIjogY3VycmVudEltYWdlLCAnYWx0JzogY3VycmVudE5hbWV9KTsgIFxyXG4gICAgICAgLy8gJCgnYXJ0aWNsZScpLmNoaWxkcmVuKCdpbWcnKS5hdHRyKFwic3JjXCIsIGZpbmFsX2ltYWdlKTtcclxuICAgICQoY2xvbmUpLmNoaWxkcmVuKCdoMycpLmh0bWwoY3VycmVudE5hbWUpO1xyXG4gICAgJChjbG9uZSkuY2hpbGRyZW4oJ3AnKS5odG1sKGN1cnJlbnRTYWxlUHJpY2UpO1xyXG4gICAgJChjbG9uZSkuY2hpbGRyZW4oJy5idXR0b24tdmlldycpLmF0dHIoe1wiaWRcIjogXCJxdWljay12aWV3XCIrIGN1cnJlbnRTa3UsIFwiZGF0YS1za3VcIjogY3VycmVudFNrdX0pO1xyXG4gICAgJChjbG9uZSkuY2hpbGRyZW4oJy5idXR0b24tYWRkJykuYXR0cih7XCJpZFwiOiBjdXJyZW50U2t1LCBcImRhdGEtc2t1XCI6IGN1cnJlbnRTa3V9KTtcclxuICAgICAgICBcclxuICAgICQoJy5mbGlja2l0eS1zbGlkZXInKS5hcHBlbmQoY2xvbmUpO1xyXG5cclxuICAgICB9XHJcbiAgXHJcbiAgICBmb3IgKGxldCBidG5Db3VudCA9IDA7IGJ0bkNvdW50PHByb2R1Y3RzLmxlbmd0aDsgYnRuQ291bnQrKyl7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRJdGVtID0gcHJvZHVjdHNbYnRuQ291bnRdO1xyXG4gICAgIC8vICAgY29uc29sZS5sb2coY3VycmVudEl0ZW0pO1xyXG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcztcclxuICAgICAgICAgJCgnIycrY3VycmVudEl0ZW1bJ3NrdSddKS5vbignY2xpY2snLCBudWxsLCB7Y29udGV4dDpjb250ZXh0fSwgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5tb2RhbC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5wcmVwYXJlSXRlbVRvQWRkVG9DYXJ0KGV2ZW50LCBjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZGlzcGxheUFkZFRvQ2FydChldmVudCwgY29udGV4dCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICQoJyNxdWljay12aWV3JytjdXJyZW50SXRlbVsnc2t1J10pLm9uKCdjbGljaycsIG51bGwsIHtjb250ZXh0OmNvbnRleHR9LCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0Lm1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5kaXNwbGF5UXVpY2tWaWV3KGV2ZW50LCBjb250ZXh0KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyZW50SXRlbVsnc2t1J10pLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywodGhpcykpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdWljay12aWV3JytjdXJyZW50SXRlbVsnc2t1J10pLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywodGhpcykpO1xyXG4gICAgICAvLyAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3VycmVudEl0ZW1bJ3NrdSddKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucHJlcGFyZUl0ZW1Ub0FkZFRvQ2FydCk7XHJcbiAgICB9XHJcbiAgICAvL2FkZCBldmVudCBsaXN0ZW5lcnMgdG8gYWxsIHRoZSBkZWxldGUgYnV0dG9ucyB0byBtYWtlIHRoZW0gcmVzcG9uZFxyXG4gICAgIGZvciAobGV0IGRlbEJ0bkNvdW50ID0gMDsgZGVsQnRuQ291bnQ8cHJvZHVjdHMubGVuZ3RoOyBkZWxCdG5Db3VudCsrKXsgICAgICAgICBcclxuICAgICAgICAgbGV0IGN1cnJlbnRJdGVtID0gcHJvZHVjdHNbZGVsQnRuQ291bnRdO1xyXG4gICAgICAgICBsZXQgY3VycmVudFNrdSA9IGN1cnJlbnRJdGVtWydza3UnXTtcclxuICAgIC8vICAgICBjb25zb2xlLmxvZygnY3JlYXRpbmcgY2xpY2sgZXZlbnRzIGZvciBkZWxldGUgYnV0dG9uJyk7XHJcbiAgICAgICAgIGxldCBkZWxldGVTa3UgPSAnZGVsZXRlLScgKyBjdXJyZW50U2t1O1xyXG4gICAgICAvLyAgIGNvbnNvbGUubG9nKCdjdXJyZW50U0t1IGlzJyArIGRlbGV0ZVNrdSk7XHJcbiAgICAgICAgIGxldCBwcmVwVG9EZWxldGVJdGVtRnJvbUNhcnQgPSBmdW5jdGlvbihldnQsIGNvbnRleHQpe1xyXG4gICAgICAgICAgICAgbGV0IGRlbFNrdU51bSA9ICQoZXZ0LnRhcmdldCkuYXR0cignaWQnKTtcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoZWxsbyBmcm9tIHByZXBUb0RlbGV0ZScpO1xyXG4gICAgICAgICAgICAgY29udGV4dC5zaG9wcGluZ0NhcnQuZGVsZXRlSXRlbUZyb21DYXJ0KHNrdU51bSwgMSk7XHJcbiAgICAgICAgIH07XHJcbiAgICAgICAgIGxldCBjdXJyZW50T2JqZWN0ID0gXCIjXCIgKyBkZWxldGVTa3U7XHJcbiAgICAgICAgIGxldCBjb250ZXh0ID0gdGhpcztcclxuICAgICAgICAgJChjdXJyZW50T2JqZWN0KS5vbignY2xpY2snLCBudWxsLCB7Y29udGV4dDpjb250ZXh0fSwgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudCk7XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC5kYXRhKTtcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC5kYXRhLmNvbnRleHQpOyBcclxuICAgICAgICAgICAgIGV2ZW50LmRhdGEuY29udGV4dC5wcmVwSXRlbVRvRGVsZXRlRnJvbUNhcnQoZXZlbnQsZXZlbnQuZGF0YS5jb250ZXh0KTtcclxuICAgICAgICAgfSk7XHJcbiAgICAgfVxyXG4gICAgXHJcbiB9XHJcblxyXG5cclxuICBwcmVwYXJlSXRlbVRvQWRkVG9DYXJ0KGV2dCwgY29udGV4dCl7XHJcbiAgICAgIGlmKGV2dD09bnVsbCB8fCB0eXBlb2YgKGV2dCkgPT09ICd1bmRlZmluZWQnKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgbGV0IHNrdU51bSA9ICQoZXZ0LnRhcmdldCkuYXR0cignZGF0YS1za3UnKTtcclxuICAvLyAgICBjb25zb2xlLmxvZyhza3VOdW0pO1xyXG4gICAgLy8gIGNvbnNvbGUubG9nKHRoaXMucGFyZW50Tm9kZSk7ICAgICAgXHJcbiAgICAgIGNvbnRleHQuc2hvcHBpbmdDYXJ0LmFkZEl0ZW1Ub0NhcnQoc2t1TnVtLCAxKTtcclxuICAgICAgLy9jb250ZXh0LmRpc3BsYXlBZGRUb0NhcnQoZXZlbnQsIGNvbnRleHQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcmVwSXRlbVRvRGVsZXRlRnJvbUNhcnQoZXZ0LCBjb250ZXh0KXtcclxuICAgICAgICBpZihldnQ9PW51bGwgfHwgdHlwZW9mIChldnQpID09PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNrdU51bSA9ICQoZXZ0LnRhcmdldCkuYXR0cignZGF0YS1za3UnKTtcclxuICAgICAgICBjb250ZXh0LnNob3BwaW5nQ2FydC5kZWxldGVJdGVtRnJvbUNhcnQoc2t1TnVtLCAxKTtcclxuICAgIH1cclxuXHJcbiBcclxuICAgZGlzcGxheVF1aWNrVmlldyhldmVudCwgY29udGV4dCl7XHJcbiAgICAvLyAgICBjb25zb2xlLmxvZygnaGVyZSBhcmUgdGhlICcgKyBwcm9kdWN0cy5sZW5ndGgpO1xyXG4gICAgICAgIFxyXG4gICAgICAvLyAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnByb2R1Y3RzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBsZXQgY3VycmVudElEID0gJChldmVudC50YXJnZXQpLmF0dHIoJ2RhdGEtc2t1Jyk7ICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coJ3RoaXMgaXMgdGhlIGlkJyArIGN1cnJlbnRJRCk7ICBcclxuICAgICAgICBsZXQgaXRlbUluVmlldyA9IHRoaXMuZ2V0UHJvZHVjdEJ5U2t1KGN1cnJlbnRJRCk7IFxyXG4gICAgICAgIFxyXG4gICAgICAgLy8gbGV0IGN1cnJlbnRQcmljZSA9IGN1cnJlbnRJdGVtWydzYWxlUHJpY2UnXTtcclxuICAgICAgICAkKCcjbW9kYWxDb250ZW50JykubGFzdCgpLmh0bWwoXCI8ZGl2PlwiKyc8aW1nIHNyYz1cIicgKyBpdGVtSW5WaWV3Wyd0aHVtYm5haWxJbWFnZSddICsgJ1wiLz4nICsgJzxoMz4nICsgaXRlbUluVmlld1snbmFtZSddICsgJzwvaDM+JyArICc8cD4nICsgaXRlbUluVmlld1snc2hvcnREZXNjcmlwdGlvbiddICsgJzwvcD4nICsgJzxidXR0b24gaWQ9XCInICsgaXRlbUluVmlld1snc2t1J10gKyAnXCI+QWRkIHRvIENhcnQ8L2J1dHRvbj4nICsgXCI8L2Rpdj5cIik7ICAgICAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgLy8gIH1cclxuICAgICAgICBcclxuICAgIH0gXHJcblxyXG4gICAgZGlzcGxheUFkZFRvQ2FydChldmVudCwgY29udGV4dCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2hpYWRkdG9jYXJ0Jyk7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRJRCA9ICQoZXZlbnQudGFyZ2V0KS5hdHRyKCdkYXRhLXNrdScpO1xyXG4gICAgICAgIGxldCBpdGVtVG9BZGQgPSB0aGlzLmdldFByb2R1Y3RCeVNrdShjdXJyZW50SUQpOyBcclxuICAgICAgICAgJCgnI21vZGFsQ29udGVudCcpLmxhc3QoKS5odG1sKFwiPGltZyBzcmM9J1wiICsgaXRlbVRvQWRkWyd0aHVtYm5haWxJbWFnZSddICsgXCInLz5cIiArIFwiPHA+VGhlIGl0ZW0gXCIgKyBpdGVtVG9BZGRbJ25hbWUnXSArIFwiIGhhcyBiZWVuIGFkZGVkIHRvIHlvdXIgY2FydCE8L3A+XCIpO1xyXG4gICAgICAgLy8gJChcIiN2aWV3TW9kYWxcIikuYXBwZW5kKGFkZGVkVG9DYXJ0TWVzc2FnZSk7IFxyXG4gfVxyXG5cclxuICAgIGdldFByb2R1Y3RCeVNrdShza3U9MCl7XHJcbiAgICAgICAgaWYgKHNrdT09MCl7IHJldHVybjsgfTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMucHJvZHVjdHMpO1xyXG4gICAgICAgIGxldCBjcml0ZXJpYUZuID0gZnVuY3Rpb24ocHJvZHVjdCl7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9kdWN0Wydza3UnXSA9PSBza3U7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5wcm9kdWN0cy5maWx0ZXIoY3JpdGVyaWFGbik7XHJcbiAgICAgICAgLy8gcmVzdWx0IGlzIGFuIGFycmF5IG9mIHBvdGVudGlhbCBwcm9kdWN0cy5cclxuICAgICAgICAvLyBidXQgb25lIHByb2R1Y3Qgc2hvdWxkIGJlIHJldHVybmVkIG9ubHkuXHJcbiAgICAgICAgLy8gc28gcmV0dXJuIHRoZSBmaXJzdCBlbGVtZW50O1xyXG4gICAgICAgIHJldHVybiByZXN1bHRbMF07XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvQXBwLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar ShoppingCart = function () {\n    function ShoppingCart() {\n        _classCallCheck(this, ShoppingCart);\n\n        //steps to make a shopping cart\n        console.log('creating shopping cart!');\n        this.ss = null;\n        this.initializeCart();\n    }\n\n    _createClass(ShoppingCart, [{\n        key: 'initializeCart',\n        value: function initializeCart() {\n            if (typeof Storage != \"undefined\") {\n                this.ss = sessionStorage;\n            } else {\n                console.log('bye');\n            }\n        }\n    }, {\n        key: 'addItemToCart',\n        value: function addItemToCart(item) {\n            var qty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;\n\n            console.log('addItemToCart(): item is = ' + item + ' quantity is = ' + qty);\n            if (this.ss == null) {\n                return;\n            };\n            if (qty <= 0) {\n                return;\n            }\n            if (item == null || typeof item == 'undefined') {\n                return;\n            } // check to see if the item in the cart already exists\n            // console.log('this.ss = ' + this.ss);\n            // loop through all the items currently in session storage\n            console.log('the # of items in session storage is ' + this.ss.length);\n            var numberOfItemsInCart = this.ss.length; // case: we're the 1st product ever!\n            if (numberOfItemsInCart == 0) {\n                // simply add the new item and quantity;\n                this.ss.setItem(item.toString(), qty.toString());\n                return;\n            } else {\n                // case: there is more than one product / sku\n                // loop through all the 'keys' in session storage\n                var numMatches = 0;\n                for (var theKey in this.ss) {\n                    // check to see if the key matches the sku\n                    console.log('theKey = ' + theKey);\n                    if (theKey == item.toString()) {\n                        console.log('found a matching key.');\n                        // if it does, update the quantity value by qty\n                        var newValue = (parseInt(this.ss.getItem(theKey)) + parseInt(qty)).toString();\n                        this.ss.setItem(theKey, newValue);\n                        numMatches = 1;\n                    } else {\n                        console.log('no match');\n                    }\n                }\n                // if we did not find a match after going looping through the keys\n                if (numMatches == 0) {\n                    // add the new key / value pair\n                    this.ss.setItem(item.toString(), qty);\n                }\n            }\n            // console.log the session storage to see what is happening.\n            console.log('the results of the cart so far...');\n            for (var newKey in this.ss) {\n                console.log('key/sku = ' + newKey + ' quantity = ' + this.ss.getItem(newKey));\n            }\n        }\n\n        /*\r\n            updateItemsInCart(allCartItems){\r\n                //go through each item in the cart\r\n                // get the numbers of each item\r\n                //update the quantity\r\n                //show the results to the user;\r\n            }\r\n        \r\n        */\n\n    }, {\n        key: 'deleteItemfromCart',\n        value: function deleteItemfromCart(itemToBeDeleted) {\n\n            if (this.ss == null) {\n                return;\n            };\n            if (qty <= 0) {\n                return;\n            }\n            if (item == null || typeof item == 'undefined') {\n                return;\n            } // check to see if the item in the cart already exists\n            // console.log('this.ss = ' + this.ss);\n            // loop through all the items currently in session storage\n            console.log('the # of items in session storage is ' + this.ss.length);\n            var numberOfItemsInCart = this.ss.length; // case: we're the 1st product ever!\n            if (numberOfItemsInCart == 0) {\n                // sif theres nothing in the cart, get out of there\n                return;\n            } else {\n                // case: there is more than one product / sku\n                // loop through all the 'keys' in session storage\n                var numMatches = 0;\n                for (var theKey in this.ss) {\n                    // check to see if the key matches the sku\n                    console.log('theKey = ' + theKey);\n                    if (theKey == item.toString()) {\n                        console.log('found a matching key.');\n                        // if it does, update the quantity value by qty\n                        var newValue = (parseInt(this.ss.getItem(theKey)) - parseInt(qty)).toString();\n                        this.ss.setItem(theKey, newValue);\n                        numMatches = 1;\n\n                        if (newValue == 0) {\n                            this.ss.removeItem(theKey);\n                            break; //quits the loop \n                            return;\n                        }\n                        this.ss.setItem(theKey, newValue.toString()); //updates the quantity\n                        numMatches = 1;\n                    } else {\n                        console.log('no match');\n                    }\n                }\n                // if we did not find a match after going looping through the keys\n                if (numMatches == 0) {\n                    // add the new key / value pair\n                    return;\n                }\n            }\n        }\n        /*\r\n        \r\n            getPaymentInfo(customer){\r\n                //steps required to get payment information from customer\r\n                console.log('I am getting payment info!');\r\n            }\r\n        }\r\n        \r\n        */\n\n    }]);\n\n    return ShoppingCart;\n}();\n\nexports.default = ShoppingCart;\n;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvU2hvcHBpbmdDYXJ0LmpzPzc5MWEiXSwibmFtZXMiOlsiU2hvcHBpbmdDYXJ0IiwiY29uc29sZSIsImxvZyIsInNzIiwiaW5pdGlhbGl6ZUNhcnQiLCJTdG9yYWdlIiwic2Vzc2lvblN0b3JhZ2UiLCJpdGVtIiwicXR5IiwibGVuZ3RoIiwibnVtYmVyT2ZJdGVtc0luQ2FydCIsInNldEl0ZW0iLCJ0b1N0cmluZyIsIm51bU1hdGNoZXMiLCJ0aGVLZXkiLCJuZXdWYWx1ZSIsInBhcnNlSW50IiwiZ2V0SXRlbSIsIm5ld0tleSIsIml0ZW1Ub0JlRGVsZXRlZCIsInJlbW92ZUl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFFcUJBLFk7QUFFakIsNEJBQWE7QUFBQTs7QUFDVDtBQUNBQyxnQkFBUUMsR0FBUixDQUFZLHlCQUFaO0FBQ0EsYUFBS0MsRUFBTCxHQUFVLElBQVY7QUFDQSxhQUFLQyxjQUFMO0FBQ0g7Ozs7eUNBRWU7QUFDWixnQkFBRyxPQUFRQyxPQUFSLElBQW1CLFdBQXRCLEVBQWtDO0FBQzlCLHFCQUFLRixFQUFMLEdBQVVHLGNBQVY7QUFDSCxhQUZELE1BRUs7QUFDREwsd0JBQVFDLEdBQVIsQ0FBWSxLQUFaO0FBQ0g7QUFDSjs7O3NDQUlhSyxJLEVBQVc7QUFBQSxnQkFBTkMsR0FBTSx1RUFBRixDQUFFOztBQUN0QlAsb0JBQVFDLEdBQVIsQ0FBWSxnQ0FBZ0NLLElBQWhDLHVCQUEyREMsR0FBdkU7QUFDQSxnQkFBSSxLQUFLTCxFQUFMLElBQVcsSUFBZixFQUFxQjtBQUFFO0FBQVE7QUFDL0IsZ0JBQUlLLE9BQUssQ0FBVCxFQUFhO0FBQUU7QUFBUztBQUN4QixnQkFBR0QsUUFBTSxJQUFOLElBQWMsT0FBUUEsSUFBUixJQUFlLFdBQWhDLEVBQTZDO0FBQUU7QUFBUyxhQUpsQyxDQUkwQztBQUNoRTtBQUNBO0FBQ0FOLG9CQUFRQyxHQUFSLENBQVksMENBQTBDLEtBQUtDLEVBQUwsQ0FBUU0sTUFBOUQ7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Z0JHLE1BQWhCLEVBQXdCQyxTQUFTSCxRQUFULEVBQXhCLEVBWjRCLENBWWtCO0FBQzlDQyxxQ0FBYSxDQUFiO0FBQ0gscUJBZEQsTUFjTztBQUNIWixnQ0FBUUMsR0FBUixDQUFZLFVBQVo7QUFDSDtBQUNIO0FBQ0Y7QUFDQSxvQkFBSVcsY0FBWSxDQUFoQixFQUFrQjtBQUNkO0FBQ0E7QUFDSDtBQUNOO0FBRUQ7QUFDTDs7Ozs7Ozs7Ozs7Ozs7O2tCQXJIcUJiLFk7QUErSHBCIiwiZmlsZSI6IjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNob3BwaW5nQ2FydCB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICAvL3N0ZXBzIHRvIG1ha2UgYSBzaG9wcGluZyBjYXJ0XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NyZWF0aW5nIHNob3BwaW5nIGNhcnQhJyk7XHJcbiAgICAgICAgdGhpcy5zcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXplQ2FydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRpYWxpemVDYXJ0KCl7XHJcbiAgICAgICAgaWYodHlwZW9mIChTdG9yYWdlKSAhPVwidW5kZWZpbmVkXCIpe1xyXG4gICAgICAgICAgICB0aGlzLnNzID0gc2Vzc2lvblN0b3JhZ2U7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdieWUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiBcclxuICAgIGFkZEl0ZW1Ub0NhcnQoaXRlbSxxdHk9MCl7XHJcbiAgICAgICBjb25zb2xlLmxvZyhgYWRkSXRlbVRvQ2FydCgpOiBpdGVtIGlzID0gYCArIGl0ZW0gKyBgIHF1YW50aXR5IGlzID0gYCArIHF0eSk7XHJcbiAgICAgICBpZiAodGhpcy5zcyA9PSBudWxsICl7IHJldHVybiB9O1xyXG4gICAgICAgaWYoIHF0eTw9MCApIHsgcmV0dXJuOyB9XHJcbiAgICAgICBpZihpdGVtPT1udWxsIHx8IHR5cGVvZiAoaXRlbSk9PSd1bmRlZmluZWQnKSB7IHJldHVybjsgfSAgICAgICAgLy8gY2hlY2sgdG8gc2VlIGlmIHRoZSBpdGVtIGluIHRoZSBjYXJ0IGFscmVhZHkgZXhpc3RzXHJcbiAgICAgICAvLyBjb25zb2xlLmxvZygndGhpcy5zcyA9ICcgKyB0aGlzLnNzKTtcclxuICAgICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgdGhlIGl0ZW1zIGN1cnJlbnRseSBpbiBzZXNzaW9uIHN0b3JhZ2VcclxuICAgICAgIGNvbnNvbGUubG9nKCd0aGUgIyBvZiBpdGVtcyBpbiBzZXNzaW9uIHN0b3JhZ2UgaXMgJyArIHRoaXMuc3MubGVuZ3RoKTtcclxuICAgICAgIGxldCBudW1iZXJPZkl0ZW1zSW5DYXJ0ID0gdGhpcy5zcy5sZW5ndGg7ICAgICAgICAvLyBjYXNlOiB3ZSdyZSB0aGUgMXN0IHByb2R1Y3QgZXZlciFcclxuICAgICAgIGlmIChudW1iZXJPZkl0ZW1zSW5DYXJ0ID09IDApe1xyXG4gICAgICAgICAgIC8vIHNpbXBseSBhZGQgdGhlIG5ldyBpdGVtIGFuZCBxdWFudGl0eTtcclxuICAgICAgICAgICB0aGlzLnNzLnNldEl0ZW0oIGl0ZW0udG9TdHJpbmcoKSAscXR5LnRvU3RyaW5nKCkgKTtcclxuICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgIC8vIGNhc2U6IHRoZXJlIGlzIG1vcmUgdGhhbiBvbmUgcHJvZHVjdCAvIHNrdVxyXG4gICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgdGhlICdrZXlzJyBpbiBzZXNzaW9uIHN0b3JhZ2VcclxuICAgICAgICAgICBsZXQgbnVtTWF0Y2hlcyA9IDA7XHJcbiAgICAgICAgICAgZm9yIChsZXQgdGhlS2V5IGluIHRoaXMuc3Mpe1xyXG4gICAgICAgICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgdGhlIGtleSBtYXRjaGVzIHRoZSBza3VcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZUtleSA9ICcgKyB0aGVLZXkpO1xyXG4gICAgICAgICAgICAgICBpZiAoIHRoZUtleSA9PSBpdGVtLnRvU3RyaW5nKCkgKXtcclxuICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmb3VuZCBhIG1hdGNoaW5nIGtleS4nKVxyXG4gICAgICAgICAgICAgICAgICAgLy8gaWYgaXQgZG9lcywgdXBkYXRlIHRoZSBxdWFudGl0eSB2YWx1ZSBieSBxdHlcclxuICAgICAgICAgICAgICAgICAgIGxldCBuZXdWYWx1ZSA9IChwYXJzZUludCggdGhpcy5zcy5nZXRJdGVtKHRoZUtleSkgKSArIHBhcnNlSW50IChxdHkpKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5zcy5zZXRJdGVtKHRoZUtleSwgbmV3VmFsdWUgICk7XHJcbiAgICAgICAgICAgICAgICAgICBudW1NYXRjaGVzID0xO1xyXG4gICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vIG1hdGNoJyk7XHJcbiAgICAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIC8vIGlmIHdlIGRpZCBub3QgZmluZCBhIG1hdGNoIGFmdGVyIGdvaW5nIGxvb3BpbmcgdGhyb3VnaCB0aGUga2V5c1xyXG4gICAgICAgICAgIGlmIChudW1NYXRjaGVzPT0wKXtcclxuICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBuZXcga2V5IC8gdmFsdWUgcGFpclxyXG4gICAgICAgICAgICAgICB0aGlzLnNzLnNldEl0ZW0oaXRlbS50b1N0cmluZygpLHF0eSk7XHJcbiAgICAgICAgICAgfVxyXG5cclxuICAgICAgIH0gIFxyXG4gICAgICAgLy8gY29uc29sZS5sb2cgdGhlIHNlc3Npb24gc3RvcmFnZSB0byBzZWUgd2hhdCBpcyBoYXBwZW5pbmcuXHJcbiAgICAgICBjb25zb2xlLmxvZygndGhlIHJlc3VsdHMgb2YgdGhlIGNhcnQgc28gZmFyLi4uJyk7XHJcbiAgICAgICBmb3IgKGxldCBuZXdLZXkgaW4gdGhpcy5zcyl7XHJcbiAgICAgICAgICAgY29uc29sZS5sb2coJ2tleS9za3UgPSAnICsgbmV3S2V5ICsgJyBxdWFudGl0eSA9ICcgKyB0aGlzLnNzLmdldEl0ZW0obmV3S2V5KSk7fX1cclxuXHJcbiAgICBcclxuXHJcbi8qXHJcbiAgICB1cGRhdGVJdGVtc0luQ2FydChhbGxDYXJ0SXRlbXMpe1xyXG4gICAgICAgIC8vZ28gdGhyb3VnaCBlYWNoIGl0ZW0gaW4gdGhlIGNhcnRcclxuICAgICAgICAvLyBnZXQgdGhlIG51bWJlcnMgb2YgZWFjaCBpdGVtXHJcbiAgICAgICAgLy91cGRhdGUgdGhlIHF1YW50aXR5XHJcbiAgICAgICAgLy9zaG93IHRoZSByZXN1bHRzIHRvIHRoZSB1c2VyO1xyXG4gICAgfVxyXG5cclxuKi9cclxuICAgIGRlbGV0ZUl0ZW1mcm9tQ2FydChpdGVtVG9CZURlbGV0ZWQpe1xyXG4gICAgIFxyXG4gICAgICAgaWYgKHRoaXMuc3MgPT0gbnVsbCApeyByZXR1cm4gfTtcclxuICAgICAgIGlmKCBxdHk8PTAgKSB7IHJldHVybjsgfVxyXG4gICAgICAgaWYoaXRlbT09bnVsbCB8fCB0eXBlb2YgKGl0ZW0pPT0ndW5kZWZpbmVkJykgeyByZXR1cm47IH0gICAgICAgIC8vIGNoZWNrIHRvIHNlZSBpZiB0aGUgaXRlbSBpbiB0aGUgY2FydCBhbHJlYWR5IGV4aXN0c1xyXG4gICAgICAgLy8gY29uc29sZS5sb2coJ3RoaXMuc3MgPSAnICsgdGhpcy5zcyk7XHJcbiAgICAgICAvLyBsb29wIHRocm91Z2ggYWxsIHRoZSBpdGVtcyBjdXJyZW50bHkgaW4gc2Vzc2lvbiBzdG9yYWdlXHJcbiAgICAgICBjb25zb2xlLmxvZygndGhlICMgb2YgaXRlbXMgaW4gc2Vzc2lvbiBzdG9yYWdlIGlzICcgKyB0aGlzLnNzLmxlbmd0aCk7XHJcbiAgICAgICBsZXQgbnVtYmVyT2ZJdGVtc0luQ2FydCA9IHRoaXMuc3MubGVuZ3RoOyAgICAgICAgLy8gY2FzZTogd2UncmUgdGhlIDFzdCBwcm9kdWN0IGV2ZXIhXHJcbiAgICAgICBpZiAobnVtYmVyT2ZJdGVtc0luQ2FydCA9PSAwKXtcclxuICAgICAgICAgICAvLyBzaWYgdGhlcmVzIG5vdGhpbmcgaW4gdGhlIGNhcnQsIGdldCBvdXQgb2YgdGhlcmVcclxuICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgIC8vIGNhc2U6IHRoZXJlIGlzIG1vcmUgdGhhbiBvbmUgcHJvZHVjdCAvIHNrdVxyXG4gICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCBhbGwgdGhlICdrZXlzJyBpbiBzZXNzaW9uIHN0b3JhZ2VcclxuICAgICAgICAgICBsZXQgbnVtTWF0Y2hlcyA9IDA7XHJcbiAgICAgICAgICAgZm9yIChsZXQgdGhlS2V5IGluIHRoaXMuc3Mpe1xyXG4gICAgICAgICAgICAgICAvLyBjaGVjayB0byBzZWUgaWYgdGhlIGtleSBtYXRjaGVzIHRoZSBza3VcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZUtleSA9ICcgKyB0aGVLZXkpO1xyXG4gICAgICAgICAgICAgICBpZiAoIHRoZUtleSA9PSBpdGVtLnRvU3RyaW5nKCkgKXtcclxuICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmb3VuZCBhIG1hdGNoaW5nIGtleS4nKVxyXG4gICAgICAgICAgICAgICAgICAgLy8gaWYgaXQgZG9lcywgdXBkYXRlIHRoZSBxdWFudGl0eSB2YWx1ZSBieSBxdHlcclxuICAgICAgICAgICAgICAgICAgIGxldCBuZXdWYWx1ZSA9IChwYXJzZUludCggdGhpcy5zcy5nZXRJdGVtKHRoZUtleSkgKSAtIHBhcnNlSW50IChxdHkpKS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5zcy5zZXRJdGVtKHRoZUtleSwgbmV3VmFsdWUgKTtcclxuICAgICAgICAgICAgICAgICAgIG51bU1hdGNoZXMgPTE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgaWYobmV3VmFsdWUgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zcy5yZW1vdmVJdGVtKHRoZUtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7IC8vcXVpdHMgdGhlIGxvb3AgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgdGhpcy5zcy5zZXRJdGVtKHRoZUtleSwgbmV3VmFsdWUudG9TdHJpbmcoKSk7IC8vdXBkYXRlcyB0aGUgcXVhbnRpdHlcclxuICAgICAgICAgICAgICAgICAgIG51bU1hdGNoZXMgPSAxO1xyXG4gICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vIG1hdGNoJyk7XHJcbiAgICAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIC8vIGlmIHdlIGRpZCBub3QgZmluZCBhIG1hdGNoIGFmdGVyIGdvaW5nIGxvb3BpbmcgdGhyb3VnaCB0aGUga2V5c1xyXG4gICAgICAgICAgIGlmIChudW1NYXRjaGVzPT0wKXtcclxuICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBuZXcga2V5IC8gdmFsdWUgcGFpclxyXG4gICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgfVxyXG4gICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuLypcclxuXHJcbiAgICBnZXRQYXltZW50SW5mbyhjdXN0b21lcil7XHJcbiAgICAgICAgLy9zdGVwcyByZXF1aXJlZCB0byBnZXQgcGF5bWVudCBpbmZvcm1hdGlvbiBmcm9tIGN1c3RvbWVyXHJcbiAgICAgICAgY29uc29sZS5sb2coJ0kgYW0gZ2V0dGluZyBwYXltZW50IGluZm8hJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiovXHJcblxyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TaG9wcGluZ0NhcnQuanMiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 3 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar BBProductAPIService = function () {\n    function BBProductAPIService() {\n        _classCallCheck(this, BBProductAPIService);\n\n        console.log('intializing best buy api service');\n        this.bbURL = \"https://api.remix.bestbuy.com/v1/products((categoryPath.id=abcat0501000))?apiKey=8ccddf4rtjz5k5btqam84qak&format=json&show=image,thumbnailImage,shortDescription,name,regularPrice,salePrice,sku\";\n        // this.loadDataUsingJS();\n    }\n\n    _createClass(BBProductAPIService, [{\n        key: 'loadDataUsingJS',\n        value: function loadDataUsingJS() {\n            var _this = this;\n\n            var _promiseFn = function _promiseFn(_success, _reject) {\n                var req = new XMLHttpRequest();\n                req.onload = function () {\n                    switch (req.status) {\n                        case 200:\n                            _success(req.response);\n                            break;\n                        case 404:\n                            console.log('error: service url not found');\n                            _reject(Error(rew.statusText));\n                            break;\n                        default:\n                            console.log('error');\n                            break;\n                    }\n                };\n\n                req.open('GET', _this.bbURL);\n                req.onerror = function () {\n                    _reject(Error(\"Network Error\"));\n                };\n\n                req.send();\n            };\n            var promise = new Promise(_promiseFn);\n            return promise;\n        }\n    }]);\n\n    return BBProductAPIService;\n}();\n\nexports.default = BBProductAPIService;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvQkJQcm9kdWN0QVBJU2VydmljZS5qcz83MDQ4Il0sIm5hbWVzIjpbIkJCUHJvZHVjdEFQSVNlcnZpY2UiLCJjb25zb2xlIiwibG9nIiwiYmJVUkwiLCJfcHJvbWlzZUZuIiwiX3N1Y2Nlc3MiLCJfcmVqZWN0IiwicmVxIiwiWE1MSHR0cFJlcXVlc3QiLCJvbmxvYWQiLCJzdGF0dXMiLCJyZXNwb25zZSIsIkVycm9yIiwicmV3Iiwic3RhdHVzVGV4dCIsIm9wZW4iLCJvbmVycm9yIiwic2VuZCIsInByb21pc2UiLCJQcm9taXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQXFCQSxtQjtBQUNqQixtQ0FBYTtBQUFBOztBQUNUQyxnQkFBUUMsR0FBUixDQUFZLGtDQUFaO0FBQ0EsYUFBS0MsS0FBTCxHQUFhLGtNQUFiO0FBQ0Q7QUFDRjs7OzswQ0FFZ0I7QUFBQTs7QUFDYixnQkFBSUMsYUFBYSxTQUFiQSxVQUFhLENBQUNDLFFBQUQsRUFBV0MsT0FBWCxFQUF1QjtBQUN4QyxvQkFBSUMsTUFBTSxJQUFJQyxjQUFKLEVBQVY7QUFDQUQsb0JBQUlFLE1BQUosR0FBYSxZQUFNO0FBQ2YsNEJBQU9GLElBQUlHLE1BQVg7QUFDSSw2QkFBSyxHQUFMO0FBQ0lMLHFDQUFTRSxJQUFJSSxRQUFiO0FBQ0o7QUFDQSw2QkFBSyxHQUFMO0FBQ0lWLG9DQUFRQyxHQUFSLENBQVksOEJBQVo7QUFDQUksb0NBQVFNLE1BQU1DLElBQUlDLFVBQVYsQ0FBUjtBQUNBO0FBQ0o7QUFDSWIsb0NBQVFDLEdBQVIsQ0FBWSxPQUFaO0FBQ0E7QUFWUjtBQWFILGlCQWREOztBQWdCQUssb0JBQUlRLElBQUosQ0FBUyxLQUFULEVBQWdCLE1BQUtaLEtBQXJCO0FBQ0FJLG9CQUFJUyxPQUFKLEdBQWMsWUFBVTtBQUNwQlYsNEJBQVFNLE1BQU0sZUFBTixDQUFSO0FBQ0gsaUJBRkQ7O0FBSUFMLG9CQUFJVSxJQUFKO0FBQ0QsYUF4QkM7QUF5QkYsZ0JBQUlDLFVBQVUsSUFBSUMsT0FBSixDQUFZZixVQUFaLENBQWQ7QUFDQSxtQkFBT2MsT0FBUDtBQUVEOzs7Ozs7a0JBcENnQmxCLG1CIiwiZmlsZSI6IjMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBCQlByb2R1Y3RBUElTZXJ2aWNle1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnaW50aWFsaXppbmcgYmVzdCBidXkgYXBpIHNlcnZpY2UnKTtcclxuICAgICAgICB0aGlzLmJiVVJMID0gXCJodHRwczovL2FwaS5yZW1peC5iZXN0YnV5LmNvbS92MS9wcm9kdWN0cygoY2F0ZWdvcnlQYXRoLmlkPWFiY2F0MDUwMTAwMCkpP2FwaUtleT04Y2NkZGY0cnRqejVrNWJ0cWFtODRxYWsmZm9ybWF0PWpzb24mc2hvdz1pbWFnZSx0aHVtYm5haWxJbWFnZSxzaG9ydERlc2NyaXB0aW9uLG5hbWUscmVndWxhclByaWNlLHNhbGVQcmljZSxza3VcIjtcclxuICAgICAgIC8vIHRoaXMubG9hZERhdGFVc2luZ0pTKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9hZERhdGFVc2luZ0pTKCl7XHJcbiAgICAgICAgbGV0IF9wcm9taXNlRm4gPSAoX3N1Y2Nlc3MsIF9yZWplY3QpID0+IHtcclxuICAgICAgICBsZXQgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoKHJlcS5zdGF0dXMpe1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyMDA6XHJcbiAgICAgICAgICAgICAgICAgICAgX3N1Y2Nlc3MocmVxLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0MDQ6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yOiBzZXJ2aWNlIHVybCBub3QgZm91bmQnKTtcclxuICAgICAgICAgICAgICAgICAgICBfcmVqZWN0KEVycm9yKHJldy5zdGF0dXNUZXh0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXEub3BlbignR0VUJywgdGhpcy5iYlVSTCk7XHJcbiAgICAgICAgcmVxLm9uZXJyb3IgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBfcmVqZWN0KEVycm9yKFwiTmV0d29yayBFcnJvclwiKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmVxLnNlbmQoKTtcclxuICAgICAgfTtcclxuICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShfcHJvbWlzZUZuKTtcclxuICAgICAgcmV0dXJuIHByb21pc2U7XHJcblxyXG4gICAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9CQlByb2R1Y3RBUElTZXJ2aWNlLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 4 */
/***/ function(module, exports) {

	eval("'use strict';\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar BBProductData = function BBProductData(data) {\n    _classCallCheck(this, BBProductData);\n\n    this.from = data['from'];\n    this.to = data['to'];\n    this.total = data['total'];\n    this.currentPage = data['currentPage'];\n    this.totalPages = data['totalPages'];\n    this.queryTime = data['queryTime'];\n    this.totalTime = data['totalTime'];\n    this.partial = data['partial'];\n    this.canonicalUrl = data['canonicalUrl'];\n    this.products = data['products'];\n};\n\nexports.default = BBProductData;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbW9kZWwvQkJQcm9kdWN0RGF0YS5qcz84NWZhIl0sIm5hbWVzIjpbIkJCUHJvZHVjdERhdGEiLCJkYXRhIiwiZnJvbSIsInRvIiwidG90YWwiLCJjdXJyZW50UGFnZSIsInRvdGFsUGFnZXMiLCJxdWVyeVRpbWUiLCJ0b3RhbFRpbWUiLCJwYXJ0aWFsIiwiY2Fub25pY2FsVXJsIiwicHJvZHVjdHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBQXFCQSxhLEdBQ2pCLHVCQUFZQyxJQUFaLEVBQWlCO0FBQUE7O0FBQ2IsU0FBS0MsSUFBTCxHQUFZRCxLQUFLLE1BQUwsQ0FBWjtBQUNBLFNBQUtFLEVBQUwsR0FBVUYsS0FBSyxJQUFMLENBQVY7QUFDQSxTQUFLRyxLQUFMLEdBQWFILEtBQUssT0FBTCxDQUFiO0FBQ0EsU0FBS0ksV0FBTCxHQUFtQkosS0FBSyxhQUFMLENBQW5CO0FBQ0EsU0FBS0ssVUFBTCxHQUFrQkwsS0FBSyxZQUFMLENBQWxCO0FBQ0EsU0FBS00sU0FBTCxHQUFpQk4sS0FBSyxXQUFMLENBQWpCO0FBQ0EsU0FBS08sU0FBTCxHQUFpQlAsS0FBSyxXQUFMLENBQWpCO0FBQ0EsU0FBS1EsT0FBTCxHQUFlUixLQUFLLFNBQUwsQ0FBZjtBQUNBLFNBQUtTLFlBQUwsR0FBb0JULEtBQUssY0FBTCxDQUFwQjtBQUNBLFNBQUtVLFFBQUwsR0FBZ0JWLEtBQUssVUFBTCxDQUFoQjtBQUVILEM7O2tCQWJnQkQsYSIsImZpbGUiOiI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQkJQcm9kdWN0RGF0YXtcclxuICAgIGNvbnN0cnVjdG9yKGRhdGEpe1xyXG4gICAgICAgIHRoaXMuZnJvbSA9IGRhdGFbJ2Zyb20nXTtcclxuICAgICAgICB0aGlzLnRvID0gZGF0YVsndG8nXTtcclxuICAgICAgICB0aGlzLnRvdGFsID0gZGF0YVsndG90YWwnXTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gZGF0YVsnY3VycmVudFBhZ2UnXTtcclxuICAgICAgICB0aGlzLnRvdGFsUGFnZXMgPSBkYXRhWyd0b3RhbFBhZ2VzJ107XHJcbiAgICAgICAgdGhpcy5xdWVyeVRpbWUgPSBkYXRhWydxdWVyeVRpbWUnXTtcclxuICAgICAgICB0aGlzLnRvdGFsVGltZSA9IGRhdGFbJ3RvdGFsVGltZSddO1xyXG4gICAgICAgIHRoaXMucGFydGlhbCA9IGRhdGFbJ3BhcnRpYWwnXTtcclxuICAgICAgICB0aGlzLmNhbm9uaWNhbFVybCA9IGRhdGFbJ2Nhbm9uaWNhbFVybCddO1xyXG4gICAgICAgIHRoaXMucHJvZHVjdHMgPSBkYXRhWydwcm9kdWN0cyddO1xyXG4gICAgICAgXHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbW9kZWwvQkJQcm9kdWN0RGF0YS5qcyJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);