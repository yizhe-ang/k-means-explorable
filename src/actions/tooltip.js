// From: https://blog.logrocket.com/svelte-actions-introduction/
import tippy from "tippy.js";

export default function tooltip(node, params) {
  let tip = tippy(node, params);

  return {
    update: (newParams) => {
      tip.setProps(newParams);
    },
    destroy: () => {
      tip.destroy();
    }
  };
}
