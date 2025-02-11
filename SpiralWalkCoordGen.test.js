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

    test("Testing one circle with float coordinates", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.StopCondition = { maxCircles: 1};
        SpiralWalkCoordGen.StartCoord = {x: 2.3, y: -3.7};

        const result = [];

        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(9);
        expect(result[0]).toStrictEqual({x: 2, y: -4});
        expect(result[1]).toStrictEqual({x: 2, y: -5});
        expect(result[2]).toStrictEqual({x: 3, y: -5});
        expect(result[3]).toStrictEqual({x: 3, y: -4});
        expect(result[4]).toStrictEqual({x: 3, y: -3});
        expect(result[5]).toStrictEqual({x: 2, y: -3});
        expect(result[6]).toStrictEqual({x: 1, y: -3});
        expect(result[7]).toStrictEqual({x: 1, y: -4});
        expect(result[8]).toStrictEqual({x: 1, y: -5});
    })

    test("Testing one circle on a xz plane", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.StopCondition = { maxCircles: 1 };
        SpiralWalkCoordGen.VolumeMode = { enabled: true, iterateOverPlan: "xz" };

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(9);
        expect(result[0]).toStrictEqual({x: 0, y: 0, z: 0});
        expect(result[1]).toStrictEqual({x: 0, y: 0, z: -1});
        expect(result[2]).toStrictEqual({x: 1, y: 0, z: -1});
        expect(result[3]).toStrictEqual({x: 1, y: 0, z: 0});
        expect(result[4]).toStrictEqual({x: 1, y: 0, z: 1});
        expect(result[5]).toStrictEqual({x: 0, y: 0, z: 1});
        expect(result[6]).toStrictEqual({x: -1, y: 0, z: 1});
        expect(result[7]).toStrictEqual({x: -1, y: 0, z: 0});
        expect(result[8]).toStrictEqual({x: -1, y: 0, z: -1});

    })

    test("Testing one circle on a yz plane", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.StopCondition = { maxCircles: 1 };
        SpiralWalkCoordGen.VolumeMode = { enabled: true, iterateOverPlan: "yz" };
        SpiralWalkCoordGen.StartCoord = {x: 120, y: 160, z: 120};
        SpiralWalkCoordGen.Border = {
            x: 119,
            y: 150,
            z: 110,
            width: 3,
            height: 21,
            depth: 21
        }

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(9);
        expect(result[0]).toStrictEqual({x: 120, y: 160, z: 120});
        expect(result[1]).toStrictEqual({x: 120, y: 160, z: 119});
        expect(result[2]).toStrictEqual({x: 120, y: 161, z: 119});
        expect(result[3]).toStrictEqual({x: 120, y: 161, z: 120});
        expect(result[4]).toStrictEqual({x: 120, y: 161, z: 121});
        expect(result[5]).toStrictEqual({x: 120, y: 160, z: 121});
        expect(result[6]).toStrictEqual({x: 120, y: 159, z: 121});
        expect(result[7]).toStrictEqual({x: 120, y: 159, z: 120});
        expect(result[8]).toStrictEqual({x: 120, y: 159, z: 119});
    })

    test("Testing one circle on 2 plane in a volume", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.StopCondition = { maxCircles: 1, maxPlanes: 2};
        SpiralWalkCoordGen.VolumeMode = { enabled: true }
        SpiralWalkCoordGen.StartCoord = {dz: 1};

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(18);
        expect(result[0]).toStrictEqual({x: 0, y: 0, z: 0});
        expect(result[2]).toStrictEqual({x: 1, y: -1, z: 0});
        expect(result[4]).toStrictEqual({x: 1, y: 1, z: 0});
        expect(result[6]).toStrictEqual({x: -1, y: 1, z: 0});
        expect(result[8]).toStrictEqual({x: -1, y: -1, z: 0});
        expect(result[10]).toStrictEqual({x: 0, y: -1, z: 1});
        expect(result[12]).toStrictEqual({x: 1, y: 0, z: 1});
        expect(result[14]).toStrictEqual({x: 0, y: 1, z: 1});
        expect(result[16]).toStrictEqual({x: -1, y: 0, z: 1});
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

    test.skip("Iteration stops after 10mill coordinates when turning off border check", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.StopCondition = { 
            reachedAllBorders: false, 
            reachedIterationCount: 10000000 
        };
        SpiralWalkCoordGen.Border = { includeCoordsOutside: true };

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(10000000);
        expect(result[0]).toStrictEqual({x: 0, y: 0});
        expect(result[9999999]).toStrictEqual({x: -174, y: 1581});
    })

    test("Iteration stops after reaching all borders in a cube", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.VolumeMode = { enabled: true };
        SpiralWalkCoordGen.StartCoord = {x: 3, y: 3, z: 1, dz: 1};
        SpiralWalkCoordGen.Border = {
            x: 1,
            y: 1,
            z: 1,
            width: 5,
            height: 5,
            depth: 5
        }

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(125);
        expect(result[3]).toStrictEqual({x: 4, y: 3, z: 1});
        expect(result[16]).toStrictEqual({x: 5, y: 5, z: 1});
        expect(result[24]).toStrictEqual({x: 1, y: 1, z: 1});
        expect(result[25]).toStrictEqual({x: 3, y: 3, z: 2});
        expect(result[42]).toStrictEqual({x: 4, y: 5, z: 2});
        expect(result[57]).toStrictEqual({x: 2, y: 3, z: 3});
        expect(result[79]).toStrictEqual({x: 4, y: 4, z: 4});
        expect(result[102]).toStrictEqual({x: 4, y: 2, z: 5});
        expect(result[124]).toStrictEqual({x: 1, y: 1, z: 5});
    })

    test("Iteration stops after reaching all borders in a volume", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.VolumeMode = { enabled: true };
        SpiralWalkCoordGen.StartCoord = {x: 3, y: 3, z: 1, dz: 1};
        SpiralWalkCoordGen.Border = {
            x: 1,
            y: 1,
            z: 1,
            width: 8,
            height: 5,
            depth: 10
        }

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(400);
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

    test("Test setting the borders directly", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.VolumeMode = { enabled: true }
        SpiralWalkCoordGen.StartCoord = {x: 50, y: 50, z: 50};

        SpiralWalkCoordGen.Border = {
            x: 30, y: 30, z: 30,
            width: 41, height: 41, depth: 41
        }

        let result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }
        expect(result).toHaveLength(1681);
        expect(result[1680]).toStrictEqual({x: 30, y: 30, z: 50});

        SpiralWalkCoordGen.Border = {
            leftPlaneMinX: 20, topPlaneMinY: 20, frontPlaneMinZ: 20,
            rightPlaneMaxX: 80, bottomPlaneMaxY: 80, backPlaneMaxZ: 80,
        }

        result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }
        expect(result).toHaveLength(3721);
        expect(result[1680]).toStrictEqual({x: 30, y: 30, z: 50});
        expect(result[3720]).toStrictEqual({x: 20, y: 20, z: 50});

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

    test("Walk on the xy plane while traversing in the z axes", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.VolumeMode = { enabled: true }
        SpiralWalkCoordGen.StopCondition = { maxCircles: 2 };
        SpiralWalkCoordGen.Border = {
            x: 10, y: 10, z: 10,
            width: 11, height: 11, depth: 11
        }
        SpiralWalkCoordGen.StartCoord = {x: 16, y: 16, z: 10, dz: 1};

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(275);
    })

    test("walk on the xz plane while traversing in the z axes", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.VolumeMode = { enabled: true, iterateOverPlan: "xz" }
        SpiralWalkCoordGen.StopCondition = { maxCircles: 2 };
        SpiralWalkCoordGen.Border = {
            x: 10, y: 10, z: 10,
            width: 11, height: 11, depth: 11
        }
        SpiralWalkCoordGen.StartCoord = {x: 16, y: 10, z: 16, dy: 1};

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(275);
    })

    test("Walk on the yz plane while traversing in the x axes", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.VolumeMode = { enabled: true, iterateOverPlan: "yz" }
        SpiralWalkCoordGen.StopCondition = { maxCircles: 2 };
        SpiralWalkCoordGen.Border = {
            x: 10, y: 10, z: 10,
            width: 11, height: 11, depth: 11
        }
        SpiralWalkCoordGen.StartCoord = {x: 10, y: 16, z: 16, dx: 1};

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(275);
    })

    test("Walk on all cells in a volume while traversing im z direction", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.VolumeMode = { enabled: true, iterateOverPlan: "xy" }
        SpiralWalkCoordGen.Border = {
            x: 10, y: 10, z: 10,
            width: 11, height: 21, depth: 31
        }
        SpiralWalkCoordGen.StartCoord = {x: 16, y: 21, z: 10, dz: 1};

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(7161);
    })

    test("Walk on all cells in a volume while traversing in y direction", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.VolumeMode = { enabled: true, iterateOverPlan: "xz" }
        SpiralWalkCoordGen.Border = {
            x: 10, y: 10, z: 10,
            width: 11, height: 21, depth: 31
        }
        SpiralWalkCoordGen.StartCoord = {x: 16, y: 10, z: 26, dy: 1};

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(7161);
    })

    test("Walk on all cells in a volume while traversing in x direction", () => {
        SpiralWalkCoordGen.Reset();
        SpiralWalkCoordGen.VolumeMode = { enabled: true, iterateOverPlan: "yz" }
        SpiralWalkCoordGen.Border = {
            x: 10, y: 10, z: 10,
            width: 11, height: 21, depth: 31
        }
        SpiralWalkCoordGen.StartCoord = {x: 10, y: 21, z: 26, dx: 1};

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(7161);
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