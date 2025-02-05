

export class SpiralWalkCoordGen {

    static _instance = null;

    static get Instance() {
        if (this._instance == null) {
            this._instance = new SpiralWalkCoordGen();
        }
        return this._instance;
    }

    _startCoord = {
        x: 0, 
        y: 0, 
        dx: 0,
        dy: 0,
        includeInIteration: true
    }
    _stopCondition = {
        maxCircles: false, 
        reachedFirstBorder: false, 
        reachedAllBorders: true, 
        reachedIterationCount: 10000
    }
    _filter = {
        useCustomFunc: false,
        customFunc: () => { return true; }    
    }
    _border = {
        x: -10,
        y: -10,
        width: 21,
        height: 21,
        includeCoordsOutside: false,
        leftVerticalX: -10,
        rightVerticalX: 10,
        topHorizontalY: -10,
        bottomHorizontalY: 10
    }
    _walking = {
        direction: "cw"
    }

    _circleCount;
    _coordsCount;
    _spiralBorder = {
        leftX: 0,
        rightX: 0,
        topY: 0,
        bottomY: 0
    }

    static set StartCoord({
        x = null,
        y = null,
        dx = null,
        dy = null,
        includeInIteration = null
    } = {}) {
        this.Instance.StartCoord = { 
            x: x, 
            y: y,
            dx: dx,
            dy: dy,
            includeInIteration: includeInIteration 
        };
    }
    
    set StartCoord({
        x = null,
        y = null,
        dx = null,
        dy = null,
        includeInIteration = null
    } = {}) {
        if (x != null) { this._startCoord.x = x; }
        if (y != null) { this._startCoord.y = y; }
        if (dx != null) { this._startCoord.dx = dx; }
        if (dy != null) { this._startCoord.dy = dy; }
        if (includeInIteration != null) { 
            this._startCoord.includeInIteration = includeInIteration; 
        }
    }

    static set StopCondition({
        maxCircles = null,
        reachedFirstBorder = null,
        reachedAllBorders = null,
        reachedIterationCount = null
    } = {}){
        this.Instance.StopCondition = {
            maxCircles: maxCircles,
            reachedFirstBorder: reachedFirstBorder,
            reachedAllBorders: reachedAllBorders,
            reachedIterationCount: reachedIterationCount
        };
    }
    
    set StopCondition({
        maxCircles = null,
        reachedFirstBorder = null,
        reachedAllBorders = null,
        reachedIterationCount = null
    } = {}){
        if (maxCircles != null) {
            this._stopCondition.maxCircles = maxCircles;
        }
        if (reachedFirstBorder != null) {
            this._stopCondition.reachedFirstBorder = reachedFirstBorder;
        }
        if (reachedAllBorders != null) {
            this._stopCondition.reachedAllBorders = reachedAllBorders;
        }
        if (reachedIterationCount != null) {
            this._stopCondition.reachedIterationCount = reachedIterationCount;
        }
    }

    static set Filter({
        useCustomFunc = null,
        customFunc = null
    } = {}){
        this.Instance.Filter = {
            useCustomFunc: useCustomFunc,
            customFunc: customFunc
        };
    }

    set Filter({
        useCustomFunc = null,
        customFunc = null
    } = {}){
        if (useCustomFunc != null) {
            this._filter.useCustomFunc = useCustomFunc;
        }
        if (customFunc != null) {
            this._filter.customFunc = customFunc;
        }
    }

    static set Border({
        x = null,
        y = null,
        width = null,
        height = null,
        includeCoordsOutside = null,
        leftVerticalX = null,
        rightVerticalX = null,
        topHorizontalY = null,
        bottomHorizontalY = null
    } = {}){
        this.Instance.Border = {
            x: x,
            y: y,
            width: width,
            height: height,
            includeCoordsOutside: includeCoordsOutside,
            leftVerticalX: leftVerticalX,
            rightVerticalX: rightVerticalX,
            topHorizontalY: topHorizontalY,
            bottomHorizontalY: bottomHorizontalY
        };
    }

    set Border({
        x = null,
        y = null,
        width = null,
        height = null,
        includeCoordsOutside = null,
        leftVerticalX = null,
        rightVerticalX = null,
        topHorizontalY = null,
        bottomHorizontalY = null
    } = {}){
        if (x != null) { 
            this._border.x = x; 
            this.SetLeftAndRightBorder();
        }
        if (y != null) { 
            this._border.y = y; 
            this.SetTopAndBottomBorder();
        }
        if (width != null) { 
            this._border.width = width; 
            this.SetLeftAndRightBorder();
        }
        if (height != null) { 
            this._border.height = height; 
            this.SetTopAndBottomBorder();
        }
        if (includeCoordsOutside != null) {
            this._border.includeCoordsOutside = includeCoordsOutside;
        }
        if (leftVerticalX != null) {
            this._border.leftVerticalX = leftVerticalX;
        }
        if (rightVerticalX != null) {
            this._border.rightVerticalX = rightVerticalX;
        }
        if (topHorizontalY != null) {
            this._border.topHorizontalY = topHorizontalY;
        }
        if (bottomHorizontalY != null) {
            this._border.bottomHorizontalY = bottomHorizontalY;
        }
    }

    static set Walking({
        direction = null
    } = {}){
        this.Instance.Walking = {
            direction: direction
        };
    }

    set Walking({
        direction = null
    } = {}){
        if (direction != null) {
            this._walking.direction = direction;
        }
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

        this._circleCount = 0;
        this._coordsCount = 0;
        const directionX = this._walking.direction == "ccw" ? -1 : 1;

        if (this._startCoord.includeInIteration) {
            const coord = { x: this._startCoord.x, y: this._startCoord.y };
            if (this.IncludeCoordinate(coord)) {
                this._coordsCount++;
                yield coord;
            }
        }

        this._spiralBorder.leftX = this._startCoord.x - directionX;
        this._spiralBorder.rightX = this._spiralBorder.leftX;
        this._spiralBorder.topY = this._startCoord.y - 1;
        this._spiralBorder.bottomY = this._spiralBorder.topY;

        while (this.CheckStopCondition() == false) {

            this._circleCount++;
            const lineLength = this._circleCount * 2;
            let linePointX = this._startCoord.x - this._circleCount * directionX;
            let linePointY = this._startCoord.y - this._circleCount;

            for (let hTop = 0; hTop < lineLength; hTop++, linePointX += directionX) {
                const coord = { x: linePointX + directionX, y: linePointY };
                if (this.IncludeCoordinate(coord)) {
                    this._coordsCount++;
                    yield coord;
                }
            }

            for (let vRight = 0; vRight < lineLength; vRight++, linePointY++) {
                const coord = { x: linePointX, y: linePointY + 1 };
                if (this.IncludeCoordinate(coord)) {
                    this._coordsCount++;
                    yield coord;
                }
            }

            if (this._walking.direction == "ccw") {
                this._spiralBorder.leftX = linePointX;
            }
            else {
                this._spiralBorder.rightX = linePointX;
            }
            this._spiralBorder.bottomY = linePointY;

            for (let hBottom = 0; hBottom < lineLength; hBottom++, linePointX -= directionX) {
                const coord = { x: linePointX - directionX, y: linePointY };
                if (this.IncludeCoordinate(coord)) {
                    this._coordsCount++;
                    yield coord;
                }
            }

            for (let vLeft = 0; vLeft < lineLength; vLeft++, linePointY--) {
                const coord = { x: linePointX, y: linePointY - 1 };
                if (this.IncludeCoordinate(coord)) {
                    this._coordsCount++;
                    yield coord;
                }
            }

            if (this._walking.direction == "cw") {
                this._spiralBorder.leftX = linePointX;
            }
            else {
                this._spiralBorder.rightX = linePointX;
            }
            this._spiralBorder.topY = linePointY;
        }
        
        this.IncreaseStartCoordWithDelta();
    }

    IncludeCoordinate({
        x = null,
        y = null
    } = {}) {
        if (this._stopCondition.reachedIterationCount !== false && this._coordsCount >= this._stopCondition.reachedIterationCount) {
            return false;
        }
        if (this._filter.useCustomFunc) {
            return this._filter.customFunc(
                x, y, this._startCoord.x, this._startCoord.y, this._circleCount,
                this._border.leftVerticalX, this._border.rightVerticalX,
                this._border.topHorizontalY, this._border.bottomHorizontalY
            );
        }
        return true;
    }

    CheckStopCondition() {
        if (this._stopCondition.maxCircles !== false && this._circleCount >= this._stopCondition.maxCircles) {
            return true;
        }
        if (this._stopCondition.reachedFirstBorder ) {
            return this._spiralBorder.leftX <= this._border.leftVerticalX || 
            this._spiralBorder.rightX >= this._border.rightVerticalX ||
            this._spiralBorder.topY <= this._border.topHorizontalY ||
            this._spiralBorder.bottomY >= this._border.bottomHorizontalY;
        }
        if (this._stopCondition.reachedAllBorders) {
            return this._spiralBorder.leftX <= this._border.leftVerticalX &&
            this._spiralBorder.rightX >= this._border.rightVerticalX &&
            this._spiralBorder.topY <= this._border.topHorizontalY &&
            this._spiralBorder.bottomY >= this._border.bottomHorizontalY;
        }
        if (this._stopCondition.reachedIterationCount !== false && this._coordsCount >= this._stopCondition.reachedIterationCount) {
            return true;
        }
        return false;
    }

    static Reset() {
        this._instance = null;
    }

    SetLeftAndRightBorder() {
        this._border.leftVerticalX = this._border.x;
        this._border.rightVerticalX = this._border.x + this._border.width;
    }

    SetTopAndBottomBorder() {
        this._border.topHorizontalY = this._border.y;
        this._border.bottomHorizontalY = this._border.y + this._border.height;
    }

    IncreaseStartCoordWithDelta() {
        this._startCoord.x += this._startCoord.dx;
        this._startCoord.y += this._startCoord.dy;
    }

}