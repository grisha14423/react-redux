import httpService from "./http.service";

const todosEndPoint = "todos/";

const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndPoint, {
      params: {
        _page: 1,
        _limit: 10,
      },
    });
    return data;
  },
  post: async () => {
    const { data } = await httpService.post(todosEndPoint, {
      title: "todos",
      completed: "false",
    });
    return data;
  },
};

export default todosService;
