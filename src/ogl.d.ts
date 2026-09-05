declare module 'ogl' {
  export class Renderer {
    gl: WebGLRenderingContext & {
      canvas: HTMLCanvasElement;
      drawingBufferWidth: number;
      drawingBufferHeight: number;
      getExtension(name: string): { loseContext: () => void } | null;
      clearColor(r: number, g: number, b: number, a: number): void;
    };
    dpr: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
    constructor(options?: Record<string, unknown>);
    setSize(width: number, height: number): void;
    render(options: { scene: unknown; camera?: unknown }): void;
  }

  export class Program {
    // ogl uniforms are loosely typed at the call sites in React Bits.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uniforms: Record<string, { value: any }>;
    constructor(gl: unknown, options?: Record<string, unknown>);
  }

  export class Mesh {
    position: { x: number; y: number; z: number; set: (...args: number[]) => void };
    scale: { x: number; y: number; z: number; set: (...args: number[]) => void };
    rotation: { x: number; y: number; z: number; set: (...args: number[]) => void };
    program: Program;
    parent: { removeChild?: (child: Mesh) => void } | null;
    setParent: (parent: unknown) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
    constructor(gl: unknown, options?: Record<string, unknown>);
  }

  export class Triangle {
    constructor(gl: unknown);
  }

  export class Plane {
    constructor(gl: unknown, options?: Record<string, unknown>);
    set: (width: number, height: number, widthSegments?: number, heightSegments?: number) => void;
    attributes: {
      position: { count: number };
      uv: { data: Float32Array; needsUpdate: boolean };
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }

  export class Camera {
    position: { x: number; y: number; z: number; set: (...args: number[]) => void };
    fov: number;
    aspect: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
    constructor(gl: unknown, options?: Record<string, unknown>);
    perspective: (options: Record<string, unknown>) => void;
  }

  export class Transform {
    position: { x: number; y: number; z: number; set: (...args: number[]) => void };
    rotation: { x: number; y: number; z: number; set: (...args: number[]) => void };
    scale: { x: number; y: number; z: number; set: (...args: number[]) => void };
    setParent: (parent: unknown) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
    constructor();
  }

  export class Texture {
    image: unknown;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
    constructor(gl: unknown, options?: Record<string, unknown>);
  }
}
