"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(null); // Dados do usuário autenticado
  const [loading, setLoading] = useState(true); // Exibir carregamento inicial

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Função para buscar o usuário autenticado, se o token existir
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthData(null);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAuthData(response.data.user);
    } catch (error) {
      console.error(
        "Erro ao buscar o perfil:",
        error.response?.data?.message || error.message
      );
      localStorage.removeItem("token");
      setAuthData(null);
    } finally {
      setLoading(false);
    }
  };

  // Executar ao carregar a aplicação
  useEffect(() => {
    fetchUser();
  }, []);

  // Função de login
  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
      const { token, user } = response.data;

      // Salvar o token no localStorage
      localStorage.setItem("token", token);
      setAuthData(user);

      return { user };
    } catch (error) {
      console.error(
        "Erro no login:",
        error.response?.data?.message || error.message
      );
      throw new Error(error.response?.data?.message || "Erro ao realizar login");
    }
  };

  // Função de registro
  const register = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, data);
      const { token, user } = response.data;

      // Salvar o token no localStorage
      localStorage.setItem("token", token);
      setAuthData(user);

      return { user };
    } catch (error) {
      console.error(
        "Erro no cadastro:",
        error.response?.data?.message || error.message
      );
      throw new Error(
        error.response?.data?.message || "Erro ao realizar cadastro"
      );
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem("token");
    setAuthData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        loading,
        login,
        register,
        logout,
        refreshAuth: fetchUser, // Função para atualizar os dados do usuário
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
