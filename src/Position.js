"use strict";
exports.__esModule = true;
var Position = /** @class */ (function () {
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }
    Position.prototype.equals = function (x, y) {
        return this.x === x && this.y === y;
    };
    return Position;
}());
exports["default"] = Position;
