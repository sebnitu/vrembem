/// <reference path="../.astro/types.d.ts" />

declare module "*?raw" {
  const content: string;
  export default content;
}

declare namespace astroHTML.JSX {
  interface HTMLAttributes {
    interestfor?: string;
  }
}
