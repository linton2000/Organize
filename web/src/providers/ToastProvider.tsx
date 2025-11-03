import { useCallback, type ReactNode } from "react";
import { SnackbarProvider, useSnackbar, type OptionsObject, type SnackbarKey } from "notistack";

const DEFAULT_TOAST_OPTIONS: OptionsObject = {
    autoHideDuration: 2500,
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
    },
};

export const ToastProvider = ({ children }: { children: ReactNode }) => (
    <SnackbarProvider
        maxSnack={4}
        autoHideDuration={DEFAULT_TOAST_OPTIONS.autoHideDuration}
        anchorOrigin={DEFAULT_TOAST_OPTIONS.anchorOrigin}
        preventDuplicate
    >
        {children}
    </SnackbarProvider>
);

type ToastFn = (message: ReactNode, options?: OptionsObject) => SnackbarKey;
type CloseFn = (key?: SnackbarKey) => void

export const useToast = (): { toast: ToastFn; close: CloseFn } => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const toast = useCallback<ToastFn>(
        (message, options) => enqueueSnackbar(message, { ...DEFAULT_TOAST_OPTIONS, ...options }),
        [enqueueSnackbar],
    );

    return { toast, close: closeSnackbar };
};
