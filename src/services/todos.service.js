import httpService from './http.service';

const todosEndpoint = 'todos/';

const todosService = {
  fetchAll: async () => {
    const { data } = await httpService.get(todosEndpoint, {
      params: {
        _page: 1,
        _limit: 10,
      },
    });
    return data;
  },
  create: async payload => {
    console.log(payload);
    const { data } = await httpService.post(todosEndpoint, payload);
    console.log(data);
    return data;
  },
};

export default todosService;
