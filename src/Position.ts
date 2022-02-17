export default class Position {
	public x: number;
	public y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	equals(x: number, y: number) {
		return this.x === x && this.y === y;
	}
}
