import axios, { AxiosError } from "axios";

const BASE_URL = "https://learn.smktelkom-mlg.sch.id/kos/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Helper untuk format error biar gak duplikatif
const handleAxiosError = (error: unknown) => {
  const err = error as AxiosError<{ message?: string; code?: number }>;

  if (err.response) {
    console.error("API Error:", err.response.data?.message || err.message);
    return {
      status: false,
      message: err.response.data?.message || "Terjadi kesalahan di server.",
      code: err.response.data?.code || err.code,
    };
  }

  console.error("Unknown Error:", err.message);
  return {
    status: false,
    message: "Kesalahan jaringan atau server tidak merespons.",
  };
};

// ======================= DELETE =======================
export const drop = async (token: string) => {
  try {
    const result = await axiosInstance.delete("/delete_kos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { status: true, data: result.data };
  } catch (error) {
    return handleAxiosError(error);
  }
};

// ======================= PUT =======================
export const put = async (data: string | FormData, token: string) => {
  try {
    const contentType =
      typeof data === "string" ? "application/json" : "multipart/form-data";

    const result = await axiosInstance.put("/update_kos", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": contentType,
      },
    });

    return { status: true, data: result.data };
  } catch (error) {
    return handleAxiosError(error);
  }
};

// ======================= POST =======================
export async function post(url: string, data?: any, token?: string) {
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        MakerID: "29", 
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
}

// ======================= GET =======================
export const get = async (token: string) => {
  try {
    const result = await axiosInstance.get("/admin/show_kos", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { status: true, data: result.data };
  } catch (error) {
    return handleAxiosError(error);
  }
};
