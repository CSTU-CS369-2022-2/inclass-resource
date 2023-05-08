// file: ./component/destroy.js
import {redirect} from "react-router-dom"

import ROLES_LIST from "../utils/rolesList";
export const action = (fetchPrivate, hasPermission) => async ({ request, params }) => {
    const hasRequiredPermssion = hasPermission([ROLES_LIST.Admin, ROLES_LIST.Editor])
    console.log("delete product check permission-->", hasRequiredPermssion)
    if (!hasRequiredPermssion) return redirect('/unauthorize');

    if (window.confirm("Please confirm you want to delete this record.")) {
      const id = params.id;
      try {
        let { response, data } = await fetchPrivate.callFetch(
          `/api/product/${id}`,
          {
            method: "DELETE",
            body: JSON.stringify({ id }),
          }
        );
        if (!response.ok) {
          throw Error({ error: `Could not delete product ${id}` });
        }
        console.log(data)
      } catch (error) {
        console.error("Error:", error);
      }
    }
    return redirect("/products");
};
