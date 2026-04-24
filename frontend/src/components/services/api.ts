const BASE_URL = "http://127.0.0.1:8000";

interface AuthResponse {
  token?: string;
  error?: string;
}

interface RegisterData {
  username: string;
  password?: string;
  email?: string;
  full_name?: string;
  [key: string]: any;
}

interface LoginData {
  username: string;
  password?: string;
}

const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Token ${token}` } : {};
};

export const api = {
  // --- аутентификация ---
  register: (data: RegisterData): Promise<any> =>
    fetch(`${BASE_URL}/users/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  login: (data: LoginData): Promise<AuthResponse> =>
    fetch(`${BASE_URL}/users/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  getProfile: async (): Promise<any> => {
    const headers = getAuthHeader();
    if (!headers.Authorization) return { interests: [] };
    
    try {
      const res = await fetch(`${BASE_URL}/users/profile/`, { headers });
      if (!res.ok) return { interests: [] };
      return await res.json();
    } catch {
      return { interests: [] };
    }
  },

  // --- новости и категории ---
  getNews: (categoryId?: number): Promise<any[]> => {
    const url = categoryId
      ? `${BASE_URL}/news/?category=${categoryId}`
      : `${BASE_URL}/news/`;
    return fetch(url).then((res) => res.json());
  },

  getCategories: (): Promise<any[]> =>
    fetch(`${BASE_URL}/categories/`).then((res) => res.json()),

  // --- интересы и сохранения (сохранения не работают) ---
  addInterest: (categoryId: number): Promise<any> =>
    fetch(`${BASE_URL}/users/interests/`, {
      method: "POST",
      headers: { ...getAuthHeader(), "Content-Type": "application/json" },
      body: JSON.stringify({ category_id: categoryId }),
    }).then((res) => res.json()),

  saveArticle: (articleId: number): Promise<any> =>
    fetch(`${BASE_URL}/users/saved/`, {
      method: "POST",
      headers: { ...getAuthHeader(), "Content-Type": "application/json" },
      body: JSON.stringify({ article_id: articleId }),
    }).then((res) => res.json()),

  deleteInterest: (categoryId: number): Promise<any> =>
    fetch(`${BASE_URL}/users/interests/`, {
      method: "DELETE",
      headers: { ...getAuthHeader(), "Content-Type": "application/json" },
      body: JSON.stringify({ category_id: categoryId }),
    }).then((res) => res.json()),
};