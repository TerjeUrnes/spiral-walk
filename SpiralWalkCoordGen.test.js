import { SpiralWalkCoordGen } from "./SpiralWalkCoordGen"



describe("Testing Spiral Walk as static", () => {

    test("Testing zero circles, start coordinate included", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.StopCondition = { maxCircles: 0 };
        SpiralWalkCoordGen.StartCoord = {x: 5, y: 5};

        const result = [];

        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(1);
        expect(result[0]).toStrictEqual({x: 5, y: 5});
    })

    test("Testing zero circles, start coordinate excluded", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.StopCondition = { maxCircles: 0};
        SpiralWalkCoordGen.StartCoord = {x: 5, y: 5, includeInIteration: false};

        const result = [];
        
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(0);
    })

    test("Testing one circle", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.StopCondition = { maxCircles: 1};
        SpiralWalkCoordGen.StartCoord = {x: 5, y: 5};

        const result = [];

        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(9);
        expect(result[0]).toStrictEqual({x: 5, y: 5});
        expect(result[1]).toStrictEqual({x: 5, y: 4});
        expect(result[2]).toStrictEqual({x: 6, y: 4});
        expect(result[3]).toStrictEqual({x: 6, y: 5});
        expect(result[4]).toStrictEqual({x: 6, y: 6});
        expect(result[5]).toStrictEqual({x: 5, y: 6});
        expect(result[6]).toStrictEqual({x: 4, y: 6});
        expect(result[7]).toStrictEqual({x: 4, y: 5});
        expect(result[8]).toStrictEqual({x: 4, y: 4});
    })

    test("Iteration stops after 441 coordinates", () => {
        SpiralWalkCoordGen.Reset();

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(441);
        expect(result[0]).toStrictEqual({x: 0, y: 0});
        expect(result[440]).toStrictEqual({x: -10, y: -10});
    })

    test("Iteration stops after 10000 coordinates when turning off border check", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.StopCondition = { reachedAllBorders: false };
        SpiralWalkCoordGen.Border = {
            x: -100,
            y: -100,
            width: 201,
            height: 201
        }

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(10000);
        expect(result[0]).toStrictEqual({x: 0, y: 0});
        expect(result[9999]).toStrictEqual({x: 50, y: 49});
    })

    test("Custom filter that always return true gives 10 coordinates", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.Filter = { useCustomFunc: true }
        SpiralWalkCoordGen.StopCondition = { reachedIterationCount: 10};

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(10);
    })

    test("Custom filter that always return false gives 0 coordinates", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.Filter = {
            useCustomFunc: true,
            customFunc: () => false
        }

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(0);
    })

    test("Spiral goes ccw on circle when changing direction", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.StopCondition = { maxCircles: 1};
        SpiralWalkCoordGen.StartCoord = {x: 5, y: 5};
        SpiralWalkCoordGen.Walking = {direction: "ccw"};

        const result = [];

        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(9);
        expect(result[0]).toStrictEqual({x: 5, y: 5});
        expect(result[1]).toStrictEqual({x: 5, y: 4});
        expect(result[2]).toStrictEqual({x: 4, y: 4});
        expect(result[3]).toStrictEqual({x: 4, y: 5});
        expect(result[4]).toStrictEqual({x: 4, y: 6});
        expect(result[5]).toStrictEqual({x: 5, y: 6});
        expect(result[6]).toStrictEqual({x: 6, y: 6});
        expect(result[7]).toStrictEqual({x: 6, y: 5});
        expect(result[8]).toStrictEqual({x: 6, y: 4});
    })

    test("Iteration stops after 441 coordinates in ccw direction", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.Walking = { direction: "ccw" };

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(441);
        expect(result[0]).toStrictEqual({x: 0, y: 0});
        expect(result[440]).toStrictEqual({x: 10, y: -10});
    })

    test("5 run after each other should give same result", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.StopCondition = { reachedIterationCount: 6};

        const resultA = [];
        for (const coord of SpiralWalkCoordGen) {
            resultA.push(coord);
        }

        for (let i = 0; i < 4; i++) {
            let resultB = [];
            for (const coord of SpiralWalkCoordGen) {
                resultB.push(coord);
            }
    
            expect(resultA[0]).toStrictEqual(resultB[0]);
            expect(resultA[1]).toStrictEqual(resultB[1]);
            expect(resultA[2]).toStrictEqual(resultB[2]);
            expect(resultA[3]).toStrictEqual(resultB[3]);
            expect(resultA[4]).toStrictEqual(resultB[4]);
            expect(resultA[5]).toStrictEqual(resultB[5]);
        }
    })

    test("Changing only x in StartCoord will shift result to right", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.Border = {
            x: 0,
            y: 0,
            width: 100,
            height: 100
        }
        SpiralWalkCoordGen.StopCondition = { reachedIterationCount: 5};
        SpiralWalkCoordGen.StartCoord = {x: 60, y: 39};

        const resultA = [];
        for (const coord of SpiralWalkCoordGen) {
            resultA.push(coord);
        }

        SpiralWalkCoordGen.StartCoord = {x: 75 };

        const resultB = [];
        for (const coord of SpiralWalkCoordGen) {
            resultB.push(coord);
        }

        expect(resultA[0].x + 15).toEqual(resultB[0].x);
        expect(resultA[0].y).toEqual(resultB[0].y);
        expect(resultA[1].x + 15).toEqual(resultB[1].x);
        expect(resultA[1].y).toEqual(resultB[1].y);
        expect(resultA[2].x + 15).toEqual(resultB[2].x);
        expect(resultA[2].y).toEqual(resultB[2].y);
        expect(resultA[3].x + 15).toEqual(resultB[3].x);
        expect(resultA[3].y).toEqual(resultB[3].y);
        expect(resultA[4].x + 15).toEqual(resultB[4].x);
        expect(resultA[4].y).toEqual(resultB[4].y);
    })

    test("Setting dx to 10 will shift start coord after each iteration has ended", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.Border = {
            x: 0,
            y: 0,
            width: 100,
            height: 100
        }
        SpiralWalkCoordGen.StopCondition = { reachedIterationCount: 5};
        SpiralWalkCoordGen.StartCoord = {x: 30, y: 30, dx: 10};

        const resultA = [];
        for (const coord of SpiralWalkCoordGen) {
            resultA.push(coord);
        }

        let resultB = [];
        for (const coord of SpiralWalkCoordGen) {
            resultB.push(coord);
        }

        expect(resultA[0].x + 10).toEqual(resultB[0].x);
        expect(resultA[0].y).toEqual(resultB[0].y);
        expect(resultA[1].x + 10).toEqual(resultB[1].x);
        expect(resultA[1].y).toEqual(resultB[1].y);
        expect(resultA[2].x + 10).toEqual(resultB[2].x);
        expect(resultA[2].y).toEqual(resultB[2].y);
        expect(resultA[3].x + 10).toEqual(resultB[3].x);
        expect(resultA[3].y).toEqual(resultB[3].y);
        expect(resultA[4].x + 10).toEqual(resultB[4].x);
        expect(resultA[4].y).toEqual(resultB[4].y);

        resultB = [];
        for (const coord of SpiralWalkCoordGen) {
            resultB.push(coord);
        }

        expect(resultA[0].x + 20).toEqual(resultB[0].x);
        expect(resultA[0].y).toEqual(resultB[0].y);
        expect(resultA[1].x + 20).toEqual(resultB[1].x);
        expect(resultA[1].y).toEqual(resultB[1].y);
        expect(resultA[2].x + 20).toEqual(resultB[2].x);
        expect(resultA[2].y).toEqual(resultB[2].y);
        expect(resultA[3].x + 20).toEqual(resultB[3].x);
        expect(resultA[3].y).toEqual(resultB[3].y);
        expect(resultA[4].x + 20).toEqual(resultB[4].x);
        expect(resultA[4].y).toEqual(resultB[4].y);
    })

    test("Walk on the xy plane in a volume with z set to 0", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.VolumeMode = { enabled: true }
        SpiralWalkCoordGen.StopCondition = { maxCircles: 1 };

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(9);
        expect(result[0]).toStrictEqual({x: 0, y: 0, z: 0});
        expect(result[1]).toStrictEqual({x: 0, y: -1, z: 0});
        expect(result[2]).toStrictEqual({x: 1, y: -1, z: 0});
        expect(result[3]).toStrictEqual({x: 1, y: 0, z: 0});
        expect(result[4]).toStrictEqual({x: 1, y: 1, z: 0});
        expect(result[5]).toStrictEqual({x: 0, y: 1, z: 0});
        expect(result[6]).toStrictEqual({x: -1, y: 1, z: 0});
        expect(result[7]).toStrictEqual({x: -1, y: 0, z: 0});
        expect(result[8]).toStrictEqual({x: -1, y: -1, z: 0});
    })

    test("Walk on the xy plane in a volume with z set to non 0", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.VolumeMode = { enabled: true }
        SpiralWalkCoordGen.StopCondition = { maxCircles: 1 };
        SpiralWalkCoordGen.Border = {
            x: 10, y: 10, z: 10,
            width: 10, height: 10, depth: 10
        }
        SpiralWalkCoordGen.StartCoord = {x: 15, y: 15, z: 18};

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(9);
        expect(result[0]).toStrictEqual({x: 15, y: 15, z: 18});
        expect(result[1]).toStrictEqual({x: 15, y: 14, z: 18});
        expect(result[2]).toStrictEqual({x: 16, y: 14, z: 18});
        expect(result[3]).toStrictEqual({x: 16, y: 15, z: 18});
        expect(result[4]).toStrictEqual({x: 16, y: 16, z: 18});
        expect(result[5]).toStrictEqual({x: 15, y: 16, z: 18});
        expect(result[6]).toStrictEqual({x: 14, y: 16, z: 18});
        expect(result[7]).toStrictEqual({x: 14, y: 15, z: 18});
        expect(result[8]).toStrictEqual({x: 14, y: 14, z: 18});
    })

    test("Walk on the xz plane in a volume with y set to non 0", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.VolumeMode = { enabled: true, iterateOverPlan: "xz" }
        SpiralWalkCoordGen.StopCondition = { maxCircles: 1 };
        SpiralWalkCoordGen.Border = {
            x: 10, y: 10, z: 10,
            width: 10, height: 10, depth: 10
        }
        SpiralWalkCoordGen.StartCoord = {x: 15, y: 15, z: 18};

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(9);
        expect(result[0]).toStrictEqual({x: 15, y: 15, z: 18});
        expect(result[1]).toStrictEqual({x: 15, y: 15, z: 17});
        expect(result[2]).toStrictEqual({x: 16, y: 15, z: 17});
        expect(result[3]).toStrictEqual({x: 16, y: 15, z: 18});
        expect(result[4]).toStrictEqual({x: 16, y: 15, z: 19});
        expect(result[5]).toStrictEqual({x: 15, y: 15, z: 19});
        expect(result[6]).toStrictEqual({x: 14, y: 15, z: 19});
        expect(result[7]).toStrictEqual({x: 14, y: 15, z: 18});
        expect(result[8]).toStrictEqual({x: 14, y: 15, z: 17});
    })

    test("Walk on the yz plane in a volume with x set to non 0", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.VolumeMode = { enabled: true, iterateOverPlan: "yz" }
        SpiralWalkCoordGen.StopCondition = { maxCircles: 1 };
        SpiralWalkCoordGen.Border = {
            x: 10, y: 10, z: 10,
            width: 10, height: 10, depth: 10
        }
        SpiralWalkCoordGen.StartCoord = {x: 12, y: 14, z: 18};

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(9);
        expect(result[0]).toStrictEqual({x: 12, y: 14, z: 18});
        expect(result[1]).toStrictEqual({x: 12, y: 14, z: 17});
        expect(result[2]).toStrictEqual({x: 12, y: 15, z: 17});
        expect(result[3]).toStrictEqual({x: 12, y: 15, z: 18});
        expect(result[4]).toStrictEqual({x: 12, y: 15, z: 19});
        expect(result[5]).toStrictEqual({x: 12, y: 14, z: 19});
        expect(result[6]).toStrictEqual({x: 12, y: 13, z: 19});
        expect(result[7]).toStrictEqual({x: 12, y: 13, z: 18});
        expect(result[8]).toStrictEqual({x: 12, y: 13, z: 17});
    })

    test("Ends outside of the border where only including the coords that is inside", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.Border = {
            x: 35, y: 35, z: 35,
            width: 6, height: 4, depth: 10
        }
        SpiralWalkCoordGen.VolumeMode = { enabled: true }
        SpiralWalkCoordGen.StopCondition = { maxCircles: 10, reachedAllBorders: false };
        SpiralWalkCoordGen.StartCoord = {x: 38, y: 37, z: 40};

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(24);
    })

    test("Check if single coordinate value is outside of border", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.Border = {
            x: 20, y: 80, z: 100,
            width: 6, height: 4, depth: 10
        }
        SpiralWalkCoordGen.VolumeMode = { enabled: true }

        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMinA({a: 30})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMinA({a: 19})).toBe(true);
        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMaxA({a: 22})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMaxA({a: 27})).toBe(true);
        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMinB({b: 83})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMinB({b: 79})).toBe(true);
        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMaxB({b: 83})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMaxB({b: 85})).toBe(true);

        SpiralWalkCoordGen.VolumeMode = { iterateOverPlan: "xz" }

        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMinA({a: 30})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMinA({a: 19})).toBe(true);
        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMaxA({a: 22})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMaxA({a: 27})).toBe(true);
        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMinB({b: 101})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMinB({b: 99})).toBe(true);
        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMaxB({b: 108})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMaxB({b: 111})).toBe(true);

        SpiralWalkCoordGen.VolumeMode = { iterateOverPlan: "yz" }

        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMinA({a: 83})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMinA({a: 79})).toBe(true);
        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMaxA({a: 83})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMaxA({a: 85})).toBe(true);
        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMinB({b: 101})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMinB({b: 99})).toBe(true);
        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMaxB({b: 108})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IsOutsideOfBorderMaxB({b: 111})).toBe(true);
    })

    test("Check if coordinate is inside border", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.Border = {
            x: 20, y: 80, z: 100,
            width: 6, height: 4, depth: 10
        }
        SpiralWalkCoordGen.VolumeMode = { enabled: true }

        expect(SpiralWalkCoordGen.Instance.IncludeCoordinate({a: 0, b: 0})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IncludeCoordinate({a: 20, b: 79})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IncludeCoordinate({a: 20, b: 80})).toBe(true);
        expect(SpiralWalkCoordGen.Instance.IncludeCoordinate({a: 15, b: 85})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IncludeCoordinate({a: 25, b: 85})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IncludeCoordinate({a: 25, b: 83})).toBe(true);

        SpiralWalkCoordGen.VolumeMode = { iterateOverPlan: "xz" }

        expect(SpiralWalkCoordGen.Instance.IncludeCoordinate({a: 0, b: 0})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IncludeCoordinate({a: 21, b: 105})).toBe(true);
        expect(SpiralWalkCoordGen.Instance.IncludeCoordinate({a: 19, b: 99})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IncludeCoordinate({a: 22, b: 101})).toBe(true);
        expect(SpiralWalkCoordGen.Instance.IncludeCoordinate({a: 27, b: 105})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IncludeCoordinate({a: 30, b: 110})).toBe(false);

        SpiralWalkCoordGen.VolumeMode = { iterateOverPlan: "yz" }

        expect(SpiralWalkCoordGen.Instance.IncludeCoordinate({a: 0, b: 0})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IncludeCoordinate({a: 79, b: 101})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IncludeCoordinate({a: 80, b: 100})).toBe(true);
        expect(SpiralWalkCoordGen.Instance.IncludeCoordinate({a: 60, b: 105})).toBe(false);
        expect(SpiralWalkCoordGen.Instance.IncludeCoordinate({a: 85, b: 111})).toBe(false);

    })

})