export const getAllTags = () => {
    return fetch(`https://localhost:5001/api/Tag`)
    .then((res) => res.json())
};

// export const addTag = (tag) => {
//     return fetch(`https://localhost:5001/api/TAg`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(tag),
//       })
// };
