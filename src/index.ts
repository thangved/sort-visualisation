import ArrayUI from "./ArrayUI";

declare global {
    interface Window {
        ArrayUI: any
    }
}

window.ArrayUI = ArrayUI