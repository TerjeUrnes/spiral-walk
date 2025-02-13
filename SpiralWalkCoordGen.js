

export class SpiralWalkCoordGen {

    //#region Static instance 

    static _instance = null;

    static get Instance() {
        if (this._instance == null) {
            this._instance = new SpiralWalkCoordGen();
        }
        return this._instance;
    }

    //#endregion

    //#region StartCoord - property and field 

    _startCoord = {
        x: 0, 
        y: 0,
        z: 0,
        dx: 0,
        dy: 0,
        dz: 0,
        increaseAfter: false,
        includeInIteration: true,
        intX: 0,
        intY: 0,
        intZ: 0,
        a: 0,
        b: 0,
        c: 0
    }

    static set StartCoord(args) {
        this.Instance.StartCoord = args;
    }
    
    set StartCoord({
        x = null,
        y = null,
        z = null,
        dx = null,
        dy = null,
        dz = null,
        increaseAfter = null,
        includeInIteration = null
    } = {}) {
        if (x != null) { 
            this._startCoord.x = x; 
            this._startCoord.intX = Math.floor(x);
        }
        if (y != null) {
            this._startCoord.y = y;
            this._startCoord.intY = Math.floor(y);
        }
        if (z != null) {
            this._startCoord.z = z;
            this._startCoord.intZ = Math.floor(z);
        }
        if (dx != null) { 
            this._startCoord.dx = dx;
        }
        if (dy != null) { 
            this._startCoord.dy = dy; 
        }
        if (dz != null) {
            this._startCoord.dz = dz;
        }
        if (increaseAfter != null) {
            this._startCoord.increaseAfter = increaseAfter;
        }
        if (includeInIteration != null) { 
            this._startCoord.includeInIteration = includeInIteration; 
        }
        this.UpdateStartCoordAB();
    }

    //#endregion

    //#region VolumeMode - property and field 

    _volumeMode = {
        enabled: false,
        iterateOverPlan: "xy",
        autoTraverse: false
    }

    static set VolumeMode(args) {
        this.Instance.VolumeMode = args;
    }

    set VolumeMode({
        enabled = null,
        iterateOverPlan = null,
        autoTraverse = null
    } = {}) {
        if (enabled != null) {
            this._volumeMode.enabled = enabled;
        }
        if (iterateOverPlan != null) {
            this._volumeMode.iterateOverPlan = iterateOverPlan;
        }
        if (autoTraverse != null) {
            this._volumeMode.autoTraverse = autoTraverse;
        }
    }

    //#endregion

    //#region Stop Condition - property and field 

    _stopCondition = {
        maxCircles: false,
        maxPlanes: false,
        reachedFirstBorder: false, 
        reachedAllBorders: true, 
        reachedIterationCount: 10000
    }

    static set StopCondition(args){
        this.Instance.StopCondition = args;
    }
    
    set StopCondition({
        maxCircles = null,
        maxPlanes = null,
        reachedFirstBorder = null,
        reachedAllBorders = null,
        reachedIterationCount = null
    } = {}){
        if (maxCircles != null) {
            this._stopCondition.maxCircles = maxCircles;
        }
        if (maxPlanes != null) {
            this._stopCondition.maxPlanes = maxPlanes;
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

    //#endregion

    //#region Filter - property and field 

    _filter = {
        useCustomFunc: false,
        customFunc: () => { return true; }    
    }

    static set Filter(args){
        this.Instance.Filter = args
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

    //#endregion

    //#region Border - property and field 

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

    static set Border(args){
        this.Instance.Border = args;
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

    //#endregion

    //#region Walking - property and field 

    _walking = {
        direction: "cw"
    }

    static set Walking(args){
        this.Instance.Walking = args;
    }

    set Walking({
        direction = null
    } = {}){
        if (direction != null) {
            this._walking.direction = direction;
        }
    }

    //#endregion

    _circleCount;
    _planeCount;
    _coordsCount;
    _spiralWalkArea = {
        minA: 0,
        maxA: 0,
        minB: 0,
        maxB: 0
    }
    _insideBoarderSize;
    _goToNextPlain;


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

        this._planeCount = 0;
        this._coordsCount = 0;
        const directionA = this._walking.direction == "ccw" ? -1 : 1;

        do {
            this._circleCount = 0;
            this._planeCount++;
            var coord = this.GetStartCoordIfIncluded();
            if (coord != null) {
                this._coordsCount++;
                yield coord;
            }

            this.SetTheSpiralWalkArea(directionA);

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
    
                this.UpdateSpiralWalkAreaPartA(linePointA, linePointB);
    
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
    
                this.UpdateSpiralWalkAreaPartB(linePointA, linePointB);
            }

            if ((this._volumeMode.enabled && this._volumeMode.autoTraverse) || 
                    this._startCoord.increaseAfter) {
                this.IncreaseStartCoordWithDelta();
            }
        }
        while (this.CheckIfShouldGoToNextPlane())
    }

    CheckIfShouldGoToNextPlane() {

        if (this._volumeMode.enabled && this._volumeMode.autoTraverse) {

            if (this._stopCondition.maxPlanes !== false && this._planeCount >= this._stopCondition.maxPlanes) {
                return false;
            }
            if ((this._volumeMode.iterateOverPlan == "yz" && this._startCoord.dx != 0) || 
                (this._volumeMode.iterateOverPlan == "xz" && this._startCoord.dy != 0) || 
                (this._volumeMode.iterateOverPlan == "xy" && this._startCoord.dz != 0)
            ) {

                if (this.IsOutsideOfBorderMinC({c: this._startCoord.c}) || this.IsOutsideOfBorderMaxC({c: this._startCoord.c})) {
                    return false;
                }
                else {
                    return true;
                }
            }
        }
        else {
            return false;
        }
    }

    static Reset() {
        this._instance = null;
    }

    GetStartCoordIfIncluded() {
        if (this._startCoord.includeInIteration) {
            const coord = { a: this._startCoord.a, b: this._startCoord.b};
            if (this.IncludeCoordinate(coord)) {
                return this.ConstructCoord(coord);
            }
        }
        return null;
    }

    SetTheSpiralWalkArea(directionA) {
        this._spiralWalkArea.minA = this._startCoord.a - directionA;
        this._spiralWalkArea.maxA = this._spiralWalkArea.minA;
        this._spiralWalkArea.minB = this._startCoord.b - 1;
        this._spiralWalkArea.maxB = this._spiralWalkArea.minB;
    }

    UpdateSpiralWalkAreaPartA(linePointA, linePointB) {
        if (this._walking.direction == "ccw") {
            this._spiralWalkArea.minA = linePointA;
        }
        else {
            this._spiralWalkArea.maxA = linePointA;
        }
        this._spiralWalkArea.maxB = linePointB;
    }

    UpdateSpiralWalkAreaPartB(linePointA, linePointB) {
        if (this._walking.direction == "cw") {
            this._spiralWalkArea.minA = linePointA;
        }
        else {
            this._spiralWalkArea.maxA = linePointA;
        }
        this._spiralWalkArea.minB = linePointB;
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
                planeCoord: {a: a, b: b},
                startCoord: {x: this._startCoord.intX, y: this._startCoord.intY, z: this._startCoord.intZ},
                circleNumber: this._circleCount,
                planeNumber: this._planeCount,
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

    IsOutsideOfBorderMinC({ c = null } = {}) {
        let planeBorder = this._border.frontPlaneMinZ;
        if (this._volumeMode.iterateOverPlan == "xz") {
            planeBorder = this._border.topPlaneMinY;
        }
        else if (this._volumeMode.iterateOverPlan == "yz") {
            planeBorder = this._border.leftPlaneMinX;
        }
        return c < planeBorder;
    }

    IsOutsideOfBorderMaxC({ c = null } = {}) {
        let planeBorder = this._border.backPlaneMaxZ;
        if (this._volumeMode.iterateOverPlan == "xz") {
            planeBorder = this._border.bottomPlaneMaxY;
        }
        else if (this._volumeMode.iterateOverPlan == "yz") {
            planeBorder = this._border.rightPlaneMaxX;
        }
        return c > planeBorder;
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
        return this._spiralWalkArea.minA <= planeBorder;
    }

    HasReachedBorderMaxA() {
        let planeBorder = this._border.rightPlaneMaxX;
        if (this._volumeMode.enabled && this._volumeMode.iterateOverPlan == "yz") {
            planeBorder = this._border.bottomPlaneMaxY;
        }
        return this._spiralWalkArea.maxA >= planeBorder;
    }

    HasReachedBorderMinB() {
        let planeBorder = this._border.topPlaneMinY;
        if (this._volumeMode.enabled && 
            (this._volumeMode.iterateOverPlan == "xz" || this._volumeMode.iterateOverPlan == "yz")) {
            planeBorder = this._border.frontPlaneMinZ;
        }
        return this._spiralWalkArea.minB <= planeBorder;
    }

    HasReachedBorderMaxB() {
        let planeBorder = this._border.bottomPlaneMaxY;
        if (this._volumeMode.enabled && 
            (this._volumeMode.iterateOverPlan == "xz" || this._volumeMode.iterateOverPlan == "yz")) {
            planeBorder = this._border.backPlaneMaxZ;
        }
        return this._spiralWalkArea.maxB >= planeBorder;
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
        this._startCoord.intX = Math.floor(this._startCoord.x);
    }

    IncreaseStartCoordYWithDelta() {
        this._startCoord.y += this._startCoord.dy;
        this._startCoord.intY = Math.floor(this._startCoord.y);
    }

    IncreaseStartCoordZWithDelta() {
        this._startCoord.z += this._startCoord.dz;
        this._startCoord.intZ = Math.floor(this._startCoord.z);
        console.log("Increasing coord", this._startCoord.dz, this._startCoord.intZ);
    }

    UpdateStartCoordAB() {
        if (this._volumeMode.enabled) {
            if (this._volumeMode.iterateOverPlan == "xy") {
                this._startCoord.a = this._startCoord.intX;
                this._startCoord.b = this._startCoord.intY;
                this._startCoord.c = this._startCoord.intZ;
            }
            else if (this._volumeMode.iterateOverPlan == "xz") {
                this._startCoord.a = this._startCoord.intX;
                this._startCoord.b = this._startCoord.intZ;
                this._startCoord.c = this._startCoord.intY;
            }
            else if (this._volumeMode.iterateOverPlan == "yz") {
                this._startCoord.a = this._startCoord.intY;
                this._startCoord.b = this._startCoord.intZ;
                this._startCoord.c = this._startCoord.intX;
            } 
        }
        else {
            this._startCoord.a = this._startCoord.intX;
            this._startCoord.b = this._startCoord.intY;
        }
    }

    ConstructCoord({ a = null, b = null} = {}) {
        if (this._volumeMode.enabled) {
            if (this._volumeMode.iterateOverPlan == "xy") {
                return { x: a, y: b, z: this._startCoord.c }
            }
            else if (this._volumeMode.iterateOverPlan == "xz") {
                return { x: a, y: this._startCoord.c, z: b }
            }
            else if (this._volumeMode.iterateOverPlan == "yz") {
                return { x: this._startCoord.c, y: a, z: b }
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