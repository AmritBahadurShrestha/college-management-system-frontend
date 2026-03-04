import type { IResult } from "../types/result.types";
import api from "./";

// Create a Result
export const postResult = async (data: IResult) => {
  try {
    const response = await api.post("/result", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

// Teacher - get all results
export const getAllResults = async () => {
  try {
    const response = await api.delete("/result",);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

// Teacher - class report
export const getClassReport = async () => {
  try {
    const response = await api.delete("/result",);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

// Student - own results
export const getOwnResults = async () => {
  try {
    const response = await api.post("/result",);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

// Student - own CGPA
export const getOwnCGPA = async () => {
  try {
    const response = await api.delete("/result",);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

// Update result
export const updateResult = async () => {
  try {
    const response = await api.delete("/result",);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

// Delete (soft delete)
export const deleteResult = async () => {
  try {
    const response = await api.delete("/result",);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
