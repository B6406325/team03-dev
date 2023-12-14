import { UserInterface } from "../../interface/pool";

const apiUrl = "http://localhost:8080";


const GetPackageInfo = async () => {
  const requestOptions = {
    method: "GET",
  };

  const url = `${apiUrl}/packages`;

  let res = await fetch(url, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
};



const GetUserInfo = async (id: any) => {
  const requestOptions = {
      method: "GET",
  };

  try {
      let response = await fetch(`${apiUrl}/userinfo/${id}`, requestOptions);

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let res = await response.json();

      if (res && res.data) {
          return res.data;
      } else {
          return null; // Return null if the data or user is not found
      }
  } catch (error) {
      console.error("Error fetching user information:", error);
      throw new Error("Failed to fetch user information");
  }
};

async function UpdateUser(data: UserInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/userinfo`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return { status: true, message: res.data };
      } else {
        return { status: false, message: res.error };
      }
    });

  return res;
}





export {
  GetPackageInfo,
  GetUserInfo,
  UpdateUser,
}


