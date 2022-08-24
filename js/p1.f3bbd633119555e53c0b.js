/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 904:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 819:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 344:
/***/ (function(__unused_webpack_module, exports) {

(function (global, factory) {
     true ? factory(exports) :
    0;
}(this, (function (exports) { 'use strict';

    exports.PipsMode = void 0;
    (function (PipsMode) {
        PipsMode["Range"] = "range";
        PipsMode["Steps"] = "steps";
        PipsMode["Positions"] = "positions";
        PipsMode["Count"] = "count";
        PipsMode["Values"] = "values";
    })(exports.PipsMode || (exports.PipsMode = {}));
    exports.PipsType = void 0;
    (function (PipsType) {
        PipsType[PipsType["None"] = -1] = "None";
        PipsType[PipsType["NoValue"] = 0] = "NoValue";
        PipsType[PipsType["LargeValue"] = 1] = "LargeValue";
        PipsType[PipsType["SmallValue"] = 2] = "SmallValue";
    })(exports.PipsType || (exports.PipsType = {}));
    //region Helper Methods
    function isValidFormatter(entry) {
        return isValidPartialFormatter(entry) && typeof entry.from === "function";
    }
    function isValidPartialFormatter(entry) {
        // partial formatters only need a to function and not a from function
        return typeof entry === "object" && typeof entry.to === "function";
    }
    function removeElement(el) {
        el.parentElement.removeChild(el);
    }
    function isSet(value) {
        return value !== null && value !== undefined;
    }
    // Bindable version
    function preventDefault(e) {
        e.preventDefault();
    }
    // Removes duplicates from an array.
    function unique(array) {
        return array.filter(function (a) {
            return !this[a] ? (this[a] = true) : false;
        }, {});
    }
    // Round a value to the closest 'to'.
    function closest(value, to) {
        return Math.round(value / to) * to;
    }
    // Current position of an element relative to the document.
    function offset(elem, orientation) {
        var rect = elem.getBoundingClientRect();
        var doc = elem.ownerDocument;
        var docElem = doc.documentElement;
        var pageOffset = getPageOffset(doc);
        // getBoundingClientRect contains left scroll in Chrome on Android.
        // I haven't found a feature detection that proves this. Worst case
        // scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
        if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) {
            pageOffset.x = 0;
        }
        return orientation ? rect.top + pageOffset.y - docElem.clientTop : rect.left + pageOffset.x - docElem.clientLeft;
    }
    // Checks whether a value is numerical.
    function isNumeric(a) {
        return typeof a === "number" && !isNaN(a) && isFinite(a);
    }
    // Sets a class and removes it after [duration] ms.
    function addClassFor(element, className, duration) {
        if (duration > 0) {
            addClass(element, className);
            setTimeout(function () {
                removeClass(element, className);
            }, duration);
        }
    }
    // Limits a value to 0 - 100
    function limit(a) {
        return Math.max(Math.min(a, 100), 0);
    }
    // Wraps a variable as an array, if it isn't one yet.
    // Note that an input array is returned by reference!
    function asArray(a) {
        return Array.isArray(a) ? a : [a];
    }
    // Counts decimals
    function countDecimals(numStr) {
        numStr = String(numStr);
        var pieces = numStr.split(".");
        return pieces.length > 1 ? pieces[1].length : 0;
    }
    // http://youmightnotneedjquery.com/#add_class
    function addClass(el, className) {
        if (el.classList && !/\s/.test(className)) {
            el.classList.add(className);
        }
        else {
            el.className += " " + className;
        }
    }
    // http://youmightnotneedjquery.com/#remove_class
    function removeClass(el, className) {
        if (el.classList && !/\s/.test(className)) {
            el.classList.remove(className);
        }
        else {
            el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
        }
    }
    // https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
    function hasClass(el, className) {
        return el.classList ? el.classList.contains(className) : new RegExp("\\b" + className + "\\b").test(el.className);
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
    function getPageOffset(doc) {
        var supportPageOffset = window.pageXOffset !== undefined;
        var isCSS1Compat = (doc.compatMode || "") === "CSS1Compat";
        var x = supportPageOffset
            ? window.pageXOffset
            : isCSS1Compat
                ? doc.documentElement.scrollLeft
                : doc.body.scrollLeft;
        var y = supportPageOffset
            ? window.pageYOffset
            : isCSS1Compat
                ? doc.documentElement.scrollTop
                : doc.body.scrollTop;
        return {
            x: x,
            y: y
        };
    }
    // we provide a function to compute constants instead
    // of accessing window.* as soon as the module needs it
    // so that we do not compute anything if not needed
    function getActions() {
        // Determine the events to bind. IE11 implements pointerEvents without
        // a prefix, which breaks compatibility with the IE10 implementation.
        return window.navigator.pointerEnabled
            ? {
                start: "pointerdown",
                move: "pointermove",
                end: "pointerup"
            }
            : window.navigator.msPointerEnabled
                ? {
                    start: "MSPointerDown",
                    move: "MSPointerMove",
                    end: "MSPointerUp"
                }
                : {
                    start: "mousedown touchstart",
                    move: "mousemove touchmove",
                    end: "mouseup touchend"
                };
    }
    // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
    // Issue #785
    function getSupportsPassive() {
        var supportsPassive = false;
        /* eslint-disable */
        try {
            var opts = Object.defineProperty({}, "passive", {
                get: function () {
                    supportsPassive = true;
                }
            });
            // @ts-ignore
            window.addEventListener("test", null, opts);
        }
        catch (e) { }
        /* eslint-enable */
        return supportsPassive;
    }
    function getSupportsTouchActionNone() {
        return window.CSS && CSS.supports && CSS.supports("touch-action", "none");
    }
    //endregion
    //region Range Calculation
    // Determine the size of a sub-range in relation to a full range.
    function subRangeRatio(pa, pb) {
        return 100 / (pb - pa);
    }
    // (percentage) How many percent is this value of this range?
    function fromPercentage(range, value, startRange) {
        return (value * 100) / (range[startRange + 1] - range[startRange]);
    }
    // (percentage) Where is this value on this range?
    function toPercentage(range, value) {
        return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) : value - range[0], 0);
    }
    // (value) How much is this percentage on this range?
    function isPercentage(range, value) {
        return (value * (range[1] - range[0])) / 100 + range[0];
    }
    function getJ(value, arr) {
        var j = 1;
        while (value >= arr[j]) {
            j += 1;
        }
        return j;
    }
    // (percentage) Input a value, find where, on a scale of 0-100, it applies.
    function toStepping(xVal, xPct, value) {
        if (value >= xVal.slice(-1)[0]) {
            return 100;
        }
        var j = getJ(value, xVal);
        var va = xVal[j - 1];
        var vb = xVal[j];
        var pa = xPct[j - 1];
        var pb = xPct[j];
        return pa + toPercentage([va, vb], value) / subRangeRatio(pa, pb);
    }
    // (value) Input a percentage, find where it is on the specified range.
    function fromStepping(xVal, xPct, value) {
        // There is no range group that fits 100
        if (value >= 100) {
            return xVal.slice(-1)[0];
        }
        var j = getJ(value, xPct);
        var va = xVal[j - 1];
        var vb = xVal[j];
        var pa = xPct[j - 1];
        var pb = xPct[j];
        return isPercentage([va, vb], (value - pa) * subRangeRatio(pa, pb));
    }
    // (percentage) Get the step that applies at a certain value.
    function getStep(xPct, xSteps, snap, value) {
        if (value === 100) {
            return value;
        }
        var j = getJ(value, xPct);
        var a = xPct[j - 1];
        var b = xPct[j];
        // If 'snap' is set, steps are used as fixed points on the slider.
        if (snap) {
            // Find the closest position, a or b.
            if (value - a > (b - a) / 2) {
                return b;
            }
            return a;
        }
        if (!xSteps[j - 1]) {
            return value;
        }
        return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
    }
    //endregion
    //region Spectrum
    var Spectrum = /** @class */ (function () {
        function Spectrum(entry, snap, singleStep) {
            this.xPct = [];
            this.xVal = [];
            this.xSteps = [];
            this.xNumSteps = [];
            this.xHighestCompleteStep = [];
            this.xSteps = [singleStep || false];
            this.xNumSteps = [false];
            this.snap = snap;
            var index;
            var ordered = [];
            // Map the object keys to an array.
            Object.keys(entry).forEach(function (index) {
                ordered.push([asArray(entry[index]), index]);
            });
            // Sort all entries by value (numeric sort).
            ordered.sort(function (a, b) {
                return a[0][0] - b[0][0];
            });
            // Convert all entries to subranges.
            for (index = 0; index < ordered.length; index++) {
                this.handleEntryPoint(ordered[index][1], ordered[index][0]);
            }
            // Store the actual step values.
            // xSteps is sorted in the same order as xPct and xVal.
            this.xNumSteps = this.xSteps.slice(0);
            // Convert all numeric steps to the percentage of the subrange they represent.
            for (index = 0; index < this.xNumSteps.length; index++) {
                this.handleStepPoint(index, this.xNumSteps[index]);
            }
        }
        Spectrum.prototype.getDistance = function (value) {
            var distances = [];
            for (var index = 0; index < this.xNumSteps.length - 1; index++) {
                distances[index] = fromPercentage(this.xVal, value, index);
            }
            return distances;
        };
        // Calculate the percentual distance over the whole scale of ranges.
        // direction: 0 = backwards / 1 = forwards
        Spectrum.prototype.getAbsoluteDistance = function (value, distances, direction) {
            var xPct_index = 0;
            // Calculate range where to start calculation
            if (value < this.xPct[this.xPct.length - 1]) {
                while (value > this.xPct[xPct_index + 1]) {
                    xPct_index++;
                }
            }
            else if (value === this.xPct[this.xPct.length - 1]) {
                xPct_index = this.xPct.length - 2;
            }
            // If looking backwards and the value is exactly at a range separator then look one range further
            if (!direction && value === this.xPct[xPct_index + 1]) {
                xPct_index++;
            }
            if (distances === null) {
                distances = [];
            }
            var start_factor;
            var rest_factor = 1;
            var rest_rel_distance = distances[xPct_index];
            var range_pct = 0;
            var rel_range_distance = 0;
            var abs_distance_counter = 0;
            var range_counter = 0;
            // Calculate what part of the start range the value is
            if (direction) {
                start_factor = (value - this.xPct[xPct_index]) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]);
            }
            else {
                start_factor = (this.xPct[xPct_index + 1] - value) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]);
            }
            // Do until the complete distance across ranges is calculated
            while (rest_rel_distance > 0) {
                // Calculate the percentage of total range
                range_pct = this.xPct[xPct_index + 1 + range_counter] - this.xPct[xPct_index + range_counter];
                // Detect if the margin, padding or limit is larger then the current range and calculate
                if (distances[xPct_index + range_counter] * rest_factor + 100 - start_factor * 100 > 100) {
                    // If larger then take the percentual distance of the whole range
                    rel_range_distance = range_pct * start_factor;
                    // Rest factor of relative percentual distance still to be calculated
                    rest_factor = (rest_rel_distance - 100 * start_factor) / distances[xPct_index + range_counter];
                    // Set start factor to 1 as for next range it does not apply.
                    start_factor = 1;
                }
                else {
                    // If smaller or equal then take the percentual distance of the calculate percentual part of that range
                    rel_range_distance = ((distances[xPct_index + range_counter] * range_pct) / 100) * rest_factor;
                    // No rest left as the rest fits in current range
                    rest_factor = 0;
                }
                if (direction) {
                    abs_distance_counter = abs_distance_counter - rel_range_distance;
                    // Limit range to first range when distance becomes outside of minimum range
                    if (this.xPct.length + range_counter >= 1) {
                        range_counter--;
                    }
                }
                else {
                    abs_distance_counter = abs_distance_counter + rel_range_distance;
                    // Limit range to last range when distance becomes outside of maximum range
                    if (this.xPct.length - range_counter >= 1) {
                        range_counter++;
                    }
                }
                // Rest of relative percentual distance still to be calculated
                rest_rel_distance = distances[xPct_index + range_counter] * rest_factor;
            }
            return value + abs_distance_counter;
        };
        Spectrum.prototype.toStepping = function (value) {
            value = toStepping(this.xVal, this.xPct, value);
            return value;
        };
        Spectrum.prototype.fromStepping = function (value) {
            return fromStepping(this.xVal, this.xPct, value);
        };
        Spectrum.prototype.getStep = function (value) {
            value = getStep(this.xPct, this.xSteps, this.snap, value);
            return value;
        };
        Spectrum.prototype.getDefaultStep = function (value, isDown, size) {
            var j = getJ(value, this.xPct);
            // When at the top or stepping down, look at the previous sub-range
            if (value === 100 || (isDown && value === this.xPct[j - 1])) {
                j = Math.max(j - 1, 1);
            }
            return (this.xVal[j] - this.xVal[j - 1]) / size;
        };
        Spectrum.prototype.getNearbySteps = function (value) {
            var j = getJ(value, this.xPct);
            return {
                stepBefore: {
                    startValue: this.xVal[j - 2],
                    step: this.xNumSteps[j - 2],
                    highestStep: this.xHighestCompleteStep[j - 2]
                },
                thisStep: {
                    startValue: this.xVal[j - 1],
                    step: this.xNumSteps[j - 1],
                    highestStep: this.xHighestCompleteStep[j - 1]
                },
                stepAfter: {
                    startValue: this.xVal[j],
                    step: this.xNumSteps[j],
                    highestStep: this.xHighestCompleteStep[j]
                }
            };
        };
        Spectrum.prototype.countStepDecimals = function () {
            var stepDecimals = this.xNumSteps.map(countDecimals);
            return Math.max.apply(null, stepDecimals);
        };
        Spectrum.prototype.hasNoSize = function () {
            return this.xVal[0] === this.xVal[this.xVal.length - 1];
        };
        // Outside testing
        Spectrum.prototype.convert = function (value) {
            return this.getStep(this.toStepping(value));
        };
        Spectrum.prototype.handleEntryPoint = function (index, value) {
            var percentage;
            // Covert min/max syntax to 0 and 100.
            if (index === "min") {
                percentage = 0;
            }
            else if (index === "max") {
                percentage = 100;
            }
            else {
                percentage = parseFloat(index);
            }
            // Check for correct input.
            if (!isNumeric(percentage) || !isNumeric(value[0])) {
                throw new Error("noUiSlider: 'range' value isn't numeric.");
            }
            // Store values.
            this.xPct.push(percentage);
            this.xVal.push(value[0]);
            var value1 = Number(value[1]);
            // NaN will evaluate to false too, but to keep
            // logging clear, set step explicitly. Make sure
            // not to override the 'step' setting with false.
            if (!percentage) {
                if (!isNaN(value1)) {
                    this.xSteps[0] = value1;
                }
            }
            else {
                this.xSteps.push(isNaN(value1) ? false : value1);
            }
            this.xHighestCompleteStep.push(0);
        };
        Spectrum.prototype.handleStepPoint = function (i, n) {
            // Ignore 'false' stepping.
            if (!n) {
                return;
            }
            // Step over zero-length ranges (#948);
            if (this.xVal[i] === this.xVal[i + 1]) {
                this.xSteps[i] = this.xHighestCompleteStep[i] = this.xVal[i];
                return;
            }
            // Factor to range ratio
            this.xSteps[i] =
                fromPercentage([this.xVal[i], this.xVal[i + 1]], n, 0) / subRangeRatio(this.xPct[i], this.xPct[i + 1]);
            var totalSteps = (this.xVal[i + 1] - this.xVal[i]) / this.xNumSteps[i];
            var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
            var step = this.xVal[i] + this.xNumSteps[i] * highestStep;
            this.xHighestCompleteStep[i] = step;
        };
        return Spectrum;
    }());
    //endregion
    //region Options
    /*	Every input option is tested and parsed. This will prevent
        endless validation in internal methods. These tests are
        structured with an item for every option available. An
        option can be marked as required by setting the 'r' flag.
        The testing function is provided with three arguments:
            - The provided value for the option;
            - A reference to the options object;
            - The name for the option;

        The testing function returns false when an error is detected,
        or true when everything is OK. It can also modify the option
        object, to make sure all values can be correctly looped elsewhere. */
    //region Defaults
    var defaultFormatter = {
        to: function (value) {
            return value === undefined ? "" : value.toFixed(2);
        },
        from: Number
    };
    var cssClasses = {
        target: "target",
        base: "base",
        origin: "origin",
        handle: "handle",
        handleLower: "handle-lower",
        handleUpper: "handle-upper",
        touchArea: "touch-area",
        horizontal: "horizontal",
        vertical: "vertical",
        background: "background",
        connect: "connect",
        connects: "connects",
        ltr: "ltr",
        rtl: "rtl",
        textDirectionLtr: "txt-dir-ltr",
        textDirectionRtl: "txt-dir-rtl",
        draggable: "draggable",
        drag: "state-drag",
        tap: "state-tap",
        active: "active",
        tooltip: "tooltip",
        pips: "pips",
        pipsHorizontal: "pips-horizontal",
        pipsVertical: "pips-vertical",
        marker: "marker",
        markerHorizontal: "marker-horizontal",
        markerVertical: "marker-vertical",
        markerNormal: "marker-normal",
        markerLarge: "marker-large",
        markerSub: "marker-sub",
        value: "value",
        valueHorizontal: "value-horizontal",
        valueVertical: "value-vertical",
        valueNormal: "value-normal",
        valueLarge: "value-large",
        valueSub: "value-sub"
    };
    // Namespaces of internal event listeners
    var INTERNAL_EVENT_NS = {
        tooltips: ".__tooltips",
        aria: ".__aria"
    };
    //endregion
    function testStep(parsed, entry) {
        if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'step' is not numeric.");
        }
        // The step option can still be used to set stepping
        // for linear sliders. Overwritten if set in 'range'.
        parsed.singleStep = entry;
    }
    function testKeyboardPageMultiplier(parsed, entry) {
        if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
        }
        parsed.keyboardPageMultiplier = entry;
    }
    function testKeyboardMultiplier(parsed, entry) {
        if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
        }
        parsed.keyboardMultiplier = entry;
    }
    function testKeyboardDefaultStep(parsed, entry) {
        if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
        }
        parsed.keyboardDefaultStep = entry;
    }
    function testRange(parsed, entry) {
        // Filter incorrect input.
        if (typeof entry !== "object" || Array.isArray(entry)) {
            throw new Error("noUiSlider: 'range' is not an object.");
        }
        // Catch missing start or end.
        if (entry.min === undefined || entry.max === undefined) {
            throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
        }
        parsed.spectrum = new Spectrum(entry, parsed.snap || false, parsed.singleStep);
    }
    function testStart(parsed, entry) {
        entry = asArray(entry);
        // Validate input. Values aren't tested, as the public .val method
        // will always provide a valid location.
        if (!Array.isArray(entry) || !entry.length) {
            throw new Error("noUiSlider: 'start' option is incorrect.");
        }
        // Store the number of handles.
        parsed.handles = entry.length;
        // When the slider is initialized, the .val method will
        // be called with the start options.
        parsed.start = entry;
    }
    function testSnap(parsed, entry) {
        if (typeof entry !== "boolean") {
            throw new Error("noUiSlider: 'snap' option must be a boolean.");
        }
        // Enforce 100% stepping within subranges.
        parsed.snap = entry;
    }
    function testAnimate(parsed, entry) {
        if (typeof entry !== "boolean") {
            throw new Error("noUiSlider: 'animate' option must be a boolean.");
        }
        // Enforce 100% stepping within subranges.
        parsed.animate = entry;
    }
    function testAnimationDuration(parsed, entry) {
        if (typeof entry !== "number") {
            throw new Error("noUiSlider: 'animationDuration' option must be a number.");
        }
        parsed.animationDuration = entry;
    }
    function testConnect(parsed, entry) {
        var connect = [false];
        var i;
        // Map legacy options
        if (entry === "lower") {
            entry = [true, false];
        }
        else if (entry === "upper") {
            entry = [false, true];
        }
        // Handle boolean options
        if (entry === true || entry === false) {
            for (i = 1; i < parsed.handles; i++) {
                connect.push(entry);
            }
            connect.push(false);
        }
        // Reject invalid input
        else if (!Array.isArray(entry) || !entry.length || entry.length !== parsed.handles + 1) {
            throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
        }
        else {
            connect = entry;
        }
        parsed.connect = connect;
    }
    function testOrientation(parsed, entry) {
        // Set orientation to an a numerical value for easy
        // array selection.
        switch (entry) {
            case "horizontal":
                parsed.ort = 0;
                break;
            case "vertical":
                parsed.ort = 1;
                break;
            default:
                throw new Error("noUiSlider: 'orientation' option is invalid.");
        }
    }
    function testMargin(parsed, entry) {
        if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'margin' option must be numeric.");
        }
        // Issue #582
        if (entry === 0) {
            return;
        }
        parsed.margin = parsed.spectrum.getDistance(entry);
    }
    function testLimit(parsed, entry) {
        if (!isNumeric(entry)) {
            throw new Error("noUiSlider: 'limit' option must be numeric.");
        }
        parsed.limit = parsed.spectrum.getDistance(entry);
        if (!parsed.limit || parsed.handles < 2) {
            throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
        }
    }
    function testPadding(parsed, entry) {
        var index;
        if (!isNumeric(entry) && !Array.isArray(entry)) {
            throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
        }
        if (Array.isArray(entry) && !(entry.length === 2 || isNumeric(entry[0]) || isNumeric(entry[1]))) {
            throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
        }
        if (entry === 0) {
            return;
        }
        if (!Array.isArray(entry)) {
            entry = [entry, entry];
        }
        // 'getDistance' returns false for invalid values.
        parsed.padding = [parsed.spectrum.getDistance(entry[0]), parsed.spectrum.getDistance(entry[1])];
        for (index = 0; index < parsed.spectrum.xNumSteps.length - 1; index++) {
            // last "range" can't contain step size as it is purely an endpoint.
            if (parsed.padding[0][index] < 0 || parsed.padding[1][index] < 0) {
                throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
            }
        }
        var totalPadding = entry[0] + entry[1];
        var firstValue = parsed.spectrum.xVal[0];
        var lastValue = parsed.spectrum.xVal[parsed.spectrum.xVal.length - 1];
        if (totalPadding / (lastValue - firstValue) > 1) {
            throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.");
        }
    }
    function testDirection(parsed, entry) {
        // Set direction as a numerical value for easy parsing.
        // Invert connection for RTL sliders, so that the proper
        // handles get the connect/background classes.
        switch (entry) {
            case "ltr":
                parsed.dir = 0;
                break;
            case "rtl":
                parsed.dir = 1;
                break;
            default:
                throw new Error("noUiSlider: 'direction' option was not recognized.");
        }
    }
    function testBehaviour(parsed, entry) {
        // Make sure the input is a string.
        if (typeof entry !== "string") {
            throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
        }
        // Check if the string contains any keywords.
        // None are required.
        var tap = entry.indexOf("tap") >= 0;
        var drag = entry.indexOf("drag") >= 0;
        var fixed = entry.indexOf("fixed") >= 0;
        var snap = entry.indexOf("snap") >= 0;
        var hover = entry.indexOf("hover") >= 0;
        var unconstrained = entry.indexOf("unconstrained") >= 0;
        var dragAll = entry.indexOf("drag-all") >= 0;
        if (fixed) {
            if (parsed.handles !== 2) {
                throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
            }
            // Use margin to enforce fixed state
            testMargin(parsed, parsed.start[1] - parsed.start[0]);
        }
        if (unconstrained && (parsed.margin || parsed.limit)) {
            throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
        }
        parsed.events = {
            tap: tap || snap,
            drag: drag,
            dragAll: dragAll,
            fixed: fixed,
            snap: snap,
            hover: hover,
            unconstrained: unconstrained
        };
    }
    function testTooltips(parsed, entry) {
        if (entry === false) {
            return;
        }
        if (entry === true || isValidPartialFormatter(entry)) {
            parsed.tooltips = [];
            for (var i = 0; i < parsed.handles; i++) {
                parsed.tooltips.push(entry);
            }
        }
        else {
            entry = asArray(entry);
            if (entry.length !== parsed.handles) {
                throw new Error("noUiSlider: must pass a formatter for all handles.");
            }
            entry.forEach(function (formatter) {
                if (typeof formatter !== "boolean" && !isValidPartialFormatter(formatter)) {
                    throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
                }
            });
            parsed.tooltips = entry;
        }
    }
    function testHandleAttributes(parsed, entry) {
        if (entry.length !== parsed.handles) {
            throw new Error("noUiSlider: must pass a attributes for all handles.");
        }
        parsed.handleAttributes = entry;
    }
    function testAriaFormat(parsed, entry) {
        if (!isValidPartialFormatter(entry)) {
            throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
        }
        parsed.ariaFormat = entry;
    }
    function testFormat(parsed, entry) {
        if (!isValidFormatter(entry)) {
            throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
        }
        parsed.format = entry;
    }
    function testKeyboardSupport(parsed, entry) {
        if (typeof entry !== "boolean") {
            throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");
        }
        parsed.keyboardSupport = entry;
    }
    function testDocumentElement(parsed, entry) {
        // This is an advanced option. Passed values are used without validation.
        parsed.documentElement = entry;
    }
    function testCssPrefix(parsed, entry) {
        if (typeof entry !== "string" && entry !== false) {
            throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
        }
        parsed.cssPrefix = entry;
    }
    function testCssClasses(parsed, entry) {
        if (typeof entry !== "object") {
            throw new Error("noUiSlider: 'cssClasses' must be an object.");
        }
        if (typeof parsed.cssPrefix === "string") {
            parsed.cssClasses = {};
            Object.keys(entry).forEach(function (key) {
                parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
            });
        }
        else {
            parsed.cssClasses = entry;
        }
    }
    // Test all developer settings and parse to assumption-safe values.
    function testOptions(options) {
        // To prove a fix for #537, freeze options here.
        // If the object is modified, an error will be thrown.
        // Object.freeze(options);
        var parsed = {
            margin: null,
            limit: null,
            padding: null,
            animate: true,
            animationDuration: 300,
            ariaFormat: defaultFormatter,
            format: defaultFormatter
        };
        // Tests are executed in the order they are presented here.
        var tests = {
            step: { r: false, t: testStep },
            keyboardPageMultiplier: { r: false, t: testKeyboardPageMultiplier },
            keyboardMultiplier: { r: false, t: testKeyboardMultiplier },
            keyboardDefaultStep: { r: false, t: testKeyboardDefaultStep },
            start: { r: true, t: testStart },
            connect: { r: true, t: testConnect },
            direction: { r: true, t: testDirection },
            snap: { r: false, t: testSnap },
            animate: { r: false, t: testAnimate },
            animationDuration: { r: false, t: testAnimationDuration },
            range: { r: true, t: testRange },
            orientation: { r: false, t: testOrientation },
            margin: { r: false, t: testMargin },
            limit: { r: false, t: testLimit },
            padding: { r: false, t: testPadding },
            behaviour: { r: true, t: testBehaviour },
            ariaFormat: { r: false, t: testAriaFormat },
            format: { r: false, t: testFormat },
            tooltips: { r: false, t: testTooltips },
            keyboardSupport: { r: true, t: testKeyboardSupport },
            documentElement: { r: false, t: testDocumentElement },
            cssPrefix: { r: true, t: testCssPrefix },
            cssClasses: { r: true, t: testCssClasses },
            handleAttributes: { r: false, t: testHandleAttributes }
        };
        var defaults = {
            connect: false,
            direction: "ltr",
            behaviour: "tap",
            orientation: "horizontal",
            keyboardSupport: true,
            cssPrefix: "noUi-",
            cssClasses: cssClasses,
            keyboardPageMultiplier: 5,
            keyboardMultiplier: 1,
            keyboardDefaultStep: 10
        };
        // AriaFormat defaults to regular format, if any.
        if (options.format && !options.ariaFormat) {
            options.ariaFormat = options.format;
        }
        // Run all options through a testing mechanism to ensure correct
        // input. It should be noted that options might get modified to
        // be handled properly. E.g. wrapping integers in arrays.
        Object.keys(tests).forEach(function (name) {
            // If the option isn't set, but it is required, throw an error.
            if (!isSet(options[name]) && defaults[name] === undefined) {
                if (tests[name].r) {
                    throw new Error("noUiSlider: '" + name + "' is required.");
                }
                return;
            }
            tests[name].t(parsed, !isSet(options[name]) ? defaults[name] : options[name]);
        });
        // Forward pips options
        parsed.pips = options.pips;
        // All recent browsers accept unprefixed transform.
        // We need -ms- for IE9 and -webkit- for older Android;
        // Assume use of -webkit- if unprefixed and -ms- are not supported.
        // https://caniuse.com/#feat=transforms2d
        var d = document.createElement("div");
        var msPrefix = d.style.msTransform !== undefined;
        var noPrefix = d.style.transform !== undefined;
        parsed.transformRule = noPrefix ? "transform" : msPrefix ? "msTransform" : "webkitTransform";
        // Pips don't move, so we can place them using left/top.
        var styles = [
            ["left", "top"],
            ["right", "bottom"]
        ];
        parsed.style = styles[parsed.dir][parsed.ort];
        return parsed;
    }
    //endregion
    function scope(target, options, originalOptions) {
        var actions = getActions();
        var supportsTouchActionNone = getSupportsTouchActionNone();
        var supportsPassive = supportsTouchActionNone && getSupportsPassive();
        // All variables local to 'scope' are prefixed with 'scope_'
        // Slider DOM Nodes
        var scope_Target = target;
        var scope_Base;
        var scope_Handles;
        var scope_Connects;
        var scope_Pips;
        var scope_Tooltips;
        // Slider state values
        var scope_Spectrum = options.spectrum;
        var scope_Values = [];
        var scope_Locations = [];
        var scope_HandleNumbers = [];
        var scope_ActiveHandlesCount = 0;
        var scope_Events = {};
        // Document Nodes
        var scope_Document = target.ownerDocument;
        var scope_DocumentElement = options.documentElement || scope_Document.documentElement;
        var scope_Body = scope_Document.body;
        // For horizontal sliders in standard ltr documents,
        // make .noUi-origin overflow to the left so the document doesn't scroll.
        var scope_DirOffset = scope_Document.dir === "rtl" || options.ort === 1 ? 0 : 100;
        // Creates a node, adds it to target, returns the new node.
        function addNodeTo(addTarget, className) {
            var div = scope_Document.createElement("div");
            if (className) {
                addClass(div, className);
            }
            addTarget.appendChild(div);
            return div;
        }
        // Append a origin to the base
        function addOrigin(base, handleNumber) {
            var origin = addNodeTo(base, options.cssClasses.origin);
            var handle = addNodeTo(origin, options.cssClasses.handle);
            addNodeTo(handle, options.cssClasses.touchArea);
            handle.setAttribute("data-handle", String(handleNumber));
            if (options.keyboardSupport) {
                // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
                // 0 = focusable and reachable
                handle.setAttribute("tabindex", "0");
                handle.addEventListener("keydown", function (event) {
                    return eventKeydown(event, handleNumber);
                });
            }
            if (options.handleAttributes !== undefined) {
                var attributes_1 = options.handleAttributes[handleNumber];
                Object.keys(attributes_1).forEach(function (attribute) {
                    handle.setAttribute(attribute, attributes_1[attribute]);
                });
            }
            handle.setAttribute("role", "slider");
            handle.setAttribute("aria-orientation", options.ort ? "vertical" : "horizontal");
            if (handleNumber === 0) {
                addClass(handle, options.cssClasses.handleLower);
            }
            else if (handleNumber === options.handles - 1) {
                addClass(handle, options.cssClasses.handleUpper);
            }
            return origin;
        }
        // Insert nodes for connect elements
        function addConnect(base, add) {
            if (!add) {
                return false;
            }
            return addNodeTo(base, options.cssClasses.connect);
        }
        // Add handles to the slider base.
        function addElements(connectOptions, base) {
            var connectBase = addNodeTo(base, options.cssClasses.connects);
            scope_Handles = [];
            scope_Connects = [];
            scope_Connects.push(addConnect(connectBase, connectOptions[0]));
            // [::::O====O====O====]
            // connectOptions = [0, 1, 1, 1]
            for (var i = 0; i < options.handles; i++) {
                // Keep a list of all added handles.
                scope_Handles.push(addOrigin(base, i));
                scope_HandleNumbers[i] = i;
                scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]));
            }
        }
        // Initialize a single slider.
        function addSlider(addTarget) {
            // Apply classes and data to the target.
            addClass(addTarget, options.cssClasses.target);
            if (options.dir === 0) {
                addClass(addTarget, options.cssClasses.ltr);
            }
            else {
                addClass(addTarget, options.cssClasses.rtl);
            }
            if (options.ort === 0) {
                addClass(addTarget, options.cssClasses.horizontal);
            }
            else {
                addClass(addTarget, options.cssClasses.vertical);
            }
            var textDirection = getComputedStyle(addTarget).direction;
            if (textDirection === "rtl") {
                addClass(addTarget, options.cssClasses.textDirectionRtl);
            }
            else {
                addClass(addTarget, options.cssClasses.textDirectionLtr);
            }
            return addNodeTo(addTarget, options.cssClasses.base);
        }
        function addTooltip(handle, handleNumber) {
            if (!options.tooltips || !options.tooltips[handleNumber]) {
                return false;
            }
            return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
        }
        function isSliderDisabled() {
            return scope_Target.hasAttribute("disabled");
        }
        // Disable the slider dragging if any handle is disabled
        function isHandleDisabled(handleNumber) {
            var handleOrigin = scope_Handles[handleNumber];
            return handleOrigin.hasAttribute("disabled");
        }
        function removeTooltips() {
            if (scope_Tooltips) {
                removeEvent("update" + INTERNAL_EVENT_NS.tooltips);
                scope_Tooltips.forEach(function (tooltip) {
                    if (tooltip) {
                        removeElement(tooltip);
                    }
                });
                scope_Tooltips = null;
            }
        }
        // The tooltips option is a shorthand for using the 'update' event.
        function tooltips() {
            removeTooltips();
            // Tooltips are added with options.tooltips in original order.
            scope_Tooltips = scope_Handles.map(addTooltip);
            bindEvent("update" + INTERNAL_EVENT_NS.tooltips, function (values, handleNumber, unencoded) {
                if (!scope_Tooltips || !options.tooltips) {
                    return;
                }
                if (scope_Tooltips[handleNumber] === false) {
                    return;
                }
                var formattedValue = values[handleNumber];
                if (options.tooltips[handleNumber] !== true) {
                    formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
                }
                scope_Tooltips[handleNumber].innerHTML = formattedValue;
            });
        }
        function aria() {
            removeEvent("update" + INTERNAL_EVENT_NS.aria);
            bindEvent("update" + INTERNAL_EVENT_NS.aria, function (values, handleNumber, unencoded, tap, positions) {
                // Update Aria Values for all handles, as a change in one changes min and max values for the next.
                scope_HandleNumbers.forEach(function (index) {
                    var handle = scope_Handles[index];
                    var min = checkHandlePosition(scope_Locations, index, 0, true, true, true);
                    var max = checkHandlePosition(scope_Locations, index, 100, true, true, true);
                    var now = positions[index];
                    // Formatted value for display
                    var text = String(options.ariaFormat.to(unencoded[index]));
                    // Map to slider range values
                    min = scope_Spectrum.fromStepping(min).toFixed(1);
                    max = scope_Spectrum.fromStepping(max).toFixed(1);
                    now = scope_Spectrum.fromStepping(now).toFixed(1);
                    handle.children[0].setAttribute("aria-valuemin", min);
                    handle.children[0].setAttribute("aria-valuemax", max);
                    handle.children[0].setAttribute("aria-valuenow", now);
                    handle.children[0].setAttribute("aria-valuetext", text);
                });
            });
        }
        function getGroup(pips) {
            // Use the range.
            if (pips.mode === exports.PipsMode.Range || pips.mode === exports.PipsMode.Steps) {
                return scope_Spectrum.xVal;
            }
            if (pips.mode === exports.PipsMode.Count) {
                if (pips.values < 2) {
                    throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");
                }
                // Divide 0 - 100 in 'count' parts.
                var interval = pips.values - 1;
                var spread = 100 / interval;
                var values = [];
                // List these parts and have them handled as 'positions'.
                while (interval--) {
                    values[interval] = interval * spread;
                }
                values.push(100);
                return mapToRange(values, pips.stepped);
            }
            if (pips.mode === exports.PipsMode.Positions) {
                // Map all percentages to on-range values.
                return mapToRange(pips.values, pips.stepped);
            }
            if (pips.mode === exports.PipsMode.Values) {
                // If the value must be stepped, it needs to be converted to a percentage first.
                if (pips.stepped) {
                    return pips.values.map(function (value) {
                        // Convert to percentage, apply step, return to value.
                        return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));
                    });
                }
                // Otherwise, we can simply use the values.
                return pips.values;
            }
            return []; // pips.mode = never
        }
        function mapToRange(values, stepped) {
            return values.map(function (value) {
                return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
            });
        }
        function generateSpread(pips) {
            function safeIncrement(value, increment) {
                // Avoid floating point variance by dropping the smallest decimal places.
                return Number((value + increment).toFixed(7));
            }
            var group = getGroup(pips);
            var indexes = {};
            var firstInRange = scope_Spectrum.xVal[0];
            var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1];
            var ignoreFirst = false;
            var ignoreLast = false;
            var prevPct = 0;
            // Create a copy of the group, sort it and filter away all duplicates.
            group = unique(group.slice().sort(function (a, b) {
                return a - b;
            }));
            // Make sure the range starts with the first element.
            if (group[0] !== firstInRange) {
                group.unshift(firstInRange);
                ignoreFirst = true;
            }
            // Likewise for the last one.
            if (group[group.length - 1] !== lastInRange) {
                group.push(lastInRange);
                ignoreLast = true;
            }
            group.forEach(function (current, index) {
                // Get the current step and the lower + upper positions.
                var step;
                var i;
                var q;
                var low = current;
                var high = group[index + 1];
                var newPct;
                var pctDifference;
                var pctPos;
                var type;
                var steps;
                var realSteps;
                var stepSize;
                var isSteps = pips.mode === exports.PipsMode.Steps;
                // When using 'steps' mode, use the provided steps.
                // Otherwise, we'll step on to the next subrange.
                if (isSteps) {
                    step = scope_Spectrum.xNumSteps[index];
                }
                // Default to a 'full' step.
                if (!step) {
                    step = high - low;
                }
                // If high is undefined we are at the last subrange. Make sure it iterates once (#1088)
                if (high === undefined) {
                    high = low;
                }
                // Make sure step isn't 0, which would cause an infinite loop (#654)
                step = Math.max(step, 0.0000001);
                // Find all steps in the subrange.
                for (i = low; i <= high; i = safeIncrement(i, step)) {
                    // Get the percentage value for the current step,
                    // calculate the size for the subrange.
                    newPct = scope_Spectrum.toStepping(i);
                    pctDifference = newPct - prevPct;
                    steps = pctDifference / (pips.density || 1);
                    realSteps = Math.round(steps);
                    // This ratio represents the amount of percentage-space a point indicates.
                    // For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-divided.
                    // Round the percentage offset to an even number, then divide by two
                    // to spread the offset on both sides of the range.
                    stepSize = pctDifference / realSteps;
                    // Divide all points evenly, adding the correct number to this subrange.
                    // Run up to <= so that 100% gets a point, event if ignoreLast is set.
                    for (q = 1; q <= realSteps; q += 1) {
                        // The ratio between the rounded value and the actual size might be ~1% off.
                        // Correct the percentage offset by the number of points
                        // per subrange. density = 1 will result in 100 points on the
                        // full range, 2 for 50, 4 for 25, etc.
                        pctPos = prevPct + q * stepSize;
                        indexes[pctPos.toFixed(5)] = [scope_Spectrum.fromStepping(pctPos), 0];
                    }
                    // Determine the point type.
                    type = group.indexOf(i) > -1 ? exports.PipsType.LargeValue : isSteps ? exports.PipsType.SmallValue : exports.PipsType.NoValue;
                    // Enforce the 'ignoreFirst' option by overwriting the type for 0.
                    if (!index && ignoreFirst && i !== high) {
                        type = 0;
                    }
                    if (!(i === high && ignoreLast)) {
                        // Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
                        indexes[newPct.toFixed(5)] = [i, type];
                    }
                    // Update the percentage count.
                    prevPct = newPct;
                }
            });
            return indexes;
        }
        function addMarking(spread, filterFunc, formatter) {
            var _a, _b;
            var element = scope_Document.createElement("div");
            var valueSizeClasses = (_a = {},
                _a[exports.PipsType.None] = "",
                _a[exports.PipsType.NoValue] = options.cssClasses.valueNormal,
                _a[exports.PipsType.LargeValue] = options.cssClasses.valueLarge,
                _a[exports.PipsType.SmallValue] = options.cssClasses.valueSub,
                _a);
            var markerSizeClasses = (_b = {},
                _b[exports.PipsType.None] = "",
                _b[exports.PipsType.NoValue] = options.cssClasses.markerNormal,
                _b[exports.PipsType.LargeValue] = options.cssClasses.markerLarge,
                _b[exports.PipsType.SmallValue] = options.cssClasses.markerSub,
                _b);
            var valueOrientationClasses = [options.cssClasses.valueHorizontal, options.cssClasses.valueVertical];
            var markerOrientationClasses = [options.cssClasses.markerHorizontal, options.cssClasses.markerVertical];
            addClass(element, options.cssClasses.pips);
            addClass(element, options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);
            function getClasses(type, source) {
                var a = source === options.cssClasses.value;
                var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
                var sizeClasses = a ? valueSizeClasses : markerSizeClasses;
                return source + " " + orientationClasses[options.ort] + " " + sizeClasses[type];
            }
            function addSpread(offset, value, type) {
                // Apply the filter function, if it is set.
                type = filterFunc ? filterFunc(value, type) : type;
                if (type === exports.PipsType.None) {
                    return;
                }
                // Add a marker for every point
                var node = addNodeTo(element, false);
                node.className = getClasses(type, options.cssClasses.marker);
                node.style[options.style] = offset + "%";
                // Values are only appended for points marked '1' or '2'.
                if (type > exports.PipsType.NoValue) {
                    node = addNodeTo(element, false);
                    node.className = getClasses(type, options.cssClasses.value);
                    node.setAttribute("data-value", String(value));
                    node.style[options.style] = offset + "%";
                    node.innerHTML = String(formatter.to(value));
                }
            }
            // Append all points.
            Object.keys(spread).forEach(function (offset) {
                addSpread(offset, spread[offset][0], spread[offset][1]);
            });
            return element;
        }
        function removePips() {
            if (scope_Pips) {
                removeElement(scope_Pips);
                scope_Pips = null;
            }
        }
        function pips(pips) {
            // Fix #669
            removePips();
            var spread = generateSpread(pips);
            var filter = pips.filter;
            var format = pips.format || {
                to: function (value) {
                    return String(Math.round(value));
                }
            };
            scope_Pips = scope_Target.appendChild(addMarking(spread, filter, format));
            return scope_Pips;
        }
        // Shorthand for base dimensions.
        function baseSize() {
            var rect = scope_Base.getBoundingClientRect();
            var alt = ("offset" + ["Width", "Height"][options.ort]);
            return options.ort === 0 ? rect.width || scope_Base[alt] : rect.height || scope_Base[alt];
        }
        // Handler for attaching events trough a proxy.
        function attachEvent(events, element, callback, data) {
            // This function can be used to 'filter' events to the slider.
            // element is a node, not a nodeList
            var method = function (event) {
                var e = fixEvent(event, data.pageOffset, data.target || element);
                // fixEvent returns false if this event has a different target
                // when handling (multi-) touch events;
                if (!e) {
                    return false;
                }
                // doNotReject is passed by all end events to make sure released touches
                // are not rejected, leaving the slider "stuck" to the cursor;
                if (isSliderDisabled() && !data.doNotReject) {
                    return false;
                }
                // Stop if an active 'tap' transition is taking place.
                if (hasClass(scope_Target, options.cssClasses.tap) && !data.doNotReject) {
                    return false;
                }
                // Ignore right or middle clicks on start #454
                if (events === actions.start && e.buttons !== undefined && e.buttons > 1) {
                    return false;
                }
                // Ignore right or middle clicks on start #454
                if (data.hover && e.buttons) {
                    return false;
                }
                // 'supportsPassive' is only true if a browser also supports touch-action: none in CSS.
                // iOS safari does not, so it doesn't get to benefit from passive scrolling. iOS does support
                // touch-action: manipulation, but that allows panning, which breaks
                // sliders after zooming/on non-responsive pages.
                // See: https://bugs.webkit.org/show_bug.cgi?id=133112
                if (!supportsPassive) {
                    e.preventDefault();
                }
                e.calcPoint = e.points[options.ort];
                // Call the event handler with the event [ and additional data ].
                callback(e, data);
                return;
            };
            var methods = [];
            // Bind a closure on the target for every event type.
            events.split(" ").forEach(function (eventName) {
                element.addEventListener(eventName, method, supportsPassive ? { passive: true } : false);
                methods.push([eventName, method]);
            });
            return methods;
        }
        // Provide a clean event with standardized offset values.
        function fixEvent(e, pageOffset, eventTarget) {
            // Filter the event to register the type, which can be
            // touch, mouse or pointer. Offset changes need to be
            // made on an event specific basis.
            var touch = e.type.indexOf("touch") === 0;
            var mouse = e.type.indexOf("mouse") === 0;
            var pointer = e.type.indexOf("pointer") === 0;
            var x = 0;
            var y = 0;
            // IE10 implemented pointer events with a prefix;
            if (e.type.indexOf("MSPointer") === 0) {
                pointer = true;
            }
            // Erroneous events seem to be passed in occasionally on iOS/iPadOS after user finishes interacting with
            // the slider. They appear to be of type MouseEvent, yet they don't have usual properties set. Ignore
            // events that have no touches or buttons associated with them. (#1057, #1079, #1095)
            if (e.type === "mousedown" && !e.buttons && !e.touches) {
                return false;
            }
            // The only thing one handle should be concerned about is the touches that originated on top of it.
            if (touch) {
                // Returns true if a touch originated on the target.
                var isTouchOnTarget = function (checkTouch) {
                    var target = checkTouch.target;
                    return (target === eventTarget ||
                        eventTarget.contains(target) ||
                        (e.composed && e.composedPath().shift() === eventTarget));
                };
                // In the case of touchstart events, we need to make sure there is still no more than one
                // touch on the target so we look amongst all touches.
                if (e.type === "touchstart") {
                    var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);
                    // Do not support more than one touch per handle.
                    if (targetTouches.length > 1) {
                        return false;
                    }
                    x = targetTouches[0].pageX;
                    y = targetTouches[0].pageY;
                }
                else {
                    // In the other cases, find on changedTouches is enough.
                    var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);
                    // Cancel if the target touch has not moved.
                    if (!targetTouch) {
                        return false;
                    }
                    x = targetTouch.pageX;
                    y = targetTouch.pageY;
                }
            }
            pageOffset = pageOffset || getPageOffset(scope_Document);
            if (mouse || pointer) {
                x = e.clientX + pageOffset.x;
                y = e.clientY + pageOffset.y;
            }
            e.pageOffset = pageOffset;
            e.points = [x, y];
            e.cursor = mouse || pointer; // Fix #435
            return e;
        }
        // Translate a coordinate in the document to a percentage on the slider
        function calcPointToPercentage(calcPoint) {
            var location = calcPoint - offset(scope_Base, options.ort);
            var proposal = (location * 100) / baseSize();
            // Clamp proposal between 0% and 100%
            // Out-of-bound coordinates may occur when .noUi-base pseudo-elements
            // are used (e.g. contained handles feature)
            proposal = limit(proposal);
            return options.dir ? 100 - proposal : proposal;
        }
        // Find handle closest to a certain percentage on the slider
        function getClosestHandle(clickedPosition) {
            var smallestDifference = 100;
            var handleNumber = false;
            scope_Handles.forEach(function (handle, index) {
                // Disabled handles are ignored
                if (isHandleDisabled(index)) {
                    return;
                }
                var handlePosition = scope_Locations[index];
                var differenceWithThisHandle = Math.abs(handlePosition - clickedPosition);
                // Initial state
                var clickAtEdge = differenceWithThisHandle === 100 && smallestDifference === 100;
                // Difference with this handle is smaller than the previously checked handle
                var isCloser = differenceWithThisHandle < smallestDifference;
                var isCloserAfter = differenceWithThisHandle <= smallestDifference && clickedPosition > handlePosition;
                if (isCloser || isCloserAfter || clickAtEdge) {
                    handleNumber = index;
                    smallestDifference = differenceWithThisHandle;
                }
            });
            return handleNumber;
        }
        // Fire 'end' when a mouse or pen leaves the document.
        function documentLeave(event, data) {
            if (event.type === "mouseout" &&
                event.target.nodeName === "HTML" &&
                event.relatedTarget === null) {
                eventEnd(event, data);
            }
        }
        // Handle movement on document for handle and range drag.
        function eventMove(event, data) {
            // Fix #498
            // Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
            // https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
            // IE9 has .buttons and .which zero on mousemove.
            // Firefox breaks the spec MDN defines.
            if (navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0) {
                return eventEnd(event, data);
            }
            // Check if we are moving up or down
            var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);
            // Convert the movement into a percentage of the slider width/height
            var proposal = (movement * 100) / data.baseSize;
            moveHandles(movement > 0, proposal, data.locations, data.handleNumbers, data.connect);
        }
        // Unbind move events on document, call callbacks.
        function eventEnd(event, data) {
            // The handle is no longer active, so remove the class.
            if (data.handle) {
                removeClass(data.handle, options.cssClasses.active);
                scope_ActiveHandlesCount -= 1;
            }
            // Unbind the move and end events, which are added on 'start'.
            data.listeners.forEach(function (c) {
                scope_DocumentElement.removeEventListener(c[0], c[1]);
            });
            if (scope_ActiveHandlesCount === 0) {
                // Remove dragging class.
                removeClass(scope_Target, options.cssClasses.drag);
                setZindex();
                // Remove cursor styles and text-selection events bound to the body.
                if (event.cursor) {
                    scope_Body.style.cursor = "";
                    scope_Body.removeEventListener("selectstart", preventDefault);
                }
            }
            data.handleNumbers.forEach(function (handleNumber) {
                fireEvent("change", handleNumber);
                fireEvent("set", handleNumber);
                fireEvent("end", handleNumber);
            });
        }
        // Bind move events on document.
        function eventStart(event, data) {
            // Ignore event if any handle is disabled
            if (data.handleNumbers.some(isHandleDisabled)) {
                return;
            }
            var handle;
            if (data.handleNumbers.length === 1) {
                var handleOrigin = scope_Handles[data.handleNumbers[0]];
                handle = handleOrigin.children[0];
                scope_ActiveHandlesCount += 1;
                // Mark the handle as 'active' so it can be styled.
                addClass(handle, options.cssClasses.active);
            }
            // A drag should never propagate up to the 'tap' event.
            event.stopPropagation();
            // Record the event listeners.
            var listeners = [];
            // Attach the move and end events.
            var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
                // The event target has changed so we need to propagate the original one so that we keep
                // relying on it to extract target touches.
                target: event.target,
                handle: handle,
                connect: data.connect,
                listeners: listeners,
                startCalcPoint: event.calcPoint,
                baseSize: baseSize(),
                pageOffset: event.pageOffset,
                handleNumbers: data.handleNumbers,
                buttonsProperty: event.buttons,
                locations: scope_Locations.slice()
            });
            var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
                target: event.target,
                handle: handle,
                listeners: listeners,
                doNotReject: true,
                handleNumbers: data.handleNumbers
            });
            var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
                target: event.target,
                handle: handle,
                listeners: listeners,
                doNotReject: true,
                handleNumbers: data.handleNumbers
            });
            // We want to make sure we pushed the listeners in the listener list rather than creating
            // a new one as it has already been passed to the event handlers.
            listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));
            // Text selection isn't an issue on touch devices,
            // so adding cursor styles can be skipped.
            if (event.cursor) {
                // Prevent the 'I' cursor and extend the range-drag cursor.
                scope_Body.style.cursor = getComputedStyle(event.target).cursor;
                // Mark the target with a dragging state.
                if (scope_Handles.length > 1) {
                    addClass(scope_Target, options.cssClasses.drag);
                }
                // Prevent text selection when dragging the handles.
                // In noUiSlider <= 9.2.0, this was handled by calling preventDefault on mouse/touch start/move,
                // which is scroll blocking. The selectstart event is supported by FireFox starting from version 52,
                // meaning the only holdout is iOS Safari. This doesn't matter: text selection isn't triggered there.
                // The 'cursor' flag is false.
                // See: http://caniuse.com/#search=selectstart
                scope_Body.addEventListener("selectstart", preventDefault, false);
            }
            data.handleNumbers.forEach(function (handleNumber) {
                fireEvent("start", handleNumber);
            });
        }
        // Move closest handle to tapped location.
        function eventTap(event) {
            // The tap event shouldn't propagate up
            event.stopPropagation();
            var proposal = calcPointToPercentage(event.calcPoint);
            var handleNumber = getClosestHandle(proposal);
            // Tackle the case that all handles are 'disabled'.
            if (handleNumber === false) {
                return;
            }
            // Flag the slider as it is now in a transitional state.
            // Transition takes a configurable amount of ms (default 300). Re-enable the slider after that.
            if (!options.events.snap) {
                addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
            }
            setHandle(handleNumber, proposal, true, true);
            setZindex();
            fireEvent("slide", handleNumber, true);
            fireEvent("update", handleNumber, true);
            if (!options.events.snap) {
                fireEvent("change", handleNumber, true);
                fireEvent("set", handleNumber, true);
            }
            else {
                eventStart(event, { handleNumbers: [handleNumber] });
            }
        }
        // Fires a 'hover' event for a hovered mouse/pen position.
        function eventHover(event) {
            var proposal = calcPointToPercentage(event.calcPoint);
            var to = scope_Spectrum.getStep(proposal);
            var value = scope_Spectrum.fromStepping(to);
            Object.keys(scope_Events).forEach(function (targetEvent) {
                if ("hover" === targetEvent.split(".")[0]) {
                    scope_Events[targetEvent].forEach(function (callback) {
                        callback.call(scope_Self, value);
                    });
                }
            });
        }
        // Handles keydown on focused handles
        // Don't move the document when pressing arrow keys on focused handles
        function eventKeydown(event, handleNumber) {
            if (isSliderDisabled() || isHandleDisabled(handleNumber)) {
                return false;
            }
            var horizontalKeys = ["Left", "Right"];
            var verticalKeys = ["Down", "Up"];
            var largeStepKeys = ["PageDown", "PageUp"];
            var edgeKeys = ["Home", "End"];
            if (options.dir && !options.ort) {
                // On an right-to-left slider, the left and right keys act inverted
                horizontalKeys.reverse();
            }
            else if (options.ort && !options.dir) {
                // On a top-to-bottom slider, the up and down keys act inverted
                verticalKeys.reverse();
                largeStepKeys.reverse();
            }
            // Strip "Arrow" for IE compatibility. https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
            var key = event.key.replace("Arrow", "");
            var isLargeDown = key === largeStepKeys[0];
            var isLargeUp = key === largeStepKeys[1];
            var isDown = key === verticalKeys[0] || key === horizontalKeys[0] || isLargeDown;
            var isUp = key === verticalKeys[1] || key === horizontalKeys[1] || isLargeUp;
            var isMin = key === edgeKeys[0];
            var isMax = key === edgeKeys[1];
            if (!isDown && !isUp && !isMin && !isMax) {
                return true;
            }
            event.preventDefault();
            var to;
            if (isUp || isDown) {
                var direction = isDown ? 0 : 1;
                var steps = getNextStepsForHandle(handleNumber);
                var step = steps[direction];
                // At the edge of a slider, do nothing
                if (step === null) {
                    return false;
                }
                // No step set, use the default of 10% of the sub-range
                if (step === false) {
                    step = scope_Spectrum.getDefaultStep(scope_Locations[handleNumber], isDown, options.keyboardDefaultStep);
                }
                if (isLargeUp || isLargeDown) {
                    step *= options.keyboardPageMultiplier;
                }
                else {
                    step *= options.keyboardMultiplier;
                }
                // Step over zero-length ranges (#948);
                step = Math.max(step, 0.0000001);
                // Decrement for down steps
                step = (isDown ? -1 : 1) * step;
                to = scope_Values[handleNumber] + step;
            }
            else if (isMax) {
                // End key
                to = options.spectrum.xVal[options.spectrum.xVal.length - 1];
            }
            else {
                // Home key
                to = options.spectrum.xVal[0];
            }
            setHandle(handleNumber, scope_Spectrum.toStepping(to), true, true);
            fireEvent("slide", handleNumber);
            fireEvent("update", handleNumber);
            fireEvent("change", handleNumber);
            fireEvent("set", handleNumber);
            return false;
        }
        // Attach events to several slider parts.
        function bindSliderEvents(behaviour) {
            // Attach the standard drag event to the handles.
            if (!behaviour.fixed) {
                scope_Handles.forEach(function (handle, index) {
                    // These events are only bound to the visual handle
                    // element, not the 'real' origin element.
                    attachEvent(actions.start, handle.children[0], eventStart, {
                        handleNumbers: [index]
                    });
                });
            }
            // Attach the tap event to the slider base.
            if (behaviour.tap) {
                attachEvent(actions.start, scope_Base, eventTap, {});
            }
            // Fire hover events
            if (behaviour.hover) {
                attachEvent(actions.move, scope_Base, eventHover, {
                    hover: true
                });
            }
            // Make the range draggable.
            if (behaviour.drag) {
                scope_Connects.forEach(function (connect, index) {
                    if (connect === false || index === 0 || index === scope_Connects.length - 1) {
                        return;
                    }
                    var handleBefore = scope_Handles[index - 1];
                    var handleAfter = scope_Handles[index];
                    var eventHolders = [connect];
                    var handlesToDrag = [handleBefore, handleAfter];
                    var handleNumbersToDrag = [index - 1, index];
                    addClass(connect, options.cssClasses.draggable);
                    // When the range is fixed, the entire range can
                    // be dragged by the handles. The handle in the first
                    // origin will propagate the start event upward,
                    // but it needs to be bound manually on the other.
                    if (behaviour.fixed) {
                        eventHolders.push(handleBefore.children[0]);
                        eventHolders.push(handleAfter.children[0]);
                    }
                    if (behaviour.dragAll) {
                        handlesToDrag = scope_Handles;
                        handleNumbersToDrag = scope_HandleNumbers;
                    }
                    eventHolders.forEach(function (eventHolder) {
                        attachEvent(actions.start, eventHolder, eventStart, {
                            handles: handlesToDrag,
                            handleNumbers: handleNumbersToDrag,
                            connect: connect
                        });
                    });
                });
            }
        }
        // Attach an event to this slider, possibly including a namespace
        function bindEvent(namespacedEvent, callback) {
            scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
            scope_Events[namespacedEvent].push(callback);
            // If the event bound is 'update,' fire it immediately for all handles.
            if (namespacedEvent.split(".")[0] === "update") {
                scope_Handles.forEach(function (a, index) {
                    fireEvent("update", index);
                });
            }
        }
        function isInternalNamespace(namespace) {
            return namespace === INTERNAL_EVENT_NS.aria || namespace === INTERNAL_EVENT_NS.tooltips;
        }
        // Undo attachment of event
        function removeEvent(namespacedEvent) {
            var event = namespacedEvent && namespacedEvent.split(".")[0];
            var namespace = event ? namespacedEvent.substring(event.length) : namespacedEvent;
            Object.keys(scope_Events).forEach(function (bind) {
                var tEvent = bind.split(".")[0];
                var tNamespace = bind.substring(tEvent.length);
                if ((!event || event === tEvent) && (!namespace || namespace === tNamespace)) {
                    // only delete protected internal event if intentional
                    if (!isInternalNamespace(tNamespace) || namespace === tNamespace) {
                        delete scope_Events[bind];
                    }
                }
            });
        }
        // External event handling
        function fireEvent(eventName, handleNumber, tap) {
            Object.keys(scope_Events).forEach(function (targetEvent) {
                var eventType = targetEvent.split(".")[0];
                if (eventName === eventType) {
                    scope_Events[targetEvent].forEach(function (callback) {
                        callback.call(
                        // Use the slider public API as the scope ('this')
                        scope_Self, 
                        // Return values as array, so arg_1[arg_2] is always valid.
                        scope_Values.map(options.format.to), 
                        // Handle index, 0 or 1
                        handleNumber, 
                        // Un-formatted slider values
                        scope_Values.slice(), 
                        // Event is fired by tap, true or false
                        tap || false, 
                        // Left offset of the handle, in relation to the slider
                        scope_Locations.slice(), 
                        // add the slider public API to an accessible parameter when this is unavailable
                        scope_Self);
                    });
                }
            });
        }
        // Split out the handle positioning logic so the Move event can use it, too
        function checkHandlePosition(reference, handleNumber, to, lookBackward, lookForward, getValue) {
            var distance;
            // For sliders with multiple handles, limit movement to the other handle.
            // Apply the margin option by adding it to the handle positions.
            if (scope_Handles.length > 1 && !options.events.unconstrained) {
                if (lookBackward && handleNumber > 0) {
                    distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.margin, false);
                    to = Math.max(to, distance);
                }
                if (lookForward && handleNumber < scope_Handles.length - 1) {
                    distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.margin, true);
                    to = Math.min(to, distance);
                }
            }
            // The limit option has the opposite effect, limiting handles to a
            // maximum distance from another. Limit must be > 0, as otherwise
            // handles would be unmovable.
            if (scope_Handles.length > 1 && options.limit) {
                if (lookBackward && handleNumber > 0) {
                    distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.limit, false);
                    to = Math.min(to, distance);
                }
                if (lookForward && handleNumber < scope_Handles.length - 1) {
                    distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.limit, true);
                    to = Math.max(to, distance);
                }
            }
            // The padding option keeps the handles a certain distance from the
            // edges of the slider. Padding must be > 0.
            if (options.padding) {
                if (handleNumber === 0) {
                    distance = scope_Spectrum.getAbsoluteDistance(0, options.padding[0], false);
                    to = Math.max(to, distance);
                }
                if (handleNumber === scope_Handles.length - 1) {
                    distance = scope_Spectrum.getAbsoluteDistance(100, options.padding[1], true);
                    to = Math.min(to, distance);
                }
            }
            to = scope_Spectrum.getStep(to);
            // Limit percentage to the 0 - 100 range
            to = limit(to);
            // Return false if handle can't move
            if (to === reference[handleNumber] && !getValue) {
                return false;
            }
            return to;
        }
        // Uses slider orientation to create CSS rules. a = base value;
        function inRuleOrder(v, a) {
            var o = options.ort;
            return (o ? a : v) + ", " + (o ? v : a);
        }
        // Moves handle(s) by a percentage
        // (bool, % to move, [% where handle started, ...], [index in scope_Handles, ...])
        function moveHandles(upward, proposal, locations, handleNumbers, connect) {
            var proposals = locations.slice();
            // Store first handle now, so we still have it in case handleNumbers is reversed
            var firstHandle = handleNumbers[0];
            var b = [!upward, upward];
            var f = [upward, !upward];
            // Copy handleNumbers so we don't change the dataset
            handleNumbers = handleNumbers.slice();
            // Check to see which handle is 'leading'.
            // If that one can't move the second can't either.
            if (upward) {
                handleNumbers.reverse();
            }
            // Step 1: get the maximum percentage that any of the handles can move
            if (handleNumbers.length > 1) {
                handleNumbers.forEach(function (handleNumber, o) {
                    var to = checkHandlePosition(proposals, handleNumber, proposals[handleNumber] + proposal, b[o], f[o], false);
                    // Stop if one of the handles can't move.
                    if (to === false) {
                        proposal = 0;
                    }
                    else {
                        proposal = to - proposals[handleNumber];
                        proposals[handleNumber] = to;
                    }
                });
            }
            // If using one handle, check backward AND forward
            else {
                b = f = [true];
            }
            var state = false;
            // Step 2: Try to set the handles with the found percentage
            handleNumbers.forEach(function (handleNumber, o) {
                state = setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o]) || state;
            });
            // Step 3: If a handle moved, fire events
            if (state) {
                handleNumbers.forEach(function (handleNumber) {
                    fireEvent("update", handleNumber);
                    fireEvent("slide", handleNumber);
                });
                // If target is a connect, then fire drag event
                if (connect != undefined) {
                    fireEvent("drag", firstHandle);
                }
            }
        }
        // Takes a base value and an offset. This offset is used for the connect bar size.
        // In the initial design for this feature, the origin element was 1% wide.
        // Unfortunately, a rounding bug in Chrome makes it impossible to implement this feature
        // in this manner: https://bugs.chromium.org/p/chromium/issues/detail?id=798223
        function transformDirection(a, b) {
            return options.dir ? 100 - a - b : a;
        }
        // Updates scope_Locations and scope_Values, updates visual state
        function updateHandlePosition(handleNumber, to) {
            // Update locations.
            scope_Locations[handleNumber] = to;
            // Convert the value to the slider stepping/range.
            scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);
            var translation = transformDirection(to, 0) - scope_DirOffset;
            var translateRule = "translate(" + inRuleOrder(translation + "%", "0") + ")";
            scope_Handles[handleNumber].style[options.transformRule] = translateRule;
            updateConnect(handleNumber);
            updateConnect(handleNumber + 1);
        }
        // Handles before the slider middle are stacked later = higher,
        // Handles after the middle later is lower
        // [[7] [8] .......... | .......... [5] [4]
        function setZindex() {
            scope_HandleNumbers.forEach(function (handleNumber) {
                var dir = scope_Locations[handleNumber] > 50 ? -1 : 1;
                var zIndex = 3 + (scope_Handles.length + dir * handleNumber);
                scope_Handles[handleNumber].style.zIndex = String(zIndex);
            });
        }
        // Test suggested values and apply margin, step.
        // if exactInput is true, don't run checkHandlePosition, then the handle can be placed in between steps (#436)
        function setHandle(handleNumber, to, lookBackward, lookForward, exactInput) {
            if (!exactInput) {
                to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false);
            }
            if (to === false) {
                return false;
            }
            updateHandlePosition(handleNumber, to);
            return true;
        }
        // Updates style attribute for connect nodes
        function updateConnect(index) {
            // Skip connects set to false
            if (!scope_Connects[index]) {
                return;
            }
            var l = 0;
            var h = 100;
            if (index !== 0) {
                l = scope_Locations[index - 1];
            }
            if (index !== scope_Connects.length - 1) {
                h = scope_Locations[index];
            }
            // We use two rules:
            // 'translate' to change the left/top offset;
            // 'scale' to change the width of the element;
            // As the element has a width of 100%, a translation of 100% is equal to 100% of the parent (.noUi-base)
            var connectWidth = h - l;
            var translateRule = "translate(" + inRuleOrder(transformDirection(l, connectWidth) + "%", "0") + ")";
            var scaleRule = "scale(" + inRuleOrder(connectWidth / 100, "1") + ")";
            scope_Connects[index].style[options.transformRule] =
                translateRule + " " + scaleRule;
        }
        // Parses value passed to .set method. Returns current value if not parse-able.
        function resolveToValue(to, handleNumber) {
            // Setting with null indicates an 'ignore'.
            // Inputting 'false' is invalid.
            if (to === null || to === false || to === undefined) {
                return scope_Locations[handleNumber];
            }
            // If a formatted number was passed, attempt to decode it.
            if (typeof to === "number") {
                to = String(to);
            }
            to = options.format.from(to);
            if (to !== false) {
                to = scope_Spectrum.toStepping(to);
            }
            // If parsing the number failed, use the current value.
            if (to === false || isNaN(to)) {
                return scope_Locations[handleNumber];
            }
            return to;
        }
        // Set the slider value.
        function valueSet(input, fireSetEvent, exactInput) {
            var values = asArray(input);
            var isInit = scope_Locations[0] === undefined;
            // Event fires by default
            fireSetEvent = fireSetEvent === undefined ? true : fireSetEvent;
            // Animation is optional.
            // Make sure the initial values were set before using animated placement.
            if (options.animate && !isInit) {
                addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
            }
            // First pass, without lookAhead but with lookBackward. Values are set from left to right.
            scope_HandleNumbers.forEach(function (handleNumber) {
                setHandle(handleNumber, resolveToValue(values[handleNumber], handleNumber), true, false, exactInput);
            });
            var i = scope_HandleNumbers.length === 1 ? 0 : 1;
            // Spread handles evenly across the slider if the range has no size (min=max)
            if (isInit && scope_Spectrum.hasNoSize()) {
                exactInput = true;
                scope_Locations[0] = 0;
                if (scope_HandleNumbers.length > 1) {
                    var space_1 = 100 / (scope_HandleNumbers.length - 1);
                    scope_HandleNumbers.forEach(function (handleNumber) {
                        scope_Locations[handleNumber] = handleNumber * space_1;
                    });
                }
            }
            // Secondary passes. Now that all base values are set, apply constraints.
            // Iterate all handles to ensure constraints are applied for the entire slider (Issue #1009)
            for (; i < scope_HandleNumbers.length; ++i) {
                scope_HandleNumbers.forEach(function (handleNumber) {
                    setHandle(handleNumber, scope_Locations[handleNumber], true, true, exactInput);
                });
            }
            setZindex();
            scope_HandleNumbers.forEach(function (handleNumber) {
                fireEvent("update", handleNumber);
                // Fire the event only for handles that received a new value, as per #579
                if (values[handleNumber] !== null && fireSetEvent) {
                    fireEvent("set", handleNumber);
                }
            });
        }
        // Reset slider to initial values
        function valueReset(fireSetEvent) {
            valueSet(options.start, fireSetEvent);
        }
        // Set value for a single handle
        function valueSetHandle(handleNumber, value, fireSetEvent, exactInput) {
            // Ensure numeric input
            handleNumber = Number(handleNumber);
            if (!(handleNumber >= 0 && handleNumber < scope_HandleNumbers.length)) {
                throw new Error("noUiSlider: invalid handle number, got: " + handleNumber);
            }
            // Look both backward and forward, since we don't want this handle to "push" other handles (#960);
            // The exactInput argument can be used to ignore slider stepping (#436)
            setHandle(handleNumber, resolveToValue(value, handleNumber), true, true, exactInput);
            fireEvent("update", handleNumber);
            if (fireSetEvent) {
                fireEvent("set", handleNumber);
            }
        }
        // Get the slider value.
        function valueGet(unencoded) {
            if (unencoded === void 0) { unencoded = false; }
            if (unencoded) {
                // return a copy of the raw values
                return scope_Values.length === 1 ? scope_Values[0] : scope_Values.slice(0);
            }
            var values = scope_Values.map(options.format.to);
            // If only one handle is used, return a single value.
            if (values.length === 1) {
                return values[0];
            }
            return values;
        }
        // Removes classes from the root and empties it.
        function destroy() {
            // remove protected internal listeners
            removeEvent(INTERNAL_EVENT_NS.aria);
            removeEvent(INTERNAL_EVENT_NS.tooltips);
            Object.keys(options.cssClasses).forEach(function (key) {
                removeClass(scope_Target, options.cssClasses[key]);
            });
            while (scope_Target.firstChild) {
                scope_Target.removeChild(scope_Target.firstChild);
            }
            delete scope_Target.noUiSlider;
        }
        function getNextStepsForHandle(handleNumber) {
            var location = scope_Locations[handleNumber];
            var nearbySteps = scope_Spectrum.getNearbySteps(location);
            var value = scope_Values[handleNumber];
            var increment = nearbySteps.thisStep.step;
            var decrement = null;
            // If snapped, directly use defined step value
            if (options.snap) {
                return [
                    value - nearbySteps.stepBefore.startValue || null,
                    nearbySteps.stepAfter.startValue - value || null
                ];
            }
            // If the next value in this step moves into the next step,
            // the increment is the start of the next step - the current value
            if (increment !== false) {
                if (value + increment > nearbySteps.stepAfter.startValue) {
                    increment = nearbySteps.stepAfter.startValue - value;
                }
            }
            // If the value is beyond the starting point
            if (value > nearbySteps.thisStep.startValue) {
                decrement = nearbySteps.thisStep.step;
            }
            else if (nearbySteps.stepBefore.step === false) {
                decrement = false;
            }
            // If a handle is at the start of a step, it always steps back into the previous step first
            else {
                decrement = value - nearbySteps.stepBefore.highestStep;
            }
            // Now, if at the slider edges, there is no in/decrement
            if (location === 100) {
                increment = null;
            }
            else if (location === 0) {
                decrement = null;
            }
            // As per #391, the comparison for the decrement step can have some rounding issues.
            var stepDecimals = scope_Spectrum.countStepDecimals();
            // Round per #391
            if (increment !== null && increment !== false) {
                increment = Number(increment.toFixed(stepDecimals));
            }
            if (decrement !== null && decrement !== false) {
                decrement = Number(decrement.toFixed(stepDecimals));
            }
            return [decrement, increment];
        }
        // Get the current step size for the slider.
        function getNextSteps() {
            return scope_HandleNumbers.map(getNextStepsForHandle);
        }
        // Updatable: margin, limit, padding, step, range, animate, snap
        function updateOptions(optionsToUpdate, fireSetEvent) {
            // Spectrum is created using the range, snap, direction and step options.
            // 'snap' and 'step' can be updated.
            // If 'snap' and 'step' are not passed, they should remain unchanged.
            var v = valueGet();
            var updateAble = [
                "margin",
                "limit",
                "padding",
                "range",
                "animate",
                "snap",
                "step",
                "format",
                "pips",
                "tooltips"
            ];
            // Only change options that we're actually passed to update.
            updateAble.forEach(function (name) {
                // Check for undefined. null removes the value.
                if (optionsToUpdate[name] !== undefined) {
                    originalOptions[name] = optionsToUpdate[name];
                }
            });
            var newOptions = testOptions(originalOptions);
            // Load new options into the slider state
            updateAble.forEach(function (name) {
                if (optionsToUpdate[name] !== undefined) {
                    options[name] = newOptions[name];
                }
            });
            scope_Spectrum = newOptions.spectrum;
            // Limit, margin and padding depend on the spectrum but are stored outside of it. (#677)
            options.margin = newOptions.margin;
            options.limit = newOptions.limit;
            options.padding = newOptions.padding;
            // Update pips, removes existing.
            if (options.pips) {
                pips(options.pips);
            }
            else {
                removePips();
            }
            // Update tooltips, removes existing.
            if (options.tooltips) {
                tooltips();
            }
            else {
                removeTooltips();
            }
            // Invalidate the current positioning so valueSet forces an update.
            scope_Locations = [];
            valueSet(isSet(optionsToUpdate.start) ? optionsToUpdate.start : v, fireSetEvent);
        }
        // Initialization steps
        function setupSlider() {
            // Create the base element, initialize HTML and set classes.
            // Add handles and connect elements.
            scope_Base = addSlider(scope_Target);
            addElements(options.connect, scope_Base);
            // Attach user events.
            bindSliderEvents(options.events);
            // Use the public value method to set the start values.
            valueSet(options.start);
            if (options.pips) {
                pips(options.pips);
            }
            if (options.tooltips) {
                tooltips();
            }
            aria();
        }
        setupSlider();
        var scope_Self = {
            destroy: destroy,
            steps: getNextSteps,
            on: bindEvent,
            off: removeEvent,
            get: valueGet,
            set: valueSet,
            setHandle: valueSetHandle,
            reset: valueReset,
            // Exposed for unit testing, don't use this in your application.
            __moveHandles: function (upward, proposal, handleNumbers) {
                moveHandles(upward, proposal, scope_Locations, handleNumbers);
            },
            options: originalOptions,
            updateOptions: updateOptions,
            target: scope_Target,
            removePips: removePips,
            removeTooltips: removeTooltips,
            getPositions: function () {
                return scope_Locations.slice();
            },
            getTooltips: function () {
                return scope_Tooltips;
            },
            getOrigins: function () {
                return scope_Handles;
            },
            pips: pips // Issue #594
        };
        return scope_Self;
    }
    // Run the standard initializer
    function initialize(target, originalOptions) {
        if (!target || !target.nodeName) {
            throw new Error("noUiSlider: create requires a single element, got: " + target);
        }
        // Throw an error if the slider was already initialized.
        if (target.noUiSlider) {
            throw new Error("noUiSlider: Slider was already initialized.");
        }
        // Test the options and create the slider environment;
        var options = testOptions(originalOptions);
        var api = scope(target, options, originalOptions);
        target.noUiSlider = api;
        return api;
    }
    var nouislider = {
        // Exposed for unit testing, don't use this in your application.
        __spectrum: Spectrum,
        // A reference to the default classes, allows global changes.
        // Use the cssClasses option for changes to one slider.
        cssClasses: cssClasses,
        create: initialize
    };

    exports.create = initialize;
    exports.cssClasses = cssClasses;
    exports['default'] = nouislider;

    Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),

/***/ 303:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.App = void 0;
const Parameters_1 = __importDefault(__webpack_require__(105));
const DecorationParameters_1 = __importDefault(__webpack_require__(138));
const DecorationParameters_2 = __webpack_require__(138);
class App {
    constructor() {
        this.parameters = new Parameters_1.default();
        this.decorationParameters = new DecorationParameters_1.default();
    }
    start() {
        this.addEventListeners();
    }
    addEventListeners() {
        const buttonHome = document.querySelector(".button-home");
        const buttonOrnaments = document.querySelector(".button-ornaments");
        const buttonTree = document.querySelector(".button-tree");
        const buttonHelp = document.querySelector(".button-help");
        const buttonStart = document.querySelector(".button-start");
        buttonHome.addEventListener("click", () => {
            this.switchPages("start-page", "button-home");
        });
        buttonOrnaments.addEventListener("click", () => {
            this.switchPages("ornaments-page", "button-ornaments");
        });
        buttonTree.addEventListener("click", () => {
            this.switchPages("tree-page", "button-tree");
        });
        buttonHelp.addEventListener("click", () => {
            this.switchPages("help-page", "button-help");
        });
        buttonStart.addEventListener("click", () => {
            this.launchApp();
        });
        this.addEventListenerBeforeUnload();
    }
    launchApp() {
        this.switchPages("ornaments-page", "button-ornaments");
        this.parameters.initializeParameters(this);
    }
    switchPages(pageName, buttonName) {
        const domMainPages = document.querySelectorAll(".section");
        const domHeader = document.querySelector("header");
        const domHeaderButtons = domHeader.querySelectorAll(".button");
        let currentPage = document.querySelector(".start-page");
        domMainPages.forEach((elem) => {
            const elemHtml = elem;
            if (!elemHtml.classList.contains("hidden")) {
                currentPage = elemHtml;
            }
            elemHtml.classList.add("hidden");
        });
        domHeaderButtons.forEach((elem) => {
            const elemHtml = elem;
            elemHtml.classList.remove("active-page");
        });
        const page = document.querySelector(`.${pageName}`);
        page.classList.remove("hidden");
        if (pageName !== "start-page") {
            domHeader.classList.remove("hidden");
            const domButton = domHeader.querySelector(`.${buttonName}`);
            domButton.classList.add("active-page");
        }
        if (pageName === "tree-page") {
            this.decorationParameters.showParameters();
            const buttonSnow = document.querySelector(".button-snow");
            buttonSnow.classList.remove("hidden");
        }
        else {
            const buttonSnow = document.querySelector(".button-snow");
            buttonSnow.classList.add("hidden");
            if (DecorationParameters_2.snowInterval) {
                clearInterval(DecorationParameters_2.snowInterval);
            }
        }
        if (!currentPage.classList.contains("start-page")) {
            this.decorationParameters.tree.localStorageTree.setToLocalStorage();
        }
    }
    addEventListenerBeforeUnload() {
        window.addEventListener("beforeunload", () => {
            this.decorationParameters.tree.localStorageTree.setToLocalStorage();
            this.parameters.localStorageFilters.setToLocalStorage();
            this.parameters.ornaments.localStorageToys.setToLocalStorage();
        });
    }
}
exports.App = App;
const app = new App();
app.start();


/***/ }),

/***/ 225:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const definitions_1 = __webpack_require__(125);
class Card {
    constructor(ornament) {
        this.num = ornament.num;
        this.name = ornament.name;
        this.amount = ornament.amount;
        this.year = ornament.year;
        this.shape = ornament.shape;
        this.color = ornament.color;
        this.size = ornament.size;
        this.favorite = ornament.favorite;
    }
    createDomCard() {
        const templateCard = document.querySelector(".template-card");
        const domCard = templateCard.content.cloneNode(true);
        const domCardImage = domCard.querySelector(".card-image");
        const domCardNum = domCard.querySelector(".card-num");
        const domCardName = domCard.querySelector(".card-name");
        const domCardAmount = domCard.querySelector(".card-amount");
        const domCardYear = domCard.querySelector(".card-year");
        const domCardShape = domCard.querySelector(".card-shape");
        const domCardColor = domCard.querySelector(".card-color");
        const domCardSize = domCard.querySelector(".card-size");
        const domCardFavorite = domCard.querySelector(".card-favorite");
        domCardNum.textContent = this.num;
        const img = new Image();
        img.src = `${definitions_1.PATH_TO_TOYS}${Number(this.num)}.png`;
        img.onload = () => {
            domCardImage.src = img.src;
        };
        domCardName.textContent = this.name;
        domCardAmount.textContent = `Количество: ${String(this.amount)}`;
        domCardYear.textContent = `Год покупки: ${String(this.year)}`;
        domCardShape.textContent = `Форма: ${this.shape}`;
        domCardColor.textContent = `Цвет: ${this.color}`;
        domCardSize.textContent = `Размер: ${this.size}`;
        domCardFavorite.textContent = `Любимая: ${this.favorite ? "да" : "нет"}`;
        return domCard;
    }
}
exports["default"] = Card;


/***/ }),

/***/ 195:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class DecorationCard {
    constructor(id, path, className, imageClassName, count) {
        this.id = id;
        this.path = path !== "" ? path : "";
        this.className = className;
        this.imageClassName = imageClassName;
        this.count = count;
    }
    createDecorationCard(num, isCountNeeded = false) {
        const templateCard = document.querySelector(".template-decoration-card");
        const domWrapper = templateCard.content.cloneNode(true);
        const domCard = domWrapper.querySelector(".decoration-card");
        const domCardImg = domCard.querySelector(".decoration-card-image");
        const domCardNum = domCard.querySelector(".decoration-card-num");
        domCard.classList.add(this.className);
        domCard.setAttribute("data-num", String(this.id));
        domCardImg.classList.add(this.imageClassName);
        domCardNum.textContent = String(this.id);
        if (this.path) {
            const img = new Image();
            img.src = this.path;
            img.onload = () => {
                domCardImg.src = this.path;
            };
            domCardImg.setAttribute("data-num", String(this.id));
        }
        if (isCountNeeded && this.path && this.count) {
            const domCardCountWrapper = domCard.querySelector(".decoration-card-count-wrapper");
            const domCardCount = domCardCountWrapper.querySelector(".decoration-card-count");
            domCardCountWrapper.classList.remove("hidden");
            domCardCount.textContent = String(this.count);
        }
        return domCard;
    }
}
exports["default"] = DecorationCard;


/***/ }),

/***/ 138:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.snowInterval = void 0;
const definitions_1 = __webpack_require__(125);
const DecorationCard_1 = __importDefault(__webpack_require__(195));
const Tree_1 = __importDefault(__webpack_require__(880));
const lights_1 = __importDefault(__webpack_require__(558));
const snowflakes_1 = __importDefault(__webpack_require__(900));
class DecorationParameters {
    constructor() {
        this.dataArray = [];
        this.ornamentsData = [];
        this.ornaments = [];
        this.trees = [];
        this.backgrounds = [];
        this.tree = new Tree_1.default();
    }
    showParameters() {
        this.showTrees();
        this.showBackgrounds();
        this.showLights();
        this.showChosenOrnaments();
        this.setInitialParameters();
        this.setLights(this.tree.lights.id);
        this.setEventListenerOnTreeOrnaments();
        this.setEventListenerOnButtonOnOffLights();
        this.setEventListenerOnButtonSnow();
    }
    showTrees() {
        const domTreeWrapper = document.querySelector(".trees-wrapper");
        this.trees = [];
        for (let i = 1; i <= definitions_1.AMOUNT_OF_TREES; i++) {
            const newTree = new DecorationCard_1.default(i, `${definitions_1.PATH_TO_TREES}${i}.png`, "tree-card", "tree-card-image");
            this.trees.push(newTree);
        }
        this.placeCards(domTreeWrapper, this.trees, false);
        this.setEventListenerOnTrees();
    }
    showBackgrounds() {
        const domBackgroundWrapper = document.querySelector(".backgrounds-wrapper");
        this.backgrounds = [];
        for (let i = 1; i <= definitions_1.AMOUNT_OF_BACKGROUNDS; i++) {
            const newBackground = new DecorationCard_1.default(i, `${definitions_1.PATH_TO_BACKGROUNDS}${i}.jpg`, "background-card", "backgroung-image");
            this.backgrounds.push(newBackground);
        }
        this.placeCards(domBackgroundWrapper, this.backgrounds, false);
        this.setEventListenerOnBackgrounds();
    }
    showLights() {
        this.setEventListenerOnLights();
    }
    showChosenOrnaments() {
        this.ornamentsData = [];
        this.ornaments = [];
        if (definitions_1.CHOSEN_TOYS.length > 0) {
            for (let i = 0; i < definitions_1.CHOSEN_TOYS.length; i++) {
                const ornament = this.dataArray.find((item) => item.num === definitions_1.CHOSEN_TOYS[i]);
                if (ornament !== undefined) {
                    this.ornamentsData.push(ornament);
                }
            }
            for (let i = definitions_1.CHOSEN_TOYS.length; i < definitions_1.CHOSEN_AMOUNT; i++) {
                const ornament = { num: "-1", amount: 0 };
                this.ornamentsData.push(ornament);
            }
        }
        else {
            for (let i = 0; i < definitions_1.CHOSEN_AMOUNT; i++) {
                const ornament = {
                    num: this.dataArray[i].num,
                    amount: this.dataArray[i].amount,
                };
                this.ornamentsData.push(ornament);
            }
        }
        const domOrnamentsWrapper = document.querySelector(".ornaments-wrapper");
        domOrnamentsWrapper.innerHTML = "";
        this.ornamentsData.forEach((elem) => {
            const newOrnament = new DecorationCard_1.default(Number(elem.num), elem.num === "-1" ? "" : `${definitions_1.PATH_TO_TOYS}${elem.num}.png`, "toy-card", "toy-card-image", elem.amount);
            this.ornaments.push(newOrnament);
        });
        this.placeCards(domOrnamentsWrapper, this.ornaments, true);
        this.setEventListenerOnOrnaments();
    }
    placeCards(parent, decorationArray, isCountNeeded) {
        parent.innerHTML = "";
        const domFragment = document.createDocumentFragment();
        decorationArray.forEach((card, index) => {
            const domCard = card.createDecorationCard(index + 1, isCountNeeded);
            domFragment.append(domCard);
        });
        parent.appendChild(domFragment);
    }
    setEventListenerOnTrees() {
        const treesWrapper = document.querySelector(".trees-wrapper");
        treesWrapper.onclick = (event) => {
            this.tree.setTreePattern(event.target);
            this.tree.localStorageTree.setSettingsForSaving(this.tree);
        };
    }
    setEventListenerOnBackgrounds() {
        const backgroundWrapper = document.querySelector(".backgrounds-wrapper");
        backgroundWrapper.onclick = (event) => {
            this.tree.setBackground(event.target);
            this.tree.localStorageTree.setSettingsForSaving(this.tree);
        };
    }
    setEventListenerOnLights() {
        const whiteLight = document.querySelector(".white-btn");
        const buttonOnOff = document.querySelector(".on-off-lights");
        whiteLight.onclick = () => {
            this.tree.isLightsOn = true;
            whiteLight.classList.add("color-btn-active");
            setTimeout(() => {
                whiteLight.classList.remove("color-btn-active");
            }, definitions_1.ANIMATION_TIME_200);
            buttonOnOff.textContent = "Выкл";
            buttonOnOff.classList.remove("on-off-lights-off");
            this.setLights(0);
            this.tree.lights = new lights_1.default(0);
            this.tree.localStorageTree.setSettingsForSaving(this.tree);
        };
        const yellowLight = document.querySelector(".yellow-btn");
        yellowLight.onclick = () => {
            this.tree.isLightsOn = true;
            yellowLight.classList.add("color-btn-active");
            setTimeout(() => {
                yellowLight.classList.remove("color-btn-active");
            }, definitions_1.ANIMATION_TIME_200);
            buttonOnOff.textContent = "Выкл";
            buttonOnOff.classList.remove("on-off-lights-off");
            this.setLights(1);
            this.tree.lights = new lights_1.default(1);
            this.tree.localStorageTree.setSettingsForSaving(this.tree);
        };
        const redLight = document.querySelector(".red-btn");
        redLight.onclick = () => {
            this.tree.isLightsOn = true;
            redLight.classList.add("color-btn-active");
            setTimeout(() => {
                redLight.classList.remove("color-btn-active");
            }, definitions_1.ANIMATION_TIME_200);
            buttonOnOff.textContent = "Выкл";
            buttonOnOff.classList.remove("on-off-lights-off");
            this.setLights(2);
            this.tree.lights = new lights_1.default(2);
            this.tree.localStorageTree.setSettingsForSaving(this.tree);
        };
        const greenLight = document.querySelector(".green-btn");
        greenLight.onclick = () => {
            this.tree.isLightsOn = true;
            greenLight.classList.add("color-btn-active");
            setTimeout(() => {
                greenLight.classList.remove("color-btn-active");
            }, definitions_1.ANIMATION_TIME_200);
            buttonOnOff.textContent = "Выкл";
            buttonOnOff.classList.remove("on-off-lights-off");
            this.setLights(3);
            this.tree.lights = new lights_1.default(3);
            this.tree.localStorageTree.setSettingsForSaving(this.tree);
        };
        const blueLight = document.querySelector(".blue-btn");
        blueLight.onclick = () => {
            this.tree.isLightsOn = true;
            blueLight.classList.add("color-btn-active");
            setTimeout(() => {
                blueLight.classList.remove("color-btn-active");
            }, definitions_1.ANIMATION_TIME_200);
            buttonOnOff.textContent = "Выкл";
            buttonOnOff.classList.remove("on-off-lights-off");
            this.setLights(4);
            this.tree.lights = new lights_1.default(4);
            this.tree.localStorageTree.setSettingsForSaving(this.tree);
        };
        const mltclrLight = document.querySelector(".multicolor-btn");
        mltclrLight.onclick = () => {
            this.tree.isLightsOn = true;
            mltclrLight.classList.add("color-btn-active");
            setTimeout(() => {
                mltclrLight.classList.remove("color-btn-active");
            }, definitions_1.ANIMATION_TIME_200);
            buttonOnOff.textContent = "Выкл";
            buttonOnOff.classList.remove("on-off-lights-off");
            this.setLights(5);
            this.tree.lights = new lights_1.default(5);
            this.tree.localStorageTree.setSettingsForSaving(this.tree);
        };
        this.tree.localStorageTree.setSettingsForSaving(this.tree);
    }
    setEventListenerOnButtonOnOffLights() {
        const buttonOnOff = document.querySelector(".on-off-lights");
        buttonOnOff.onclick = () => {
            buttonOnOff.classList.add("on-off-lights-active");
            setTimeout(() => {
                buttonOnOff.classList.remove("on-off-lights-active");
            }, definitions_1.ANIMATION_TIME_200);
            if (buttonOnOff.classList.contains("on-off-lights-off")) {
                buttonOnOff.textContent = "Выкл";
                buttonOnOff.classList.remove("on-off-lights-off");
                this.tree.isLightsOn = true;
                this.setLights(this.tree.lights.id);
            }
            else {
                buttonOnOff.textContent = "Вкл";
                buttonOnOff.classList.add("on-off-lights-off");
                this.tree.isLightsOn = false;
                this.setLights(-1);
            }
            this.tree.localStorageTree.setSettingsForSaving(this.tree);
        };
    }
    setLights(id) {
        this.tree.lights.createLights(id, this.tree.isLightsOn);
    }
    setEventListenerOnButtonSnow() {
        const buttonSnow = document.querySelector(".button-snow");
        buttonSnow.addEventListener("click", () => {
            buttonSnow.classList.add("button-snow-active");
            setTimeout(() => {
                buttonSnow.classList.remove("button-snow-active");
            }, definitions_1.ANIMATION_TIME_200);
            if (buttonSnow.classList.contains("active")) {
                buttonSnow.classList.remove("active");
                if (exports.snowInterval) {
                    clearInterval(exports.snowInterval);
                }
            }
            else {
                exports.snowInterval = setInterval(snowflakes_1.default, 250);
                buttonSnow.classList.add("active");
                (0, snowflakes_1.default)();
            }
        });
    }
    setEventListenerOnOrnaments() {
        const domArrayCards = document.querySelectorAll(".toy-card");
        domArrayCards.forEach((elem) => {
            elem.setAttribute("draggable", "true");
            elem.ondragstart = (event) => this.drag(event, true);
        });
    }
    setEventListenerOnTreeOrnaments() {
        const domTreeContainer = document.querySelector(".tree-container");
        const map = domTreeContainer.querySelector(".treemap");
        domTreeContainer.ondrop = (event) => {
            this.drop(event);
        };
        map.ondragover = (event) => {
            const ornament = document.querySelector(".moving");
            ornament.style.cursor = "pointer";
            this.allowDrop(event);
        };
        const domArrayImages = domTreeContainer.querySelectorAll(".toy-card-image");
        domArrayImages.forEach((elem) => {
            elem.setAttribute("draggable", "true");
            elem.ondragstart = (event) => this.drag(event, false);
        });
    }
    allowDrop(event) {
        event.preventDefault();
    }
    drag(event, isCloningNeed) {
        if (event.dataTransfer != null) {
            event.dataTransfer.setData("text", String(isCloningNeed));
        }
        const ornament = event.target;
        ornament.classList.add("moving");
    }
    drop(event) {
        const tree = document.querySelector(".tree-container");
        const isCloningNeeded = event.dataTransfer.getData("text") === "true"
            ? true
            : false;
        event.preventDefault();
        const ornament = document.querySelector(".moving");
        const parent = ornament.parentElement;
        ornament.style.position = "absolute";
        const computedStyle = getComputedStyle(ornament);
        ornament.style.width = computedStyle.width;
        ornament.style.height = computedStyle.height;
        ornament.style.zIndex = "5";
        const coordTree = tree.getBoundingClientRect();
        const coord = ornament.getBoundingClientRect();
        tree.appendChild(ornament);
        ornament.setAttribute("draggable", "true");
        ornament.ondragstart = (event) => this.drag(event, false);
        ornament.style.left = event.clientX - coordTree.x - coord.width / 2 + "px";
        ornament.style.top = event.clientY - coordTree.y - coord.height / 2 + "px";
        ornament.classList.remove("moving");
        if (isCloningNeeded) {
            const cloneOrnament = ornament.cloneNode(true);
            cloneOrnament.style.position = "static";
            parent.append(cloneOrnament);
            this.tree.changeTreeState(cloneOrnament, "add");
        }
        this.tree.gatherOrnamentsOnTree();
        this.tree.localStorageTree.setSettingsForSaving(this.tree);
    }
    dropOff(event) {
        const tree = document.querySelector(".tree-container");
        const isCloningNeeded = event.dataTransfer.getData("text") === "true"
            ? true
            : false;
        event.preventDefault();
        const ornament = document.querySelector(".moving");
        const parent = ornament.parentElement;
        ornament.style.position = "absolute";
        const computedStyle = getComputedStyle(ornament);
        ornament.style.width = computedStyle.width;
        ornament.style.height = computedStyle.height;
        ornament.style.zIndex = "5";
        const coordTree = tree.getBoundingClientRect();
        const coord = ornament.getBoundingClientRect();
        tree.appendChild(ornament);
        ornament.setAttribute("draggable", "true");
        ornament.ondragstart = (event) => this.drag(event, false);
        ornament.style.left = event.clientX - coordTree.x - coord.width / 2 + "px";
        ornament.style.top = event.clientY - coordTree.y - coord.height / 2 + "px";
        ornament.classList.remove("moving");
        if (isCloningNeeded) {
            const cloneOrnament = ornament.cloneNode(true);
            cloneOrnament.style.position = "static";
            parent.append(cloneOrnament);
            this.tree.changeTreeState(cloneOrnament, "add");
        }
        this.tree.gatherOrnamentsOnTree();
        this.tree.localStorageTree.setSettingsForSaving(this.tree);
    }
    setInitialParameters() {
        this.tree.getDataFromLocalStorage();
        const buttonOnOff = document.querySelector(".on-off-lights");
        if (this.tree.isLightsOn) {
            buttonOnOff.textContent = "Выкл";
            buttonOnOff.classList.remove("on-off-lights-off");
        }
        else {
            buttonOnOff.textContent = "Вкл";
            buttonOnOff.classList.add("on-off-lights-off");
        }
    }
}
exports["default"] = DecorationParameters;


/***/ }),

/***/ 440:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const definitions_1 = __webpack_require__(125);
class LoadedData {
    constructor() {
        this.id = 1;
        this.dataArray = [];
    }
    createDataArray() {
        return __awaiter(this, void 0, void 0, function* () {
            const dataFile = yield this.loadDataFile();
            for (let i = 0; i < definitions_1.AMOUNT_OF_CARDS; i++) {
                const ornament = {
                    num: String(dataFile[i].num),
                    name: String(dataFile[i].name),
                    amount: Number(dataFile[i].count),
                    year: Number(dataFile[i].year),
                    shape: this.defineShape(dataFile[i].shape),
                    color: this.defineColor(dataFile[i].color),
                    size: this.defineSize(dataFile[i].size),
                    favorite: dataFile[i].favorite ? true : false,
                };
                this.dataArray.push(ornament);
            }
        });
    }
    defineShape(shape) {
        switch (shape) {
            case "шар":
                return definitions_1.eShapes.BALL;
            case "колокольчик":
                return definitions_1.eShapes.BELL;
            case "шишка":
                return definitions_1.eShapes.CONE;
            case "снежинка":
                return definitions_1.eShapes.SNOWFLAKE;
            case "фигурка":
                return definitions_1.eShapes.TOY;
            default:
                return definitions_1.eShapes.BALL;
        }
    }
    defineColor(color) {
        switch (color) {
            case "белый":
                return definitions_1.eColors.WHITE;
            case "желтый":
                return definitions_1.eColors.YELLOW;
            case "красный":
                return definitions_1.eColors.RED;
            case "синий":
                return definitions_1.eColors.BLUE;
            case "зелёный":
                return definitions_1.eColors.GREEN;
            default:
                return definitions_1.eColors.WHITE;
        }
    }
    defineSize(size) {
        switch (size) {
            case "большой":
                return definitions_1.eSizes.BIG;
            case "средний":
                return definitions_1.eSizes.MEDIUM;
            case "малый":
                return definitions_1.eSizes.SMALL;
            default:
                return definitions_1.eSizes.BIG;
        }
    }
    loadDataFile() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = "../assets/data.json";
                const res = yield fetch(url);
                const data = yield res.json();
                return Promise.resolve(data);
            }
            catch (error) {
                alert(error);
            }
        });
    }
}
exports["default"] = LoadedData;


/***/ }),

/***/ 179:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const definitions_1 = __webpack_require__(125);
class LocalStorageFilters {
    constructor(filters, sortingMethod, isMusicOn) {
        this.filters = filters;
        this.sortingMethod = sortingMethod;
        this.isMusicOn = isMusicOn;
    }
    setSettingsForSaving(filters, sortingMethod, isMusicOn) {
        this.filters = filters;
        this.sortingMethod = sortingMethod;
        this.isMusicOn = isMusicOn;
    }
    setToLocalStorage() {
        localStorage.setItem("dd_filterShape", JSON.stringify(this.filters.filterShape));
        localStorage.setItem("dd_filterColor", JSON.stringify(this.filters.filterColor));
        localStorage.setItem("dd_filterSize", JSON.stringify(this.filters.filterSize));
        localStorage.setItem("dd_filterFavorite", JSON.stringify(this.filters.filterFavorite));
        localStorage.setItem("dd_filterAmount", JSON.stringify(this.filters.filterAmount));
        localStorage.setItem("dd_filterYear", JSON.stringify(this.filters.filterYear));
        localStorage.setItem("dd_sortingMethod", this.sortingMethod);
        localStorage.setItem("dd_isMusicOn", String(this.isMusicOn));
    }
    getItemsFromLocalStorage() {
        var _a;
        const gotFilterShape = localStorage.getItem("dd_filterShape") || "";
        if (gotFilterShape) {
            const tempArray = [];
            const tempConvert = JSON.parse(gotFilterShape);
            tempConvert.forEach((elem) => {
                var _a;
                const instanceEShape = (_a = Object.entries(definitions_1.eShapes).find(([key, val]) => val === elem)) === null || _a === void 0 ? void 0 : _a[0];
                tempArray.push(definitions_1.eShapes[instanceEShape]);
            });
            this.filters.filterShape = tempArray;
        }
        const gotFilterColor = localStorage.getItem("dd_filterColor") || "";
        if (gotFilterColor) {
            const tempArray = [];
            const tempConvert = JSON.parse(gotFilterColor);
            tempConvert.forEach((elem) => {
                var _a;
                const instanceEColor = (_a = Object.entries(definitions_1.eColors).find(([key, val]) => val === elem)) === null || _a === void 0 ? void 0 : _a[0];
                tempArray.push(definitions_1.eColors[instanceEColor]);
            });
            this.filters.filterColor = tempArray;
        }
        const gotFilterSize = localStorage.getItem("dd_filterSize") || "";
        if (gotFilterSize) {
            const tempArray = [];
            const tempConvert = JSON.parse(gotFilterSize);
            tempConvert.forEach((elem) => {
                var _a;
                const instanceESize = (_a = Object.entries(definitions_1.eSizes).find(([key, val]) => val === elem)) === null || _a === void 0 ? void 0 : _a[0];
                tempArray.push(definitions_1.eSizes[instanceESize]);
            });
            this.filters.filterSize = tempArray;
        }
        const gotFilterFavorite = localStorage.getItem("dd_filterFavorite") || "";
        if (gotFilterFavorite) {
            this.filters.filterFavorite = gotFilterFavorite === "true" ? true : false;
        }
        const gotFilterAmount = localStorage.getItem("dd_filterAmount") || "";
        if (gotFilterAmount) {
            const tempConvert = JSON.parse(gotFilterAmount);
            this.filters.filterAmount = tempConvert;
        }
        const gotFilterYear = localStorage.getItem("dd_filterYear") || "";
        if (gotFilterYear) {
            const tempConvert = JSON.parse(gotFilterYear);
            this.filters.filterYear = tempConvert;
        }
        const gotSortingMethod = localStorage.getItem("dd_sortingMethod") || "";
        if (gotSortingMethod) {
            const instanceSortingMethod = (_a = Object.entries(definitions_1.eSortingMethod).find(([key, val]) => val === gotSortingMethod)) === null || _a === void 0 ? void 0 : _a[0];
            this.sortingMethod =
                definitions_1.eSortingMethod[instanceSortingMethod];
        }
        const gotIsMusicOn = localStorage.getItem("dd_isMusicOn") || "";
        this.isMusicOn = gotIsMusicOn == "true" ? true : false;
    }
}
exports["default"] = LocalStorageFilters;


/***/ }),

/***/ 338:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class LocalStorageToys {
    constructor() {
        this.chosenToys = [];
    }
    setSettingsForSaving(chosen_toys) {
        this.chosenToys = chosen_toys;
    }
    setToLocalStorage() {
        localStorage.setItem("dd_chosenToys", JSON.stringify(this.chosenToys));
    }
    getItemsFromLocalStorage() {
        const gotChosenToys = localStorage.getItem("dd_chosenToys") || "";
        if (gotChosenToys) {
            this.chosenToys = JSON.parse(gotChosenToys);
        }
        else {
            this.chosenToys = [];
        }
    }
}
exports["default"] = LocalStorageToys;


/***/ }),

/***/ 812:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class LocalStorageTree {
    constructor() {
        this.ornaments = [];
        this.tree = -1;
        this.background = -1;
        this.lights = -1;
        this.isLightsOn = false;
    }
    setSettingsForSaving(tree) {
        this.ornaments = tree.ornaments;
        this.tree = tree.treePattern;
        this.background = tree.background;
        this.lights = tree.lights.id;
        this.isLightsOn = tree.isLightsOn;
    }
    setToLocalStorage() {
        localStorage.setItem("dd_treeOrnaments", JSON.stringify(this.ornaments));
        localStorage.setItem("dd_tree", String(this.tree));
        localStorage.setItem("dd_background", String(this.background));
        localStorage.setItem("dd_lights", String(this.lights));
        localStorage.setItem("dd_isLightsOn", String(this.isLightsOn));
    }
    getItemsFromLocalStorage() {
        const gotOrnaments = localStorage.getItem("dd_treeOrnaments") || "";
        if (gotOrnaments) {
            this.ornaments = JSON.parse(gotOrnaments);
        }
        else {
            this.ornaments = [];
        }
        const gotTree = localStorage.getItem("dd_tree") || "";
        this.tree = gotTree === "" ? 0 : Number(gotTree);
        const gotBackground = localStorage.getItem("dd_background") || "";
        this.background = gotBackground === "" ? 0 : Number(gotBackground);
        const gotLights = localStorage.getItem("dd_lights") || "";
        this.lights = gotLights === "" ? 0 : Number(gotLights);
        const gotIsLightsOn = localStorage.getItem("dd_isLightsOn") || "";
        this.isLightsOn = gotIsLightsOn === "true" ? true : false;
    }
}
exports["default"] = LocalStorageTree;


/***/ }),

/***/ 678:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const definitions_1 = __webpack_require__(125);
const Card_1 = __importDefault(__webpack_require__(225));
const Popup_1 = __importDefault(__webpack_require__(524));
const LocalStorageToys_1 = __importDefault(__webpack_require__(338));
class Ornaments {
    constructor(ornamentsArray) {
        this.cards = this.convertArrayToCards(ornamentsArray);
        this.localStorageToys = new LocalStorageToys_1.default();
    }
    convertArrayToCards(ornamentsArray) {
        const tempCards = [];
        ornamentsArray.forEach((element) => {
            tempCards.push(new Card_1.default(element));
        });
        return tempCards;
    }
    placeAllCards(loadFromStorage) {
        if (loadFromStorage) {
            this.getDataFromLocalStorage();
        }
        this.localStorageToys.setSettingsForSaving(definitions_1.CHOSEN_TOYS);
        const domCards = document.querySelector(".cards");
        const cardsArray = domCards.querySelectorAll(".card");
        cardsArray.forEach((elem) => {
            domCards.removeChild(elem);
        });
        const domFragment = document.createDocumentFragment();
        this.cards.forEach((card) => {
            const domCard = card.createDomCard();
            domFragment.append(domCard);
        });
        domCards.appendChild(domFragment);
        const domCardElements = domCards.querySelectorAll(".card");
        domCardElements.forEach((elem) => {
            const dataNum = elem.querySelector(".card-num")
                .textContent;
            elem.setAttribute("data-num", dataNum);
            if (definitions_1.CHOSEN_TOYS.includes(dataNum)) {
                this.changeChoosingOrnament(elem);
            }
        });
        this.setEventListener();
    }
    setEventListener() {
        const domCards = document.querySelector(".cards");
        domCards.onclick = (event) => {
            const card = event.target.closest(".card");
            const dataNum = card.getAttribute("data-num");
            const index = definitions_1.CHOSEN_TOYS.indexOf(dataNum);
            if (index >= 0) {
                definitions_1.CHOSEN_TOYS.splice(index, 1);
                this.changeChoosingOrnament(card);
                this.localStorageToys.setSettingsForSaving(definitions_1.CHOSEN_TOYS);
            }
            else {
                if (definitions_1.CHOSEN_TOYS.length == definitions_1.CHOSEN_AMOUNT) {
                    const popupWindow = new Popup_1.default("Извините, все слоты заполнены", event.clientX, event.clientY);
                    popupWindow.showPopupWindow();
                }
                else {
                    definitions_1.CHOSEN_TOYS.push(dataNum);
                    this.changeChoosingOrnament(card);
                    this.localStorageToys.setSettingsForSaving(definitions_1.CHOSEN_TOYS);
                }
            }
            const chosenSpan = document.querySelector(".chosen-span");
            chosenSpan.textContent = String(definitions_1.CHOSEN_TOYS.length);
        };
    }
    changeChoosingOrnament(domElement) {
        domElement.classList.toggle("card-active");
        const domCardRibbon = domElement.querySelector(".card-ribbon");
        domCardRibbon.classList.toggle("ribbon-active");
    }
    getDataFromLocalStorage() {
        this.localStorageToys.getItemsFromLocalStorage();
        if (this.localStorageToys.chosenToys.length > 0) {
            definitions_1.CHOSEN_TOYS.length = 0;
            this.localStorageToys.chosenToys.forEach((elem) => {
                definitions_1.CHOSEN_TOYS.push(elem);
            });
            const chosenSpan = document.querySelector(".chosen-span");
            chosenSpan.textContent = String(definitions_1.CHOSEN_TOYS.length);
        }
    }
}
exports["default"] = Ornaments;


/***/ }),

/***/ 105:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const definitions_1 = __webpack_require__(125);
const Ornaments_1 = __importDefault(__webpack_require__(678));
const rangefilters = __importStar(__webpack_require__(116));
const LoadedData_1 = __importDefault(__webpack_require__(440));
const slider_1 = __webpack_require__(881);
const LocalStorageFilters_1 = __importDefault(__webpack_require__(179));
const DecorationParameters_1 = __importDefault(__webpack_require__(138));
class Parameters {
    constructor() {
        this.dataArray = [];
        this.filters = {
            filterShape: [],
            filterColor: [],
            filterSize: [],
            filterAmount: { min: 0, max: 100 },
            filterYear: { min: 0, max: 3000 },
            filterFavorite: false,
        };
        this.searchFilter = "";
        this.sortingMethod = definitions_1.eSortingMethod.NAME_AZ;
        this.isMusicOn = false;
        this.audio = new Audio();
        this.localStorageFilters = new LocalStorageFilters_1.default(this.filters, this.sortingMethod, this.isMusicOn);
    }
    initializeParameters(app) {
        return __awaiter(this, void 0, void 0, function* () {
            const loadedFile = new LoadedData_1.default();
            yield loadedFile.createDataArray();
            this.dataArray = loadedFile.dataArray;
            this.initializeFilters();
            if (!definitions_1.IS_SLIDER[0]) {
                this.createRangeFilters();
                definitions_1.IS_SLIDER[0] = true;
            }
            this.initializeDecorationParameters(app);
            this.initializeSortingMethod();
            this.initializeAudio();
            this.getDataFromLocalStorage();
            this.ApplyParameters(true);
            this.addEventListeners(app);
        });
    }
    initializeDecorationParameters(app) {
        app.decorationParameters.dataArray = this.dataArray.map(function (item) {
            const ornamentSimple = {
                num: item.num,
                amount: item.amount,
            };
            return ornamentSimple;
        });
    }
    initializeFilters() {
        this.filters = {
            filterShape: [],
            filterColor: [],
            filterSize: [],
            filterAmount: { min: 0, max: 100 },
            filterYear: { min: 0, max: 3000 },
            filterFavorite: false,
        };
        this.searchFilter = "";
    }
    initializeSortingMethod() {
        this.setSortingMethod();
    }
    setSortingMethod(newSortingMethod = "По названию (а-я)") {
        var _a;
        const instanceSortingMethod = (_a = Object.entries(definitions_1.eSortingMethod).find(([key, val]) => val === newSortingMethod)) === null || _a === void 0 ? void 0 : _a[0];
        this.sortingMethod =
            definitions_1.eSortingMethod[instanceSortingMethod];
    }
    ApplyParameters(loadFromStorage = false) {
        this.localStorageFilters.setSettingsForSaving(this.filters, this.sortingMethod, this.isMusicOn);
        const filteredDataArray = this.ApplyFilters();
        this.ApplySortingMethod(filteredDataArray);
        this.ornaments = new Ornaments_1.default(filteredDataArray);
        this.ornaments.placeAllCards(loadFromStorage);
    }
    ApplyFilters() {
        let filteredDataArray = this.ApplySearchFilters(this.dataArray);
        this.manageMessageNoByFilters("remove");
        filteredDataArray = this.ApplyShapeFilters(filteredDataArray);
        filteredDataArray = this.ApplyColorFilters(filteredDataArray);
        filteredDataArray = this.ApplySizeFilters(filteredDataArray);
        filteredDataArray = this.ApplyAmountFilters(filteredDataArray);
        filteredDataArray = this.ApplyYearFilters(filteredDataArray);
        filteredDataArray = this.ApplyFavoriteFilters(filteredDataArray);
        if (filteredDataArray.length === 0) {
            this.manageMessageNoByFilters("show");
        }
        return filteredDataArray;
    }
    ApplyShapeFilters(arrayOrnaments) {
        if (this.filters.filterShape.length > 0) {
            return arrayOrnaments.filter((elem) => this.filters.filterShape.includes(elem.shape));
        }
        else {
            return arrayOrnaments;
        }
    }
    ApplyColorFilters(arrayOrnaments) {
        if (this.filters.filterColor.length > 0) {
            return arrayOrnaments.filter((elem) => this.filters.filterColor.includes(elem.color));
        }
        else {
            return arrayOrnaments;
        }
    }
    ApplySizeFilters(arrayOrnaments) {
        if (this.filters.filterSize.length > 0) {
            return arrayOrnaments.filter((elem) => this.filters.filterSize.includes(elem.size));
        }
        else {
            return arrayOrnaments;
        }
    }
    ApplyAmountFilters(arrayOrnaments) {
        return arrayOrnaments.filter((elem) => elem.amount >= this.filters.filterAmount.min &&
            elem.amount <= this.filters.filterAmount.max);
    }
    ApplyYearFilters(arrayOrnaments) {
        return arrayOrnaments.filter((elem) => elem.year >= this.filters.filterYear.min &&
            elem.year <= this.filters.filterYear.max);
    }
    ApplyFavoriteFilters(arrayOrnaments) {
        if (this.filters.filterFavorite) {
            return arrayOrnaments.filter((elem) => elem.favorite);
        }
        return arrayOrnaments;
    }
    ApplySearchFilters(arrayOrnaments) {
        if (this.searchFilter) {
            return arrayOrnaments.filter((elem) => elem.name.toLowerCase().includes(this.searchFilter));
        }
        else {
            return arrayOrnaments;
        }
    }
    ApplySortingMethod(filteredOrnaments) {
        filteredOrnaments.sort((a, b) => {
            switch (this.sortingMethod) {
                case definitions_1.eSortingMethod.NAME_AZ:
                    return a.name > b.name ? 1 : a.name === b.name ? 0 : -1;
                case definitions_1.eSortingMethod.NAME_ZA:
                    return a.name < b.name ? 1 : a.name === b.name ? 0 : -1;
                case definitions_1.eSortingMethod.AMOUNT_MIN_MAX:
                    return a.year > b.year ? 1 : a.year === b.year ? 0 : -1;
                case definitions_1.eSortingMethod.AMOUNT_MAX_MIN:
                    return a.year < b.year ? 1 : a.year === b.year ? 0 : -1;
                default:
                    return a.name > b.name ? 1 : a.name === b.name ? 0 : -1;
            }
        });
    }
    createRangeFilters() {
        rangefilters.createAmountRangeFilter(this.filters);
        rangefilters.createYearRangeFilter(this.filters);
    }
    addEventListeners(app) {
        this.addEventListenerOnSorting();
        this.addEventListenersOnSearchFilter();
        this.addEventListenersOnShapeFilters();
        this.addEventListenersOnColorFilters();
        this.addEventListenersOnSizeFilters();
        this.addEventListenersOnAmountFilters();
        this.addEventListenersOnYearFilters();
        this.addEventListenersOnFavoriteFilters();
        this.addEventListenersOnMusicButton();
        this.addEventListenerOnResetFilters();
        this.addEventListenerOrResetLocalStorage(app);
        this.addEventListenerOnBody();
    }
    addEventListenerOnBody() {
        const body = document.querySelector("body");
        body.addEventListener("click", () => {
            this.manageMusic();
        });
    }
    addEventListenersOnSearchFilter() {
        const domSearchFilter = document.querySelector(".input-search");
        domSearchFilter.addEventListener("input", () => {
            this.searchFilter = domSearchFilter.value;
            this.ApplyParameters();
        });
    }
    addEventListenerOnSorting() {
        const domSortingMethod = document.querySelector(".sorting");
        domSortingMethod.addEventListener("change", () => {
            const selectedIndex = domSortingMethod.options.selectedIndex;
            const selectedValue = domSortingMethod.options[selectedIndex].text;
            this.setSortingMethod(selectedValue);
            this.ApplyParameters();
        });
    }
    addEventListenersOnShapeFilters() {
        const domFilters = document.querySelector(".filters-shape");
        const domShapeFilterButtons = domFilters.querySelectorAll(".button-shape");
        domShapeFilterButtons.forEach((domFilterButton) => {
            domFilterButton.addEventListener("click", (event) => {
                this.filters.filterShape = handleEvent(event);
                this.ApplyParameters();
            });
        });
        function handleEvent(event) {
            const currentDomElement = event.target;
            currentDomElement.classList.toggle("filters-active-button");
            const tempFilterArray = [];
            domShapeFilterButtons.forEach((button) => {
                var _a;
                if (button.classList.contains("filters-active-button")) {
                    const dataFilter = button.getAttribute("data-filter");
                    const instanceEShape = (_a = Object.entries(definitions_1.eShapes).find(([key, val]) => val === dataFilter)) === null || _a === void 0 ? void 0 : _a[0];
                    tempFilterArray.push(definitions_1.eShapes[instanceEShape]);
                }
            });
            return tempFilterArray;
        }
    }
    addEventListenersOnColorFilters() {
        const domFilters = document.querySelector(".filters-color");
        const domColorFilterButtons = domFilters.querySelectorAll(".button-color");
        domColorFilterButtons.forEach((domFilterButton) => {
            domFilterButton.addEventListener("click", (event) => {
                this.filters.filterColor = handleEvent(event);
                this.ApplyParameters();
            });
        });
        function handleEvent(event) {
            const currentDomElement = event.currentTarget;
            currentDomElement.classList.toggle("filters-color-active-button");
            const domSpan = currentDomElement.querySelector(".span");
            domSpan.classList.toggle("span-color");
            const tempFilterArray = [];
            domColorFilterButtons.forEach((button) => {
                var _a;
                if (button.classList.contains("filters-color-active-button")) {
                    const dataFilter = button.getAttribute("data-filter");
                    const instanceEColor = (_a = Object.entries(definitions_1.eColors).find(([key, val]) => val === dataFilter)) === null || _a === void 0 ? void 0 : _a[0];
                    tempFilterArray.push(definitions_1.eColors[instanceEColor]);
                }
            });
            return tempFilterArray;
        }
    }
    addEventListenersOnSizeFilters() {
        const domFilters = document.querySelector(".filters-size");
        const domSizeFilterButtons = domFilters.querySelectorAll(".button-size");
        domSizeFilterButtons.forEach((domFilterButton) => {
            domFilterButton.addEventListener("click", (event) => {
                this.filters.filterSize = handleEvent(event);
                this.ApplyParameters();
            });
        });
        function handleEvent(event) {
            const currentDomElement = event.target;
            currentDomElement.classList.toggle("filters-active-button");
            const tempFilterArray = [];
            domSizeFilterButtons.forEach((button) => {
                var _a;
                if (button.classList.contains("filters-active-button")) {
                    const dataFilter = button.getAttribute("data-filter");
                    const instanceESize = (_a = Object.entries(definitions_1.eSizes).find(([key, val]) => val === dataFilter)) === null || _a === void 0 ? void 0 : _a[0];
                    tempFilterArray.push(definitions_1.eSizes[instanceESize]);
                }
            });
            return tempFilterArray;
        }
    }
    addEventListenersOnAmountFilters() {
        const rangeSlider = document.getElementById("range-slider-amount");
        if (rangeSlider.noUiSlider) {
            rangeSlider.noUiSlider.on("update", (values, handle) => {
                const value = Math.round(Number(values[handle]));
                handle == 0
                    ? (this.filters.filterAmount.min = value)
                    : (this.filters.filterAmount.max = value);
                this.ApplyParameters();
            });
        }
    }
    addEventListenersOnYearFilters() {
        const rangeSlider = document.getElementById("range-slider-year");
        if (rangeSlider.noUiSlider) {
            rangeSlider.noUiSlider.on("update", (values, handle) => {
                const value = Math.round(Number(values[handle]));
                handle == 0
                    ? (this.filters.filterYear.min = value)
                    : (this.filters.filterYear.max = value);
                this.ApplyParameters();
            });
        }
    }
    addEventListenersOnFavoriteFilters() {
        const domFilterFavorite = document.querySelector(".label-favorite");
        const domInputFavorite = document.querySelector(".input-favorite");
        domFilterFavorite.addEventListener("click", () => {
            this.filters.filterFavorite = !domInputFavorite.checked;
            this.ApplyParameters();
        });
    }
    addEventListenersOnMusicButton() {
        const buttonAudio = document.querySelector(".button-sound");
        buttonAudio.addEventListener("click", () => {
            this.isMusicOn = !this.isMusicOn;
            buttonAudio.classList.toggle("sound-on");
            this.manageMusic();
            this.localStorageFilters.setSettingsForSaving(this.filters, this.sortingMethod, this.isMusicOn);
        });
    }
    addEventListenerOnResetFilters() {
        const domResetFilters = document.querySelector(".filters-reset");
        domResetFilters.addEventListener("click", () => {
            domResetFilters.classList.add("reset-pressed");
            setTimeout(() => {
                domResetFilters.classList.remove("reset-pressed");
            }, definitions_1.ANIMATION_TIME_500);
            this.initializeFilters();
            this.clearActiveClasses();
            this.ApplyParameters();
        });
    }
    addEventListenerOrResetLocalStorage(app) {
        const domResetSettings = document.querySelector(".settings-reset");
        domResetSettings.addEventListener("click", () => {
            domResetSettings.classList.add("reset-pressed");
            setTimeout(() => {
                domResetSettings.classList.remove("reset-pressed");
            }, definitions_1.ANIMATION_TIME_500);
            localStorage.clear();
            this.isMusicOn = false;
            this.initializeFilters();
            this.initializeSortingMethod();
            this.clearActiveClasses();
            app.decorationParameters = new DecorationParameters_1.default();
            definitions_1.CHOSEN_TOYS.length = 0;
            this.ApplyParameters();
            const chosenSpan = document.querySelector(".chosen-span");
            chosenSpan.textContent = String(definitions_1.CHOSEN_TOYS.length);
        });
    }
    clearActiveClasses() {
        const domfilterSettings = document.querySelector(".filter-settings");
        const domFiltersShape = domfilterSettings.querySelectorAll(".button-shape");
        domFiltersShape.forEach((elem) => {
            const domCurrentFilter = elem;
            domCurrentFilter.classList.remove("filters-active-button");
        });
        const domFiltersColor = domfilterSettings.querySelectorAll(".button-color");
        domFiltersColor.forEach((elem) => {
            const domCurrentFilter = elem;
            domCurrentFilter.classList.remove("filters-color-active-button");
            const domSpan = domCurrentFilter.querySelector(".span");
            domSpan.classList.remove("span-color");
        });
        const domFiltersSize = domfilterSettings.querySelectorAll(".button-size");
        domFiltersSize.forEach((elem) => {
            const domCurrentFilter = elem;
            domCurrentFilter.classList.remove("filters-active-button");
        });
        const domFilterFavorite = document.querySelector(".label-favorite");
        const domInputFavorite = document.querySelector(".input-favorite");
        domFilterFavorite.style.content = "";
        domInputFavorite.checked = false;
        (0, slider_1.setSliderValues)("range-slider-amount", "min-amount-mark", "max-amount-mark", definitions_1.AMOUNT_MIN, definitions_1.AMOUNT_MAX);
        (0, slider_1.setSliderValues)("range-slider-year", "min-year-mark", "max-year-mark", definitions_1.YEAR_MIN, definitions_1.YEAR_MAX);
    }
    manageMessageNoByFilters(param) {
        const messageNoByFilters = document.querySelector(".no-by-filters");
        param === "show"
            ? messageNoByFilters.classList.remove("hidden")
            : messageNoByFilters.classList.add("hidden");
    }
    getDataFromLocalStorage() {
        this.localStorageFilters.getItemsFromLocalStorage();
        this.filters = this.localStorageFilters.filters;
        this.sortingMethod = this.localStorageFilters.sortingMethod;
        this.isMusicOn = this.localStorageFilters.isMusicOn;
        this.showFilters();
    }
    showFilters() {
        this.showShapeFilters();
        this.showColorFilters();
        this.showSizeFilters();
        this.showFavoriteFilter();
        this.setRangeSliders();
        this.showSortingMethod();
        this.showMusicSvg();
    }
    showShapeFilters() {
        const domShapeFilterButtons = document.querySelectorAll(".button-shape");
        domShapeFilterButtons.forEach((element) => {
            var _a;
            const domButton = element;
            const instanceEShape = (_a = Object.entries(definitions_1.eShapes).find(([key, val]) => val === domButton.getAttribute("data-filter"))) === null || _a === void 0 ? void 0 : _a[0];
            if (this.filters.filterShape.includes(definitions_1.eShapes[instanceEShape])) {
                domButton.classList.toggle("filters-active-button");
            }
        });
    }
    showColorFilters() {
        const domColorFilterButtons = document.querySelectorAll(".button-color");
        domColorFilterButtons.forEach((element) => {
            var _a;
            const domButton = element;
            const domSpan = domButton.querySelector(".span");
            const instanceEColor = (_a = Object.entries(definitions_1.eColors).find(([key, val]) => val === domButton.getAttribute("data-filter"))) === null || _a === void 0 ? void 0 : _a[0];
            if (this.filters.filterColor.includes(definitions_1.eColors[instanceEColor])) {
                domButton.classList.toggle("filters-color-active-button");
                domSpan.classList.toggle("span-color");
            }
        });
    }
    showSizeFilters() {
        const domSizeFilterButtons = document.querySelectorAll(".button-size");
        domSizeFilterButtons.forEach((element) => {
            var _a;
            const domButton = element;
            const instanceESize = (_a = Object.entries(definitions_1.eSizes).find(([key, val]) => val === domButton.getAttribute("data-filter"))) === null || _a === void 0 ? void 0 : _a[0];
            if (this.filters.filterSize.includes(definitions_1.eSizes[instanceESize])) {
                domButton.classList.toggle("filters-active-button");
            }
        });
    }
    showFavoriteFilter() {
        if (this.filters.filterFavorite) {
            const domInputFavorite = document.querySelector(".input-favorite");
            domInputFavorite.checked = true;
        }
    }
    showSortingMethod() {
        var _a;
        const domSortingMethod = document.querySelector(".sorting");
        const instanceSortingMethod = (_a = Object.entries(definitions_1.eSortingMethod).find(([key, val]) => val === this.sortingMethod)) === null || _a === void 0 ? void 0 : _a[0];
        domSortingMethod.value = instanceSortingMethod;
    }
    showMusicSvg() {
        const buttonAudio = document.querySelector(".button-sound");
        if (this.isMusicOn) {
            buttonAudio.classList.add("sound-on");
        }
    }
    setRangeSliders() {
        (0, slider_1.setSliderValues)("range-slider-amount", "min-amount-mark", "max-amount-mark", this.filters.filterAmount.min, this.filters.filterAmount.max);
        (0, slider_1.setSliderValues)("range-slider-year", "min-year-mark", "max-year-mark", this.filters.filterYear.min, this.filters.filterYear.max);
    }
    initializeAudio() {
        this.audio.src = definitions_1.MUSIC_PATH;
        this.audio.loop = true;
    }
    manageMusic() {
        const buttonAudio = document.querySelector(".button-sound");
        if (this.isMusicOn) {
            this.audio.play();
            buttonAudio.classList.add("sound-on");
        }
        else {
            this.audio.pause();
            buttonAudio.classList.remove("sound-on");
        }
    }
}
exports["default"] = Parameters;


/***/ }),

/***/ 524:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const definitions_1 = __webpack_require__(125);
class Popup {
    constructor(message, coordX, coordY) {
        this.message = message;
        this.coordX = coordX;
        this.coordY = coordY;
    }
    showPopupWindow() {
        const domBlurPopup = document.querySelector(".blur-popup");
        const domPopup = domBlurPopup.querySelector(".popup");
        const domPopupText = domPopup.querySelector(".popup-text");
        domPopup.style.top = `${this.coordY}px`;
        domPopup.style.left = `${this.coordX}px`;
        domPopupText.textContent = this.message;
        domBlurPopup.classList.remove("hidden");
        setTimeout(() => {
            domPopup.classList.add("popup-opacity");
            setTimeout(() => {
                domPopup.classList.remove("popup-opacity");
                domBlurPopup.classList.add("hidden");
            }, definitions_1.ANIMATION_TIME_500);
        }, definitions_1.ANIMATION_TIME_500);
    }
}
exports["default"] = Popup;


/***/ }),

/***/ 880:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const definitions_1 = __webpack_require__(125);
const LocalStorageTree_1 = __importDefault(__webpack_require__(812));
const lights_1 = __importDefault(__webpack_require__(558));
class Tree {
    constructor() {
        this.ornaments = [];
        this.treePattern = 0;
        this.background = 0;
        this.lights = new lights_1.default(-1);
        this.localStorageTree = new LocalStorageTree_1.default();
        this.isLightsOn = false;
    }
    setBackground(pattern) {
        if (pattern !== null) {
            const parent = pattern.closest(".decoration-card");
            const domNumCard = parent.querySelector(".decoration-card-num");
            this.background = Number(domNumCard.textContent);
            this.applyBackground();
        }
    }
    setTreePattern(pattern) {
        if (pattern !== null) {
            const parent = pattern.closest(".decoration-card");
            const domNumCard = parent.querySelector(".decoration-card-num");
            this.treePattern = Number(domNumCard.textContent);
            this.applyTreePattern();
        }
    }
    applyParameters() {
        this.localStorageTree.setSettingsForSaving(this);
        this.applyBackground();
        this.applyTreePattern();
        this.applyOrnaments();
    }
    applyBackground() {
        const domTreeBackground = document.querySelector(".tree-background-image");
        domTreeBackground.style.backgroundImage = `url(${definitions_1.PATH_TO_BACKGROUNDS}${this.background}.jpg)`;
    }
    applyTreePattern() {
        const domTreeBackgroundImage = document.querySelector(".tree-container");
        const domTreeImage = domTreeBackgroundImage.querySelector(".tree-pattern");
        domTreeImage.src = `${definitions_1.PATH_TO_TREES}${this.treePattern}.png`;
    }
    applyOrnaments() {
        const domTreeWrapper = document.querySelector(".tree-container");
        const ornamentsArray = domTreeWrapper.querySelectorAll(".toy-card-image");
        ornamentsArray.forEach((elem) => {
            elem.remove();
        });
        this.ornaments.forEach((elem) => {
            const domDecorationCardPattern = this.findOrnamentByNum(elem.num);
            if (domDecorationCardPattern !== null) {
                const domCardImg = domDecorationCardPattern.querySelector(".decoration-card-image");
                this.cloneOrnament(domCardImg, elem.coordX, elem.coordY);
            }
        });
        this.gatherOrnamentsOnTree();
        this.localStorageTree.setSettingsForSaving(this);
    }
    cloneOrnament(domElement, coordX, coordY) {
        const domCloneOrnament = domElement.cloneNode(true);
        domCloneOrnament.src = `${definitions_1.PATH_TO_TOYS}${String(domCloneOrnament.getAttribute("data-num"))}.png`;
        const computedStyle = getComputedStyle(domElement);
        domCloneOrnament.style.width =
            computedStyle.width === "0px" ? "62px" : computedStyle.width;
        domCloneOrnament.style.height =
            computedStyle.height === "0px" ? "62px" : computedStyle.height;
        this.addOrnament(domCloneOrnament, coordX, coordY);
        domCloneOrnament.style.position = "absolute";
        domCloneOrnament.style.zIndex = "10";
        domCloneOrnament.classList.remove("hidden");
    }
    addOrnament(ornament, coordX, coordY) {
        const domTreeBackgroundImage = document.querySelector(".tree-container");
        domTreeBackgroundImage.append(ornament);
        ornament.style.left = `${coordX}px`;
        ornament.style.top = `${coordY}px`;
        this.changeTreeState(ornament, "add");
    }
    changeTreeState(ornamentPattern, action) {
        const num = ornamentPattern.getAttribute("data-num") || "0";
        const domCard = this.findOrnamentByNum(num);
        if (domCard !== null) {
            const domCardImg = domCard.querySelector(".decoration-card-image");
            const domCardCountWrapper = domCard.querySelector(".decoration-card-count-wrapper");
            const domCardCount = domCardCountWrapper.querySelector(".decoration-card-count");
            const currentNum = Number(domCardCount.textContent);
            if (action === "add") {
                domCardCount.textContent = String(currentNum - 1);
                if (currentNum === 1) {
                    domCardImg.classList.add("hidden");
                    domCardCountWrapper.classList.add("hidden");
                }
            }
            else if (action === "remove") {
                domCardCount.textContent = String(currentNum + 1);
                if (currentNum === 0) {
                    domCardImg.classList.remove("hidden");
                    domCardCountWrapper.classList.remove("hidden");
                    domCardCount.textContent = "1";
                }
            }
        }
    }
    findOrnamentByNum(num) {
        const domOrnamentsWrapper = document.querySelector(".ornaments-wrapper");
        const cardArray = domOrnamentsWrapper.querySelectorAll(".decoration-card");
        let domCard = cardArray[0];
        for (let i = 0; i < cardArray.length; i++) {
            if (cardArray[i].hasAttribute("data-num")) {
                if (cardArray[i].getAttribute("data-num") === num) {
                    domCard = cardArray[i];
                    return domCard;
                }
            }
        }
        return null;
    }
    gatherOrnamentsOnTree() {
        const domTreeWrapper = document.querySelector(".tree-container");
        const ornamentsArray = domTreeWrapper.querySelectorAll(".toy-card-image");
        const coordTree = domTreeWrapper.getBoundingClientRect();
        this.ornaments = [];
        ornamentsArray.forEach((elem) => {
            const coord = elem.getBoundingClientRect();
            const num = elem.getAttribute("data-num") || "0";
            this.ornaments.push({
                num: num,
                coordX: coord.left - coordTree.x,
                coordY: coord.top - coordTree.y,
            });
        });
    }
    getDataFromLocalStorage() {
        this.localStorageTree.getItemsFromLocalStorage();
        this.background =
            this.localStorageTree.background > 0
                ? this.localStorageTree.background
                : 1;
        this.ornaments = this.localStorageTree.ornaments;
        this.treePattern =
            this.localStorageTree.tree > 0 ? this.localStorageTree.tree : 1;
        this.lights =
            this.localStorageTree.lights > 0
                ? new lights_1.default(this.localStorageTree.lights)
                : new lights_1.default(-1);
        this.isLightsOn = this.localStorageTree.isLightsOn;
        this.applyParameters();
    }
}
exports["default"] = Tree;


/***/ }),

/***/ 125:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.eSortingMethod = exports.eSizes = exports.eColors = exports.eShapes = exports.USUAL_TREE_COORD = exports.LONG_TREE_COORD = exports.IS_SLIDER = exports.AMOUNT_OF_BACKGROUNDS = exports.AMOUNT_OF_TREES = exports.AMOUNT_OF_CARDS = exports.MUSIC_PATH = exports.YEAR_STEP = exports.YEAR_MAX = exports.YEAR_MIN = exports.AMOUNT_STEP = exports.AMOUNT_MAX = exports.AMOUNT_MIN = exports.CHOSEN_AMOUNT = exports.ANIMATION_TIME_200 = exports.ANIMATION_TIME_500 = exports.CHOSEN_TOYS = exports.PATH_TO_BACKGROUNDS = exports.PATH_TO_TREES = exports.PATH_TO_TOYS = void 0;
exports.PATH_TO_TOYS = "./assets/toys/";
exports.PATH_TO_TREES = "./assets/tree/";
exports.PATH_TO_BACKGROUNDS = "./assets/bg/";
exports.CHOSEN_TOYS = [];
exports.ANIMATION_TIME_500 = 500;
exports.ANIMATION_TIME_200 = 200;
exports.CHOSEN_AMOUNT = 20;
exports.AMOUNT_MIN = 1;
exports.AMOUNT_MAX = 12;
exports.AMOUNT_STEP = 1;
exports.YEAR_MIN = 1940;
exports.YEAR_MAX = 2020;
exports.YEAR_STEP = 10;
exports.MUSIC_PATH = "./assets/audio/JingleBells.mp3";
exports.AMOUNT_OF_CARDS = 60;
exports.AMOUNT_OF_TREES = 6;
exports.AMOUNT_OF_BACKGROUNDS = 10;
exports.IS_SLIDER = [false];
exports.LONG_TREE_COORD = "231,663,134,662,84,635,18,603,22,569,47,532,58,495,66,459,84,438,108,414,106,385,116,360,119,326,135,294,147,256,159,223,168,205,179,179,178,150,186,125,197,116,201,96,211,72,219,43,253,12,265,36,277,52,297,72,314,102,317,130,323,151,323,174,323,188,347,203,344,235,359,226,370,249,366,292,380,289,382,323,395,350,399,373,419,409,409,443,439,450,440,471,446,484,451,499,452,522,472,525,468,550,441,568,488,581,483,605,430,623,460,647,426,663,359,671,284,667";
exports.USUAL_TREE_COORD = "174,687,152,671,83,669,33,639,21,600,32,565,46,549,48,525,68,491,66,453,86,422,104,386,109,369,110,349,126,313,142,276,154,240,157,210,173,182,181,149,192,118,205,98,212,72,226,38,240,6,254,38,269,50,283,70,297,101,317,127,332,167,349,198,344,233,361,253,371,281,391,310,373,330,402,346,416,363,415,390,432,408,424,428,447,452,449,481,451,507,465,528,472,546,484,568,486,596,456,611,466,633,470,655,429,671,348,675,312,690,232,680";
var eShapes;
(function (eShapes) {
    eShapes["BALL"] = "\u0448\u0430\u0440";
    eShapes["BELL"] = "\u043A\u043E\u043B\u043E\u043A\u043E\u043B\u044C\u0447\u0438\u043A";
    eShapes["CONE"] = "\u0448\u0438\u0448\u043A\u0430";
    eShapes["SNOWFLAKE"] = "\u0441\u043D\u0435\u0436\u0438\u043D\u043A\u0430";
    eShapes["TOY"] = "\u0444\u0438\u0433\u0443\u0440\u043A\u0430";
})(eShapes = exports.eShapes || (exports.eShapes = {}));
var eColors;
(function (eColors) {
    eColors["WHITE"] = "\u0431\u0435\u043B\u044B\u0439";
    eColors["YELLOW"] = "\u0436\u0435\u043B\u0442\u044B\u0439";
    eColors["RED"] = "\u043A\u0440\u0430\u0441\u043D\u044B\u0439";
    eColors["BLUE"] = "\u0441\u0438\u043D\u0438\u0439";
    eColors["GREEN"] = "\u0437\u0435\u043B\u0451\u043D\u044B\u0439";
})(eColors = exports.eColors || (exports.eColors = {}));
var eSizes;
(function (eSizes) {
    eSizes["BIG"] = "\u0431\u043E\u043B\u044C\u0448\u043E\u0439";
    eSizes["MEDIUM"] = "\u0441\u0440\u0435\u0434\u043D\u0438\u0439";
    eSizes["SMALL"] = "\u043C\u0430\u043B\u044B\u0439";
})(eSizes = exports.eSizes || (exports.eSizes = {}));
var eSortingMethod;
(function (eSortingMethod) {
    eSortingMethod["NAME_AZ"] = "\u041F\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044E (\u0430-\u044F)";
    eSortingMethod["NAME_ZA"] = "\u041F\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044E (\u044F-\u0430)";
    eSortingMethod["AMOUNT_MIN_MAX"] = "\u041F\u043E \u0433\u043E\u0434\u0443 (\u0432\u043E\u0437\u0440\u0430\u0441\u0442\u0430\u043D\u0438\u044E)";
    eSortingMethod["AMOUNT_MAX_MIN"] = "\u041F\u043E \u0433\u043E\u0434\u0443 (\u0443\u0431\u044B\u0432\u0430\u043D\u0438\u044E)";
})(eSortingMethod = exports.eSortingMethod || (exports.eSortingMethod = {}));


/***/ }),

/***/ 558:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class Lights {
    constructor(id) {
        this.id = id;
    }
    createLights(id, isLightsOn) {
        let color = "white";
        switch (id) {
            case 0: {
                color = "white";
                break;
            }
            case 1: {
                color = "yellow";
                break;
            }
            case 2: {
                color = "red";
                break;
            }
            case 3: {
                color = "green";
                break;
            }
            case 4: {
                color = "blue";
                break;
            }
            case 5: {
                color = "mltclr";
                break;
            }
        }
        const lightsContainer = document.querySelector(".lights");
        lightsContainer.innerHTML = "";
        lightsContainer.classList.remove("hidden");
        if (isLightsOn) {
            for (let i = 0; i < 8; i++) {
                const lightsLevel = document.createElement("div");
                lightsLevel.classList.add("lights-level");
                for (let j = 0; j < i * 2 + 5; j++) {
                    const li = document.createElement("li");
                    li.classList.add("bulb");
                    li.classList.add(`bulb-${color}`);
                    const translate = (1 - i / 10) * Math.pow(j, 2);
                    li.style.transform = `translateY(${-translate}px)`;
                    lightsLevel.appendChild(li);
                }
                lightsContainer.append(lightsLevel);
            }
        }
    }
}
exports["default"] = Lights;


/***/ }),

/***/ 116:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createYearRangeFilter = exports.createAmountRangeFilter = void 0;
const definitions_1 = __webpack_require__(125);
const slider_1 = __webpack_require__(881);
function createAmountRangeFilter(filters) {
    const rangeSlider = document.getElementById("range-slider-amount");
    const lowMark = document.querySelector(".min-amount-mark");
    const highMark = document.querySelector(".max-amount-mark");
    if (rangeSlider) {
        (0, slider_1.initializeSlider)("range-slider-amount", lowMark, highMark, definitions_1.AMOUNT_MIN, definitions_1.AMOUNT_MAX, definitions_1.AMOUNT_STEP);
    }
}
exports.createAmountRangeFilter = createAmountRangeFilter;
function createYearRangeFilter(filters) {
    const rangeSlider = document.getElementById("range-slider-year");
    const lowMark = document.querySelector(".min-year-mark");
    const highMark = document.querySelector(".max-year-mark");
    if (rangeSlider) {
        (0, slider_1.initializeSlider)("range-slider-year", lowMark, highMark, definitions_1.YEAR_MIN, definitions_1.YEAR_MAX, definitions_1.YEAR_STEP);
    }
}
exports.createYearRangeFilter = createYearRangeFilter;


/***/ }),

/***/ 881:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setSliderValues = exports.initializeSlider = void 0;
const nouislider_1 = __importDefault(__webpack_require__(344));
__webpack_require__(904);
__webpack_require__(819);
function initializeSlider(rangeSliderId, lowMark, highMark, lowValue, highValue, step) {
    const rangeSlider = document.getElementById(rangeSliderId);
    if (rangeSlider) {
        nouislider_1.default.create(rangeSlider, {
            start: [lowValue, highValue],
            connect: true,
            step: step,
            range: {
                min: [lowValue],
                max: [highValue],
            },
        });
        lowMark.textContent = String(lowValue);
        highMark.textContent = String(highValue);
        const marks = [lowMark, highMark];
        if (rangeSlider.noUiSlider) {
            rangeSlider.noUiSlider.on("update", function (values, handle) {
                const value = Math.round(Number(values[handle]));
                marks[handle].textContent = String(value);
            });
        }
    }
}
exports.initializeSlider = initializeSlider;
function setSliderValues(rangeSliderId, minMark, maxMark, min, max) {
    const rangeSlider = document.getElementById(rangeSliderId);
    const lowMark = document.querySelector(`.${minMark}`);
    const highMark = document.querySelector(`.${maxMark}`);
    if (rangeSlider.noUiSlider) {
        rangeSlider.noUiSlider.set([min, max]);
        lowMark.textContent = String(Math.round(min));
        highMark.textContent = String(Math.round(max));
    }
}
exports.setSliderValues = setSliderValues;


/***/ }),

/***/ 900:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function runSnowflake() {
    const snow_flake = document.createElement("span");
    snow_flake.textContent = "❆";
    snow_flake.classList.add("fa-snowflake");
    snow_flake.style.left = Math.random() * window.innerWidth + "px";
    snow_flake.style.animationDuration = Math.random() * 3 + 2 + "s";
    snow_flake.style.opacity = String(Math.random());
    snow_flake.style.fontSize = Math.random() * 10 + 10 + "px";
    document.body.appendChild(snow_flake);
    setTimeout(() => {
        snow_flake.remove();
    }, 5000);
}
exports["default"] = runSnowflake;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(303);
/******/ 	
/******/ })()
;