<img src="spiral-walk-example.webp" width="500">


# spiral-walk

Tool for generating coordinates for spiral walking in a 2D matrix.

```js
// Use as static

SpiralWalkCoordGen.StopCondition = { maxCircles: 2 }
SpiralWalkCoordGen.StartCoord = { x: 5, y: 5 };

for (const coord of SpiralWalkCoorGen) {
    //const result = testMatrix[coord.x][coord.y] != null ? "full" : "empty"
    //console.log(coord, "The cell is " + result);
}
```

```js
// Use as instance

const generator = new SpiralWalkCoordGen();

generator.StopCondition = { maxCircles: 2 }
generator.StartCoord = { x: 5, y: 5 };

for (const coord of generator) {
    //const result = testMatrix[coord.x][coord.y] != null ? "full" : "empty"
    //console.log(coord, "The cell is " + result);
}
```
<details>
  <summary>
    outprint (both static and instance commented out code):
  </summary>
    { x: 5, y: 5 } - The cell is empty<br>
    { x: 5, y: 4 } - The cell is full <br>
    { x: 6, y: 4 } - The cell is full <br>
    { x: 6, y: 5 } - The cell is full <br>
    { x: 6, y: 6 } - The cell is empty <br>
    { x: 5, y: 6 } - The cell is empty <br>
    { x: 4, y: 6 } - The cell is full <br>
    { x: 4, y: 5 } - The cell is empty <br>
    { x: 4, y: 4 } - The cell is empty <br>
    { x: 4, y: 3 } - The cell is full <br>
    { x: 5, y: 3 } - The cell is empty <br>
    { x: 6, y: 3 } - The cell is full <br>
    { x: 7, y: 3 } - The cell is full <br>
    { x: 7, y: 4 } - The cell is full <br>
    { x: 7, y: 5 } - The cell is full <br>
    { x: 7, y: 6 } - The cell is full <br>
    { x: 7, y: 7 } - The cell is full <br>
    { x: 6, y: 7 } - The cell is empty <br>
    { x: 5, y: 7 } - The cell is empty <br>
    { x: 4, y: 7 } - The cell is empty <br>
    { x: 3, y: 7 } - The cell is empty <br>
    { x: 3, y: 6 } - The cell is full <br>
    { x: 3, y: 5 } - The cell is empty <br>
    { x: 3, y: 4 } - The cell is empty <br>
    { x: 3, y: 3 } - The cell is empty
</details>

  <br>
> [!CAUTION]
> It does not check the input. The user of this class is responsible for that it is correct.


  <br>

### Properties
Uses [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) as inputs.<br>
i.e. you do not ned to use all arguments <br>
All properties has only setters.

  <br>
**StartCoord**<br>
Can be included or excluded from the iteration output. <br>
Coord outside of border can result in no iteration output, see border.
| Argument<br>name | Default<br>value | Values | |
|---|---|---|---|
| x | 0 | number | |
| y | 0 | number | |
| z | 0 | number | Volume mode only
| dx | 0 | number | Shifts the x coordinate with value after has iterated over all coordinates |
| dy | 0 | number | As dx but for the y coordinate |
| dz | 0 | number | As dx but for the z coordinate. Volume mode only
| includeInIteration | true | boolean

```js
SpiralWalkCoordGen.StartCoord = { x: 90, y: 50 };
for (const coord of SpiralWalkCoorGen) {
    // first coord x: 90 y: 50
}

SpiralWalkCoordGen.StartCoord = { x: 100 }
for (const coord of SpiralWalkCoorGen) {
    // first coord x: 100 y: 50
}

SpiralWalkCoordGen.StartCoord = { y: 60 }
for (const coord of SpiralWalkCoorGen) {
    // first coord x: 100 y: 60
}
```
```js
SpiralWalkCoordGen.StartCoord = { x: 90, y: 50, dx: -5, dy: 5};
for (const coord of SpiralWalkCoorGen) {
    // first coord x: 90 y: 50
}
for (const coord of SpiralWalkCoorGen) {
    // first coord x: 85 y: 55
}
for (const coord of SpiralWalkCoorGen) {
    // first coord x: 80 y: 60
}

SpiralWalkCoordGen.StartCoord = { dx: -10, dy: 0};
for (const coord of SpiralWalkCoorGen) {
    // first coord x: 70 y: 60
}
for (const coord of SpiralWalkCoorGen) {
    // first coord x: 60 y: 60
}
```
  <br>

**VolumeMode**<br>
If enabled the walk will be on a 2d plain inside of a 3d volume.

| Argument<br>name | Default<br>value | Values |
|---|---|---|
| enabled | false | boolean |
| iterateOverPlan | "xy" | "xy", "xz" or "yz" |

```js
SpiralWalkCoordGen.VolumeMode = {
    enabled: true,
    iterateOverPlan: "xz"
};

for (const coord of SpiralWalkCoorGen) {
    console.log(coord);
}
```
<details>
  <summary>
    outprint:
  </summary>
    { x: 0, y: 0, z: 0 }<br>
    { x: 0, y: 0, z: -1 }<br>
    { x: 1, y: 0, z: -1 }<br>
    { x: 1, y: 0, z: 0 }<br>
    { x: 1, y: 0, z: 1 }<br>
    { x: 0, y: 0, z: 1 }<br>
    { x: -1, y: 0, z: 1 }<br>
    { x: -1, y: 0, z: 0 }<br>
    { x: -1, y: 0, z: -1 }<br>
    { x: -1, y: 0, z: -2 }<br>
    { x: 0, y: 0, z: -2 }<br>
    { x: 1, y: 0, z: -2 }<br>
    { x: 2, y: 0, z: -2 }<br>
    { x: 2, y: 0, z: -1 }<br>
    { x: 2, y: 0, z: 0 }<br>
    { x: 2, y: 0, z: 1 }<br>
    { x: 2, y: 0, z: 2 }<br>
</details>

  <br>
**StopCondition**<br>
More then one condition can be active. Stops on the first to be fulfilled.<br>
No active condition should make a infinitive loop. _reachedIterationCount_ that is not reachable can also give infinitive loop, _includeCoordsOutside_ on border can give that problem if it is set to false.

| Argument<br>name | Default<br>value | Values |
|---|---|---|
| maxCircles | false | number or false |
| reachedFirstBorder | false | boolean |
| reachedAllBorders | true | boolean |
| reachedIterationCount | 10000 | number or false | 

```js
SpiralWalkCoordGen.StopCondition = {
    reachedFirstBorder: true,
    reachedIterationCount: 1000000
}
```
  <br>

**Filter**

Function input come as [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment).

| Argument<br>name | Default<br>value | Values |
|---|---|---|
| useCustomFunc | false | boolean |
| customFunc | `() => true` | function |

| Custom function<br>argument | contains | |
|---|---|---|
| coord | {x, y, z} | The coordinate that is tested |
| startCoord | {x, y, z} | The coordinate where the walk started |
| circleNumber | number | Tells which circle you are on, 1 is the first circle around the center |
| borderX | {min, max} | The smallest and biggest x value on the border.
| borderY | {min, max} | The smallest and biggest y value on the border.
| borderZ | {min, max} | The smallest and biggest z value on the border.


```js
SpiralWalkCoordGen.Filter = {
    useCustomFunc: true,
    customFunc: ({coord: {x: point}, borderX: {min, max}}) => {
        return min <= point && point <= max;
    }
}
```

  <br>
**Border** <br>
Start coord outside of border give no iteration output if includeCoordsOutside is false, its default is false.

| Argument<br>name | Default<br>value | Values | |
|---|---|---|---|
| x | -10 | number | Upper left corner | 
| y | -10 | number | Upper left corner | 
| width | 21 | number | |
| height | 21 | number | |
| includeCoordsOutside | false | boolean | |
| leftVerticalX | -10 | number | Will be autogenerated |
| rightVerticalX | 10 | number | Will be autogenerated |
| topHorizontalY | -10 | number | Will be autogenerated |
| bottomHorizontalY | 10 | number | Will be autogenerated |
```js
SpiralWalkCoordGen.Border = {
    x: 50,
    y: 50,
    width: 100,
    height: 60
}
```

  <br>

**Walking**

| Argument<br>name | Default<br>value | Values |
|---|---|---|
| direction | "cw" | "cw" or "ccw" |
```js
SpiralWalkCoordGen.Walking = {
    direction: "ccw"
}
```


  <br>

### Functions

**Reset()**<br>
Exist only as a static function
```js
SpiralWalkCoordGen.Reset();
```