

export class SpiralWalkCoordGen {

    static _startX;
    static _startY;
    static _boardWidth = 11;
    static _boardHeight = 11;
    static _maxCircles = null;
    static _hitOneBorder = false;
    static _hitAllBorders = true;
    static _includeCoordsOutsideBorders = false;

    static set StartCoord({
        x = 0,
        y = 0,
    } = {}) {
        this._startX = x;
        this._startY = y;
    }

    static set StopCondition({
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

        let circle = 0;  

        do {
            circle++;
            const lineLength = circle * 2;
            let linePointX = this._startX - circle;
            let linePointY = this._startY - circle;

            for (let hTop = 0; hTop < lineLength; hTop++, linePointX++) {
                yield { x: linePointX + 1, y: linePointY };
            }

            for (let vRight = 0; vRight < lineLength; vRight++, linePointY++) {
                yield { x: linePointX, y: linePointY + 1}  ;
            }

            for (let hBottom = 0; hBottom < lineLength; hBottom++, linePointX--) {
                yield { x: linePointX - 1, y: linePointY };
            }

            for (let vLeft = 0; vLeft < lineLength; vLeft++, linePointY--) {
                yield { x: linePointX, y: linePointY - 1 };
            }

        } while (circle < 3) 
            
    }

}