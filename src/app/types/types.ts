export type PostState = 0 | 1 | 2

export namespace PostStatuses {
  export const open = 0;
  export const close = 1;
  export const reverted = 2;
}
