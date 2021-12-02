import api from '~/utils/api';
import common from '~/utils/common';
import format from '~/utils/format';
import privia from '~/utils/privia';
import filter from '~/utils/filter';

export default ({ app }, inject) => {
  inject('apis', api);
  inject('common', common);
  inject('format', format);
  inject('privia', privia);
};
