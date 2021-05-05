export const api = "http://localhost:5000/";
export const generatePublicUrl = (image) => {
	return `${api}public/${image}`;
};

// export const api = "https://alif-blog-backend.herokuapp.com/";
// export const generatePublicUrl = (image) => {
// 	return `${api}public/${image}`;
// };
