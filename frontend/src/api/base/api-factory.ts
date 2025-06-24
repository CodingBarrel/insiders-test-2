import { baseApi } from "@src/api/base/base-api";

export function createApiResource<
    TModel,
    TCreate = Partial<TModel>,
    TUpdate = Partial<TModel>
>(basePath: string) {
    return {
        getAll: async (): Promise<TModel[]> => {
            const res = await baseApi.get(basePath);
            return res.data;
        },

        getOne: async (id: string | number): Promise<TModel> => {
            const res = await baseApi.get(`${basePath}/${id}`);
            return res.data;
        },

        create: async (data: TCreate): Promise<TModel> => {
            const res = await baseApi.post(basePath, data);
            return res.data;
        },

        update: async (id: string | number, data: TUpdate): Promise<TModel> => {
            const res = await baseApi.patch(`${basePath}/${id}`, data);
            return res.data;
        },

        delete: async (id: string | number): Promise<void> => {
            await baseApi.delete(`${basePath}/${id}`);
        },
    };
}