import { UserInterface } from "../../interface/pool";
import Cookies from 'js-cookie';

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
  const userId = localStorage.getItem("UserID");

  if (!userId) {
    return { status: false, message: "User ID is not available" };
  }

  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${userId}`,
    },
    body: JSON.stringify({
      ID: parseInt(userId),
      Password: data.Password,
      Username: data.Username,
      Firstname: data.Firstname,
      Lastname: data.Lastname,
      Address: data.Address,
      Dob: data.Dob,
    }),
  };

  try {
    let res = await fetch(`${apiUrl}/userinfo`, requestOptions);

    if (res.ok) {
      const responseData = await res.json();
      return { status: true, message: responseData.message };
    } else {
      const errorData = await res.json();
      return { status: false, message: errorData.error || "Failed to update user information" };
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return { status: false, message: "An error occurred while updating user information" };
  }
}

const GetGenderType = async (id: any) => {
  const requestOptions = {
    method: "GET",
  };
  let res = await fetch(`${apiUrl}/userGender/${id}`, requestOptions)
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


const GetPrefixType = async (id: any) => {
  const requestOptions = {
    method: "GET",
  };
  let res = await fetch(`${apiUrl}/userPrefix/${id}`, requestOptions)
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






// async function ChangePassword(email: string, newPassword: string) {
//   const requestOptions = {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, newPassword }),
//   };

//   let res = await fetch(`${apiUrl}/changepassword`, requestOptions)
//       .then((response) => response.json())
//       .then((res) => {
//           if (res.message) {
//               return { status: true, message: res.message };
//           } else {
//               return { status: false, message: res.error };
//           }
//       });

//   return res;
// }




export {
  GetPackageInfo,
  GetUserInfo,
  UpdateUser,
  GetGenderType,
  GetPrefixType,
  // ChangePassword,
}


