<img src="spiral-walk-example.webp" width="300">


# spiral-walk

Tool for generating coordinates for spiral walking in a 2D matrix.

```js
// Use as static

SpiralWalkCoordGen.StopCondition = { maxCircles: 2}
SpiralWalkCoordGen.StartCoord = {x: 5, y: 5};

for (const coord of SpiralWalkCoorGen) {
    console.log(coord);
}
```

```js
// Use as instance

const generator = new SpiralWalkCoordGen();

generator.StopCondition = { maxCircles: 2}
generator.StartCoord = {x: 5, y: 5};

for (const coord of generator) {
    console.log(coord);
}
```


```
outprint (both static and instance):

    { x: 5, y: 5 }
    { x: 5, y: 4 }
    { x: 6, y: 4 }
    { x: 6, y: 5 }
    { x: 6, y: 6 }
    { x: 5, y: 6 }
    { x: 4, y: 6 }
    { x: 4, y: 5 }
    { x: 4, y: 4 }
    { x: 4, y: 3 }
    { x: 5, y: 3 }
    { x: 6, y: 3 }
    { x: 7, y: 3 }
    { x: 7, y: 4 }
    { x: 7, y: 5 }
    { x: 7, y: 6 }
    { x: 7, y: 7 }
    { x: 6, y: 7 }
    { x: 5, y: 7 }
    { x: 4, y: 7 }
    { x: 3, y: 7 }
    { x: 3, y: 6 }
    { x: 3, y: 5 }
    { x: 3, y: 4 }
    { x: 3, y: 3 }

```