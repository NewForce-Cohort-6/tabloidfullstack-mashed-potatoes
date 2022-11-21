export const getAllTags = () => {
    return fetch(`https://localhost:5001/api/Tag`)
    .then((res) => res.json())
};

export const addTag = (tag) => {
    return fetch(`https://localhost:5001/api/Tag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tag),
      })
};

export const deleteTag = (id) => {
    return fetch(`https://localhost:5001/api/Tag/${id}`, {
      method: "DELETE"
    })
  }
  
  export const getById = (id) => {
    return fetch(`https://localhost:5001/api/Tag/${id}`)
    .then((res) => res.json());
  }

  export const editTag = (tag) => {
    return fetch(`https://localhost:5001/api/Tag/${tag.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tag),
      }).then((res) => res.json())
};