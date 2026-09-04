/// <reference types="react-scripts" />

declare module "*.css";

declare module "*.mp4" {
  const src: string;
  export default src;
}