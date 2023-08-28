import { useEffect } from "react";

export function useKey(key, keyType, callback) {
  useEffect(
    function () {
      function callBack(e) {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          callback?.();
        }
      }
      document.addEventListener(keyType.toLowerCase(), callBack);

      return function () {
        document.removeEventListener(keyType.toLowerCase(), callBack);
      };
    },
    [callback, key, keyType]
  );
}
