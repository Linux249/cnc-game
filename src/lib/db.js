let temp

const client = {
  get: params => {
    console.log('get', params);
    return temp
  },
  put: params => {
    console.log('put', { params });
    temp = params
    return params
  },
  query: params => {
    console.log('query', params);
    return temp
  },
  scan: params => {
    console.log('scan', params);
    return temp
  },
  update: params => {
    console.log('update', params);
  },
  delete: params => {
    console.log('delete', params);
  },
};


const rnd = {
  get: params => client.get(params),
  put: params => client.put(params),
  query: params => client.query(params),
  scan: params => client.scan(params),
  update: params => client.update(params),
  delete: params => client.delete(params),
};

export default rnd;
