type ChangeCallbackProps = {
  values: number[],
};

type OnChangeCallback = ((props: ChangeCallbackProps) => void) | null;
type BeforeRenderCallback = (() => void) | null;

export { ChangeCallbackProps, OnChangeCallback, BeforeRenderCallback };
