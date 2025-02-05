import { beforeEach } from "node:test";
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

        const result = [];
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(10000);
        expect(result[0]).toStrictEqual({x: 0, y: 0});
        expect(result[9999]).toStrictEqual({x: 50, y: 49});
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

        console.log(result);

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

})