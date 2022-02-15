"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var Position_1 = require("./Position");
var ArrayUI = /** @class */ (function () {
    function ArrayUI(context, options) {
        this.elements = [];
        this.length = 0;
        this.context = context;
        this.swapping = null;
        this.options = options;
        options.speed = options.speed || 60;
        options.width = options.width || 50;
        this.index1 = -1;
        this.index2 = -1;
        this.indexMin = -1;
        this.render();
    }
    ArrayUI.prototype.addElement = function (key) {
        var position = new Position_1["default"](this.length * this.options.width, 0);
        this.elements.push({
            key: key,
            position: position
        });
        this.length = this.elements.length;
    };
    ArrayUI.prototype.removeElementByKey = function (key) {
        this.elements = this.elements.filter(function (element) { return element.key !== key; });
        this.length = this.elements.length;
    };
    ArrayUI.prototype.removeAllElements = function () {
        this.elements = [];
        this.length = 0;
    };
    ArrayUI.prototype.removeElementByIndex = function (index) {
        this.elements = this.elements.filter(function (_, i) { return i !== index; });
        this.length = this.elements.length;
    };
    ArrayUI.prototype.resetPosition = function () {
        var _this = this;
        this.elements = this.elements.map(function (element, index) { return (__assign(__assign({}, element), { position: new Position_1["default"](index * _this.options.width, 0) })); });
    };
    ArrayUI.prototype.random = function (elements) {
        this.removeAllElements();
        for (; elements >= 0; elements--)
            this.addElement(Math.floor(Math.random() * 100));
    };
    ArrayUI.prototype.getMaxAllElements = function () {
        if (!this.length)
            return 0;
        return this.elements.reduce(function (prev, current) {
            if (prev > current.key)
                return prev;
            return current.key;
        }, this.elements[0].key);
    };
    ArrayUI.prototype.swap = function (from, to) {
        if (this.swapping)
            return;
        if (from < 0 || from >= this.length)
            return;
        if (to < 0 || to >= this.length)
            return;
        this.swapping = { from: from, to: to };
    };
    // ___UIS___METHODS___
    // Draws Methods
    ArrayUI.prototype.draws = function () {
        this.clearContext();
        this.drawElements();
        this.drawActives();
    };
    ArrayUI.prototype.drawElements = function () {
        var _this = this;
        this.elements.forEach(function (element) { return _this.drawElement(element); });
    };
    ArrayUI.prototype.drawElement = function (element) {
        this.context.fillStyle = '#6dbaff';
        this.drawBaseElement(element);
        this.context.fillStyle = '#000';
        this.context.font = '10px Arial';
        this.context.textAlign = 'center';
        this.context.fillText(element.key.toString(), element.position.x + this.options.width / 2 + this.options.dx, element.position.y + 30 + this.options.dy + this.getMaxAllElements() * 5, 50);
    };
    ArrayUI.prototype.drawActives = function () {
        this.drawActive1();
        this.drawActive2();
        this.drawMax();
    };
    ArrayUI.prototype.drawMax = function () {
        var element = this.elements[this.indexMin];
        if (!element)
            return;
        this.context.fillStyle = '#ffd041';
        this.drawBaseElement(element);
    };
    ArrayUI.prototype.drawActive1 = function () {
        var element = this.elements[this.index2];
        if (!element)
            return;
        this.context.fillStyle = '#295293';
        this.drawBaseElement(element);
    };
    ArrayUI.prototype.drawActive2 = function () {
        var element = this.elements[this.index1];
        if (!element)
            return;
        this.context.fillStyle = '#ff3d3d';
        this.drawBaseElement(element);
    };
    ArrayUI.prototype.drawBaseElement = function (element) {
        this.context.beginPath();
        this.context.strokeStyle = 'blue';
        this.context.rect(element.position.x + this.options.dx, element.position.y + this.options.dy - (element.key - this.getMaxAllElements()) * 5, this.options.width, element.key * 5);
        this.context.stroke();
        this.context.fill();
    };
    ArrayUI.prototype.clearContext = function () {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    };
    // Update methods
    ArrayUI.prototype.update = function () {
        this.updateElements();
    };
    ArrayUI.prototype.updateElements = function () {
        this.updateSwap();
    };
    ArrayUI.prototype.updateSwap = function () {
        if (!this.swapping)
            return;
        var min = Math.min(this.swapping.from, this.swapping.to);
        var max = Math.max(this.swapping.from, this.swapping.to);
        if (this.elements[min].position.x >= max * this.options.width &&
            this.elements[min].position.y === 0) {
            this.swapping = null;
            var temp = this.elements[min];
            this.elements[min] = this.elements[max];
            this.elements[max] = temp;
            this.indexMin = -1;
            return;
        }
        if (this.elements[min].position.x >= max * this.options.width) {
            this.elements[min].position.y += 5;
            this.elements[max].position.y -= 5;
            return;
        }
        if (this.elements[min].position.y <= -50) {
            this.elements[min].position.x += 5;
            this.elements[max].position.x -= 5;
            return;
        }
        this.elements[min].position.y -= 5;
        this.elements[max].position.y += 5;
    };
    // Sorting
    ArrayUI.prototype.bubbleSort = function () {
        if (this.index1 !== -1 && this.index2 !== -1)
            return;
        this.index1 = this.length - 1;
        this.index2 = 0;
        this.__bubbleSort();
    };
    ArrayUI.prototype.selectionSort = function () {
        if (this.index1 !== -1 && this.index2 !== -1)
            return;
        this.index1 = 0;
        this.index2 = 0;
        this.indexMin = this.index1;
        this.__selectionSort();
    };
    ArrayUI.prototype.insertionSort = function () {
        if (this.index1 !== -1 && this.index2 !== -1)
            return;
        this.index1 = 0;
        this.index2 = 1;
        this.__insertionSort();
    };
    // __Sorting
    ArrayUI.prototype.__bubbleSort = function () {
        var _this = this;
        var _a, _b;
        if (this.index1 === 0 && this.index2 === this.length - 1) {
            this.index1 = -1;
            this.index2 = -1;
            this.indexMin = -1;
            return;
        }
        if (this.swapping)
            return setTimeout(function () { return _this.__bubbleSort(); }, 20000 / this.options.speed);
        if (this.index2 !== -1)
            if (((_a = this.elements[this.index2]) === null || _a === void 0 ? void 0 : _a.key) > ((_b = this.elements[this.index2 + 1]) === null || _b === void 0 ? void 0 : _b.key)) {
                this.swap(this.index2, this.index2 + 1);
                this.indexMin = this.index2 + 1;
            }
        if (this.swapping)
            return setTimeout(function () { return _this.__bubbleSort(); }, 20000 / this.options.speed);
        if (this.index2 === this.index1 - 1) {
            this.index1--;
            this.index2 = -1;
        }
        if (this.index2 < this.index1 - 1) {
            this.index2++;
        }
        setTimeout(function () { return _this.__bubbleSort(); }, 20000 / this.options.speed);
    };
    ArrayUI.prototype.__selectionSort = function () {
        var _this = this;
        if (this.index1 === this.length - 1 && this.index2 === this.length - 1) {
            this.index1 = -1;
            this.index2 = -1;
            this.indexMin = -1;
            return;
        }
        if (this.swapping)
            return setTimeout(function () { return _this.__selectionSort(); }, 20000 / this.options.speed);
        if (this.index2 === this.length - 1 && this.indexMin === -1) {
            this.index1++;
            this.index2 = this.index1;
            this.indexMin = this.index1;
        }
        if (this.index2 === this.length - 1 && this.indexMin !== -1 && !this.swapping) {
            this.swap(this.indexMin, this.index1);
            return setTimeout(function () { return _this.__selectionSort(); }, 20000 / this.options.speed);
        }
        if (this.swapping)
            return setTimeout(function () { return _this.__selectionSort(); }, 20000 / this.options.speed);
        if (this.index2 !== this.length - 1)
            this.index2++;
        if (this.indexMin !== -1)
            if (this.elements[this.index2].key <
                this.elements[this.indexMin].key)
                this.indexMin = this.index2;
        setTimeout(function () { return _this.__selectionSort(); }, 20000 / this.options.speed);
    };
    ArrayUI.prototype.__insertionSort = function () {
        var _this = this;
        var _a, _b, _c, _d;
        if (this.index1 === this.length) {
            this.index1 = -1;
            this.index2 = -1;
            this.indexMin = -1;
            return;
        }
        if (this.index2 === 0) {
            this.index1++;
            this.index2 = this.index1;
        }
        if (((_a = this.elements[this.index2]) === null || _a === void 0 ? void 0 : _a.key) < ((_b = this.elements[this.index2 - 1]) === null || _b === void 0 ? void 0 : _b.key)) {
            this.indexMin = this.index2 - 1;
            this.swap(this.index2, this.index2 - 1);
        }
        if (this.swapping)
            return setTimeout(function () { return _this.__insertionSort(); }, 20000 / this.options.speed);
        this.index2--;
        if (((_c = this.elements[this.index2]) === null || _c === void 0 ? void 0 : _c.key) >= ((_d = this.elements[this.index2 - 1]) === null || _d === void 0 ? void 0 : _d.key)) {
            this.index1++;
            this.index2 = this.index1;
        }
        setTimeout(function () { return _this.__insertionSort(); }, 20000 / this.options.speed);
    };
    ArrayUI.prototype.render = function () {
        var _this = this;
        this.update();
        this.draws();
        setTimeout(function () { return _this.render(); }, 1000 / this.options.speed);
    };
    return ArrayUI;
}());
exports["default"] = ArrayUI;
