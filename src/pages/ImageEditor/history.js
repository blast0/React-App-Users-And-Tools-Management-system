import * as fabric from "fabric";

class CanvasHistory {
  constructor(canvas) {
    this.canvas = canvas;
    this.history = [];
    this.historyRedo = [];
    this._isClearingCanvas = false; // Flag to avoid tracking during canvas clearing

    this._init();
  }

  _init() {
    this.canvas.on("object:added", () => this._historySaveAction());
    this.canvas.on("object:modified", () => this._historySaveAction());
    this.canvas.on("object:removed", () => {
      if (!this._isClearingCanvas) {
        this._historySaveAction();
      }
    });
  }

  _historySaveAction() {
    const jsonCanvas = structuredClone(this.canvas.toObject().objects);
    if (!this.historyProcessing) {
      this.history.push(jsonCanvas);
    }
  }

  _clearCanvas() {
    this._isClearingCanvas = true;
    this.canvas.remove(...this.canvas.getObjects());
    this._isClearingCanvas = false;
  }

  async undo() {
    if (this.history.length === 0) {
      this.canvas.remove(...this.canvas.getObjects());
      return;
    } // Prevent undoing beyond the initial state
    this.historyProcessing = true;
    const lastState = this.history[this.history.length - 1];
    if (lastState) {
      const currState = this.history.pop();
      this.historyRedo.push(currState);
      const objects = await fabric.util.enlivenObjects(lastState);
      this._loadHistory(objects);
    } else {
      this.historyProcessing = false;
    }
  }

  async redo() {
    if (!this.historyRedo.length) {
      return;
    }
    this.historyProcessing = true;
    const history = this.historyRedo.pop();
    if (history) {
      // Every redo action is actually a new action to the undo history
      this.history.push(history);
      this.historyNextState = history;
      const objects = await fabric.util.enlivenObjects(history);
      this._loadHistory(objects);
    } else {
      this.historyProcessing = false;
    }
  }

  _loadHistory(objects) {
    this.canvas.off("custom:added");
    this.canvas.off("object:modified");
    this.canvas.off("object:removed");
    this.canvas.remove(...this.canvas.getObjects());
    objects.forEach((obj) => {
      this.canvas.add(obj);
    });

    // Re-enable event listeners
    this.canvas.on("custom:added", () => this._historySaveAction());
    this.canvas.on("object:modified", () => this._historySaveAction());
    this.canvas.on("object:removed", () => {
      if (!this._isClearingCanvas) {
        this._historySaveAction();
      }
    });
    this.historyProcessing = false;
    this.canvas.renderAll();
  }
}

export default CanvasHistory;
