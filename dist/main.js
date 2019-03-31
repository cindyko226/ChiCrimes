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

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");
svg.attr('viewBox', '250 100 600 600');
var scale = 0.70,
    w = 1400 * scale,
    h = 1200 * scale,
    data = [],
    map_portion = 0.65;
var projection = d3.geoAlbers().translate([w * map_portion / 2, h / 2]).scale(82000).rotate([87.750, 0]).center([0, 41.825]);
var path = d3.geoPath().projection(projection);
var promises = [d3.json("wards.json"), d3.csv('data.csv')];
var g = svg.append('g');
var colorset = ["red", "plum", "yellow", "blue", "pink", "green", 'white', ''];
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
  }).attr('r', "3").style('fill', function (d) {
    if (d.PrimaryType === "THEFT" || d.PrimaryType === "MOTOR VEHICLE THEFT") {
      return "red";
    } else if (d.PrimaryType === "BATTERY" || d.PrimaryType === "ASSAULT") {
      return "plum";
    } else if (d.PrimaryType === "WEAPONS VIOLATION" || d.PrimaryType === "CRIM SEXUAL ASSAULT") {
      return "yellow";
    } else if (d.PrimaryType === "BURGLARY" || d.PrimaryType === "ROBBERY") {
      return "blue";
    } else if (d.PrimaryType === "NARCOTICS") {
      return "pink";
    } else if (d.PrimaryType === "OTHER OFFENSE" || d.PrimaryType === "OFFENSE INVOLVING CHILDREN") {
      return "green";
    } else {
      return "white";
    }
  }).style('stroke', 'none').attr('class', function (d) {
    if (d.PrimaryType === "THEFT" || d.PrimaryType === "MOTOR VEHICLE THEFT") {
      return "red";
    } else if (d.PrimaryType === "BATTERY" || d.PrimaryType === "ASSAULT") {
      return "plum";
    } else if (d.PrimaryType === "WEAPONS VIOLATION" || d.PrimaryType === "CRIM SEXUAL ASSAULT") {
      return "yellow";
    } else if (d.PrimaryType === "BURGLARY" || d.PrimaryType === "ROBBERY") {
      return "blue";
    } else if (d.PrimaryType === "NARCOTICS") {
      return "pink";
    } else if (d.PrimaryType === "OTHER OFFENSE" || d.PrimaryType === "OFFENSE INVOLVING CHILDREN") {
      return "green";
    } else {
      return "white";
    }
  }).on('mouseover', function (d) {
    d3.selectAll('circle').style('opacity', 0.7);
    d3.select(this).style("opacity", 1).attr("r", 20);
    d3.select("#date").text(d.Date);
    d3.select("#location").text(d.Block);
    d3.select("#primarytype").text(d.PrimaryType);
    d3.select("#arrest").text(d.Arrest).style('color', d.Arrest === "true" ? "green" : "red");
    d3.select('#tooltip').style('left', d3.event.pageX + 20 + 'px').style('top', d3.event.pageY - 80 + 'px').style('display', 'block');
  }).on('mouseout', function (d) {
    d3.selectAll('circle').style('opacity', 1);
    d3.select(this).attr("r", 3);
    d3.select('#tooltip').style('display', 'none');
  });
  g.selectAll("rect").data(colorset).enter().append("rect").attr("height", 20).attr("x", 500).attr("y", function (d, i) {
    return 130 + i * 30;
  }).attr("width", 20).attr("fill", function (d) {
    return d;
  }).attr("class", "colorbar").style('stroke', 'none').on('click', function (d) {
    if (d === 'red') {
      d3.selectAll('circle').style('display', 'none');
      d3.selectAll('.red').style('display', 'block');
    } else if (d === 'plum') {
      d3.selectAll('circle').style('display', 'none');
      d3.selectAll('.plum').style('display', 'block');
    } else if (d === 'yellow') {
      d3.selectAll('circle').style('display', 'none');
      d3.selectAll('.yellow').style('display', 'block');
    } else if (d === 'blue') {
      d3.selectAll('circle').style('display', 'none');
      d3.selectAll('.blue').style('display', 'block');
    } else if (d === 'pink') {
      d3.selectAll('circle').style('display', 'none');
      d3.selectAll('.pink').style('display', 'block');
    } else if (d === 'green') {
      d3.selectAll('circle').style('display', 'none');
      d3.selectAll('.green').style('display', 'block');
    } else if (d === 'white') {
      d3.selectAll('circle').style('display', 'none');
      d3.selectAll('.white').style('display', 'block');
    } else {
      d3.selectAll('circle').style('display', 'block');
    }
  });
  var numberRed = d3.selectAll('.red').size();
  var numberPlum = d3.selectAll('.plum').size();
  var numberYellow = d3.selectAll('.yellow').size();
  var numberBlue = d3.selectAll('.blue').size();
  var numberPink = d3.selectAll('.pink').size();
  var numberGreen = d3.selectAll('.green').size();
  var numberWhite = d3.selectAll('.white').size();
  var textset = {
    type: ["THEFT / MOTOR VEHICLE THEFT --".concat(numberRed, " "), "BATTERY / ASSAULT --".concat(numberPlum), "WEAPONS VIOLATION / CRIM SEXUAL ASSAULT --".concat(numberYellow), "BURGLARY / ROBBERY --".concat(numberBlue), "NARCOTICS --".concat(numberPink), "OTHER OFFENSE / OFFENSE INVOLVING CHILDREN --".concat(numberGreen), "HOMICIDE / OTHERS --".concat(numberWhite), "SHOW ALL", "CLICK COLOR SQUARE TO FILTER CRIMES", "=> HOVER ON CIRCLE TO SEE DETAILS"]
  };
  g.selectAll("text").data(textset.type).enter().append("text").text(function (d) {
    return d;
  }).attr("x", 550).attr("y", function (d, i) {
    if (d === "=> HOVER ON CIRCLE TO SEE DETAILS") {
      return 500;
    } else {
      return 145 + i * 30;
    }
  }).style('stroke', function (d) {
    if (d === "CLICK COLOR SQUARE TO FILTER CRIMES") {
      return "DarkSlateGray";
    } else if (d === "=> HOVER ON CIRCLE TO SEE DETAILS") {
      return 'Brown';
    } else {
      return "white";
    }
  }).style('fill', function (d) {
    if (d === "CLICK COLOR SQUARE TO FILTER CRIMES") {
      return "DarkSlateGray";
    } else if (d === "=> HOVER ON CIRCLE TO SEE DETAILS") {
      return 'Brown';
    } else {
      return "white";
    }
  }).style('font-family', 'Arial').attr('class', function (d) {
    if (d === "CLICK COLOR SQUARE TO FILTER CRIMES") {
      return "pulse";
    }
  });
}

/***/ })

/******/ });
//# sourceMappingURL=main.js.map