import { useTranslator } from "../providers/i18n";
import {uiUtility} from "../../shared/utilities/UiUtility";

export const useAlert = () => {
  const t = useTranslator();

  return {
    confirm: (callback) => uiUtility.confirm(callback, t)
  };
};
