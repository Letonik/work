import { AppDispatch } from "@/components/providers/StoreProvider";
import { useDispatch } from "react-redux";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<AppDispatch>();
