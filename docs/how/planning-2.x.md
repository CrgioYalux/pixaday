# 202501015134849 Planning 2.x

### Color Matrix Module

##### What's currently supported:

- Context that keeps track of the color matrix state so that [[#Color Matrix Tools Module]] can interact with it.

##### What's required:

1. [[#Color Matrix Tools Module]] will need to include a brush size selector and that will effectively _just_ change
   the matrix size -i.e. the amount of rows and columns- so that the painted boxes look bigger or smaller.
2. Since the [[#Framing Module]] will allow to create frames from color matrices, there needs to be an easy way of loading
   and unloading matrices. This will help switch between frames in a animation.

### Color Matrix Tools Module

- Just components so far but extending to keep track of the brush size might be required (1).
- (1) This is although what's actually going to happen is that the matrix size is going to change whilst keeping its state.

### Canvas Module

##### What's currently supported

- Currently there's just a component, an useEffect to set events and a class that serves as interface between a color matrix and a canvas.

##### What's required:

- Canvas will need to keep track of some states such as:
    - the width and height of the frame
    - the zoom scale
    - the current move position
        - spike: not sure how this will work. I thought about keeping track of an auxiliary color matrix that could be used to zoom in specific areas,
          in a very granular fashion. You would not be able to see half a cell or clipped cells, although I don't think of that as a missed feature.

### Color Palette Module

##### What's currently supported

- This module is the responsible for the colors to paint with in the color matrix.
- There are 'random colors' and 'today's colors' palette options.

##### What's required:

- Once the required updates on the [[#Color Matrix Module]] and the [[#Canvas Module]] are done, then it would be worth it to do a re-thought of this module
  to allow for more complex color-related operations.

### Framing Module

##### What's currently supported

- Nothing yet, this will be worked Once the required updates on the [[#Color Matrix Module]] and the [[#Canvas Module]] are done.

##### What's required:

- This module will be responsible for creating frames out of color matrices, keeping track of them in order and allow various operations on them.
- The objective of this module is to allow the creation of animations, so 'export as gif' and 'export as json' -for sharing & later re-importing-
  functions will be required.
