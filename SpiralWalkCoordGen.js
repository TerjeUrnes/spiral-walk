

export class SpiralWalkCoordGen {

    static _instance = null;

    static get Instance() {
        if (this._instance == null) {
            this._instance = new SpiralWalkCoordGen();
        }
        return this._instance;
    }

    _startX = 0;
    _startY = 0;
    _isIncludingStartCoor = true;
    _boardWidth = 11;
    _boardHeight = 11;
    _maxCircles = null;
    _hitOneBorder = false;
    _hitAllBorders = true;
    _includeCoordsOutsideBorders = false;
    _circle;

    static set StartCoord({
        x = null,
        y = null,
        includeInIteration = null
    } = {}) {
        this.Instance.StartCoord = { 
            x: x, 
            y: y,
            includeInIteration: includeInIteration 
        };
    }
    
    set StartCoord({
        x = null,
        y = null,
        includeInIteration = null
    } = {}) {
        if (x != null) { this._startX = x; }
        if (y != null) { this._startY = y; }
        if (includeInIteration != null) { this._isIncludingStartCoor = includeInIteration; }
    }

    static set StopCondition({
        maxCircles = null,
        hitOneBorder = false,
        hitAllBorders = false,
        includeCoordsOutsideBorders = false
    } = {}){
        this.Instance.StopCondition = {
            maxCircles: maxCircles,
            hitOneBorder: hitOneBorder,
            hitAllBorders: hitAllBorders,
            includeCoordsOutsideBorders: includeCoordsOutsideBorders
        };
    }
    
    set StopCondition({
        maxCircles = null,
        hitOneBorder = false,
        hitAllBorders = false,
        includeCoordsOutsideBorders = false
    } = {}){
        this._maxCircles = maxCircles;
        this._hitOneBorder = hitOneBorder;
        this._hitAllBorders = hitAllBorders;
        this._includeCoordsOutsideBorders = includeCoordsOutsideBorders;
    }

        // Line 1 - 12
        //          2 9 9 9 9 9 9
        //          2 8 5 5 5 5 0
        //          2 8 4 1 1 6 0
        //          2 8 4 0 2 6 0
        //          2 8 3 3 2 6 0
        //          2 7 7 7 7 6 0
        //          1 1 1 1 1 1 0

    static *[Symbol.iterator]() {
        yield* this.Instance;
    }
    
    *[Symbol.iterator](){

        this._circle = 0;  

        if (this._isIncludingStartCoor) {
            yield { x: this._startX, y: this._startY };
        }

        while (this.CheckStopCondition() == false) {

            this._circle++;
            const lineLength = this._circle * 2;
            let linePointX = this._startX - this._circle;
            let linePointY = this._startY - this._circle;

            for (let hTop = 0; hTop < lineLength; hTop++, linePointX++) {
                const coord = { x: linePointX + 1, y: linePointY };
                if (this.IncludeCoordinate(coord)) {
                    yield coord;
                }
            }

            for (let vRight = 0; vRight < lineLength; vRight++, linePointY++) {
                const coord = { x: linePointX, y: linePointY + 1 };
                if (this.IncludeCoordinate(coord)) {
                    yield coord;
                }
            }

            for (let hBottom = 0; hBottom < lineLength; hBottom++, linePointX--) {
                const coord = { x: linePointX - 1, y: linePointY };
                if (this.IncludeCoordinate(coord)) {
                    yield coord;
                }
            }

            for (let vLeft = 0; vLeft < lineLength; vLeft++, linePointY--) {
                const coord = { x: linePointX, y: linePointY - 1 };
                if (this.IncludeCoordinate(coord)) {
                    yield coord;
                }
            }
        }      
    }

    IncludeCoordinate({
        x = null,
        y = null
    } = {}) {
        return true;
    }

    CheckStopCondition() {
        if (this._maxCircles !== null && this._maxCircles <= this._circle) {
            return true;
        }
        else {
            return false;
        }

        if (this._hitOneBorder) {
            if (x === 0 || x === this._boardWidth - 1 || y === 0 || y === this._boardHeight - 1) {
                return true;
            }
        }

        if (this._hitAllBorders) {
            if (x < 0 || x >= this._boardWidth || y < 0 || y >= this._boardHeight) {
                return true;
            }
        }

        if (this._includeCoordsOutsideBorders) {
            if (x < 0 || x >= this._boardWidth || y < 0 || y >= this._boardHeight) {
                return false;
            }
        }

        return false;
    }

}