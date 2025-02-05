

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
        z: 0,
        dx: 0,
        dy: 0,
        dz: 0,
        includeInIteration: true,
        a: 0,
        b: 0
    }
    _volumeMode = {
        enabled: false,
        iterateOverPlan: "xy"
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
        z: -10,
        width: 21,
        height: 21,
        depth: 21,
        includeCoordsOutside: false,
        topPlaneMinY: -10,
        bottomPlaneMaxY: 10,
        leftPlaneMinX: -10,
        rightPlaneMaxX: 10,
        frontPlaneMinZ: -10,
        backPlaneMaxZ: 10
    }
    _walking = {
        direction: "cw"
    }

    _circleCount;
    _coordsCount;
    _spiralBorder = {
        minA: 0,
        maxA: 0,
        minB: 0,
        maxB: 0
    }
    _insideBoarderSize;

    static set StartCoord({
        x = null,
        y = null,
        z = null,
        dx = null,
        dy = null,
        dz = null,
        includeInIteration = null
    } = {}) {
        this.Instance.StartCoord = { 
            x: x, 
            y: y,
            z: z,
            dx: dx,
            dy: dy,
            dz: dz,
            includeInIteration: includeInIteration 
        };
    }
    
    set StartCoord({
        x = null,
        y = null,
        z = null,
        dx = null,
        dy = null,
        dz = null,
        includeInIteration = null
    } = {}) {
        if (x != null) { this._startCoord.x = x; }
        if (y != null) { this._startCoord.y = y; }
        if (z != null) { this._startCoord.z = z; }
        if (dx != null) { 
            this._startCoord.dx = dx;
            if (x == null) {
                this.IncreaseStartCoordXWithDelta();
            }
        }
        if (dy != null) { 
            this._startCoord.dy = dy; 
            if (y == null) {
                this.IncreaseStartCoordYWithDelta();
            }
        }
        if (dz != null) {
            this._startCoord.dz = dz;
            if (z == null) {
                this.IncreaseStartCoordZWithDelta();
            }
        }
        if (includeInIteration != null) { 
            this._startCoord.includeInIteration = includeInIteration; 
        }
        this.UpdateStartCoordAB();
    }

    static set VolumeMode({
        enabled = null,
        iterateOverPlan = null
    } = {}) {
        this.Instance.VolumeMode = {
            enabled: enabled,
            iterateOverPlan: iterateOverPlan
        };
    }

    set VolumeMode({
        enabled = null,
        iterateOverPlan = null
    } = {}) {
        if (enabled != null) {
            this._volumeMode.enabled = enabled;
        }
        if (iterateOverPlan != null) {
            this._volumeMode.iterateOverPlan = iterateOverPlan;
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
            console.log("maxCircles: " + maxCircles );
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
        z = null,
        width = null,
        height = null,
        depth = null,
        includeCoordsOutside = null,
        leftPlaneMinX = null,
        rightPlaneMaxX = null,
        topPlaneMinY = null,
        bottomPlaneMaxY = null,
        frontPlaneMinZ = null,
        backPlaneMaxZ = null
    } = {}){
        this.Instance.Border = {
            x: x,
            y: y,
            z: z,
            width: width,
            height: height,
            depth: depth,
            includeCoordsOutside: includeCoordsOutside,
            leftPlaneMinX: leftPlaneMinX,
            rightPlaneMaxX: rightPlaneMaxX,
            topPlaneMinY: topPlaneMinY,
            bottomPlaneMaxY: bottomPlaneMaxY,
            frontPlaneMinZ: frontPlaneMinZ,
            backPlaneMaxZ: backPlaneMaxZ
        };
    }

    set Border({
        x = null,
        y = null,
        z = null,
        width = null,
        height = null,
        depth = null,
        includeCoordsOutside = null,
        leftPlaneMinX = null,
        rightPlaneMaxX = null,
        topPlaneMinY = null,
        bottomPlaneMaxY = null,
        frontPlaneMinZ = null,
        backPlaneMaxZ = null
    } = {}){
        if (x != null) { 
            this._border.x = x; 
            this.SetLeftAndRightBorder();
        }
        if (y != null) { 
            this._border.y = y; 
            this.SetTopAndBottomBorder();
        }
        if (z != null) {
            this._border.z = z;
            this.SetFrontAndBackBorder();
        }
        if (width != null) { 
            this._border.width = width; 
            this.SetLeftAndRightBorder();
        }
        if (height != null) { 
            this._border.height = height; 
            this.SetTopAndBottomBorder();
        }
        if (depth != null) {
            this._border.depth = depth;
            this.SetFrontAndBackBorder();
        }
        if (includeCoordsOutside != null) {
            this._border.includeCoordsOutside = includeCoordsOutside;
        }
        if (leftPlaneMinX != null) {
            this._border.leftPlaneMinX = leftPlaneMinX;
        }
        if (rightPlaneMaxX != null) {
            this._border.rightPlaneMaxX = rightPlaneMaxX;
        }
        if (topPlaneMinY != null) {
            this._border.topPlaneMinY = topPlaneMinY;
        }
        if (bottomPlaneMaxY != null) {
            this._border.bottomPlaneMaxY = bottomPlaneMaxY;
        }
        if (frontPlaneMinZ != null) {
            this._border.frontPlaneMinZ = frontPlaneMinZ;
        }
        if (backPlaneMaxZ != null) {
            this._border.backPlaneMaxZ = backPlaneMaxZ;
        }
        this.CalculateBorderArea();
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
        const directionA = this._walking.direction == "ccw" ? -1 : 1;

        if (this._startCoord.includeInIteration) {
            const coord = { a: this._startCoord.a, b: this._startCoord.b};
            if (this.IncludeCoordinate(coord)) {
                this._coordsCount++;
                yield this.ConstructCoord(coord);
            }
        }

        this._spiralBorder.minA = this._startCoord.a - directionA;
        this._spiralBorder.maxA = this._spiralBorder.minA;
        this._spiralBorder.minB = this._startCoord.b - 1;
        this._spiralBorder.maxB = this._spiralBorder.minB;

        while (this.CheckStopCondition() == false) {

            this._circleCount++;
            const lineLength = this._circleCount * 2;
            let linePointA = this._startCoord.a - this._circleCount * directionA;
            let linePointB = this._startCoord.b - this._circleCount;

            for (let hTop = 0; hTop < lineLength; hTop++, linePointA += directionA) {
                const coord = { a: linePointA + directionA, b: linePointB };
                if (this.IncludeCoordinate(coord)) {
                    this._coordsCount++;
                    yield this.ConstructCoord(coord);
                }
            }

            for (let vRight = 0; vRight < lineLength; vRight++, linePointB++) {
                const coord = { a: linePointA, b: linePointB + 1 };
                if (this.IncludeCoordinate(coord)) {
                    this._coordsCount++;
                    yield this.ConstructCoord(coord);
                }
            }

            if (this._walking.direction == "ccw") {
                this._spiralBorder.minA = linePointA;
            }
            else {
                this._spiralBorder.maxA = linePointA;
            }
            this._spiralBorder.maxB = linePointB;

            for (let hBottom = 0; hBottom < lineLength; hBottom++, linePointA -= directionA) {
                const coord = { a: linePointA - directionA, b: linePointB };
                if (this.IncludeCoordinate(coord)) {
                    this._coordsCount++;
                    yield this.ConstructCoord(coord);
                }
            }

            for (let vLeft = 0; vLeft < lineLength; vLeft++, linePointB--) {
                const coord = { a: linePointA, b: linePointB - 1 };
                if (this.IncludeCoordinate(coord)) {
                    this._coordsCount++;
                    yield this.ConstructCoord(coord);
                }
            }

            if (this._walking.direction == "cw") {
                this._spiralBorder.minA = linePointA;
            }
            else {
                this._spiralBorder.maxA = linePointA;
            }
            this._spiralBorder.minB = linePointB;

            //console.log(this._circleCount, this._circleCount >= this._stopCondition.maxCircles, this._stopCondition.maxCircles !== false, this._stopCondition.maxCircles);
        }
        
        this.IncreaseStartCoordWithDelta();
    }

    IncludeCoordinate({
        a = null,
        b = null
    } = {}) {
        if (this._stopCondition.reachedIterationCount !== false && this._coordsCount >= this._stopCondition.reachedIterationCount) {
            return false;
        }
        if (this._border.includeCoordsOutside == false && 
            (this.IsOutsideOfBorderMinA({a: a}) || this.IsOutsideOfBorderMaxA({a: a}) ||
            this.IsOutsideOfBorderMinB({b: b}) || this.IsOutsideOfBorderMaxB({b: b}))
        ) {
            return false; 
        }
        if (this._filter.useCustomFunc) {
            const coord = this.ConstructCoord({a: a, b: b});
            return this._filter.customFunc({
                coord: coord,
                startCoord: this._startCoord,
                circleNumber: this._circleCount,
                borderX: {min: this._border.leftPlaneMinX, max: this._border.rightPlaneMaxX},
                borderY: {min: this._border.topPlaneMinY, max: this._border.bottomPlaneMaxY},
                borderZ: {min: this._border.frontPlaneMinZ, max: this._border.backPlaneMaxZ},
            });
        }
        return true;
    }

    IsOutsideOfBorderMinA({ a = null } = {}) {
        let planeBorder = this._border.leftPlaneMinX;
        if (this._volumeMode.enabled && this._volumeMode.iterateOverPlan == "yz") {
            planeBorder = this._border.topPlaneMinY;
        }
        return a < planeBorder;
    }

    IsOutsideOfBorderMaxA({ a = null } = {}) {
        let planeBorder = this._border.rightPlaneMaxX;
        if (this._volumeMode.enabled && this._volumeMode.iterateOverPlan == "yz") {
            planeBorder = this._border.bottomPlaneMaxY;
        }
        return a > planeBorder;
    }

    IsOutsideOfBorderMinB({ b = null } = {}) {
        let planeBorder = this._border.topPlaneMinY;
        if (this._volumeMode.enabled && 
            (this._volumeMode.iterateOverPlan == "xz" || this._volumeMode.iterateOverPlan == "yz")) {
            planeBorder = this._border.frontPlaneMinZ;
        }
        return b < planeBorder;
    }

    IsOutsideOfBorderMaxB({ b = null } = {}) {
        let planeBorder = this._border.bottomPlaneMaxY;
        if (this._volumeMode.enabled && 
            (this._volumeMode.iterateOverPlan == "xz" || this._volumeMode.iterateOverPlan == "yz")) {
            planeBorder = this._border.backPlaneMaxZ;
        }
        return b > planeBorder;
    }



    CheckStopCondition() {
        if (this._stopCondition.maxCircles !== false && this._circleCount >= this._stopCondition.maxCircles) {
            return true;
        }
        if (this._stopCondition.reachedFirstBorder ) {
            return this.HasReachedBorderMinA() || this.HasReachedBorderMaxA() ||
                this.HasReachedBorderMinB() || this.HasReachedBorderMaxB();
        }
        if (this._stopCondition.reachedAllBorders) {
            return this.HasReachedBorderMinA() && this.HasReachedBorderMaxA() &&
            this.HasReachedBorderMinB() && this.HasReachedBorderMaxB();
        }
        if (this._stopCondition.reachedIterationCount !== false && this._coordsCount >= this._stopCondition.reachedIterationCount) {
            return true;
        }
        if (this._border.includeCoordsOutside == false && this._coordsCount >= this._insideBoarderSize) {
            return true;
        }
        return false;
    }

    HasReachedBorderMinA() {
        let planeBorder = this._border.leftPlaneMinX;
        if (this._volumeMode.enabled && this._volumeMode.iterateOverPlan == "yz") {
            planeBorder = this._border.topPlaneMinY;
        }
        return this._spiralBorder.minA <= planeBorder;
    }

    HasReachedBorderMaxA() {
        let planeBorder = this._border.rightPlaneMaxX;
        if (this._volumeMode.enabled && this._volumeMode.iterateOverPlan == "yz") {
            planeBorder = this._border.bottomPlaneMaxY;
        }
        return this._spiralBorder.maxA >= planeBorder;
    }

    HasReachedBorderMinB() {
        let planeBorder = this._border.topPlaneMinY;
        if (this._volumeMode.enabled && 
            (this._volumeMode.iterateOverPlan == "xz" || this._volumeMode.iterateOverPlan == "yz")) {
            planeBorder = this._border.frontPlaneMinZ;
        }
        return this._spiralBorder.minB <= planeBorder;
    }

    HasReachedBorderMaxB() {
        let planeBorder = this._border.bottomPlaneMaxY;
        if (this._volumeMode.enabled && 
            (this._volumeMode.iterateOverPlan == "xz" || this._volumeMode.iterateOverPlan == "yz")) {
            planeBorder = this._border.backPlaneMaxZ;
        }
        return this._spiralBorder.maxB >= planeBorder;
    }

    static Reset() {
        this._instance = null;
    }

    SetLeftAndRightBorder() {
        this._border.leftPlaneMinX = this._border.x;
        this._border.rightPlaneMaxX = this._border.x + this._border.width - 1;
    }

    SetTopAndBottomBorder() {
        this._border.topPlaneMinY = this._border.y;
        this._border.bottomPlaneMaxY = this._border.y + this._border.height - 1;
    }

    SetFrontAndBackBorder() {
        this._border.frontPlaneMinZ = this._border.z;
        this._border.backPlaneMaxZ = this._border.z + this._border.depth - 1;
    }

    IncreaseStartCoordWithDelta() {
        this.IncreaseStartCoordXWithDelta();
        this.IncreaseStartCoordYWithDelta();
        this.IncreaseStartCoordZWithDelta();
        this.UpdateStartCoordAB();
    }

    IncreaseStartCoordXWithDelta() {
        this._startCoord.x += this._startCoord.dx;
    }

    IncreaseStartCoordYWithDelta() {
        this._startCoord.y += this._startCoord.dy;
    }

    IncreaseStartCoordZWithDelta() {
        this._startCoord.z += this._startCoord.dz;
    }

    UpdateStartCoordAB() {
        if (this._volumeMode.enabled) {
            if (this._volumeMode.iterateOverPlan == "xy") {
                this._startCoord.a = this._startCoord.x;
                this._startCoord.b = this._startCoord.y;
            }
            else if (this._volumeMode.iterateOverPlan == "xz") {
                this._startCoord.a = this._startCoord.x;
                this._startCoord.b = this._startCoord.z;
            }
            else if (this._volumeMode.iterateOverPlan == "yz") {
                this._startCoord.a = this._startCoord.y;
                this._startCoord.b = this._startCoord.z;
            } 
        }
        else {
            this._startCoord.a = this._startCoord.x;
            this._startCoord.b = this._startCoord.y;
        }
    }

    ConstructCoord({ a = null, b = null} = {}) {
        if (this._volumeMode.enabled) {
            if (this._volumeMode.iterateOverPlan == "xy") {
                return { x: a, y: b, z: this._startCoord.z }
            }
            else if (this._volumeMode.iterateOverPlan == "xz") {
                return { x: a, y: this._startCoord.y, z: b }
            }
            else if (this._volumeMode.iterateOverPlan == "yz") {
                return { x: this._startCoord.x, y: a, z: b }
            } 
        }
        return { x: a, y: b };
    }

    CalculateBorderArea() {
        let width = 0;
        let height = 0;
        if (this._volumeMode.iterateOverPlan == "xy") {
            width = this._border.rightPlaneMaxX - this._border.leftPlaneMinX + 1;
            height = this._border.bottomPlaneMaxY - this._border.topPlaneMinY + 1;
        }
        else if (this._volumeMode.iterateOverPlan == "xz") {
            width = this._border.rightPlaneMaxX - this._border.leftPlaneMinX + 1;
            height = this._border.backPlaneMaxZ - this._border.frontPlaneMinZ + 1;
        }
        else if (this._volumeMode.iterateOverPlan == "yz") {
            width = this._border.bottomPlaneMaxY - this._border.topPlaneMinY + 1;
            height = this._border.backPlaneMaxZ - this._border.frontPlaneMinZ + 1;
        }
        this._insideBoarderSize = width * height;
    }   

}