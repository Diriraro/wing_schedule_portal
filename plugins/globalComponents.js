import Vue from "vue";
import BaseInput from "@/components/MVP/Inputs/BaseInput.vue";
import BaseDropdown from "~/components/MVP/BaseDropdown.vue";
import Card from "@/components/MVP/Cards/Card.vue";
import BaseButton from "~/components/MVP/BaseButton.vue";
import BaseCheckbox from "@/components/MVP/Inputs/BaseCheckbox.vue";
import { Input, InputNumber, Tooltip, Popover } from "element-ui";
/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

Vue.component(BaseInput.name, BaseInput);
Vue.component(BaseDropdown.name, BaseDropdown);
Vue.component(Card.name, Card);
Vue.component(BaseCheckbox.name, BaseCheckbox);
Vue.component(BaseButton.name, BaseButton);
Vue.component(Input.name, Input);
Vue.component(InputNumber.name, InputNumber);
Vue.use(Tooltip);
Vue.use(Popover);
