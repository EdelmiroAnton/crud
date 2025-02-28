export const getdata = async () => {
  try {
    const resp = await fetch("http://localhost:3000/");
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
