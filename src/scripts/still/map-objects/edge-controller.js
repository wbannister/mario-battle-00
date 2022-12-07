import VerticalEdge from "./vertical-edge";
import HorizontalEdge from "./horizontal-edge";
import ShadowEdgeHorizontal from "./shadow-edge-horizontal";
import ShadowEdgeVertical from "./vertical-edge-shadow";
import { MAP_COLOR, MAP_BORDER, PLATFORMS, BRIDGES, DIM_X, DIM_Y } from "../../game-parameters/map-params";

export default class EdgeController {
  // Each subarray represents a layer/floor on the map
  edges = [];

  constructor(ctx) {
    this.ctx = ctx;
    this.create();
  }

  drawLayer(ctx, layer) {
    this.edges.forEach( edge => {
      if (edge.layer === layer) {
        edge.draw(ctx)
      }
    });
  }

  // PROOF
  intersects(particle) {
    this.edges.forEach( edge => edge.intersects(particle));
  }

  create() {
    this.createBorder();
    this.createPlatforms();
    this.createBridges();
    // add more method calls
  }

  createBorder() {
    this.createRectangle(
      MAP_BORDER.WALL_PADDING,MAP_BORDER.WALL_PADDING,
      DIM_X - 2 * MAP_BORDER.WALL_PADDING, DIM_Y - 2 * MAP_BORDER.WALL_PADDING,
      0, MAP_COLOR.EDGES
    ); // MAP_COLOR.BORDER
  }

  createBridges () {
    // ALL BRIDGES
    let layer = 1;
    let color = MAP_COLOR.BRIDGES;

    // VERTICAL BRIDGES
    let dx = BRIDGES.VERTICAL_WIDTH;
    let dy = BRIDGES.VERTICAL_HEIGHT;

    // FIRST VERTICAL BRIDGE
    let arr = BRIDGES.VERTICAL[0];
    let x = arr[0];
    let y = arr[1];
    // Draw Railings
    this.createVerticalBridge(x, y, dx, dy, layer, color); // railings

    // let cap1 = y + dy;
    // let incr1 = dy / BRIDGES.SLATS;
    // let y1 = y + incr1;

    // while (y1 < cap1) {
    //   this.edges.push(new HorizontalEdge(x, y1, dx, 0, -2, color)); // slats
    //   y1 += incr1;
    // }
    /***** DRAW BRIDGE SLATS (SLOWS DOWN GAME) *****/
    // let cap3 = y + dy;
    // let incr3 = dy / BRIDGES.SLATS / (BRIDGES.SLATS_BETWEEN * 2);
    // let y3 = y;
    // while (y3 <= cap3) {
      //   this.edges.push(new HorizontalEdge(x, y3, dx, 0, -2, MAP_COLOR.BRIDGES_SLATS_BETWEEN)); // between
      //   y3 += incr3;
    // }

    // SECOND VERTICAL BRIDGE
    arr = BRIDGES.VERTICAL[1];
    x = arr[0];
    y = arr[1];

    this.createVerticalBridge(x, y, dx, dy, layer, color); // railings
    /***** DRAW BRIDGE SLATS (SLOWS DOWN GAME) *****/
    // let cap2 = y + dy;
    // let incr2 = dy / BRIDGES.SLATS;
    // let y2 = y + incr2;

    // while (y2 < cap2) {
    //   this.edges.push(new HorizontalEdge(x, y2, dx, 0, -2, color)); // slats
    //   y2 += incr2;
    // }
    // // let incr4 = dy / BRIDGES.SLATS / (BRIDGES.SLATS_BETWEEN * 2);
    // let cap4 = y + dy;
    // let y4 = y;
    // while (y4 <= cap4) {
    //     console.log('y4', y4);
    //     console.log('cap4', cap4);
    //     this.edges.push(new HorizontalEdge(x, y4, dx, 0, -2, MAP_COLOR.BRIDGES_SLATS_BETWEEN)); // between
    //     y4 += incr4;
    //   }

    // HORIZONTAL BRIDGE
    arr = BRIDGES.HORIZONTAL[0];
    x = arr[0];
    y = arr[1];
    dx = BRIDGES.HORIZONTAL_WIDTH;
    dy = BRIDGES.HORIZONTAL_HEIGHT;
    this.createHorizontalBridge(x, y, dx, dy, layer, color);


    // let cap6 = y + dy;
    // let incr6 = dy / BRIDGES.SLATS;
    // let y6 = y + incr6;

    // while (y6 < cap6) {
    //   this.edges.push(new HorizontalEdge(x, y6, dx, 0, -2, color)); // slats
    //   y6 += incr6;
    // }


    // let cap5 = x + dx;
    // let incr5 = dx / BRIDGES.SLATS;
    // let x5 = x + incr5;

    // while (x5 < cap5) {
    //   this.edges.push(new HorizontalEdge(x5, y, dx, 0, -2, color)); // slats
    //   x5 += incr5;
    // }

    // [x, y] = BRIDGES.HORIZONTAL[1];
    // createHorizontalBridge(x, y, dx, dy, layer, color);



  }

  createRectangle(x, y, dx, dy,
                  gapUpperLeft, gapBottomLeft, gapUpperRight, gapBottomRight,
                  layer, color) {
    this.edges.push(new VerticalEdge(x, y, 0, dy, layer, color)); // left border
    this.edges.push(new VerticalEdge(x + dx, y, 0, dy, layer, color)); // right border
    this.edges.push(new HorizontalEdge(x + gapUpperLeft, y, dx - gapUpperLeft - gapUpperRight, 0, layer, color)); // top border
    this.edges.push(new HorizontalEdge(x + gapBottomLeft, y + dy, dx - gapBottomLeft - gapBottomRight, 0, layer, color)); // bottom border
  }

  createShadowRect(x, y, dx, dy

    ) {

  }

  createPlatforms () {
    let gap = 75;
    let color = MAP_COLOR.PLATFORMS;
    let dx = MAP_BORDER.PLATFORM_WIDTH;
    let dy = MAP_BORDER.PLATFORM_HEIGHT;
    let [x, y] = PLATFORMS[0]; // x = 312.5, y = 325


    let layer = 0;
    // this.createRectangle(x, y, dx, dy, gap, 0, 0, 0, layer, color);
    // P0
    // this.edges.push(new VerticalEdge(x, y, 0, dy, layer, color)); // left border
    // this.edges.push(new VerticalEdge(x + dx, y, 0, dy, layer, color)); // right border
    // this.edges.push(new HorizontalEdge(x + gap, y, dx - gap, 0, layer, color)); // top border
    // this.edges.push(new HorizontalEdge(x, y + dy, dx, 0, layer, color)); // bottom border
    layer = 1;
    // Same
    this.edges.push(new ShadowEdgeHorizontal(x + gap, y, dx - gap, 0, layer, '#ff0000')); // top border
    this.edges.push(new ShadowEdgeVertical(x, y, 0, dy, layer, '#ff0000')); // left border
    // Diff
    this.edges.push(new ShadowEdgeVertical(x + dx, y, 0, 50, layer, '#ff0000')); // right border
    this.edges.push(new ShadowEdgeVertical(x + dx, y + 150, 0, 50, layer, '#ff0000')); // right border
    this.edges.push(new ShadowEdgeHorizontal(x, y + dy, 112.5, 0, layer, '#ff0000')); // bottom border
    this.edges.push(new ShadowEdgeHorizontal(x+187.5, y + dy, 112.5, 0, layer, '#ff0000')); // bottom border


    [x, y] = PLATFORMS[1];
    layer = 0;
    console.log('HERE');
    this.createRectangle(x, y, dx, dy, 0, gap, 0, 0, layer, color);
    layer = 1;
    // Same
    console.log('x', x);
    console.log('y', y);
    console.log('dx', dx);
    console.log('dy', dy);
    console.log('layer', layer);
    // this.edges.push(new ShadowEdgeHorizontal(x, y, dx-gap, 0, layer, '#ff0000')); // top border
    // this.edges.push(new ShadowEdgeVertical(x + dx, y, 0, dy, layer, '#ff0000')); // right border
    // // Diff
    // this.edges.push(new ShadowEdgeVertical(x, y, 0, 62.5, layer, '#ff0000')); // left border
    // this.edges.push(new ShadowEdgeVertical(x, y + 137.5, 0, dy, layer, '#ff0000')); // left border
    // // this.edges.push(new ShadowEdgeVertical(x + dx, y + 150, 0, 50, layer, '#ff0000')); // right border
    // this.edges.push(new ShadowEdgeHorizontal(x, y + dy, 62.5, 0, layer, '#ff0000')); // bottom border
    // this.edges.push(new ShadowEdgeHorizontal(x + 137.5, y + 137.5, 100, 0, layer, '#ff0000')); // bottom border

    [x, y] = PLATFORMS[2];
    layer = 0;
    this.createRectangle(x, y, dx, dy, 0, 0, gap, 0, layer, color);
    // this.edges.push(new VerticalEdge(x, y, 0, dy, layer, color)); // left border
    // this.edges.push(new VerticalEdge(x + dx, y, 0, dy, layer, color)); // right border
    // this.edges.push(new HorizontalEdge(x, y, dx - gap, 0, layer, color)); // top border
    // this.edges.push(new HorizontalEdge(x, y + dy, dx, 0, layer, color)); // bottom borderawa
    layer = 1
    // Same
    this.edges.push(new ShadowEdgeVertical(x, y, 0, dy, layer, color)); // left border
    this.edges.push(new ShadowEdgeVertical(x + dx, y, 0, dy, layer, color)); // right border
    this.edges.push(new ShadowEdgeHorizontal(x + gap, y + dy, 100, 0, layer, color)); // bottom border
    // Diff
    this.edges.push(new ShadowEdgeHorizontal(x, y, dx - gap, 0, layer, color)); // top border
    this.edges.push(new ShadowEdgeHorizontal(x, y, 100, 0, layer, color)); // top border


    // this.edges.push(new ShadowEdgeVertical(x, y, 0, dy, layer, color)); // left border
    // this.edges.push(new ShadowEdgeVertical(x + dx, y, 0, dy, layer, color)); // right border

    // this.edges.push(new ShadowEdgeHorizontal(x, y, dx - gap, 0, layer, color)); // top border
    // this.edges.push(new ShadowEdgeHorizontal(x, y, dx - gap, 0, layer, color)); // top border
    // this.edges.push(new ShadowEdgeHorizontal(x, y + dy, 100, 0, layer, '#ff0000')); // bottom border
    // this.edges.push(new ShadowEdgeHorizontal(x + 200, y + dy, 100, 0, layer, '#ff0000')); // bottom border

    // this.edges.push(new ShadowEdgeHorizontal(x, y + dy, dx, 0, layer, color)); // bottom border

    [x, y] = PLATFORMS[3];
    layer = 0;
    this.edges.push(new VerticalEdge(x, y, 0, dy, layer, color)); // left border
    this.edges.push(new VerticalEdge(x + dx, y, 0, dy, layer, color)); // right border
    this.edges.push(new HorizontalEdge(x, y, dx, 0, layer, color)); // top border
    this.edges.push(new HorizontalEdge(x, y + dy, dx - gap, 0, layer, color)); // bottom border
    layer = 1;
    // this.edges.push(new ShadowEdgeHorizontal(x, y + dy, 100, 0, layer, 'ff0000')); // bottom border
    // this.edges.push(new ShadowEdgeHorizontal(x + 200, y + dy, 100, 0, layer, 'ff0000')); // bottom border
    this.edges.push(new ShadowEdgeVertical(x + dx, y, 0, 50, layer, 'ff0000')); // right border
    this.edges.push(new ShadowEdgeHorizontal(x + gap, y, dx - gap, 0, layer, 'ff0000')); // top border
    this.edges.push(new ShadowEdgeVertical(x, y, 0, dy, layer, 'ff0000')); // left border
    this.edges.push(new ShadowEdgeVertical(x + dx, y + 150, 0, 50, layer, 'ff0000')); // right border
    this.edges.push(new ShadowEdgeHorizontal(x, y + dy, 100, 0, layer, 'ff0000')); // bottom border
    this.edges.push(new ShadowEdgeHorizontal(x + gap + 25, y + dy, 100, 0, layer, 'ff0000')); // bottom border
  }



  createVerticalBridge(x, y, dx, dy, layer, color) {
    this.edges.push(new VerticalEdge(x, y, 0, dy, layer, color)); // left border
    this.edges.push(new VerticalEdge(x + dx, y, 0, dy, layer, color)); // right border
    this.edges.push(new HorizontalEdge(x, y, dx, 0, -1, color)); // top border
    this.edges.push(new HorizontalEdge(x, y + dy, dx, 0, -1, color)); // bottom border
  }

  createHorizontalBridge(x, y, dx, dy, layer, color) {
    this.edges.push(new VerticalEdge(x, y, 0, dy, -1, color)); // left border
    this.edges.push(new VerticalEdge(x + dx, y, 0, dy, -1, color)); // right border
    this.edges.push(new HorizontalEdge(x, y, dx, 0, layer, color)); // top border
    this.edges.push(new HorizontalEdge(x, y + dy, dx, 0, layer, color)); // bottom border
  }


}
