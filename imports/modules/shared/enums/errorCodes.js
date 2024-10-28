export const ERROR_CODE = {
  400: { LABEL: 'Bad Request', DESCRIPTION: 'The server could not understand the request due to invalid syntax.' },
  401: { LABEL: 'Unauthorized', DESCRIPTION: 'The client must authenticate itself to get the requested response.' },
  403: { LABEL: 'Forbidden', DESCRIPTION: 'The client does not have access rights to the content.' },
  404: { LABEL: 'Not Found', DESCRIPTION: 'The server can not find the requested resource.' },
  405: { LABEL: 'Method Not Allowed', DESCRIPTION: 'The request method is known by the server but has been disabled and cannot be used.' },
  408: { LABEL: 'Request Timeout', DESCRIPTION: 'The server would like to shut down this unused connection.' },
  429: { LABEL: 'Too Many Requests', DESCRIPTION: 'The user has sent too many requests in a given amount of time.' },
  500: { LABEL: 'Internal Server Error', DESCRIPTION: 'The server has encountered a situation it doesn\'t know how to handle.' },
  502: { LABEL: 'Bad Gateway', DESCRIPTION: 'The server was acting as a gateway and received an invalid response.' },
  503: { LABEL: 'Service Unavailable', DESCRIPTION: 'The server is not ready to handle the request.' },
  504: { LABEL: 'Gateway Timeout', DESCRIPTION: 'The server was acting as a gateway and did not get a response in time.' }
};
