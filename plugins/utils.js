import api from "~/utils/api";
import common from "~/utils/common";
import format from "~/utils/format";
import filter from "~/utils/filter";
import loginout from "~/utils/loginout";

export default ({ app }, inject) => {
  inject("apis", api);
  inject("common", common);
  inject("format", format);
  inject("loginout", loginout);
};
