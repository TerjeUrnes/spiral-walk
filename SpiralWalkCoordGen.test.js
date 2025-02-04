import { SpiralWalkCoordGen } from "./SpiralWalkCoordGen"



describe("Testing Spiral Walk as static", () => {

    test("Testing zero circles, start coordinate included", () => {
        SpiralWalkCoordGen.StopCondition = { maxCircles: 0};
        SpiralWalkCoordGen.StartCoord = {x: 5, y: 5};

        const result = [];

        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(1);
        expect(result[0]).toStrictEqual({x: 5, y: 5});
    })

    test("Testing zero circles, start coordinate excluded", () => {
        SpiralWalkCoordGen.StopCondition = { maxCircles: 0};
        SpiralWalkCoordGen.StartCoord = {x: 5, y: 5, includeInIteration: false};

        const result = [];
        
        for (const coord of SpiralWalkCoordGen) {
            result.push(coord);
        }

        expect(result).toHaveLength(0);
    })

    test("Testing one circle", () => {

        SpiralWalkCoordGen.StopCondition = { maxCircles: 1};
        SpiralWalkCoordGen.StartCoord = {x: 5, y: 5, includeInIteration: true};

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

})