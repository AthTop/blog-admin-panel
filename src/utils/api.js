const URL = import.meta.env.VITE_API_URL;

export const fetchPosts = async () => {
  const url = URL + "/posts";
  const data = await getData(url);
  return data;
};

export const fetchPost = async (postId) => {
  const url = URL + "/posts/" + postId;
  const data = await getData(url);
  return data;
};

const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error.message);
  }
};

export const loginRequest = async (username, password) => {
  const url = URL + "/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error.message);
  }
};

export const postComment = async (text, token, postId) => {
  const url = URL + "/posts/" + postId + "/comments";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error.message);
  }
};

export const postRequest = async (title, text, state, token) => {
  const url = `${URL}/posts/`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, text, state }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error.message);
  }
};

export const editPostRequest = async (post, title, text, state, token) => {
  const url = `${URL}/posts/${post.id}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, text, state }),
    });
    return response.status;
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = async (post, token) => {
  const url = `${URL}/posts/${post.id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    return response.status;
  } catch (error) {
    console.log(error);
  }
};
