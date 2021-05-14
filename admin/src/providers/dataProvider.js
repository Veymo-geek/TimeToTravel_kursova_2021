import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = `${process.env.REACT_APP_BASE_URL}/api`;

const httpClient = fetchUtils.fetchJson;

const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const token = localStorage.getItem("token");
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url, {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    }).then(({ json }) => ({
      data: json.data.map((resource) => ({ ...resource, id: resource._id })),
      total: json.data.length,
    }));
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => {
      json.data.id = json.data._id;
      return { data: json.data };
    }),

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({
      data: json.data.map((resource) => ({ ...resource, id: resource._id })),
    }));
  },

  getAll: (resource) => {
    const url = `${apiUrl}/${resource}`;

    return httpClient(url).then(({ json }) => ({
      data: json.data.map((resource) => ({ ...resource, id: resource._id })),
    }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json.data.map((resource) => ({ ...resource, id: resource._id })),
      total: json.data.length,
    }));
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => {
      json.data.id = json.data._id;
      return { data: json.data };
    }),

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: json.data.map((resource) => ({ ...resource, id: resource._id })),
    }));
  },

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify({ ...params.data, _id: params.data.id }),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({
      data: json.data.map((resource) => ({ ...resource, id: resource._id })),
    })),

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "DELETE",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: json.data.map((resource) => ({ ...resource, id: resource._id })),
    }));
  },
};

export { dataProvider };
