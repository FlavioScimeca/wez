const getUser = async (email: string) => {
  if (!email) {
    return;
  }
  try {
    const userId = await fetch(`/api/get-user?email=${email}`)
      .then((res) => res.json())
      .then((res) => res);

    return userId;
  } catch (error) {
    throw Error('Error' + error);
  }
};

export default getUser;
