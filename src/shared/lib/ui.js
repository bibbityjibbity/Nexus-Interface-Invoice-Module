import * as TYPE from 'actions/types';
const {
  libraries: {
    ReduxForm: { reset },
  },
  utilities: { apiCall },
} = NEXUS;

async function listAll(endpoint, params, limit = 100) {
  let list = [];
  let results = null;
  let page = 0;
  console.log(endpoint);
  do {
    results = await apiCall(endpoint, { ...params, limit, page: page++ });
    if (!results) break;
    if (Array.isArray(results)) {
      list = list.concat(results);
    } else {
      console.log(results);
      throw new Error(
        `API result is expected to be an array, got ${typeof results}`
      );
    }
  } while (results.length === limit);
  return list;
}

export const loadInvoices = () => async dispatch => {
  try {
    const invoices = await listAll('users/list/invoices');
    console.log(invoices);
    dispatch({ type: TYPE.SET_INVOICES, payload: invoices });
  } catch (err) {
    console.error('Failed listing Invoices', err);
  }
};

export const setInvoiceReferenceQuery = search => async dispatch => {
  console.log(search);
  dispatch({
    type: TYPE.SET_INVOICE_REFERENCE_QUERY,
    payload: search,
  });
};

export const setInvoiceTimeFilter = timeSpan => async dispatch => {
  dispatch({
    type: TYPE.SET_INVOICE_TIME_FILTER,
    payload: timeSpan,
  });
};

export const setInvoiceStatusFilter = status => async dispatch => {
  dispatch({
    type: TYPE.SET_INVOICE_STATUS_FILTER,
    payload: status,
  });
};

export const resetForm = formName => {
  return reset(formName);
};

export const OpenPopUp = (component, props) => async dispatch => {
  console.log(component);
  dispatch({
    type: TYPE.SET_POP_UP,
    payload: { div: component, props: props },
  });
};

export const LoadAccounts = () => async dispatch => {
  const results = await apiCall('users/list/accounts');
  console.log(results);
  dispatch({
    type: TYPE.SET_USER_ACCOUNTS,
    payload: results,
  });
};

export const ClosePopUp = () => async dispatch => {
  console.log('CLOSING');
  dispatch({
    type: TYPE.CLOSE_POP_UP,
    payload: null,
  });
};
