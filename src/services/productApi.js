import axiosClient from "@services/axiosClient";

const ProductApi = {
    async getAll() {
        const response = await axiosClient.get("products");
        return response.data;
    },

    async getById(id) {
        const response = await axiosClient.get("products/" + id);
        return response.data;
    }
};

export default ProductApi;
