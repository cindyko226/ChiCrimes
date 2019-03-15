/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// import * as d3 from "d3";
// d3.csv("data.csv", function (data) {
//     // console.log('here');
//     data.forEach(function (d) {
//         console.log(d);
//     });
//     // console.log(data);
// });
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");
var scale = 0.70,
    w = 1400 * scale,
    h = 900 * scale,
    data = [],
    map_portion = 0.55;
var projection = d3.geoAlbers().translate([w * map_portion / 2, h / 2]).scale(82000).rotate([87.850, 0]).center([0, 41.825]); //41.965130329,-87.758377123

console.log(d3.geoAlbers().translate([w * map_portion / 2, h / 2]).scale(82000).rotate([87.85, 0]).center([0, 41.825])([-87.758377123, 41.965130329]));
var path = d3.geoPath().projection(projection);
var promises = [d3.json("wards.json"), d3.csv('data.csv')];
var g = svg.append('g');
Promise.all(promises).then(ready);

function ready(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      chicago = _ref2[0],
      data = _ref2[1];

  var precincts = topojson.feature(chicago, chicago.objects.wards);
  g.attr("class", "precinct").selectAll("path").data(precincts.features).enter().append("path").attr("d", path);
  g.selectAll('circle').data(data).enter().append('circle').attr('cx', function (d) {
    return projection([d.Longitude, d.Latitude])[0];
  }).attr('cy', function (d) {
    return projection([d.Longitude, d.Latitude])[1];
  }).attr('r', "3.5").style('fill', function (d) {
    if (d.PrimaryType === "THEFT") {
      return "red";
    } else if (d.PrimaryType === "BATTERY") {
      return "purple";
    } else if (d.PrimaryType === "WEAPONS VIOLATION") {
      return "yellow";
    } else if (d.PrimaryType === "CRIMINAL DAMAGE") {
      return "green";
    } else {
      return "pink";
    }
  });
} // d3.csv('data.csv', function (data) {
//     // var locations = data.features;
//     // var hue = 0;
//     debugger
//     data.forEach(function (d) { 
//         console.log(d);
//         // hue += 0.36               
//         // d.color = 'hsl(' + hue + ', 100%, 50%)';
//     });
// })
// d3.csv("data.csv", function (data) {
//     // console.log('here');
//     data.forEach(function (d) {
//         console.log(d);
//     });
//     // console.log(data);
// });

/***/ })

/******/ });
//# sourceMappingURL=main.js.map