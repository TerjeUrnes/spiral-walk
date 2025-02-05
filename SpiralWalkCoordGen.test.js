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

    test("Iteration stops after 441 coordinates, hits all boarder at same time", () => {
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
        SpiralWalkCoordGen.Border = { includeCoordsOutside: true };

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(10000);
        expect(result[0]).toStrictEqual({x: 0, y: 0});
        expect(result[9999]).toStrictEqual({x: 50, y: 49});
    })

    test("Iteration stops when reaching the first border", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.StopCondition = { reachedFirstBorder: true };
        SpiralWalkCoordGen.Border = {
            x: 0,
            y: 0,
            width: 11,
            height: 7
        }
        SpiralWalkCoordGen.StartCoord = {x: 6, y: 2};

        let result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }
        expect(result).toHaveLength(25);
        expect(result[24]).toStrictEqual({x: 4, y: 0});

        SpiralWalkCoordGen.StartCoord = {x: 8, y: 2};
        result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }
        console.log(result);
        expect(result).toHaveLength(25);
        expect(result[24]).toStrictEqual({x: 6, y: 0});

        SpiralWalkCoordGen.StartCoord = {x: 8, y: 4};
        result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }
        console.log(result);
        expect(result).toHaveLength(25);
        expect(result[24]).toStrictEqual({x: 6, y: 2});
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

    test("Custom filter test 1", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.StopCondition = { 
            reachedAllBorders: false, 
            reachedIterationCount: 100
        };
        SpiralWalkCoordGen.Border = { 
            x: -3,
            y: -3,
            z: -3,
            width: 7,
            height: 7,
            includeCoordsOutside: true 
        };

        SpiralWalkCoordGen.Filter = {
            useCustomFunc: true,
            customFunc: ({coord: {x: point}, borderX: {min, max}}) => {
                return min <= point && point <= max;
            }
        }

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(100);
        expect(result[0]).toStrictEqual({x: 0, y: 0});
        expect(result[1]).toStrictEqual({x: 0, y: -1});
        expect(result[7]).toStrictEqual({x: -1, y: 0});
        expect(result[5]).toStrictEqual({x: 0, y: 1});
        expect(result[3]).toStrictEqual({x: 1, y: 0});
        expect(result[48]).toStrictEqual({x: -3, y: -3});
        expect(result[49]).toStrictEqual({x: -3, y: -4});
        expect(result[55]).toStrictEqual({x: 3, y: -4});
        expect(result[56]).toStrictEqual({x: 3, y: 4});
        expect(result[62]).toStrictEqual({x: -3, y: 4});
        expect(result[63]).toStrictEqual({x: -3, y: -5});
        expect(result[83]).toStrictEqual({x: 3, y: -6});
        expect(result[84]).toStrictEqual({x: 3, y: 6});
        expect(result[98]).toStrictEqual({x: 3, y: 7});
        expect(result[99]).toStrictEqual({x: 2, y: 7});
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

    test("Changing dx will chance the shifting on x axes", () => {
        SpiralWalkCoordGen.Reset();

        SpiralWalkCoordGen.Border = {
            x: -100,
            y: -100,
            width: 201,
            height: 201
        }
        SpiralWalkCoordGen.StopCondition = { reachedIterationCount: 15};

        let result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }
        expect(result[0]).toStrictEqual({x: 0, y: 0});
        expect(result[14]).toStrictEqual({x: 2, y: 0});

        SpiralWalkCoordGen.StartCoord = {dx: 10};
        result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }
        expect(result[0]).toStrictEqual({x: 10, y: 0});
        expect(result[14]).toStrictEqual({x: 12, y: 0});
        result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }
        expect(result[0]).toStrictEqual({x: 20, y: 0});
        expect(result[14]).toStrictEqual({x: 22, y: 0});

        SpiralWalkCoordGen.StartCoord = {dx: 30};
        result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }
        expect(result[0]).toStrictEqual({x: 50, y: 0});
        expect(result[14]).toStrictEqual({x: 52, y: 0});
    })

    test("Changing dy will chance the shifting on y axes", () => {
        SpiralWalkCoordGen.Reset();

        SpiralWalkCoordGen.Border = {
            x: -100,
            y: -100,
            width: 201,
            height: 201
        }
        SpiralWalkCoordGen.StopCondition = { reachedIterationCount: 19};

        let result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }
        expect(result[0]).toStrictEqual({x: 0, y: 0});
        expect(result[18]).toStrictEqual({x: 0, y: 2});

        SpiralWalkCoordGen.StartCoord = {dy: 10};
        result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }
        expect(result[0]).toStrictEqual({x: 0, y: 10});
        expect(result[18]).toStrictEqual({x: 0, y: 12});
        result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }
        expect(result[0]).toStrictEqual({x: 0, y: 20});
        expect(result[18]).toStrictEqual({x: 0, y: 22});
        
        SpiralWalkCoordGen.StartCoord = {dy: 30};
        result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }
        expect(result[0]).toStrictEqual({x: 0, y: 50});
        expect(result[18]).toStrictEqual({x: 0, y: 52});
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

    test("Walk on the xy plane while z is shifted with dz", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.VolumeMode = { enabled: true }
        SpiralWalkCoordGen.StopCondition = { maxCircles: 1 };
        SpiralWalkCoordGen.Border = {
            x: -10, y: -10, z: -100,
            width: 21, height: 21, depth: 201
        }

        let result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }
        expect(result[0]).toStrictEqual({x: 0, y: 0, z: 0});
        expect(result[4]).toStrictEqual({x: 1, y: 1, z: 0});
        expect(result[8]).toStrictEqual({x: -1, y: -1, z: 0});

        SpiralWalkCoordGen.StartCoord = {dz: 10};
        for (let i = 1; i <= 5; i++) {
            result = [];
            for (const coord of SpiralWalkCoordGen) {
                result.push(coord);
            }
            expect(result[0]).toStrictEqual({x: 0, y: 0, z: i*10});
            expect(result[4]).toStrictEqual({x: 1, y: 1, z: i*10});
            expect(result[8]).toStrictEqual({x: -1, y: -1, z: i*10});
        }

        SpiralWalkCoordGen.StartCoord = {dz: -70};
        result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }
        expect(result[0]).toStrictEqual({x: 0, y: 0, z: -20});
        expect(result[4]).toStrictEqual({x: 1, y: 1, z: -20});
        expect(result[8]).toStrictEqual({x: -1, y: -1, z: -20});

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

    test("Walk on all xy plans in a cube", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.Border = {
            x: 0, y: 0, z: 0,
            width: 7, height: 7, depth: 7
        }
        SpiralWalkCoordGen.VolumeMode = { enabled: true, iterateOverPlan: "xy" }
        SpiralWalkCoordGen.StartCoord = {x: 3, y: 3, z: 0, dz: 1};

        for (let i = 0; i < 7; i++) {
            const result = [];
            for (const coord of SpiralWalkCoordGen) {
                result.push(coord);
            }
            expect(result).toHaveLength(49);
            expect(result[0]).toStrictEqual({x: 3, y: 3, z: i});
            expect(result[8]).toStrictEqual({x: 2, y: 2, z: i});
            expect(result[16]).toStrictEqual({x: 5, y: 5, z: i});
            expect(result[24]).toStrictEqual({x: 1, y: 1, z: i});
            expect(result[32]).toStrictEqual({x: 6, y: 2, z: i});
            expect(result[40]).toStrictEqual({x: 2, y: 6, z: i});
            expect(result[48]).toStrictEqual({x: 0, y: 0, z: i});
        }
    })

    test("Walk on all xz plans in a cube", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.Border = {
            x: 0, y: 0, z: 0,
            width: 7, height: 7, depth: 7
        }
        SpiralWalkCoordGen.VolumeMode = { enabled: true, iterateOverPlan: "xz" }
        SpiralWalkCoordGen.StartCoord = {x: 3, y: 0, z: 3, dy: 1};

        for (let i = 0; i < 7; i++) {
            const result = [];
            for (const coord of SpiralWalkCoordGen) {
                result.push(coord);
            }
            expect(result).toHaveLength(49);
            expect(result[0]).toStrictEqual({x: 3, y: i, z: 3});
            expect(result[8]).toStrictEqual({x: 2, y: i, z: 2});
            expect(result[16]).toStrictEqual({x: 5, y: i, z: 5});
            expect(result[24]).toStrictEqual({x: 1, y: i, z: 1});
            expect(result[32]).toStrictEqual({x: 6, y: i, z: 2});
            expect(result[40]).toStrictEqual({x: 2, y: i, z: 6});
            expect(result[48]).toStrictEqual({x: 0, y: i, z: 0});
        }
    })

    test("Walk on all yz plans in a cube", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.Border = {
            x: 0, y: 0, z: 0,
            width: 7, height: 7, depth: 7
        }
        SpiralWalkCoordGen.VolumeMode = { enabled: true, iterateOverPlan: "yz" }
        SpiralWalkCoordGen.StartCoord = {x: 0, y: 3, z: 3, dx: 1};

        for (let i = 0; i < 7; i++) {
            const result = [];
            for (const coord of SpiralWalkCoordGen) {
                result.push(coord);
            }
            expect(result).toHaveLength(49);
            expect(result[0]).toStrictEqual({x: i, y: 3, z: 3});
            expect(result[8]).toStrictEqual({x: i, y: 2, z: 2});
            expect(result[16]).toStrictEqual({x: i, y: 5, z: 5});
            expect(result[24]).toStrictEqual({x: i, y: 1, z: 1});
            expect(result[32]).toStrictEqual({x: i, y: 6, z: 2});
            expect(result[40]).toStrictEqual({x: i, y: 2, z: 6});
            expect(result[48]).toStrictEqual({x: i, y: 0, z: 0});
        }
    })

})