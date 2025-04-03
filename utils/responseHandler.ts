export function responseErrorHandler(error: any) {
  //In case of unexpected Error and Axios Network Error
  if (!error.response) {
    return {
      data: null,
      message: error.message,
      code: 500,
      success: false,
    };
  }

  const { data, statuscode } = error.response.data;

  //In case of Wrong API call
  if (!data) {
    return {
      data: null,
      message: 'server down',
      code: 404,
      success: false,
    };
  }

  //For Handeling Schema Error
  if (Array.isArray(data)) {
    return {
      data: null,
      message: data[0].message,
      code: statuscode,
      success: false,
    };
  }

  //For Handeling Response
  return {
    data,
    message: data.message,
    code: statuscode,
    success: data.success,
  };
}

export function responseHandler(response: any) {
  return {
    data: response.data.data,
    message: response.data.data.message,
    code: response.status,
    success: true,
  };
}
